# 开源项目 (Projects)

## 符号计算

- [SymPy](https://github.com/sympy/sympy) — Python 符号数学库，本仓库 `tools/` 依赖
- [SageMath](https://github.com/sagemath/sage) — 开源数学软件系统
- [Mathematica / Wolfram Engine](https://www.wolfram.com/engine/) — 商业，有免费 Engine

## 形式化证明

- [Lean 4](https://github.com/leanprover/lean4) — 现代交互式定理证明器
- [mathlib4](https://github.com/leanprover-community/mathlib4) — Lean 数学库
- [Coq](https://github.com/coq/coq) — 经典证明助手
- [Isabelle](https://isabelle.in.tum.de/) — 高阶逻辑证明

## 数学 AI / 推理

- [Hendrycks MATH](https://github.com/hendrycks/math) — 数学推理数据集
- [LeanDojo](https://github.com/lean-dojo/LeanDojo) — Lean 定理证明 + LLM
- [AlphaGeometry](https://github.com/google-deepmind/alphageometry) — 几何定理证明
- [ToRA](https://github.com/microsoft/ToRA) — 工具集成推理 Agent
- [InternLM-Math](https://github.com/InternLM/InternLM-Math) — 数学专用大模型

## 可视化

- [Manim](https://github.com/ManimCommunity/manim) — 数学动画（3Blue1Brown）
- [GeoGebra](https://www.geogebra.org/) — 动态几何
- [Desmos](https://www.desmos.com/) — 在线图形计算器

## 与本仓库关系

| 项目 | 集成方式 |
|------|----------|
| SymPy | `tools/sympy_helpers.py` |
| MATH dataset | 可参考格式扩展 `problems/` |
| LeanDojo | 未来可对接形式化验证 |
