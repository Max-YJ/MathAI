# 论文精读与知识沉淀

用 AI **精读**数学 / AI 相关论文，将理解沉淀为可复用的知识条目与 Skills。

## 工作流

```
选论文 → paper-deep-read Skill 精读 → 填写 deep-dive 模板
       → 知识写入 knowledge/ 或 papers/digests/
       → 高质量论文 → 提炼为 skills/from-paper/<name>/SKILL.md
```

## 目录

| 路径 | 说明 |
|------|------|
| [templates/deep-dive-template.md](templates/deep-dive-template.md) | 精读输出标准模板 |
| [templates/promote-to-skill-checklist.md](templates/promote-to-skill-checklist.md) | 论文升格为 Skill 的检查清单 |
| [digests/](digests/) | 已完成的知识沉淀（按论文一篇一文件） |

## 配套 Skills

| Skill | 用途 |
|-------|------|
| [`skills/paper-deep-read/SKILL.md`](../skills/paper-deep-read/SKILL.md) | 论文精读主工作流 |
| [`skills/from-paper/`](../skills/from-paper/) | 从论文提炼的可复用 Skills |

## 精读要求（摘要）

每篇精读须包含：

1. **背景解析** — 问题从哪来？为何重要？
2. **相关研究** — 与哪些工作对话？差异在哪？
3. **概念介绍** — 内涵（定义）+ 外延（边界、反例）
4. **核心分析思路** — 方法管线、关键洞察
5. **知识沉淀** — 可迁移的思想、方法论
6. **（可选）升格 Skill** — 满足检查清单时写入 `skills/from-paper/`

## 命名规范

- 沉淀文件：`digests/<short-title>-<year>.md`，如 `verify-step-by-step-2023.md`
- 衍生 Skill：`skills/from-paper/<method-name>/SKILL.md`

## 贡献

1. 选一篇论文（附 arXiv / 会议链接）
2. 使用 `paper-deep-read` Skill 精读
3. 按模板写入 `digests/`
4. 若值得复用，按检查清单升格 Skill 并提 PR
