# 微积分基本定理 (FTC)

## 第一定理（内涵）

若 $f$ 在 $[a,b]$ 连续，$F(x) = \int_a^x f(t)\,dt$，则 $F'(x) = f(x)$。

**思想**：积分上限函数求导 = 被积函数在上限处的值。

## 第二定理（外延）

若 $F' = f$ 且 $f$ 连续，则：

$$\int_a^b f(x)\,dx = F(b) - F(a)$$

**思想**：定积分 = 任意一个反导数在两端的差。这是 **连接导数与积分的桥梁**。

## 变限积分求导

$$\frac{d}{dx}\int_{g(x)}^{h(x)} f(t)\,dt = f(h(x))h'(x) - f(g(x))g'(x)$$

## 应用提示

- 见到 $\int_a^x f(t)dt$ 对 $x$ 求导 → 直接写 $f(x)$
- 定积分先求反导数 $F$，再算 $F(b)-F(a)$，不必每次都画面积

## 校验

```bash
python3 -m tools.calculus_verify definite --expr "x**2" --a 0 --b 2 --claimed "8/3"
```

## 相关

- [积分技巧](integration-techniques.md)
- [公式速查](formula-reference.md)
