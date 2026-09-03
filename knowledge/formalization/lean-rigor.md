# Lean 如何保证数学严谨性

## 可信链

Lean 基于 Curry–Howard 对应：

```text
命题 ↔ 类型
证明 ↔ 该类型的值（proof term）
```

人、AI 或 tactic 可以提出证明，但最终都必须生成 proof term，由 Lean kernel 做类型检查：

```text
自然语言 / AI / tactic → proof term → Lean kernel → 接受或拒绝
```

自动化 tactic 不是额外公理，也不能绕过 kernel。它只负责构造候选证明项。

## Lean 实际保证的内容

在指定的定义、公理和导入定理下，Lean 保证：

1. 每个表达式类型正确；
2. 使用定理时所有参数和前提齐全；
3. 最终 proof term 的类型与目标命题完全一致；
4. 证明中的每次重写、归纳和函数应用都符合逻辑规则。

## 不保证的内容

Lean 不自动保证：

- 形式化命题忠实表达自然语言原题；
- 选用的公理体系符合项目意图；
- 数学模型正确描述现实世界；
- 包含 `sorry`、自定义不安全公理的项目具有预期可信度；
- 实现软件绝无缺陷。

准确表述应是：

> Lean 保证已接受的证明项，在当前环境声明的定义、公理和定理下，具有目标命题的类型。

## MathAI 的可信度策略

1. 生产案例禁用 `sorry`；
2. `tools/verify_lean.py` 先扫描 `sorry` / `admit`，再运行 `lake build`；
3. 区分 `axiom`（可信基扩展）与普通 `theorem`，案例中避免新增公理；
4. 每个案例同时保留自然语言陈述、Lean 定理和中文解释；
5. 人工确认“形式化陈述等价于原题”，kernel 确认“证明正确”。

## `by` 与 tactic 是否严谨

例如：

```lean
example (a b : ℝ) (h : a = b) : a + 1 = b + 1 := by
  rw [h]
```

`rw` 只是生成证明项。若 `h` 方向错误、对象类型不匹配或目标未完成，kernel 会拒绝该文件。

## 相关

- [知识与逻辑框架](README.md)
- [mathlib 映射表](mathlib-mapping.md)
- [Lean 官方可信计算基础](https://lean-lang.org/theorem_proving_in_lean4/dependent_type_theory.html)
