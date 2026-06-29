# 微积分解题总策略（AI 专用）

> 本文是 `skills/calculus-solver` 的知识基础。核心原则：**无验证，不算解完。**

## 一、基本思路

微积分的本质是 **局部线性逼近（导数）** 与 **累积求和（积分）** 的互逆关系。

| 问题类型 | 核心思想 | 关键问题 |
|----------|----------|----------|
| 极限 | 趋势、无穷小比较 | 分子分母阶次？可用洛必达？ |
| 导数 | 瞬时变化率 | 复合/乘积/商？隐函数？ |
| 积分 | 反导数 / 面积累积 | 哪类被积函数？换元还是分部？ |
| 应用 | 建模 → 求极值/面积/体积 | 约束条件？定义域？ |

## 二、题型分类与常用策略

### 2.1 极限

| 策略 | 适用信号 | 注意 |
|------|----------|------|
| 代入（连续点） | 分母 ≠ 0，无 $\infty$ | 先直接代入 |
| 因式分解 / 有理化 | $\frac{0}{0}$ 型，多项式或有根式 | 化简后再求极限 |
| 等价无穷小 | $x \to 0$，三角/指数 | $\sin x \sim x$，$e^x-1 \sim x$ |
| 洛必达 | $\frac{0}{0}$ 或 $\frac{\infty}{\infty}$，可导 | 求导后极限需存在或为 $\infty$ |
| 夹逼 | 放缩明显 | 左右极限一致 |

### 2.2 导数

| 策略 | 适用信号 |
|------|----------|
| 基本公式 | 幂、指数、三角、对数 |
| 链式法则 | 复合结构 $f(g(x))$ |
| 乘积法则 | 两项相乘 |
| 商法则 | 分式 |
| 隐函数求导 | $F(x,y)=0$ |
| 对数求导 | $y = f(x)^{g(x)}$ 或多因子乘积 |
| 参数方程 | $x=x(t), y=y(t)$ → $\frac{dy}{dx}=\frac{dy/dt}{dx/dt}$ |

### 2.3 积分

| 策略 | 适用信号 |
|------|----------|
| 直接公式 | 基本初等函数 |
| 第一类换元 | 有 $f(g(x))g'(x)$ 结构 |
| 第二类换元 | 根式 $\sqrt{a^2-x^2}$、$\sqrt{x^2+a^2}$ |
| 分部积分 | $\int u\,dv$，$u$ 求导简化 |
| 部分分式 | 有理函数分母可因式分解 |
| 对称 / 周期性 | 定积分区间对称 |

**分部积分选型口诀（LIATE）**：Log → Inverse trig → Algebraic → Trig → Exponential，优先令 $u$ 为靠前类型。

### 2.4 应用题

| 类型 | 步骤骨架 |
|------|----------|
| 极值 | 建模 → $f'(x)=0$ → 驻点 + 端点 → 比较 |
| 面积 | 画图 → 上下边界 → $\int_a^b |f-g|$ |
| 体积 | 旋转体：圆盘 / 壳层 |
| 相关变化率 | 列方程 → 对 $t$ 隐函数求导 |

## 三、严格解题步骤（标准流程）

```
阶段 0 审题
  ├─ 写出已知、目标、定义域
  └─ 判定题型（极限/导/积/应用）

阶段 1 选型
  ├─ 从第二节选主策略 + 备选
  └─ 说明理由（一句话）

阶段 2 逐步求解（核心）
  对每一步 i：
  ├─ 操作：写清数学变换
  ├─ 依据：法则名称（如「链式法则」）
  ├─ 中间结果
  └─ ✅ 校验：calculus_verify 该步（见下节）

阶段 3 终检（全部必做）
  ├─ 符号校验：SymPy 重算最终结果
  ├─ 数值抽检：随机 2–3 点代入原式与结果
  ├─ 边界：定义域、积分常数 $+C$、定积分上下限
  └─ 语义：答案是否符合题意（极大还是极小？面积非负？）
```

## 四、逐步校验方法（确保 100% 正确）

### 4.1 导数步校验

对声称 $\frac{d}{dx}f(x) = g(x)$：

```bash
python3 -m tools.calculus_verify derivative --expr "f(x)" --claimed "g(x)"
```

原理：计算 $\frac{d}{dx}f(x) - g(x)$，化简为 0 则通过。

### 4.2 积分步校验

对声称 $\int f(x)\,dx = F(x) + C$：

```bash
python3 -m tools.calculus_verify integral --expr "f(x)" --claimed "F(x)"
```

原理：验证 $\frac{d}{dx}F(x) = f(x)$。

### 4.3 极限校验

```bash
python3 -m tools.calculus_verify limit --expr "f(x)" --point 0 --claimed 1
```

### 4.4 定积分数值校验

```bash
python3 -m tools.calculus_verify definite --expr "x**2" --a 0 --b 1 --claimed "1/3"
```

### 4.5 步骤链校验

将每步的「变换前」「变换后」录入 YAML 或命令行，工具逐段验证等价性。

**铁律**：任一步校验 FAIL → 停止输出最终答案，回退修正该步。

## 五、拓展公式及其思想

详见 [formula-reference.md](formula-reference.md)。核心思想摘要：

| 公式 | 思想 |
|------|------|
| $(x^n)' = nx^{n-1}$ | 幂函数的变化率指数降一 |
| FTC: $\int_a^b f = F(b)-F(a)$ | 累积 = 反导数之差 |
| 分部: $\int u\,dv = uv - \int v\,du$ | 交换求导与积分的角色 |
| 换元: $\int f(g(x))g'(x)dx = \int f(u)du$ | 换坐标简化被积函数 |

## 六、经典案例索引

| 题目 | 考点 | 文件 |
|------|------|------|
| 复合函数求导 | 链式法则 | `problems/calculus/derivative-chain-rule.yaml` |
| 洛必达极限 | $\frac{0}{0}$ | `problems/calculus/limit-lhopital.yaml` |
| 分部积分 | LIATE | `problems/calculus/integral-by-parts.yaml` |
| 换元定积分 | 第一类换元 | `problems/calculus/definite-integral-substitution.yaml` |
| 求极值 | 驻点 + 二阶导 | `problems/calculus/optimization-critical-points.yaml` |

## 七、常见错误清单

- [ ] 链式法则漏乘内层导数
- [ ] 不定积分漏写 $+C$
- [ ] 分部积分 $u,v$ 选反
- [ ] 洛必达用于非未定式
- [ ] 定积分换元未换限
- [ ] 极值未检验端点
- [ ] 忽略定义域（如 $\ln x$ 要求 $x>0$）

## 相关

- Skill: `skills/calculus-solver/SKILL.md`
- 工具: `tools/calculus_verify.py`
- 头脑风暴: `brainstorm/templates/calculus.md`
