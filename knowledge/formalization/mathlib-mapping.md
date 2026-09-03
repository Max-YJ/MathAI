# MathAI 知识条目 → mathlib 映射

> 映射名以 mathlib `v4.33.1` 为基准。使用前仍应通过 `lake build` 验证，因为 API 可能随版本变化。

## 逻辑与集合

| 数学知识 | Lean / mathlib 表达 | 典型工具 |
|---|---|---|
| 命题蕴含 | `P → Q` | `intro`, `exact` |
| 合取 | `P ∧ Q` | `constructor`, `And.intro` |
| 析取 | `P ∨ Q` | `Or.inl`, `Or.inr`, `rcases` |
| 否定 | `¬ P`（即 `P → False`） | `intro`, `contradiction` |
| 存在量词 | `∃ x, P x` | `use`, `refine ⟨_, _⟩` |
| 全称量词 | `∀ x, P x` | `intro` |
| 集合包含 | `A ⊆ B` | `intro x hx` |

## 代数

| 知识 | mathlib / tactic | 所需前提 |
|---|---|---|
| 环等式 | `ring`, `ring_nf` | 交换（半）环结构 |
| 线性算术 | `linarith` | 线性等式/不等式假设 |
| 非线性算术 | `nlinarith` | 多项式约束 |
| 数值归约 | `norm_num` | 可计算的数值表达式 |
| 域化简 | `field_simp` | 分母非零条件 |
| 幂的求导 | `HasDerivAt.pow` | 底函数可导 |

## 微积分

| MathAI 条目 | mathlib 定理/结构 | 前提 |
|---|---|---|
| 链式法则 | `HasDerivAt.comp` | 外层和内层在对应点可导 |
| 正弦求导 | `Real.hasDerivAt_sin` | 无额外前提 |
| 余弦求导 | `Real.hasDerivAt_cos` | 无额外前提 |
| 指数求导 | `Real.hasDerivAt_exp` | 无额外前提 |
| 对数求导 | `Real.hasDerivAt_log` | `x ≠ 0` |
| 和的求导 | `HasDerivAt.add` | 两项可导 |
| 积的求导 | `HasDerivAt.mul` | 两项可导 |
| 商的求导 | `HasDerivAt.div` | 两项可导且分母值非零 |
| 常数倍 | `HasDerivAt.const_mul` / `mul_const` | 原函数可导 |
| 连续性 | `Continuous`, `ContinuousAt` | 视定理而定 |

## 数论

| 知识 | mathlib / tactic |
|---|---|
| 整除 | `a ∣ b`、`dvd_trans` |
| 最大公约数 | `Nat.gcd` |
| 同余 | `Nat.ModEq` |
| 素数 | `Nat.Prime` |
| 有限范围判定 | `decide`, `native_decide` |

## 映射使用流程

1. 从 `knowledge/` 条目读取定理陈述及前提；
2. 在本表定位候选 mathlib API；
3. 用 `#check` 确认准确类型：

   ```lean
   #check HasDerivAt.comp
   #check Real.hasDerivAt_sin
   ```

4. 将自然语言前提显式写入 theorem 参数；
5. 编写证明并运行 `python3 tools/verify_lean.py`；
6. 把最终使用的定理名反向补回知识条目。

## 注意

- tactic 成功不代表形式化陈述忠实于原题；必须人工核对量词、类型和边界条件。
- `field_simp` 会产生分母非零子目标，不能忽略。
- `linarith` / `nlinarith` 只使用上下文中的假设；缺失前提时应补充前提，不应添加无依据的公理。
