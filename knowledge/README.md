# 数学知识库

结构化的数学概念、定理与解题套路，供 LLM 检索与引用。

## 目录

| 子目录 | 内容 |
|--------|------|
| [`algebra/`](algebra/) | 代数：方程、不等式、多项式 |
| [`calculus/`](calculus/) | 微积分：极限、导数、积分 |
| [`linear-algebra/`](linear-algebra/) | 线性代数：矩阵、特征值 |
| [`geometry/`](geometry/) | 几何：平面、立体、解析 |
| [`number-theory/`](number-theory/) | 数论：整除、同余、素数 |
| [`combinatorics/`](combinatorics/) | 组合：计数、图论基础 |
| [`probability/`](probability/) | 概率与统计 |
| [`problem-solving/`](problem-solving/) | 通用解题策略 |

## 条目格式

每个知识条目为 Markdown 文件，建议包含：

```markdown
# 标题

## 定义
...

## 关键性质 / 定理
...

## 常用公式
...

## 解题提示
...

## 相关链接
- [问题库](../problems/...)
- [外部资源](../links/...)
```

## 使用方式

在 Cursor 中解题时，可 `@` 引用相关知识文件，例如：

> 参考 @knowledge/calculus/chain-rule.md，求 $f(x)=\ln(\sin x)$ 的导数。

## 贡献

新增条目请遵循现有格式，确保包含定义、性质与至少一个例题引用。
