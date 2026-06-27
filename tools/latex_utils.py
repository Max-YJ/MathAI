"""LaTeX utilities for math expressions."""

from __future__ import annotations

import sympy as sp
from sympy import latex, sympify


def expr_to_latex(expr_str: str) -> str:
    """Convert a SymPy-parseable string to LaTeX."""
    expr = sympify(expr_str)
    return latex(expr)


def latex_to_expr(latex_str: str):
    """Parse LaTeX to SymPy (requires antlr4 for full support)."""
    try:
        return sp.parse_latex(latex_str)
    except Exception:
        return sympify(latex_str.replace("\\", ""))


def wrap_math(expr_latex: str, display: bool = False) -> str:
    """Wrap LaTeX in math delimiters for Markdown."""
    if display:
        return f"$$\n{expr_latex}\n$$"
    return f"${expr_latex}$"
