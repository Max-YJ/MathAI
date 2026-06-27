---
name: numerical-computation
description: 数值计算与编程验证工作流。适用于近似计算、数值积分、大规模枚举、无法用闭式解处理的问题。
---

# 数值计算 (Numerical Computation)

## 何时使用

- 需要小数近似值
- 无初等闭式解（如高次方程数值解）
- 验证猜想、搜索反例
- 蒙特卡洛、线性代数数值方法

## 工作流程

### 1. 明确精度需求

- 精确到几位小数？
- 绝对误差还是相对误差？
- 是否有符号解可先做对比？

### 2. 选择方法

| 问题类型 | 推荐方法 |
|----------|----------|
| 方程求根 | `sympy.nsolve`, `numpy.roots` |
| 定积分 | `scipy.integrate.quad`, Simpson |
| 线性方程组 | `numpy.linalg.solve` |
| 优化 | `scipy.optimize` |
| 大数运算 | `math`, `decimal`, 模运算 |

### 3. 编写可复现代码

- 使用 `tools/sympy_helpers.py` 或标准库
- 固定随机种子（若涉及随机）
- 输出中间值便于调试

### 4. 误差分析

- 与精确值对比（若有）
- 改变步长/精度观察稳定性
- 报告最终数值与置信度

## 输出格式

```markdown
## 方法
...

## 代码
```python
...
```

## 结果
...

## 误差分析
...
```

## 工具

```bash
pip install -r tools/requirements.txt
python -c "from tools.sympy_helpers import evaluate_numeric; print(...)"
```

## 示例

用牛顿法求 $\sqrt{2}$：迭代 $x_{n+1} = \frac{x_n + 2/x_n}{2}$，初值 $x_0=1$，收敛至 1.41421356...
