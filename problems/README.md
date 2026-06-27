# 问题库

按数学领域与难度组织的题目集合，供 LLM 练习、评测与检索。

## 目录结构

```
problems/
├── elementary/      # 初等数学（算术、基础代数）
├── algebra/         # 代数（方程、不等式、多项式）
├── calculus/        # 微积分
├── geometry/        # 几何（平面、立体、解析）
├── linear-algebra/  # 线性代数
├── number-theory/   # 数论
├── combinatorics/   # 组合数学
├── probability/     # 概率与统计
├── olympiad/        # 竞赛题
└── templates/       # 题目模板
```

## 难度等级

| 等级 | 说明 | 示例 |
|------|------|------|
| 1 | 入门 — 单步运算或直接套用公式 | 解一元一次方程 |
| 2 | 基础 — 需要 2–3 步推理 | 因式分解、求导 |
| 3 | 中等 — 多步推理或跨知识点 | 三角恒等变换、积分换元 |
| 4 | 进阶 — 竞赛/考研难度 | IMO 预选、多元极值 |
| 5 | 研究级 — 开放问题或前沿课题 | 未解决猜想、论文级证明 |

## 题目格式

使用 YAML，参考 [`templates/problem-template.yaml`](templates/problem-template.yaml)。

```yaml
id: algebra-quadratic-001
title: 一元二次方程求根
difficulty: 2
tags: [algebra, quadratic, roots]
statement: |
  求方程 x² - 5x + 6 = 0 的所有实根。
hints:
  - 尝试因式分解
  - 或使用求根公式
solution:
  approach: factoring
  steps:
    - "x² - 5x + 6 = (x-2)(x-3) = 0"
    - "x = 2 或 x = 3"
  answer: "x ∈ {2, 3}"
verification:
  type: symbolic
  expression: "Eq(x**2 - 5*x + 6, 0)"
  expected_roots: [2, 3]
```

## 添加题目

1. 复制 `templates/problem-template.yaml` 到对应领域目录
2. 填写所有必填字段
3. 如有 `verification` 字段，运行 `python -m tools.verify --problem <path>` 验证
4. 提交 PR，参见 [`maintenance/CONTRIBUTING.md`](../maintenance/CONTRIBUTING.md)

## 按标签检索

```bash
# 列出所有代数题
grep -rl "tags:.*algebra" problems/

# 按难度筛选
grep -rl "difficulty: 3" problems/
```
