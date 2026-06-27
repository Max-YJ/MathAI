"""Verify problem solutions using symbolic or numeric checks."""

from __future__ import annotations

import argparse
import math
import sys
from pathlib import Path

import sympy as sp
import yaml

from tools.problem_loader import load_problem
from tools.sympy_helpers import parse_expr, solve_equation


def verify_symbolic(verification: dict) -> tuple[bool, str]:
    """Verify using SymPy symbolic computation."""
    expr_str = verification.get("expression", "")
    expected = verification.get("expected")

    x = sp.Symbol("x")
    local_dict = {"x": x, "sp": sp}

    result = eval(expr_str, {"__builtins__": {}}, local_dict)

    if isinstance(expected, list):
        result_set = set(sp.simplify(r) for r in result)
        expected_set = set(sp.sympify(e) for e in expected)
        ok = result_set == expected_set
        return ok, f"got {result}, expected {expected}"

    expected_expr = sp.sympify(expected) if isinstance(expected, str) else sp.sympify(expected)
    ok = sp.simplify(result - expected_expr) == 0
    return ok, f"got {result}, expected {expected}"


def verify_numeric(verification: dict) -> tuple[bool, str]:
    """Verify using numeric Python evaluation."""
    expr_str = verification.get("expression", "")
    expected = verification.get("expected")
    result = eval(expr_str, {"__builtins__": {}}, {"math": math})
    ok = result == expected
    return ok, f"got {result}, expected {expected}"


def verify_problem(problem: dict) -> tuple[bool, str]:
    """Verify a problem's solution if verification block exists."""
    verification = problem.get("verification")
    if not verification:
        return True, "no verification defined (skipped)"

    vtype = verification.get("type", "symbolic")
    if vtype == "symbolic":
        return verify_symbolic(verification)
    if vtype == "numeric":
        return verify_numeric(verification)
    if vtype == "manual":
        return True, "manual verification required"

    return False, f"unknown verification type: {vtype}"


def main():
    parser = argparse.ArgumentParser(description="Verify MathAI problem solutions")
    parser.add_argument("--problem", required=True, help="Path to problem YAML file")
    args = parser.parse_args()

    problem = load_problem(args.problem)
    ok, msg = verify_problem(problem)

    status = "PASS" if ok else "FAIL"
    print(f"[{status}] {problem.get('id', 'unknown')}: {msg}")
    sys.exit(0 if ok else 1)


if __name__ == "__main__":
    main()
