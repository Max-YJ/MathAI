# 数学数据集

用于评测、微调或参考题目格式的公开数据集。

## 推理评测

| 数据集 | 规模 | 难度 | 链接 |
|--------|------|------|------|
| GSM8K | 8.5K | 小学应用题 | [GitHub](https://github.com/openai/grade-school-math) |
| MATH | 12.5K | 竞赛级 | [GitHub](https://github.com/hendrycks/math) |
| SVAMP | 1K | 小学变体 | [GitHub](https://github.com/arkilpatel/SVAMP) |
| ASDiv | 2.3K | 多样应用题 | [GitHub](https://github.com/chaochun/nlu-asdiv-dataset) |

## 形式化证明

| 数据集 | 说明 | 链接 |
|--------|------|------|
| miniF2F | Lean/Metamath 证明题 | [GitHub](https://github.com/openai/miniF2F) |
| ProofNet | 本科数学证明 | [GitHub](https://github.com/zhangir-azerbayev/ProofNet) |

## 中文

| 数据集 | 说明 |
|--------|------|
| CMATH | 中文小学数学 |
| AGIEval | 含中文数学推理子集 |
| C-Eval | 含数学相关学科 |

（具体链接请检索最新版本，仓库活跃更新中。）

## 导入本仓库

将外部题目转为 MathAI YAML 格式：

1. 保留原题 `source` 字段注明出处
2. 补充 `difficulty` 与 `tags`
3. 尽量添加 `verification` 便于自动检验

未来计划提供 `tools/import_math_dataset.py` 批量转换脚本。

## 相关

- `links/papers.md` — 数据集对应论文
- `problems/templates/problem-template.yaml` — 目标格式
