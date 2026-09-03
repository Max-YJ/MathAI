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
  have hSquare : HasDerivAt (fun y : ℝ => y ^ 2) (2 * x) x := by
    simpa using (hasDerivAt_pow 2 x)
  simpa [mul_comm, mul_left_comm, mul_assoc] using hSquare.sin

/-- The corresponding `deriv` statement follows from the checked derivative witness. -/
theorem derivSinSquare (x : ℝ) :
    deriv (fun y : ℝ => Real.sin (y ^ 2)) x =
      2 * x * Real.cos (x ^ 2) :=
  (hasDerivAtSinSquare x).deriv

end MathAI.Calculus
