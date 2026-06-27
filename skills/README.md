# Skills

供 Cursor Agent 使用的数学解题工作流。在对话中引用对应 Skill 即可激活特定解题模式。

## 可用 Skills

| Skill | 适用场景 |
|-------|----------|
| [`solve-step-by-step`](solve-step-by-step/SKILL.md) | 通用逐步推导，适合大多数计算题 |
| [`olympiad-proof`](olympiad-proof/SKILL.md) | 竞赛级证明题，强调严谨性与创造性 |
| [`numerical-computation`](numerical-computation/SKILL.md) | 数值计算、近似、编程验证 |
| [`geometry-visualization`](geometry-visualization/SKILL.md) | 几何题，结合图形与坐标法 |

## 使用方式

在 Cursor 中：

1. 打开 Agent 模式
2. 在 prompt 中写：`请使用 solve-step-by-step skill 解这道题：...`
3. 或 `@skills/solve-step-by-step/SKILL.md` 引用 Skill 文件

## 添加新 Skill

1. 在 `skills/` 下新建目录
2. 创建 `SKILL.md`，包含：触发条件、工作流程、输出格式、示例
3. 更新本 README 表格

## Skill 编写规范

- **触发条件**：明确何时应使用此 Skill
- **步骤清单**：Agent 必须遵循的步骤
- **输出格式**：统一的解答结构（便于人类审阅）
- **工具集成**：指明何时调用 `tools/` 中的脚本
- **知识引用**：列出应优先检索的 `knowledge/` 条目
