"""Strict calculus verification for AI-generated solutions.

Verifies derivatives, integrals, limits, definite integrals, and step chains
using SymPy symbolic computation.
"""

from __future__ import annotations

import argparse
import json
import random
import sys

import sympy as sp
from sympy import E, Symbol, oo, sympify

x = Symbol("x")
t = Symbol("t")


def _parse(expr_str: str):
    return sympify(expr_str, locals={"x": x, "t": t, "E": E, "e": E, "oo": oo})


def verify_derivative(expr_str: str, claimed_str: str) -> tuple[bool, str]:
    """Check d/dx(expr) == claimed."""
    expr = _parse(expr_str)
    claimed = _parse(claimed_str)
    actual = sp.diff(expr, x)
    diff = sp.simplify(actual - claimed)
    ok = diff == 0
    return ok, f"d/dx({expr_str}) = {actual}; claimed = {claimed}; diff = {diff}"


def verify_integral(expr_str: str, claimed_str: str) -> tuple[bool, str]:
    """Check d/dx(claimed) == expr (antiderivative verification)."""
    expr = _parse(expr_str)
    claimed = _parse(claimed_str)
    actual_deriv = sp.diff(claimed, x)
    diff = sp.simplify(actual_deriv - expr)
    ok = diff == 0
    return ok, f"d/dx({claimed_str}) = {actual_deriv}; integrand = {expr}; diff = {diff}"


def verify_limit(expr_str: str, point: str, claimed_str: str) -> tuple[bool, str]:
    """Check lim_{x->point} expr == claimed."""
    expr = _parse(expr_str)
    claimed = _parse(claimed_str)
    pt = _parse(point) if point not in ("oo", "inf", "+oo") else oo
    if point in ("-oo",):
        pt = -oo
    actual = sp.limit(expr, x, pt)
    diff = sp.simplify(actual - claimed)
    ok = diff == 0
    return ok, f"limit = {actual}; claimed = {claimed}; diff = {diff}"


def verify_definite(expr_str: str, a: str, b: str, claimed_str: str) -> tuple[bool, str]:
    """Check integral_a^b expr == claimed."""
    expr = _parse(expr_str)
    a_val = _parse(a)
    b_val = _parse(b)
    claimed = _parse(claimed_str)
    actual = sp.integrate(expr, (x, a_val, b_val))
    diff = sp.simplify(actual - claimed)
    ok = diff == 0
    return ok, f"integral = {actual}; claimed = {claimed}; diff = {diff}"


def verify_step(before_str: str, after_str: str) -> tuple[bool, str]:
    """Check symbolic equivalence of two expressions."""
    before = _parse(before_str)
    after = _parse(after_str)
    diff = sp.simplify(before - after)
    ok = diff == 0
    return ok, f"before - after = {diff}"


def numeric_spot_check(expr_str: str, claimed_str: str, n: int = 3) -> tuple[bool, str]:
    """Spot-check expr == claimed at random points in domain."""
    expr = _parse(expr_str)
    claimed = _parse(claimed_str)
    failures = []
    for _ in range(n):
        pt = random.uniform(0.5, 2.5)
        ev_expr = complex(expr.subs(x, pt))
        ev_claimed = complex(claimed.subs(x, pt))
        if abs(ev_expr - ev_claimed) > 1e-8:
            failures.append(f"x={pt}: {ev_expr} != {ev_claimed}")
    ok = len(failures) == 0
    return ok, "; ".join(failures) if failures else f"{n} random points match"


def verify_step_chain(steps: list[dict]) -> list[dict]:
    """Verify a chain of steps; each step has 'before' and 'after'."""
    results = []
    for i, step in enumerate(steps):
        ok, msg = verify_step(step["before"], step["after"])
        results.append({"step": i + 1, "rule": step.get("rule", ""), "ok": ok, "message": msg})
    return results


def main():
    parser = argparse.ArgumentParser(description="Strict calculus verification")
    sub = parser.add_subparsers(dest="command", required=True)

    p_der = sub.add_parser("derivative", help="Verify derivative")
    p_der.add_argument("--expr", required=True)
    p_der.add_argument("--claimed", required=True)

    p_int = sub.add_parser("integral", help="Verify antiderivative")
    p_int.add_argument("--expr", required=True)
    p_int.add_argument("--claimed", required=True)

    p_lim = sub.add_parser("limit", help="Verify limit")
    p_lim.add_argument("--expr", required=True)
    p_lim.add_argument("--point", required=True)
    p_lim.add_argument("--claimed", required=True)

    p_def = sub.add_parser("definite", help="Verify definite integral")
    p_def.add_argument("--a", required=True)
    p_def.add_argument("--b", required=True)
    p_def.add_argument("--claimed", required=True)
    p_def.add_argument("--expr", required=True)

    p_step = sub.add_parser("steps", help="Verify step chain from JSON file")
    p_step.add_argument("--file", required=True, help="JSON: [{before, after, rule}, ...]")

    p_spot = sub.add_parser("spot", help="Numeric spot check")
    p_spot.add_argument("--expr", required=True)
    p_spot.add_argument("--claimed", required=True)
    p_spot.add_argument("-n", type=int, default=3)

    args = parser.parse_args()
    ok, msg = False, ""

    if args.command == "derivative":
        ok, msg = verify_derivative(args.expr, args.claimed)
    elif args.command == "integral":
        ok, msg = verify_integral(args.expr, args.claimed)
    elif args.command == "limit":
        ok, msg = verify_limit(args.expr, args.point, args.claimed)
    elif args.command == "definite":
        ok, msg = verify_definite(args.expr, args.a, args.b, args.claimed)
    elif args.command == "steps":
        with open(args.file, encoding="utf-8") as f:
            steps = json.load(f)
        results = verify_step_chain(steps)
        all_ok = all(r["ok"] for r in results)
        print(json.dumps(results, indent=2, ensure_ascii=False))
        sys.exit(0 if all_ok else 1)
    elif args.command == "spot":
        ok, msg = numeric_spot_check(args.expr, args.claimed, args.n)

    status = "PASS" if ok else "FAIL"
    print(f"[{status}] {msg}")
    sys.exit(0 if ok else 1)


if __name__ == "__main__":
    main()
