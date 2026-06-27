"""Load and search problems from the problem library."""

from __future__ import annotations

import argparse
import json
from pathlib import Path

import yaml

PROBLEMS_ROOT = Path(__file__).parent.parent / "problems"


def load_problem(path: str | Path) -> dict:
    """Load a single problem YAML file."""
    with open(path, encoding="utf-8") as f:
        return yaml.safe_load(f)


def iter_problems(root: Path | None = None):
    """Iterate over all problem YAML files."""
    root = root or PROBLEMS_ROOT
    for path in sorted(root.rglob("*.yaml")):
        if "templates" in path.parts:
            continue
        yield path, load_problem(path)


def search_problems(
    tag: str | None = None,
    difficulty: int | None = None,
    keyword: str | None = None,
) -> list[dict]:
    """Search problems by tag, difficulty, or keyword in title/statement."""
    results = []
    for path, problem in iter_problems():
        if tag and tag not in problem.get("tags", []):
            continue
        if difficulty is not None and problem.get("difficulty") != difficulty:
            continue
        if keyword:
            text = f"{problem.get('title', '')} {problem.get('statement', '')}"
            if keyword.lower() not in text.lower():
                continue
        results.append({"path": str(path), **problem})
    return results


def main():
    parser = argparse.ArgumentParser(description="Search MathAI problem library")
    parser.add_argument("--tag", help="Filter by tag")
    parser.add_argument("--difficulty", type=int, help="Filter by difficulty (1-5)")
    parser.add_argument("--keyword", help="Search in title/statement")
    parser.add_argument("--json", action="store_true", help="Output as JSON")
    args = parser.parse_args()

    results = search_problems(tag=args.tag, difficulty=args.difficulty, keyword=args.keyword)
    if args.json:
        print(json.dumps(results, ensure_ascii=False, indent=2))
    else:
        for p in results:
            print(f"[{p['difficulty']}] {p['id']}: {p['title']} ({p['path']})")


if __name__ == "__main__":
    main()
