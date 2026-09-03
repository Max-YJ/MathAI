---
name: process-supervision
description: 过程监督式解题验证。对解答的每一步独立校验，任一步 FAIL 则整条链无效，避免「错过程对答案」。源自 OpenAI 2023 过程监督论文。
---

# 过程监督验证 (Process Supervision)

> 理论背景：[`papers/digests/verify-step-by-step-2023.md`](../../papers/digests/verify-step-by-step-2023.md)

## 何时使用

- 多步推理题（数学、逻辑、代码推导）
- 担心 LLM **碰巧答对** 但过程错误
- 与 `calculus-solver` 等 Skill 配合做 **终检增强**
- 用户要求「检查每一步是否正确」

## 核心原则

> **结果正确 ≠ 过程正确。** 必须对每一步独立打分（PASS/FAIL），任一步 FAIL 则解答不可用。

## 工作流程

### 1. 拆分步骤

将解答拆为原子步骤，每步须含：
- 操作（数学变换 / 逻辑推断）
- 依据（定理 / 规则 / 前提）
- 可独立验证的断言

### 2. 逐步评分

对每步 $s_i$ 判定：

| 等级 | 含义 | 动作 |
|------|------|------|
| **PASS** | 操作正确、依据有效 | 继续 |
| **NEUTRAL** | 跳步但可补全、未影响正确性 | 标注并补全 |
| **FAIL** | 错误或无依据 | **停止**，不得采纳最终答案 |

### 3. 选择验证器

| 步骤类型 | 验证方式 |
|----------|----------|
| 代数 / 微积分 | `python3 -m tools.calculus_verify ...` |
| 数值 | `python3 -m tools.verify` / 回代 |
| 逻辑 / 证明 | 人工审查 + 特例检验 |
| 代码 | 单元测试 |

### 4. 聚合决策

```
若 ∃ step: score(step) == FAIL → 解答 REJECTED
若 ∀ step: score(step) ∈ {PASS, NEUTRAL} → 解答 ACCEPTED（NEUTRAL 须已补全）
```

**禁止**：因最终答案正确而忽略 FAIL 步骤。

### 5. Best-of-N（可选）

生成 N 条解答链，每条独立逐步评分，选 **全部 PASS 且 NEUTRAL 最少** 的链。

## 输出格式

```markdown
## 过程监督报告

| 步骤 | 操作摘要 | 依据 | 评分 | 验证命令/说明 |
|------|----------|------|------|---------------|
| 1 | ... | 链式法则 | PASS | calculus_verify derivative ... |
| 2 | ... | — | FAIL | 漏乘内层导数 |

## 决策
**REJECTED** — 步骤 2 FAIL，最终答案不可采纳。

## 修正建议
步骤 2 应修正为：...
```

## 与 calculus-solver 的关系

- `calculus-solver`：解题 + 内置逐步校验
- `process-supervision`：可 **独立** 审查任意已有解答（含人工或其他模型生成）

推荐管线：
```
calculus-solver 生成解答 → process-supervision 独立再审一遍
```

## 示例

**输入**：$\frac{d}{dx}\sin(x^2) = \cos(x^2)$（错误解答）

**过程监督**：

| 步骤 | 评分 | 原因 |
|------|------|------|
| 写 $\cos(x^2)$ | FAIL | 漏乘 $2x$；`calculus_verify` 不通过 |

**决策**：REJECTED，正确应为 $2x\cos(x^2)$。

## 原文

Lightman et al., *Let's Verify Step by Step*, arXiv:2305.20050, 2023.
