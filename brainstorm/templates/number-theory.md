# 数论头脑风暴模板

## 快速分类

- [ ] 整除 / GCD / LCM
- [ ] 同余 / 模运算
- [ ] 素数 / 因式分解
- [ ] 丢番图方程
- [ ] 估值 / 大小估计

## 常用武器

| 工具 | 说明 |
|------|------|
| 模运算 | 按质因数或合数模分类讨论 |
| 费马小定理 / 欧拉定理 | 降幂 |
| 中国剩余定理 | 同余方程组 |
| 无穷递降 | 反证，构造更小解 |
| LTE 引理 | $v_p(a^n \pm b^n)$ |
| 二次剩余 | Legendre 符号 |

## brainstorming 清单

1. **模谁？** 尝试 mod 2, 3, 4, 5, 7, 8, 9, 11...
2. **parity**：奇偶性能排除哪些情况？
3. **因式分解**：$a^n - b^n$ 的结构？
4. **边界**：$n$ 很小时直接算
5. **编程验证**：小范围搜索反例或规律

## 工具

```bash
python -c "import math; print(math.gcd(1071, 462))"
python -m tools.verify --problem problems/number-theory/gcd-euclidean.yaml
```

## 知识库

- `knowledge/number-theory/euclidean-algorithm.md`
- `knowledge/number-theory/modular-arithmetic.md`
