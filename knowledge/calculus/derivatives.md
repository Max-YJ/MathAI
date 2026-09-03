# 导数

## 定义（内涵）

$$f'(x) = \lim_{h\to 0} \frac{f(x+h) - f(x)}{h}$$

几何意义：切线斜率。物理意义：瞬时变化率。

## 基本公式

| $f(x)$ | $f'(x)$ |
|--------|---------|
| $x^n$ | $nx^{n-1}$ |
| $e^x$ | $e^x$ |
| $a^x$ | $a^x \ln a$ |
| $\ln x$ | $\frac{1}{x}$ |
| $\log_a x$ | $\frac{1}{x\ln a}$ |
| $\sin x$ | $\cos x$ |
| $\cos x$ | $-\sin x$ |
| $\tan x$ | $\sec^2 x$ |

## 运算法则

- **常数倍**：$(cf)' = cf'$
- **和差**：$(f \pm g)' = f' \pm g'$
- **乘积**：$(fg)' = f'g + fg'$
- **商**：$\left(\frac{f}{g}\right)' = \frac{f'g - fg'}{g^2}$
- **链式**：见 [chain-rule.md](chain-rule.md)

## 高阶导数

$$f''(x) \quad \text{用于判别极值：} \quad f''(x_0)>0 \Rightarrow \text{极小}; \quad f''(x_0)<0 \Rightarrow \text{极大}$$

## 应用：求极值步骤

1. 求 $f'(x)=0$ 的驻点及不可导点
2. 二阶导或一阶导符号变化判别
3. **不可省略**：检查区间端点（闭区间最值）
4. 写出极大/极小值

## 例题

- [复合函数求导](../../problems/calculus/derivative-chain-rule.yaml)
- [求极值](../../problems/calculus/optimization-critical-points.yaml)

## 校验

```bash
python3 -m tools.calculus_verify derivative --expr "sin(x**2+1)" --claimed "2*x*cos(x**2+1)"
```
