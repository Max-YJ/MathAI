import Mathlib

namespace MathAI.Logic

/-- Modus ponens expressed as a reusable theorem. -/
theorem modusPonens {P Q : Prop} (hp : P) (hpq : P → Q) : Q :=
  hpq hp

/-- Chaining two implications makes the intermediate fact explicit. -/
theorem implicationChain {P Q R : Prop} (hpq : P → Q) (hqr : Q → R) : P → R := by
  intro hp
  exact hqr (hpq hp)

/-- A conjunction supplies both of its component facts. -/
theorem conjunctionElim {P Q : Prop} (h : P ∧ Q) : Q ∧ P :=
  ⟨h.2, h.1⟩

/-- A direct proof of a simple set-theoretic inference. -/
theorem subsetTransitive {α : Type*} {A B C : Set α}
    (hab : A ⊆ B) (hbc : B ⊆ C) : A ⊆ C := by
  intro x hx
  exact hbc (hab hx)

end MathAI.Logic
