---
name: calculus-solver
description: 微积分严格求解工作流。强制逐步推导、每步 SymPy 校验、终检清单，确保步骤 100% 正确。适用于极限、导数、积分及应用题。
---

# 微积分严格求解 (Calculus Solver)

## 何时使用

- 任何微积分求解题（极限、导数、不定/定积分、极值、面积体积）
- 用户强调 **步骤正确性**、**可验证**
- 需要可审查的教学级解答

**不适用**：纯证明题 → 用 `olympiad-proof`；仅需数值近似 → 用 `numerical-computation`。

## 前置引用（必须）

开始解题前读取：
- `@knowledge/calculus/strategies.md` — 题型分类与校验流程
- 按需：`@knowledge/calculus/limits-and-continuity.md`、`derivatives.md`、`integration-techniques.md`、`formula-reference.md`

## 铁律

1. **无校验，不算解完** — 每一步必须 PASS `calculus_verify`
2. **校验 FAIL 禁止输出最终答案** — 回退修正该步
3. **不定积分必须写 $+C$**
4. **定积分换元必须换限**
5. **极值必须检查端点**

## 工作流程

### 阶段 0：审题

输出：
- 已知条件、求解目标
- 定义域 / 积分区间
- **题型标签**（limit / derivative / integral / definite / optimization / application）

### 阶段 1：选型

- 主策略 + 备选（引用 `knowledge/calculus/strategies.md` 第二节）
- 一句话说明为何选此法

### 阶段 2：逐步求解（核心）

**每一步必须包含以下 5 项**：

```markdown
### 步骤 k：[操作名称]

**操作**：写出具体数学变换（LaTeX）

**依据**：法则名称，如「链式法则」「分部积分 LIATE」

**中间结果**：$...$

**校验**：
- 命令：`python3 -m tools.calculus_verify <subcommand> ...`
- 结果：PASS / FAIL
- 若 FAIL：说明原因并修正，不得进入下一步
```

#### 校验命令对照表

| 步骤类型 | 命令 |
|----------|------|
| 求导 | `python3 -m tools.calculus_verify derivative --expr "..." --claimed "..."` |
| 积分（验证反导数） | `python3 -m tools.calculus_verify integral --expr "..." --claimed "..."` |
| 极限 | `python3 -m tools.calculus_verify limit --expr "..." --point 0 --claimed "..."` |
| 定积分 | `python3 -m tools.calculus_verify definite --expr "..." --a 0 --b 1 --claimed "..."` |
| 等价变形 | `python3 -m tools.calculus_verify steps --file steps.json` |

步骤链 JSON 格式：
```json
[
  {"before": "x**2 - 1", "after": "(x-1)*(x+1)", "rule": "difference of squares"},
  {"before": "(x-1)*(x+1)/(x-1)", "after": "x+1", "rule": "cancel factor, x!=1"}
]
```

### 阶段 3：终检（全部必做，逐项报告）

| # | 检查项 | 方法 | 结果 |
|---|--------|------|------|
| 1 | 符号终验 | SymPy 重算完整结果 | PASS/FAIL |
| 2 | 数值抽检 | `calculus_verify spot --expr ... --claimed ...` | PASS/FAIL |
| 3 | 边界条件 | 定义域、$+C$、积分限、端点 | OK/说明 |
| 4 | 语义检查 | 极大/极小、面积非负、单位 | OK/说明 |

**任一项 FAIL → 不得标记「解答完成」。**

### 阶段 4：输出答案

```markdown
## 答案
[最终 LaTeX 结果]

## 校验摘要
- 共 N 步，全部 PASS
- 终检 4/4 通过
- 参考案例：problems/calculus/xxx.yaml
```

## 输出格式（完整模板）

```markdown
## 题目理解
...

## 题型与策略
...

## 详细解答（含逐步校验）
### 步骤 1：...
**校验**：PASS

### 步骤 2：...
**校验**：PASS

## 终检清单
| 检查项 | 结果 |
|--------|------|
| ... | PASS |

## 答案
...

## 校验摘要
...
```

## 经典案例

| 考点 | 文件 |
|------|------|
| 链式法则 | `problems/calculus/derivative-chain-rule.yaml` |
| 洛必达 | `problems/calculus/limit-lhopital.yaml` |
| 分部积分 | `problems/calculus/integral-by-parts.yaml` |
| 换元定积分 | `problems/calculus/definite-integral-substitution.yaml` |
| 闭区间最值 | `problems/calculus/optimization-critical-points.yaml` |

## 卡住时

切换 `@brainstorm/templates/calculus.md` 换思路，然后回到本 Skill 继续。

## 工具

```bash
pip install -r tools/requirements.txt
python3 -m tools.calculus_verify derivative --expr "sin(x**2)" --claimed "2*x*cos(x**2)"
python3 -m tools.verify --problem problems/calculus/limit-lhopital.yaml
```
