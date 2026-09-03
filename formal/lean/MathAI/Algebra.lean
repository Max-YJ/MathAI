import Mathlib

namespace MathAI.Algebra

/-- Difference-of-squares identity, checked for every commutative ring. -/
theorem differenceOfSquares {R : Type*} [CommRing R] (a b : R) :
    a ^ 2 - b ^ 2 = (a - b) * (a + b) := by
  ring

/-- A linear implication with every required assumption made explicit. -/
theorem linearBound (x y : ℝ) (hx : x ≤ 3) (hy : y ≤ 4) :
    x + y ≤ 7 := by
  linarith

/-- Cancellation requires the nonzero premise; Lean does not permit it silently. -/
theorem cancelNonzero (a b c : ℝ) (hc : c ≠ 0) (h : a * c = b * c) :
    a = b := by
  exact mul_right_cancel₀ hc h

end MathAI.Algebra
