# 算术-几何平均不等式 (AM-GM)

## 定义

对非负实数 $a_1, a_2, \ldots, a_n$：

$$\frac{a_1 + a_2 + \cdots + a_n}{n} \geq \sqrt[n]{a_1 a_2 \cdots a_n}$$

等号成立当且仅当 $a_1 = a_2 = \cdots = a_n$。

## 二元情形

$$\frac{a + b}{2} \geq \sqrt{ab}, \quad a, b \geq 0$$

## 解题提示

1. **和定求积最大 / 积定求和最小**：AM-GM 的经典应用场景
2. **配凑等号条件**：设法让各项相等时取等
3. **与 Cauchy-Schwarz 的关系**：AM-GM 可视为 CS 的特例

## 常用变形

- $a + \frac{k}{a} \geq 2\sqrt{k}$（$a > 0$）
- $a^2 + b^2 \geq 2ab$
- 加权 AM-GM：$\lambda_1 a_1 + \cdots + \lambda_n a_n \geq a_1^{\lambda_1}\cdots a_n^{\lambda_n}$（$\sum\lambda_i=1$）

## 例题

- [AM-GM 不等式应用](../../problems/olympiad/imo-shortlist-inequality.yaml)

## 相关链接

- [Cauchy-Schwarz 不等式](cauchy-schwarz.md)
- [竞赛不等式专题](../../links/algorithms.md)
