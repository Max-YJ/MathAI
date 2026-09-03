# 三栏形式化经典案例

三栏结构用于同时审查：

1. 自然语言命题是否被 Lean 忠实表达；
2. Lean 证明是否通过 kernel；
3. 形式证明是否能被读者理解。

## 案例一：命题推理链

| 非形式化命题 | Lean 证明 | 中文解释 |
|---|---|---|
| 已知 \(P\Rightarrow Q\)、\(Q\Rightarrow R\)，证明 \(P\Rightarrow R\)。 | `MathAI.Logic.implicationChain` | 假设 \(P\)，先得 \(Q\)，再得 \(R\)。 |

```lean
theorem implicationChain {P Q R : Prop}
    (hpq : P → Q) (hqr : Q → R) : P → R := by
  intro hp
  exact hqr (hpq hp)
```

## 案例二：消去非零因子

| 非形式化命题 | Lean 证明 | 中文解释 |
|---|---|---|
| 若 \(c\ne0\) 且 \(ac=bc\)，则 \(a=b\)。 | `MathAI.Algebra.cancelNonzero` | “约去 \(c\)”必须显式提供 \(c\ne0\)；Lean 不允许省略。 |

```lean
theorem cancelNonzero (a b c : ℝ) (hc : c ≠ 0)
    (h : a * c = b * c) : a = b := by
  exact mul_right_cancel₀ hc h
```

## 案例三：链式法则

| 非形式化命题 | Lean 证明 | 中文解释 |
|---|---|---|
| \(\frac{d}{dx}\sin(x^2)=2x\cos(x^2)\)。 | `MathAI.Calculus.hasDerivAtSinSquare` | 复合正弦的导数与平方函数的导数，再用链式法则组合。 |

```lean
theorem hasDerivAtSinSquare (x : ℝ) :
    HasDerivAt (fun y : ℝ => Real.sin (y ^ 2))
      (2 * x * Real.cos (x ^ 2)) x := by
  convert Real.hasDerivAt_sin (x ^ 2)
      |>.comp x ((hasDerivAt_id x).pow 2) using 1 <;>
    ring
```

对应知识条目：

- [`knowledge/calculus/chain-rule.md`](../../knowledge/calculus/chain-rule.md)
- [`knowledge/formalization/mathlib-mapping.md`](../../knowledge/formalization/mathlib-mapping.md)

## 新增案例标准

- 不得含 `sorry` 或 `admit`；
- 自然语言命题必须写出所有边界条件；
- Lean 文件必须由 `python3 tools/verify_lean.py` 验证；
- 中文解释必须逐项对应 Lean 参数和关键 proof step。
