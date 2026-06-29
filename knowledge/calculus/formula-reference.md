# 微积分拓展公式速查（含思想）

> 供 AI 速查与选型，详细推导见各专题条目。

## 极限

| 公式 | 思想 |
|------|------|
| $\lim_{x\to 0}\frac{\sin x}{x}=1$ | 圆扇形面积 → 弧与弦的比较 |
| $\lim_{n\to\infty}(1+\frac{1}{n})^n = e$ | 连续复利定义的自然常数 |
| 夹逼：$g\leq f\leq h$，$\lim g=\lim h=L$ | 放缩到已知极限 |

## 导数

| 公式 | 思想 |
|------|------|
| $(uv)'=u'v+uv'$ | 乘积的微小变化 = 两项交叉贡献 |
| $(f\circ g)'=f'(g)g'$ | 变化沿复合链逐层传递 |
| 隐函数：$F_x + F_y y'=0$ | 全微分为零 |
| $\frac{d}{dx}\int_a^x f = f(x)$ | FTC 第一定理 |

## 积分

| 公式 | 思想 |
|------|------|
| $\int x^n dx = \frac{x^{n+1}}{n+1}+C$ | 幂函数反导数指数升一 |
| $\int u\,dv = uv-\int v\,du$ | 交换微分与积分角色 |
| $\int f(g)g' = \int f(u)du$ | 换元 = 换坐标系 |
| $\int_a^b f = F(b)-F(a)$ | 累积 = 端点反导数差 |
| 偶函数：$\int_{-a}^a f = 2\int_0^a f$ | 对称性减半计算 |

## 级数（拓展）

| 公式 | 思想 |
|------|------|
| $\sum_{n=0}^\infty x^n = \frac{1}{1-x}$，$|x|<1$ | 几何级数收敛半径 |
| Taylor：$f(x)=\sum \frac{f^{(n)}(a)}{n!}(x-a)^n$ | 用多项式局部逼近 |

## 常用换元模板

| 被积函数含 | 换元 |
|------------|------|
| $\sqrt{a^2-x^2}$ | $x=a\sin\theta$ |
| $\sqrt{a^2+x^2}$ | $x=a\tan\theta$ |
| $\sqrt{x^2-a^2}$ | $x=a\sec\theta$ |
| $e^{ax}$ 与三角 | $u=e^{ax}$ 或 Euler 公式 |

## 相关

- [解题策略](strategies.md)
- [积分技巧](integration-techniques.md)
