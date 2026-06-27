# 头脑风暴

解题卡住时的思维框架与策略模板，帮助 LLM 与人类换角度思考。

## 使用场景

- 竞赛证明题无思路
- 代数变形陷入僵局
- 需要多种解法对比
- 探索开放性问题

## 模板索引

| 模板 | 适用题型 |
|------|----------|
| [general.md](templates/general.md) | 通用 brainstorming 流程 |
| [inequality.md](templates/inequality.md) | 不等式证明 |
| [number-theory.md](templates/number-theory.md) | 数论问题 |
| [combinatorics.md](templates/combinatorics.md) | 组合计数与存在性 |

## 与 Skills 配合

1. 主 Skill 执行常规流程（如 `olympiad-proof`）
2. 卡住时切换到头脑风暴模板
3. 从模板产出 2–3 条新思路后回到主 Skill 继续

## Polya 启发式（速查）

```
若卡住，依次自问：
- 能否画个图？
- 能否化简到更熟悉的问题？
- 能否先解特例 (n=1,2,3)？
- 能否反过来考虑？
- 能否引入辅助量/辅助线？
```

详见 `knowledge/problem-solving/strategies.md`。

## 贡献

欢迎提交新模板或经典题目的多种解法思路。
