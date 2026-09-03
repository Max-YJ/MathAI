"""Verify MathAI Lean proofs contain no placeholders and build successfully."""

from __future__ import annotations

import argparse
import re
import shutil
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DEFAULT_PROJECT = ROOT / "formal" / "lean"
PLACEHOLDER = re.compile(r"\b(sorry|admit)\b")


def scan_placeholders(project: Path) -> list[str]:
    """Return source locations containing forbidden proof placeholders."""
    failures: list[str] = []
    for path in sorted(project.rglob("*.lean")):
        for number, line in enumerate(path.read_text(encoding="utf-8").splitlines(), 1):
            if PLACEHOLDER.search(line) and not line.lstrip().startswith("--"):
                failures.append(f"{path.relative_to(project)}:{number}: {line.strip()}")
    return failures


def run_lake_build(project: Path) -> subprocess.CompletedProcess[str]:
    """Build the Lean project using the configured toolchain."""
    lake = shutil.which("lake")
    if lake is None:
        raise RuntimeError(
            "lake not found. Install elan from https://github.com/leanprover/elan "
            "and source $HOME/.elan/env."
        )
    return subprocess.run(
        [lake, "build"],
        cwd=project,
        check=False,
        text=True,
        capture_output=True,
    )


def verify(project: Path) -> bool:
    """Run all trust checks and print a concise report."""
    placeholders = scan_placeholders(project)
    if placeholders:
        print("[FAIL] forbidden proof placeholders found:")
        for failure in placeholders:
            print(f"  {failure}")
        return False
    print("[PASS] no sorry/admit placeholders")

    try:
        result = run_lake_build(project)
    except RuntimeError as error:
        print(f"[FAIL] {error}")
        return False

    if result.returncode != 0:
        print("[FAIL] lake build")
        if result.stdout:
            print(result.stdout)
        if result.stderr:
            print(result.stderr)
        return False

    print("[PASS] lake build")
    print("[PASS] Lean verification complete")
    return True


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--project",
        type=Path,
        default=DEFAULT_PROJECT,
        help="Lean project directory (default: formal/lean)",
    )
    args = parser.parse_args()

    project = args.project.resolve()
    if not (project / "lakefile.toml").exists():
        parser.error(f"not a Lean project: {project}")
    sys.exit(0 if verify(project) else 1)


if __name__ == "__main__":
    main()
