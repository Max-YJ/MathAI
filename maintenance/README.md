# 维护管理

本仓库的治理、贡献流程与变更记录。

## 文档

| 文件 | 说明 |
|------|------|
| [CONTRIBUTING.md](CONTRIBUTING.md) | 贡献指南 |
| [CHANGELOG.md](CHANGELOG.md) | 版本变更日志 |
| [GOVERNANCE.md](GOVERNANCE.md) | 仓库治理规范 |

## 目录职责

| 目录 | 维护者关注点 |
|------|--------------|
| `problems/` | 题目格式、难度标注、验证脚本 |
| `knowledge/` | 数学准确性、引用链接 |
| `tools/` | 依赖版本、API 稳定性 |
| `skills/` | Skill 格式、与 Cursor 兼容 |
| `links/` | 链接有效性 |
| `hot-topics/` | 定期更新（建议每月） |

## Issue 标签建议

- `problem` — 新题目或题目修正
- `knowledge` — 知识库条目
- `tool` — 工具改进
- `skill` — Skill 新增/修改
- `link` — 外部资源
- `hot-topic` — 热点榜单
- `good first issue` — 适合新手

## 发布节奏

- **持续集成**：题目、知识、链接随时合并
- **热点榜单**：每月初更新 `hot-topics/`
- **版本标签**：重大结构变更时打 tag，记录于 CHANGELOG

## 质量检查

提交 PR 前建议：

```bash
pip install -r tools/requirements.txt
python -m tools.verify --problem problems/<your-problem>.yaml  # 如有 verification
python -m tools.problem_loader --tag <tag>  # 确认可被检索
```
