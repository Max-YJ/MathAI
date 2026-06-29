# 通用工具

供 LLM 与人类解题时使用的 Python 工具集。

## 安装

```bash
pip install -r tools/requirements.txt
```

## 模块

| 文件 | 功能 |
|------|------|
| [`calculus_verify.py`](calculus_verify.py) | **微积分严格校验** — 导数/积分/极限/定积分/步骤链 |
| [`sympy_helpers.py`](sympy_helpers.py) | SymPy 符号计算封装 |
| [`latex_utils.py`](latex_utils.py) | LaTeX 与 SymPy 互转 |
| [`verify.py`](verify.py) | 根据题目 YAML 自动验证答案 |
| [`problem_loader.py`](problem_loader.py) | 加载与检索问题库 |

## 使用示例

### 符号求导

```python
from tools.sympy_helpers import differentiate, solve_equation

print(differentiate("sin(x**2 + 1)", "x"))
print(solve_equation("x**2 - 5*x + 6", "x"))
```

### 微积分逐步校验

```bash
python3 -m tools.calculus_verify derivative --expr "sin(x**2)" --claimed "2*x*cos(x**2)"
python3 -m tools.calculus_verify integral --expr "x*exp(x)" --claimed "exp(x)*(x-1)"
python3 -m tools.calculus_verify limit --expr "(exp(x)-1)/x" --point 0 --claimed 1
python3 -m tools.calculus_verify definite --expr "x**2" --a 0 --b 1 --claimed "1/3"
```

### 验证题目

```bash
python3 -m tools.verify --problem problems/calculus/limit-lhopital.yaml
```

### 检索题目

```bash
python -m tools.problem_loader --tag algebra --difficulty 2
```

## 与 LLM 集成

在 Skill 或 prompt 中可指示 Agent：

> 使用 `tools/sympy_helpers.py` 进行符号计算，并用 `tools/verify.py` 验证最终结果。
