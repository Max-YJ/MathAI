"""SymPy helpers for symbolic mathematics."""

from __future__ import annotations

import sympy as sp
from sympy import Eq, Symbol, sympify


def parse_expr(expr_str: str, symbol: str = "x"):
    """Parse a string expression into a SymPy object."""
    local_dict = {symbol: Symbol(symbol), "x": Symbol("x"), "y": Symbol("y"), "z": Symbol("z")}
    return sympify(expr_str, locals=local_dict)


def differentiate(expr_str: str, symbol: str = "x"):
    """Differentiate an expression with respect to a symbol."""
    expr = parse_expr(expr_str, symbol)
    sym = Symbol(symbol)
    return sp.diff(expr, sym)


def integrate_expr(expr_str: str, symbol: str = "x"):
    """Integrate an expression with respect to a symbol."""
    expr = parse_expr(expr_str, symbol)
    sym = Symbol(symbol)
    return sp.integrate(expr, sym)


def solve_equation(expr_str: str, symbol: str = "x"):
    """Solve an equation (expression = 0) for a symbol."""
    expr = parse_expr(expr_str, symbol)
    sym = Symbol(symbol)
    return sp.solve(Eq(expr, 0), sym)


def simplify_expr(expr_str: str, symbol: str = "x"):
    """Simplify a symbolic expression."""
    expr = parse_expr(expr_str, symbol)
    return sp.simplify(expr)


def evaluate_numeric(expr_str: str, substitutions: dict | None = None):
    """Evaluate an expression numerically."""
    expr = parse_expr(expr_str)
    subs = {Symbol(k): v for k, v in (substitutions or {}).items()}
    return float(expr.subs(subs))


if __name__ == "__main__":
    print("Derivative:", differentiate("sin(x**2 + 1)", "x"))
    print("Roots:", solve_equation("x**2 - 5*x + 6", "x"))
