# 极限与连续

## 定义（内涵）

**极限** $\lim_{x \to a} f(x) = L$：当 $x$ 无限接近 $a$（不必等于 $a$）时，$f(x)$ 无限接近 $L$。

**连续**：$f$ 在 $a$ 连续 ⟺ $\lim_{x\to a} f(x) = f(a)$。

## 外延（适用与边界）

- 单侧极限：$\lim_{x\to a^+}$、$\lim_{x\to a^-}$ 需分别存在且相等
- 无穷极限：$x\to\infty$ 时看最高阶项
- 不适用于：振荡无极限（如 $\sin\frac{1}{x}$ 在 $0$）、洛必达前提不满足

## 未定式与对策

| 型 | 常用法 |
|----|--------|
| $\frac{0}{0}$ | 因式分解、有理化、洛必达、等价无穷小 |
| $\frac{\infty}{\infty}$ | 抓最高阶、洛必达 |
| $\infty - \infty$ | 通分、有理化化为分式 |
| $0 \cdot \infty$ | 化为分式 |
| $1^\infty, 0^0, \infty^0$ | 取对数化为 $0\cdot\infty$ |

## 洛必达法则

若 $\lim \frac{f(x)}{g(x)}$ 为 $\frac{0}{0}$ 或 $\frac{\infty}{\infty}$，且 $f',g'$ 存在，则：

$$\lim \frac{f}{g} = \lim \frac{f'}{g'}$$

（右端极限存在或为 $\infty$ 时成立。）

## 等价无穷小（$x\to 0$）

$$\sin x \sim x,\quad \tan x \sim x,\quad e^x - 1 \sim x,\quad \ln(1+x) \sim x$$
$$1 - \cos x \sim \frac{x^2}{2},\quad (1+x)^\alpha - 1 \sim \alpha x$$

## 例题

- [洛必达极限](../../problems/calculus/limit-lhopital.yaml)

## 校验

```bash
python3 -m tools.calculus_verify limit --expr "(exp(x)-1)/x" --point 0 --claimed 1
```
