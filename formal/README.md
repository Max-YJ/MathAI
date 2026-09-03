# 形式化数学

本目录把 MathAI 的自然语言知识与可由 Lean kernel 检查的证明连接起来。

## 结构

```text
formal/
├── lean/                  # 独立 Lean 4 + mathlib 项目
│   ├── MathAI/
│   │   ├── Logic.lean    # 命题逻辑与集合推理
│   │   ├── Algebra.lean  # 代数案例
│   │   └── Calculus.lean # 微积分案例
│   ├── MathAI.lean
│   ├── lakefile.toml
│   └── lean-toolchain
└── examples/README.md     # 自然语言 / Lean / 中文解释三栏案例
```

## 安装 Lean

推荐使用 [elan](https://github.com/leanprover/elan)：

```bash
curl https://elan.lean-lang.org/elan-init.sh -sSf | sh -s -- -y
source "$HOME/.elan/env"
```

## 构建

```bash
cd formal/lean
lake update
lake exe cache get
lake build
```

也可在仓库根目录运行可信度检查：

```bash
python3 tools/verify_lean.py
```

该命令会拒绝包含 `sorry` / `admit` 的生产证明，并执行 `lake build`。

## 可信边界

Lean 能检查“证明是否由形式化前提推出”，但自然语言到形式命题的翻译仍需人工确认。详见：

- [`knowledge/formalization/lean-rigor.md`](../knowledge/formalization/lean-rigor.md)
- [`skills/lean-formalization/SKILL.md`](../skills/lean-formalization/SKILL.md)
