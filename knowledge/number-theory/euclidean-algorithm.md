# 欧几里得算法 (Euclidean Algorithm)

## 定义

求两个整数 $a, b$（$a \geq b > 0$）的最大公约数：

$$\gcd(a, b) = \gcd(b, a \bmod b)$$

重复直到余数为 0，最后一个非零余数即为 $\gcd(a, b)$。

## 关键性质

- **Bézout 恒等式**：存在整数 $x, y$ 使得 $ax + by = \gcd(a, b)$
- **扩展欧几里得算法**可求出 $x, y$
- 时间复杂度：$O(\log \min(a, b))$

## 解题提示

1. 始终用大数除以小数，取余数递推
2. 注意 $\gcd(a, 0) = a$
3. 多个数的 GCD：$\gcd(a, b, c) = \gcd(\gcd(a, b), c)$

## 例题

- [欧几里得算法求 GCD](../../problems/number-theory/gcd-euclidean.yaml)

## 相关链接

- [模运算与同余](../number-theory/modular-arithmetic.md)
- [Python math.gcd](https://docs.python.org/3/library/math.html#math.gcd)
