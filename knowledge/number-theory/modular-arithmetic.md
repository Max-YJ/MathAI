# 模运算与同余

## 定义

$a \equiv b \pmod{m}$ 当且仅当 $m \mid (a - b)$。

## 基本性质

- 若 $a \equiv b \pmod{m}$，$c \equiv d \pmod{m}$，则 $a+c \equiv b+d$，$ac \equiv bd \pmod{m}$
- 费马小定理：$p$ 为素数，$\gcd(a,p)=1$ 时 $a^{p-1} \equiv 1 \pmod{p}$
- 欧拉定理：$a^{\varphi(m)} \equiv 1 \pmod{m}$（$\gcd(a,m)=1$）

## 解题提示

1. 大数取模：每一步运算后及时 mod，防止溢出
2. 逆元：$\gcd(a,m)=1$ 时 $a^{-1}$ 存在，可用扩展欧几里得求
3. 中国剩余定理：解同余方程组

## 相关链接

- [欧几里得算法](euclidean-algorithm.md)
- [数论问题库](../../problems/number-theory/)
