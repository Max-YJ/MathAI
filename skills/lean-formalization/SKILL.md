---
name: lean-formalization
description: 将自然语言数学解答转换为 Lean 4 + mathlib 证明，显式检查定义、量词、前提和边界条件，并以 lake build 作为完成门槛。
---

# Lean 形式化证明

## 何时使用

- 用户要求严格证明、形式化验证或 Lean 代码；
- 要把 `knowledge/` 中的数学知识连接到机器可检验证明；
- 审查 AI 解答是否偷换前提、跳步或误用定理；
- 建设“自然语言—Lean—中文解释”三栏案例。

## 前置阅读

- `knowledge/formalization/README.md`
- `knowledge/formalization/lean-rigor.md`
- `knowledge/formalization/mathlib-mapping.md`
- 题目所属领域的 `knowledge/` 条目

## 严格完成标准

以下条件全部满足才可声称“形式化完成”：

1. 自然语言陈述已拆成变量类型、量词、假设和结论；
2. 人工核对 Lean theorem 与原题语义一致；
3. 所有 mathlib 定理的前提均有证明；
4. 生产文件不含 `sorry`、`admit` 或新增 `axiom`；
5. `python3 tools/verify_lean.py` 返回 `PASS`。

## 工作流程

### 1. 语义规范化

填写：

```text
对象及类型：
量词：
显式假设：
目标：
定义域/边界：
```

尤其检查：

- “任意”是否形式化为 `∀`；
- “存在”是否形式化为 `∃`；
- 除法是否有分母非零；
- 对数、根式、极限、导数是否有定义域/连续/可导条件。

### 2. 建立知识依赖图

```text
目标
├── 引理 A（需要前提 A₁, A₂）
├── 引理 B（由 A 得到）
└── mathlib 定理 C
```

每个节点记录：

- 数学定理名；
- mathlib 候选名；
- 所需前提；
- 前提如何消解。

### 3. 查询 mathlib API

先查 `mathlib-mapping.md`，再在 `.lean` 临时文件中用：

```lean
#check HasDerivAt.comp
#check Real.hasDerivAt_sin
```

不得凭记忆假定 API 名和参数顺序正确。

### 4. 编写最小 theorem

优先：

- 把每个假设写成参数；
- 用有意义的中间 `have` 保存关键事实；
- tactic 只处理它适合的子目标；
- 避免“一行自动化”遮蔽逻辑结构。

```lean
theorem example (x : ℝ) (hx : x ≠ 0) : ... := by
  have h₁ : ... := by ...
  have h₂ : ... := theoremName h₁ hx
  exact h₂
```

### 5. 双重验证

运行：

```bash
python3 tools/verify_lean.py
```

验证器执行：

1. 扫描 `sorry` / `admit`；
2. 执行 `lake build`；
3. 只有两者都通过才返回 `PASS`。

若失败：

- 类型错误：检查对象类型和隐式参数；
- unresolved goals：补齐前提，不可改用 `sorry`；
- 定理不存在：用 `#check` 或 mathlib 文档重新检索；
- 语义错误：回到步骤 1 修改 theorem 声明。

### 6. 生成三栏沉淀

在 `formal/examples/README.md` 增加：

| 非形式化命题 | Lean 证明 | 中文解释 |
|---|---|---|

中文解释必须对应：

- theorem 参数；
- 关键 `have`；
- 使用的 mathlib 定理；
- 由 kernel 检查的最终结论。

## 输出格式

```markdown
## 语义规范化
- 对象：
- 假设：
- 目标：

## 知识依赖
...

## Lean 证明
```lean
...
```

## 验证
`python3 tools/verify_lean.py` → PASS

## 可信边界
- 已由 Lean 保证：
- 仍需人工确认：
```

## 禁止事项

- 禁止用 `sorry` / `admit` 宣称完成；
- 禁止为通过编译而新增无数学依据的 `axiom`；
- 禁止只展示 tactic 输出而不保留可构建源码；
- 禁止把“Lean 编译通过”误称为“自然语言建模必然正确”。

## 示例

- `formal/lean/MathAI/Logic.lean`
- `formal/lean/MathAI/Algebra.lean`
- `formal/lean/MathAI/Calculus.lean`
- `formal/examples/README.md`
