# 变更日志

本文件记录 MathAI 仓库的重要变更。

格式基于 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/)。

## [Unreleased]

### Added

- **微积分模块**：`knowledge/calculus/` 完整知识库（策略、极限、导数、积分、公式表）
- **微积分严格求解 Skill**：`skills/calculus-solver/`，每步强制 `calculus_verify`
- **微积分校验工具**：`tools/calculus_verify.py`（导数/积分/极限/定积分/步骤链）
- 4 道新微积分例题（洛必达、分部积分、换元定积分、闭区间最值）
- **论文精读模块**：`papers/`（模板、digests、升格检查清单）
- **论文精读 Skill**：`skills/paper-deep-read/`
- 示例精读：`papers/digests/verify-step-by-step-2023.md`
- 论文衍生 Skill：`skills/from-paper/process-supervision/`
- 微积分头脑风暴模板：`brainstorm/templates/calculus.md`

### Added (prior)

- 初始仓库结构：问题库、知识库、工具、Skills、外部链接、头脑风暴、维护管理、资源收集、热点榜单
- 示例题目：代数、微积分、数论、竞赛不等式
- Python 工具：`sympy_helpers`、`verify`、`problem_loader`、`latex_utils`
- 四个 Cursor Skills：逐步求解、竞赛证明、数值计算、几何可视化
- 头脑风暴模板：通用、不等式、数论、组合

## [0.1.0] - 2025-06-27

### Added

- 项目初始化（README）

[Unreleased]: https://github.com/Max-YJ/MathAI/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/Max-YJ/MathAI/releases/tag/v0.1.0
