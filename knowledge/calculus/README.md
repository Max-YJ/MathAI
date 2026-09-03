# 微积分知识库

面向 **AI 解微积分** 的结构化知识，与 `skills/calculus-solver/`、`tools/calculus_verify.py` 配套使用。

## 学习路径

```
极限与连续 → 导数（法则+应用）→ 积分（技巧+FTC）→ 综合策略
```

## 条目索引

| 文件 | 内容 | 优先级 |
|------|------|--------|
| [strategies.md](strategies.md) | **解题总策略** — 分类、选型、校验清单 | ⭐ 必读 |
| [limits-and-continuity.md](limits-and-continuity.md) | 极限、连续、洛必达 | 基础 |
| [derivatives.md](derivatives.md) | 求导法则、切线、极值 | 核心 |
| [integration-techniques.md](integration-techniques.md) | 换元、分部、有理函数 | 核心 |
| [chain-rule.md](chain-rule.md) | 链式法则（复合函数） | 核心 |
| [fundamental-theorem.md](fundamental-theorem.md) | 微积分基本定理（FTC） | 核心 |
| [formula-reference.md](formula-reference.md) | **拓展公式表** — 公式 + 思想 | 速查 |

## 与工具 / Skill 的关系

| 组件 | 作用 |
|------|------|
| `skills/calculus-solver/SKILL.md` | 强制逐步推导 + 每步 SymPy 校验 |
| `tools/calculus_verify.py` | 导数/积分/极限/步骤链自动化验证 |
| `problems/calculus/` | 带 `verification` 的经典案例 |
| `brainstorm/templates/calculus.md` | 卡住时的换思路模板 |

## AI 使用建议

1. 解题前 `@knowledge/calculus/strategies.md` 确定题型与方法
2. 执行中按需引用具体法则条目
3. **每一步** 用 `calculus_verify` 校验，不可跳过
4. 完成后对照策略文档中的「终检清单」
