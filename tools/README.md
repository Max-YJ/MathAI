# 通用工具

供 LLM 与人类解题时使用的 Python 工具集。

## 安装

```bash
pip install -r tools/requirements.txt
```

## 模块

| 文件 | 功能 |
|------|------|
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

### 验证题目

```bash
python -m tools.verify --problem problems/algebra/quadratic-roots.yaml
```

### 检索题目

```bash
python -m tools.problem_loader --tag algebra --difficulty 2
```

## 与 LLM 集成

在 Skill 或 prompt 中可指示 Agent：

> 使用 `tools/sympy_helpers.py` 进行符号计算，并用 `tools/verify.py` 验证最终结果。
