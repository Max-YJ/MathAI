# 链式法则 (Chain Rule)

## 定义

若 $y = f(u)$ 且 $u = g(x)$，则复合函数 $y = f(g(x))$ 的导数为：

$$\frac{dy}{dx} = \frac{dy}{du} \cdot \frac{du}{dx} = f'(g(x)) \cdot g'(x)$$

## 关键性质

- 可多层嵌套：$\frac{d}{dx}f(g(h(x))) = f'(g(h(x))) \cdot g'(h(x)) \cdot h'(x)$
- 与乘积法则、商法则独立，常组合使用

## 常用公式

| 外层 $f$ | 内层 $g(x)$ | 结果 |
|----------|-------------|------|
| $\sin u$ | $x^n$ | $nx^{n-1}\cos(x^n)$ |
| $e^u$ | $ax+b$ | $ae^{ax+b}$ |
| $\ln u$ | 多项式 | $\frac{g'(x)}{g(x)}$ |

## 解题提示

1. **识别复合结构**：找出"外层函数"和"内层函数"
2. **设中间变量**：令 $u = g(x)$，分别求 $\frac{dy}{du}$ 和 $\frac{du}{dx}$
3. **勿漏内层导数**：最常见错误是只求了外层导数

## 例题

- [复合函数求导](../../problems/calculus/derivative-chain-rule.yaml)

## 相关链接

- [微积分基本定理](fundamental-theorem.md)
- [求导工具](../../tools/sympy_helpers.py)
