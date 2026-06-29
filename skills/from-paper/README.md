# 从论文提炼的 Skills

本目录存放经 `paper-deep-read` 精读后、满足升格检查清单的可复用工作流。

## 登记

| Skill | 来源论文 | Digest | 用途 |
|-------|----------|--------|------|
| [process-supervision](process-supervision/SKILL.md) | Let's Verify Step by Step (2023) | [digest](../../papers/digests/verify-step-by-step-2023.md) | 逐步过程验证，惩罚「错过程对答案」 |

## 添加新 Skill

1. 完成 `papers/digests/<title>.md` 精读
2. 通过 [`promote-to-skill-checklist.md`](../../papers/templates/promote-to-skill-checklist.md)
3. 创建 `skills/from-paper/<name>/SKILL.md`
4. 在本表添加一行
5. 更新 `skills/README.md`

## 与通用 Skills 的区别

| 类型 | 位置 | 来源 |
|------|------|------|
| 通用工作流 | `skills/solve-step-by-step/` 等 | 数学方法论 |
| 论文衍生 | `skills/from-paper/` | 特定论文提炼 |

论文 Skill 应 **引用 digest** 作为理论背景，并强调可操作步骤。
