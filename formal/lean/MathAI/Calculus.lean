import Mathlib

open scoped Real

namespace MathAI.Calculus

/--
The derivative of `sin (x²)` is `2x cos (x²)`.

The proof composes the derivative of sine with the derivative of the square.
The final `convert` goals are algebraic normalization only.
-/
theorem hasDerivAtSinSquare (x : ℝ) :
    HasDerivAt (fun y : ℝ => Real.sin (y ^ 2))
      (2 * x * Real.cos (x ^ 2)) x := by
  convert Real.hasDerivAt_sin (x ^ 2) |>.comp x ((hasDerivAt_id x).pow 2) using 1 <;>
    ring

/-- The corresponding `deriv` statement follows from the checked derivative witness. -/
theorem derivSinSquare (x : ℝ) :
    deriv (fun y : ℝ => Real.sin (y ^ 2)) x =
      2 * x * Real.cos (x ^ 2) :=
  (hasDerivAtSinSquare x).deriv

/-- Product-rule example: the derivative of `x * exp x`. -/
theorem hasDerivAtMulExp (x : ℝ) :
    HasDerivAt (fun y : ℝ => y * Real.exp y)
      (Real.exp x + x * Real.exp x) x := by
  convert (hasDerivAt_id x).mul (Real.hasDerivAt_exp x) using 1 <;>
    ring

end MathAI.Calculus
