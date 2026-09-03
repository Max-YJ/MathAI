---
name: paper-deep-read
description: AI 精读学术论文并做知识沉淀。输出背景、相关研究、概念内涵外延、核心思路、可迁移方法论；优质论文升格为 skills/from-paper/。
---

# 论文精读 (Paper Deep Read)

## 何时使用

- 用户要求「精读论文」「分析这篇 paper」「做知识沉淀」
- 需要系统理解一篇数学 / AI / ML 论文
- 准备将论文方法转化为可复用 Skill

## 前置准备

1. 获取论文 PDF 或 arXiv 页面
2. 复制 [`papers/templates/deep-dive-template.md`](../../papers/templates/deep-dive-template.md)
3. 输出目标路径：`papers/digests/<short-title>-<year>.md`

## 工作流程

### 阶段 1：速读定位（10% 时间）

- 读 **标题、摘要、结论、图 1**
- 填写元信息表
- 用一句话概括：**本文用 [方法] 解决 [问题]，相比 [baseline] 提升了 [什么]**

### 阶段 2：背景与相关研究（20%）

**背景解析**须回答：
- 问题从哪来？为何现在重要？
- 之前怎么做？瓶颈是什么？
- 与 MathAI 仓库哪个模块相关？（problems / skills / tools / knowledge）

**相关研究**须：
- 列 3–5 篇最接近工作，用表格对比「关系 + 差异」
- 标明本文在文献谱系中的位置

检索来源：`links/papers.md`、Semantic Scholar、arXiv cited by。

### 阶段 3：概念精读（25%）

对每个核心概念，**必须**写清：

| 维度 | 要求 |
|------|------|
| **内涵** | 严格定义（用自己的话 + 原文公式） |
| **外延** | 适用场景、不适用场景、易混淆概念 |
| **文中角色** | 该概念在方法管线中的位置 |

概念数量：通常 2–5 个，不贪多。

### 阶段 4：核心分析思路（30%）

- **方法总览**：输入 → 模块 → 输出（文字流程图）
- **关键洞察**：1–3 个「为何有效」的深层原因
- **技术表格**：模块 / 做法 / 设计理由
- **实验**：数据集、指标、主结果、局限

要求：**能据此向他人复述论文而不看原文**。

### 阶段 5：知识沉淀（15%）

输出三张表：

**5.1 可迁移思想**

| 思想 | 说明 | 本仓库应用 |
|------|------|------------|

**5.2 可迁移方法论**

写成可执行步骤或检查清单（非泛泛感想）。

**5.3 关键公式 / 算法**

LaTeX 或伪代码，附一句解释。

### 阶段 6：Skill 升格评估

对照 [`papers/templates/promote-to-skill-checklist.md`](../../papers/templates/promote-to-skill-checklist.md)。

若满足全部必要条件：
1. 创建 `skills/from-paper/<method-name>/SKILL.md`
2. 更新 `skills/from-paper/README.md`
3. 在 digest 第 6 节勾选升格结论

## 输出格式

完整填写 `deep-dive-template.md` 全部 7 节。

文件命名：`papers/digests/<kebab-case-title>-<year>.md`

## 质量检查清单

- [ ] 背景能让外行听懂动机
- [ ] 相关研究表格 ≥ 3 行
- [ ] 每个概念有内涵 + 外延
- [ ] 方法总览可独立复述
- [ ] 知识沉淀有 **具体** 的本仓库落地点（文件路径）
- [ ] Skill 升格评估已填写

## 示例

- 完整精读：[`papers/digests/verify-step-by-step-2023.md`](../../papers/digests/verify-step-by-step-2023.md)
- 衍生 Skill：[`skills/from-paper/process-supervision/SKILL.md`](../from-paper/process-supervision/SKILL.md)

## 注意

- 区分 **论文声称** 与 **你的批判性评注**（放第 7 节）
- 数学公式用 LaTeX；引用原文图表注明页码/图号
- 精读目的是 **沉淀可复用知识**，不是写文献综述
