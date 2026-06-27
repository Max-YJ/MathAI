# 不等式头脑风暴模板

## 快速分类

- [ ] 代数不等式（AM-GM, CS, 配方）
- [ ] 几何不等式（三角形、距离）
- [ ] 数论不等式（整除、估值）
- [ ] 函数不等式（单调性、凸性、Jensen）

## 常用武器

| 工具 | 何时用 |
|------|--------|
| AM-GM | 和定/积定、正数 |
| Cauchy-Schwarz | 平方和、内积结构 |
| 配方 | 二次型、$(a-b)^2 \geq 0$ |
| Jensen | 凸函数、$\sum f(x_i)$ |
| 切线法 | 单变量，$f(x) \geq kx+b$ |
| Schur / Muirhead | 对称三元不等式 |
| 拉格朗日乘数 | 条件极值 |

##  brainstorming 清单

1. **猜等号条件**：令 $a=b=c$ 或 $a=1,b=1,c=1$ 等，猜何时取等
2. **齐次化**：能否设 $a+b+c=1$ 或 $abc=1$ 降维？
3. **代换**：$a=\tan A$？$x=\sin\theta$？
4. **反向**：若结论成立，能推出什么显然成立的不等式？
5. **特例**：$n=2$ 时能否直接证？能否归纳？

## 知识库

- `knowledge/algebra/am-gm-inequality.md`
- `problems/olympiad/imo-shortlist-inequality.yaml`

## 输出

选定方法后 → `olympiad-proof` Skill
