# 积分技巧

## 定义（内涵）

**不定积分** $\int f(x)\,dx = F(x) + C$ ⟺ $F'(x) = f(x)$。

**定积分** $\int_a^b f(x)\,dx$ 表示曲边梯形有向面积，由 FTC 计算。

## 第一类换元（凑微分）

$$\int f(g(x)) g'(x)\,dx = \int f(u)\,du \quad (u = g(x))$$

**思想**：把复杂被积函数「内层 + 内层导数」配对。

**定积分换元必换限**：$x=a \Rightarrow u=g(a)$，$x=b \Rightarrow u=g(b)$。

## 分部积分

$$\int u\,dv = uv - \int v\,du$$

**思想**：把难积的 $u$ 求导变简单，易积的 $dv$ 积分得 $v$。

**LIATE 选 $u$**：对数 → 反三角 → 代数 → 三角 → 指数。

## 有理函数积分

1. 假分式 → 多项式 + 真分式
2. 真分式 → 部分分式分解
3. 逐项积分

## 常见定积分技巧

- **对称区间**：奇函数 $\Rightarrow$ 0；偶函数 $\Rightarrow$ $2\int_0^a$
- **周期函数**：$\int_a^{a+T} f = \int_0^T f$

## 例题

- [分部积分](../../problems/calculus/integral-by-parts.yaml)
- [换元定积分](../../problems/calculus/definite-integral-substitution.yaml)

## 校验

```bash
python3 -m tools.calculus_verify integral --expr "x*exp(x)" --claimed "exp(x)*(x-1)"
python3 -m tools.calculus_verify definite --expr "2*x*exp(x**2)" --a 0 --b 1 --claimed "E-1"
```
