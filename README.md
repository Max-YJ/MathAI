# MathAI

使用大语言模型（LLM）解决从简单到复杂的数学问题的代码库与知识框架。

## 仓库结构

| 目录 | 说明 |
|------|------|
| [`problems/`](problems/) | **问题库** — 按领域与难度分类的数学题目，含标准格式与示例 |
| [`knowledge/`](knowledge/) | **数学知识库** — 概念、定理、公式与解题套路 |
| [`tools/`](tools/) | **通用工具** — SymPy 计算、LaTeX 处理、答案验证等 Python 工具 |
| [`skills/`](skills/) | **Skills** — 供 Cursor Agent 使用的数学解题工作流 |
| [`links/`](links/) | **外部链接** — 论文、算法、论坛、开源项目等精选资源 |
| [`brainstorm/`](brainstorm/) | **头脑风暴** — 解题策略模板与思维框架 |
| [`maintenance/`](maintenance/) | **维护管理** — 贡献指南、变更日志、治理规范 |
| [`resources/`](resources/) | **资源收集** — 教材、课程、数据集等学习资源 |
| [`hot-topics/`](hot-topics/) | **热点榜单** — 数学与 AI 交叉领域的热点追踪 |

## 快速开始

### 1. 安装依赖

```bash
pip install -r tools/requirements.txt
```

### 2. 用 LLM 解题

在 Cursor 中打开本仓库，根据题目类型选用对应 Skill：

- 逐步推导 → `skills/solve-step-by-step/`
- 竞赛证明 → `skills/olympiad-proof/`
- 数值计算 → `skills/numerical-computation/`
- 几何可视化 → `skills/geometry-visualization/`

### 3. 添加新题目

参考 [`problems/templates/problem-template.yaml`](problems/templates/problem-template.yaml) 编写题目，放入对应领域目录。

### 4. 验证答案

```bash
python -m tools.verify --problem problems/algebra/quadratic-roots.yaml
```

## 问题格式

每道题使用 YAML 描述，包含：

- `id` — 唯一标识
- `title` / `statement` — 题目标题与陈述
- `difficulty` — 1（入门）到 5（研究级）
- `tags` — 领域标签
- `hints` / `solution` — 提示与参考解答（可选）

详见 [`problems/README.md`](problems/README.md)。

## 贡献

欢迎提交题目、知识条目、工具改进与资源链接。请参阅 [`maintenance/CONTRIBUTING.md`](maintenance/CONTRIBUTING.md)。

## 许可证

MIT License — 详见 [LICENSE](LICENSE)。
