# 论文升格为 Skill 检查清单

并非每篇论文都需要变成 Skill。仅当方法 **可重复执行、对解题/研究有直接指导** 时升格。

## 必要条件（全部满足）

- [ ] **可复用**：方法不依赖论文特定实验环境，他人可按步骤执行
- [ ] **可操作**：能写成「何时用 → 步骤 1,2,3 → 输出格式」
- [ ] **可验证**：有明确的成功标准（指标、检查清单、PASS/FAIL）
- [ ] **有增量**：比现有 Skill 或通用 prompt 有明显增益
- [ ] **已沉淀 digest**：`papers/digests/` 中已有对应精读

## 推荐结构

```
skills/from-paper/<method-name>/
├── SKILL.md          # 必需：Cursor Skill 主文件
└── references.md     # 可选：公式、伪代码、原文链接
```

## SKILL.md 必备章节

1. YAML frontmatter：`name`, `description`
2. **何时使用** — 触发条件
3. **前置知识** — 链接到 `papers/digests/` 与 `knowledge/`
4. **工作流程** — 编号步骤
5. **输出格式** — Markdown 模板
6. **示例** — 输入输出各一例
7. **原文引用** — arXiv / 会议信息

## 命名

- 用 **方法名** 而非论文标题：如 `process-supervision` 而非 `lets-verify-step-by-step`
- 小写、连字符

## 评审

升格 Skill 的 PR 需：
- 链接对应 digest
- 在 `skills/from-paper/README.md` 登记
- 在 `skills/README.md` 主索引添加一行
