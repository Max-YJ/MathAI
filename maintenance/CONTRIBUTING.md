# 贡献指南

感谢你对 MathAI 的关注！以下是参与贡献的说明。

## 贡献类型

1. **题目** — 在 `problems/` 对应领域添加 YAML 题目
2. **知识** — 在 `knowledge/` 添加或完善概念条目
3. **工具** — 改进 `tools/` 中的 Python 脚本
4. **Skills** — 新增或优化 Cursor Agent 工作流
5. **链接** — 在 `links/` 补充优质外部资源
6. **热点** — 更新 `hot-topics/` 当月榜单

## 题目贡献流程

1. Fork 本仓库
2. 复制 `problems/templates/problem-template.yaml`
3. 填写完整字段，放入合适子目录
4. 若有 `verification` 块，运行验证：
   ```bash
   pip install -r tools/requirements.txt
   python -m tools.verify --problem problems/your-file.yaml
   ```
5. 提交 PR，标题格式：`[problem] 简短描述`

## 代码规范

- Python：遵循 PEP 8，类型注解优先
- Markdown：中英文均可，数学用 LaTeX
- YAML：2 空格缩进，UTF-8 编码

## PR 检查清单

- [ ] 新题目有唯一 `id`
- [ ] 难度标注合理（1–5）
- [ ] 数学内容经过核对
- [ ] 不引入不必要的依赖
- [ ] 更新相关 README（若新增目录或重大功能）

## 行为准则

- 尊重他人，建设性讨论
- 引用他人成果请注明出处
- 不提交抄袭题目或侵权内容

## 问题反馈

通过 [GitHub Issues](https://github.com/Max-YJ/MathAI/issues) 报告 bug 或提出建议。
