import { useEffect, useMemo, type CSSProperties, type ReactNode } from "react";
import {
  Button,
  Callout,
  Card,
  CardBody,
  CardHeader,
  Code,
  CollapsibleSection,
  Divider,
  Grid,
  H1,
  H2,
  H3,
  Pill,
  Row,
  Spacer,
  Stack,
  Stat,
  Table,
  Text,
  useCanvasState,
  useHostTheme,
} from "cursor/canvas";

// ─── Types & domain data ─────────────────────────────────────────────────────

type DomainId =
  | "algebra"
  | "number"
  | "geometry"
  | "combinatorics"
  | "analysis"
  | "logic";

type Knowledge = { id: string; label: string; detail: string };

type DomainLesson = {
  id: DomainId;
  label: string;
  goal: string;
  strategy: string;
  knowledge: Knowledge[];
  steps: string[];
  verification: string;
  takeaway: string;
  compare: { knowledge: string; logic: string; verify: string };
};

const PIPELINE = [
  "读题",
  "检索知识",
  "选推理策略",
  "逐步推导",
  "校验",
] as const;

const DOMAINS: DomainLesson[] = [
  {
    id: "algebra",
    label: "代数",
    goal: "证明恒等式 (a+b)² = a² + 2ab + b²",
    strategy: "展开定义 + 分配律（代数恒等变换）",
    knowledge: [
      { id: "K1", label: "平方定义", detail: "x² ≔ x·x" },
      { id: "K2", label: "分配律", detail: "x(y+z) = xy + xz" },
      { id: "K3", label: "交换律", detail: "xy = yx（乘法）" },
    ],
    steps: [
      "读题：需证对任意 a、b，左边展开后等于右边。",
      "检索知识：平方定义、分配律、交换/结合律。",
      "选策略：从左边按定义展开，只用环公理推到右边。",
      "推导：(a+b)² = (a+b)(a+b)",
      "推导：= a(a+b) + b(a+b)（分配律）",
      "推导：= a² + ab + ba + b²",
      "推导：= a² + ab + ab + b²（交换律 ba=ab）",
      "推导：= a² + 2ab + b²",
      "校验：两边在 a=1,b=1 时均为 4；符号结构与公式一致。",
    ],
    verification: "特值抽检 + 每步可逆/可引用公理；无未声明恒等替换。",
    takeaway: "代数证明的核心是把「看起来像公式」还原成「可引用的运算律链」。",
    compare: {
      knowledge: "平方定义、分配律、交换律",
      logic: "展开与合并同类项",
      verify: "特值 + 公理链完整",
    },
  },
  {
    id: "number",
    label: "数论",
    goal: "证明：奇数的平方仍是奇数",
    strategy: "奇偶的代数表示（任意奇数为 2k+1）",
    knowledge: [
      { id: "K1", label: "奇数形式", detail: "n 奇 ⇔ ∃k∈ℤ, n=2k+1" },
      { id: "K2", label: "偶数形式", detail: "m 偶 ⇔ ∃t∈ℤ, m=2t" },
      { id: "K3", label: "封闭性", detail: "偶数+偶数=偶数；偶·任意=偶" },
    ],
    steps: [
      "读题：对任意奇数 n，证明 n² 为奇数。",
      "检索知识：奇数可写成 2k+1；偶数可写成 2t。",
      "选策略：参数化代入，再判断奇偶。",
      "推导：设 n = 2k + 1（k∈ℤ）。",
      "推导：n² = (2k+1)² = 4k² + 4k + 1",
      "推导：= 2(2k² + 2k) + 1",
      "推导：令 t = 2k² + 2k，则 n² = 2t + 1，故为奇数。",
      "校验：k=0→1²=1；k=1→3²=9；形式恒为 2t+1。",
    ],
    verification: "结论依赖的是「存在整数 t」，与具体 k 无关；特值与通式一致。",
    takeaway: "数论里先把对象写成标准形，再做运算，奇偶性往往自动显现。",
    compare: {
      knowledge: "奇数=2k+1 标准形",
      logic: "代入展开再归类",
      verify: "通式 + 特值",
    },
  },
  {
    id: "geometry",
    label: "几何",
    goal: "证明：等腰三角形两底角相等（∠B = ∠C）",
    strategy: "作顶角平分线 + 全等三角形（SAS）",
    knowledge: [
      { id: "K1", label: "等腰定义", detail: "AB = AC（顶 A，底 BC）" },
      { id: "K2", label: "角平分线", detail: "把 ∠A 分成两个相等角" },
      { id: "K3", label: "SAS", detail: "两边及其夹角对应相等 ⇒ 全等" },
    ],
    steps: [
      "读题：已知 △ABC 中 AB=AC，求证 ∠ABC = ∠ACB。",
      "检索知识：等腰定义、角平分线、全等判定 SAS。",
      "选策略：作 ∠A 的平分线交 BC 于 D，证两小三角形全等。",
      "推导：作 AD 平分 ∠BAC，则 ∠BAD = ∠CAD。",
      "推导：AB = AC（已知），AD 公共边。",
      "推导：△ABD 与 △ACD 有 AB=AC，∠BAD=∠CAD，AD=AD ⇒ SAS 全等。",
      "推导：全等 ⇒ 对应角 ∠ABD = ∠ACD，即两底角相等。",
      "校验：图形对称；若底角不等则破坏 AB=AC（反证直觉）。",
    ],
    verification: "全等对应关系与顶点对应一致；未混用「边角边」以外的未证命题。",
    takeaway: "几何证明常把「对称性」翻译成「构造辅助线 + 全等」。",
    compare: {
      knowledge: "等腰、角平分、SAS",
      logic: "构造辅助线证全等",
      verify: "对应边角一一匹配",
    },
  },
  {
    id: "combinatorics",
    label: "组合",
    goal: "理解并应用鸽笼原理：n+1 物入 n 笼 ⇒ 某笼至少 2 物",
    strategy: "反证法（假设每笼至多 1，导出矛盾）",
    knowledge: [
      { id: "K1", label: "鸽笼原理", detail: "n+1→n 必有一笼 ≥2" },
      { id: "K2", label: "反证法", detail: "否定结论 ⇒ 矛盾 ⇒ 结论真" },
      { id: "K3", label: "计数上界", detail: "每笼≤1 ⇒ 总数≤n" },
    ],
    steps: [
      "读题：把 n+1 个物体放入 n 个笼子，证明至少一笼有 ≥2 个。",
      "检索知识：鸽笼原理陈述；反证法框架。",
      "选策略：反证——假设每笼至多 1 个物体。",
      "推导：假设 ∀ 笼，物体数 ≤ 1。",
      "推导：则总数 ≤ 1+1+…+1（n 次）= n。",
      "推导：但实际总数 = n+1 > n，矛盾。",
      "推导：故假设不成立，必有一笼 ≥ 2。",
      "校验：n=2 时 3 物 2 笼，枚举必有一笼 ≥2。",
    ],
    verification: "矛盾来自严格不等式；边界 n 物体 n 笼时结论可假（恰每笼 1）。",
    takeaway: "组合原理常靠「上界/下界」与反证把不可能情形排除掉。",
    compare: {
      knowledge: "鸽笼、计数上界",
      logic: "反证法",
      verify: "小 n 枚举 + 边界反例意识",
    },
  },
  {
    id: "analysis",
    label: "分析",
    goal: "证明经典极限 lim_{x→0} sin x / x = 1",
    strategy: "几何估计 + 夹逼定理 + 左右极限",
    knowledge: [
      {
        id: "K1",
        label: "单位圆估计",
        detail: "0<x<π/2 时 sin x < x < tan x",
      },
      { id: "K2", label: "夹逼定理", detail: "g≤f≤h 且两端同极限 ⇒ f 同极限" },
      { id: "K3", label: "偶函数", detail: "sin(-x)/(-x)=sin x/x，左右极限相同" },
    ],
    steps: [
      "读题：x=0 时表达式无定义，目标是确定邻域中的趋势。",
      "检索知识：单位圆面积比较、夹逼定理、cos x 在 0 处连续。",
      "选策略：先证右极限，再利用偶性得到左极限。",
      "推导：当 0<x<π/2，单位圆几何给出 sin x < x < tan x。",
      "推导：各项除以正数 sin x，得 1 < x/sin x < 1/cos x。",
      "推导：各项均为正数，取倒数并反向不等号：cos x < sin x/x < 1。",
      "推导：x→0⁺ 时 cos x→1，夹逼得 sin x/x→1。",
      "推导：sin(-x)/(-x)=sin x/x，函数为偶函数，故左极限同为 1。",
      "校验：左右极限一致；除法步骤只在 sin x>0 的区间内进行。",
    ],
    verification: "夹逼上下界同趋于 1；正值、倒数反向和左右极限三个边界条件均已检查。",
    takeaway: "分析中的典型路径是：先建立局部估计，再用极限定理把不等式传到结论。",
    compare: {
      knowledge: "圆几何估计、夹逼定理、偶性",
      logic: "局部不等式 → 右极限 → 双侧极限",
      verify: "符号条件 + 左右极限",
    },
  },
  {
    id: "logic",
    label: "逻辑",
    goal: "用反证法证明 √2 不是有理数",
    strategy: "否定结论 + 最简分数 + 奇偶矛盾",
    knowledge: [
      { id: "K1", label: "反证法", detail: "假设结论的否定，推出 ⊥" },
      { id: "K2", label: "最简分数", detail: "有理数可写成 gcd(p,q)=1 的 p/q" },
      { id: "K3", label: "偶数平方", detail: "n² 为偶数 ⇒ n 为偶数" },
    ],
    steps: [
      "读题：目标是 ¬(√2∈ℚ)，适合假设其否定并寻找矛盾。",
      "检索知识：最简分数表示、整除、平方的奇偶性。",
      "选策略：反证法；假设 √2=p/q，且 p、q 互素、q≠0。",
      "推导：两边平方并整理，得 p²=2q²，所以 p² 为偶数。",
      "推导：由“平方偶则本身偶”，存在整数 k 使 p=2k。",
      "推导：代回得 4k²=2q²，即 q²=2k²，所以 q 也为偶数。",
      "推导：于是 2 同时整除 p、q，与 gcd(p,q)=1 矛盾。",
      "推导：原假设为假，故 √2 不是有理数。",
      "校验：矛盾依赖“最简分数”前提；若不先约分，p、q 同偶不构成矛盾。",
    ],
    verification: "否定目标、最简表示、奇偶引理和最终矛盾完整闭合，没有循环使用待证结论。",
    takeaway: "反证法的关键不只是“出现矛盾”，而是矛盾必须来自否定目标与已知定理的严格合取。",
    compare: {
      knowledge: "反证法、最简分数、奇偶性",
      logic: "否定目标 → 双偶 → 互素矛盾",
      verify: "追踪矛盾依赖的全部前提",
    },
  },
];

const DOMAIN_IDS = DOMAINS.map((d) => d.id);

// ─── 数学领域 AI 进展（独立模块，不并入推导范例） ───────────────────────────

type ProgressDetail = { title: string; lines: string[] };

type ProgressField = {
  id: DomainId;
  label: string;
  humanPast: string;
  humanNow: string;
  aiPast: string;
  aiNow: string;
  future: string;
  details: ProgressDetail[];
};

const LADDER = [
  { name: "竞赛", note: "IMO / Putnam", mark: "主成绩" },
  { name: "本科教材", note: "课本级形式化", mark: "进行中" },
  { name: "研究问题", note: "个别命题", mark: "零星" },
  { name: "千禧问题", note: "黎曼、BSD 等", mark: "未解" },
] as const;

const PROGRESS_FIELDS: ProgressField[] = [
  {
    id: "algebra",
    label: "代数",
    humanPast:
      "伽罗瓦用群解释方程何时可解；希尔伯特推动公理化与不变量；格罗滕迪克用概形把代数几何重写一遍。",
    humanNow:
      "有限单群分类是二十世纪完成的大型分类工程。Mathlib 已覆盖大量本科到研究生代数，研究前沿仍靠论文与专家。",
    aiPast:
      "2024 年 AlphaProof 在 Lean 里解出 IMO 代数题，其中包括当年最难、公开材料中对应 P6、仅少数选手做出的一题。",
    aiNow:
      "2025 年 Seed-Prover 与 Aristotle 等到金牌级形式证明。交换代数方面，Anderson 2014 猜想有自动解决并给出 Lean 证明的公开报道（Rethlas / Archon 路线）。",
    future:
      "竞赛代数会更稳。研究级交换代数与代数几何仍受库覆盖和陈述对齐限制，近期更像辅助补洞，而不是替代专家。",
    details: [
      {
        title: "AlphaProof 与 2025 年 11 月 Nature 论文",
        lines: [
          "2024 年 7 月，DeepMind 公布 AlphaProof 与 AlphaGeometry 2：IMO 2024 解出 4/6，约 28/42，达到银牌线。",
          "代数与数论题由 AlphaProof 处理；几何另算。两道组合当时未解。2025 年 11 月 Nature 论文发表的是这套结果，不是新的满分。",
        ],
      },
      {
        title: "Anderson 2014 猜想",
        lines: [
          "公开工作报告该交换代数猜想被自动解决，并在 Lean 中检查。应把它看成「陈述可形式化的研究级个例」。",
          "核对时要看证明的是哪一版陈述，以及用了哪些库引理，不能直接写成整个交换代数被解决。",
        ],
      },
    ],
  },
  {
    id: "number",
    label: "数论",
    humanPast: "欧几里得的算术、高斯的二次互反、怀尔斯证明费马大定理，是这条线的三个里程碑。",
    humanNow:
      "Green–Tao 证明素数中有任意长等差数列。仍开放的包括黎曼猜想、BSD、哥德巴赫与孪生素数。",
    aiPast:
      "2024 年 AlphaProof 解出 IMO 中的数论题，与代数、几何一起构成 4/6。组合题当时未进入这个分数。",
    aiNow:
      "2025 到 2026 年，多家系统在奥赛数论题上给出 Lean 证明。解析数论和 L 函数几乎没有可核对的研究级突破。",
    future:
      "初等数论竞赛题会继续变容易形式化。千禧问题需要新的数学思想，搜索和算力不能代替。",
    details: [
      {
        title: "开放问题没有被榜单改写",
        lines: [
          "黎曼猜想、BSD、哥德巴赫、孪生素数在 2026 年仍是开放问题。",
          "FrontierMath（Epoch）有排行榜，分 Tier 1–4。2026 年 6 月 v2 修正了许多题目；Tier 4 仍难。榜上的分数不等于解决千禧问题。",
        ],
      },
      {
        title: "奥赛数论可以形式化，不等于解析数论",
        lines: [
          "IMO 数论多是整除、同余、不等式。研究级数论经常要 ζ 函数、模形式与解析估计，Mathlib 与搜索策略都还没覆盖到那一层。",
        ],
      },
    ],
  },
  {
    id: "geometry",
    label: "几何",
    humanPast: "欧几里得《原本》建立综合几何；希尔伯特补上公理漏洞，使证明不再依赖图形直觉。",
    humanNow: "佩雷尔曼约在 2003 年给出庞加莱猜想的证明，随后经同行验证。这是几何拓扑的研究级结果，不是竞赛几何。",
    aiPast:
      "AlphaGeometry 把辅助线搜索做成可训练流程。2024 年 AlphaGeometry 2 解出 IMO 几何题，用时远短于竞赛时限。",
    aiNow:
      "综合几何仍是形式系统最稳的赛道之一。2026 年 7 月宣称 IMO 满分的系统同样覆盖几何题，忠实性仍要单独核对。",
    future: "奥林匹克综合几何会继续自动化。微分几何与几何分析离可验证的研究突破还远。",
    details: [
      {
        title: "2024 年的分工",
        lines: [
          "AlphaGeometry 2 负责几何；AlphaProof 负责代数与数论，并解出 P6。组合是当时留下的空缺。",
          "几何题适合「作辅助线 + 全等 / 相似」这一搜索形状，所以比组合更早被做稳。",
        ],
      },
      {
        title: "不要把庞加莱猜想和 IMO 几何放在同一档",
        lines: [
          "佩雷尔曼的证明依赖 Ricci 流。公开的 AI 几何成绩停在综合几何竞赛题，没有给出庞加莱猜想的新证明。",
        ],
      },
    ],
  },
  {
    id: "combinatorics",
    label: "组合",
    humanPast: "埃尔德什问题传统、拉姆齐理论与图论构成现代组合。鸽笼原理是计数上界的入门骨架。",
    humanNow: "极值组合与概率方法仍是研究主流。大量 Erdős 问题保持开放，难度与陈述都参差不齐。",
    aiPast: "2024 年 IMO 的组合题未被 AlphaProof 与 AlphaGeometry 2 解决，是那次 4/6 里最明显的短板。",
    aiNow:
      "2025 年 Seed-Prover 与 Aristotle 约 5/6，剩下的常常仍是组合。2026 年 7 月 AxiomProver、Dirac、Pramaana 公开宣称 6/6。研究侧，2026 年 1 月 Erdős #728 由 GPT-5.2 Pro 与 Aristotle 给出 Lean 证明；#729、#401 亦有报道。",
    future:
      "组合正从「整块丢分」变成「个别难题」。开放问题的陈述是否与文献等价，比多解一道竞赛题更要紧。",
    details: [
      {
        title: "Erdős #728 及邻近编号",
        lines: [
          "#728 常被引为第一个完全由 AI 解决并形式化的 Erdős 问题。保留意见是：要核对证明的是哪一版陈述，以及它是否就是文献中的那条。",
          "#729 与 #401 有公开报道，这里不把它们写成已经社区验收的定理。",
        ],
      },
      {
        title: "2026 年 7 月 IMO 上海的满分宣称",
        lines: [
          "AxiomProver、Dirac（Boundless Intuition）、Pramaana（Panini 与 Hardy）公开称 6 题都有 Lean 证明。",
          "Axiom 各题合计约 25 小时。Pramaana 在其赛道上不到 7 小时、成本低于 150 美元。这些是团队公开数字，不是 IMO 官方阅卷。",
          "形式化可能证明一个改写过的命题。满分宣称成立与否，取决于形式化是否忠实原题。",
        ],
      },
    ],
  },
  {
    id: "analysis",
    label: "分析",
    humanPast: "牛顿与莱布尼茨建立微积分；柯西把极限写成 ε-δ；勒贝格用测度重建积分。",
    humanNow:
      "Mathlib 的分析库在增长，相对研究前沿仍不完整。测度论、偏微分方程和调和分析的缺口大于代数。",
    aiPast: "竞赛里的极限与不等式可以形式化，但每一步都依赖库中已有的分析引理，缺引理就会停住。",
    aiNow:
      "Seed-Prover 1.5 的公开报道：IMO 2025 前五题约 16.5 小时（约 35/42 的计分方式）；Putnam 2025 约 11/12、约 9 小时。其中含分析风格题，不是研究分析的突破。",
    future:
      "教材规模的形式化（LeanMarathon、M2F）会先于研究级偏微分方程。FrontierMath 高阶档仍难。",
    details: [
      {
        title: "基准分：PutnamBench 与 FATE",
        lines: [
          "同一公开报道给出 Seed-Prover 1.5 在 PutnamBench 上约 88%，FATE-H 约 80%，FATE-X 约 33%。",
          "FATE-X 明显更低，说明「更难、更不套路」的题仍会掉下去。这些百分比是基准，不是分析学的完成度。",
        ],
      },
      {
        title: "FrontierMath 与教材形式化",
        lines: [
          "Epoch 的 FrontierMath 分四档。2026 年 6 月 v2 修正了许多题目；研究级的 Tier 4 仍然难。",
          "LeanMarathon 与 M2F 推动的是教科书规模形式化，目标是把本科分析写进可检查的库，而不是证明新定理。",
        ],
      },
    ],
  },
  {
    id: "logic",
    label: "逻辑 / 基础",
    humanPast: "哥德尔不完备定理与图灵可计算性划出了「什么不能被证明、什么不能被算法判定」。",
    humanNow:
      "现行形式化主线是依赖类型论。Lean 内核属于归纳构造演算（CIC）这一类；Mathlib 规模约两百万行以上。",
    aiPast:
      "经典自动定理证明多在一阶逻辑里搜索。2024 年起，强化学习接到 Lean 上，才出现可核对的奥赛级成绩。",
    aiNow:
      "2024 到 2026 年的银牌、金牌与满分宣称，几乎都指内核检查过的证明。聊天里的自然语言长文不算在这一列。",
    future:
      "信任上限是内核、公理与库缺口。自动形式化最大的失误是证明了一个看起来像原题、其实更弱或不同的陈述。",
    details: [
      {
        title: "内核可信，库并不自动可信",
        lines: [
          "Lean 内核很小，检查类型与证明对象。数学内容大多在 Mathlib：定义选得不对，内核仍会接受一个正确但答非所问的证明。",
          "库缺口意味着分析、几何分析等方向即使用对策略，也写不出最后几步。",
        ],
      },
      {
        title: "自然语言答案和 Lean 证明",
        lines: [
          "模型可以写出看起来完整的证明，却跳步或偷换量词。只有被内核接受的证明对象才算本模块里的「已证明」。",
          "自动形式化若改了题面，内核检查的是新题面。读结果时要同时看自然语言题与 Lean 陈述。",
        ],
      },
    ],
  },
];

const PROGRESS_MILESTONES: string[][] = [
  [
    "2024-07",
    "AlphaProof + AlphaGeometry 2",
    "IMO 2024：4/6，约 28/42，银牌线；P6 已解",
    "两道组合未解",
  ],
  [
    "2025-11",
    "Nature 论文",
    "正式发表上述系统",
    "不是新的竞赛分数",
  ],
  [
    "2025 IMO",
    "Seed-Prover；Aristotle",
    "约 5/6 的 Lean 证明，金牌水平",
    "通常仍缺一题",
  ],
  [
    "2025 年后",
    "Seed-Prover 1.5",
    "IMO 2025 前五题约 16.5 小时（约 35/42）；Putnam 2025 约 11/12、约 9 小时",
    "PutnamBench 约 88%；FATE-H 约 80%；FATE-X 约 33%",
  ],
  [
    "2026-01",
    "GPT-5.2 Pro + Aristotle",
    "Erdős #728 的 Lean 证明",
    "陈述版本需核对；#729、#401 另有报道",
  ],
  [
    "2026-06",
    "FrontierMath v2（Epoch）",
    "修正大量题目；Tier 1–4",
    "Tier 4 仍难；榜分不等于千禧问题",
  ],
  [
    "2026-07",
    "AxiomProver；Dirac；Pramaana",
    "公开宣称 IMO 上海 6/6 Lean 证明",
    "Axiom 合计约 25 小时；Pramaana 其赛道不到 7 小时、低于 150 美元；忠实性待核",
  ],
];

function ProgressLadder() {
  const theme = useHostTheme();
  return (
    <Stack gap={8}>
      <SectionLabel>整体阶梯</SectionLabel>
      <Row gap={6} wrap align="center" style={{ rowGap: 10 }}>
        {LADDER.map((stage, i) => {
          const lead = i === 0;
          return (
            <div key={stage.name} style={{ display: "contents" }}>
              <div
                style={{
                  minWidth: 132,
                  padding: "10px 12px",
                  borderRadius: 6,
                  border: `1px solid ${lead ? theme.accent.primary : theme.stroke.secondary}`,
                  background: lead ? theme.fill.secondary : theme.bg.elevated,
                }}
              >
                <Text size="small" weight="semibold" tone={lead ? "primary" : "secondary"}>
                  {stage.name}
                </Text>
                <Text size="small" tone="tertiary">
                  {stage.note}
                </Text>
                <Text size="small" tone={lead ? "primary" : "tertiary"}>
                  {stage.mark}
                </Text>
              </div>
              {i < LADDER.length - 1 ? (
                <span style={{ color: theme.text.quaternary, fontSize: 14 }}>→</span>
              ) : null}
            </div>
          );
        })}
      </Row>
      <Text size="small" tone="tertiary">
        2024–2026 年可核对的硬结果主要在竞赛档，教材形式化在推进，研究档只有个别命题。千禧问题没有被解决。
      </Text>
    </Stack>
  );
}

function PhaseBlock({
  kicker,
  body,
}: {
  kicker: string;
  body: string;
}) {
  return (
    <Stack gap={4}>
      <SectionLabel>{kicker}</SectionLabel>
      <Text size="small">{body}</Text>
    </Stack>
  );
}

function MathProgressModule() {
  const [fieldId, setFieldId] = useCanvasState<DomainId>("progressField", "algebra");
  const field = PROGRESS_FIELDS.find((f) => f.id === fieldId) ?? PROGRESS_FIELDS[0];

  return (
    <Stack gap={16}>
      <Stack gap={6}>
        <H2>数学领域 AI 最新进展</H2>
        <Text tone="tertiary" size="small">
          独立模块 · 先总览，再选领域，再看时间层，最后展开细节
        </Text>
      </Stack>

      <Text weight="semibold">
        到 2026 年，AI 已能在 Lean 内核检查下稳定冲击奥赛金银牌，并偶发处理个别研究级命题；黎曼猜想、BSD 等千禧问题仍未解决。
      </Text>

      <Callout tone="warning" title="读数之前的四条边界">
        <Stack gap={4}>
          <Text size="small">竞赛成功不等于研究突破：黎曼猜想、BSD 等仍然开放。</Text>
          <Text size="small">自然语言答案不等于 Lean 检查过的证明。</Text>
          <Text size="small">自动形式化可能证明一个被改写过的、并非原题的陈述。</Text>
          <Text size="small">信任上限是内核、公理选择与库缺口；库里没有的引理，证明就停住。</Text>
        </Stack>
      </Callout>

      <ProgressLadder />

      <Row gap={16} wrap>
        <Stat value="4/6" label="2024 IMO · 约 28/42 银牌" />
        <Stat value="5/6" label="2025 · 金牌级 Lean 证明" />
        <Stat value="6/6" label="2026-07 · 公开宣称，待核忠实性" tone="warning" />
      </Row>

      <Stack gap={8}>
        <H3>公开里程碑</H3>
        <Text size="small" tone="secondary">
          先看总表，再进入单一领域。分数与用时均来自团队或论文的公开报道，不是 IMO 官方成绩单。
        </Text>
        <Table
          headers={["时间", "系统", "公开结果", "边界"]}
          striped
          stickyHeader
          rows={PROGRESS_MILESTONES}
        />
        <Text size="small" tone="tertiary">
          来源范围：DeepMind 与 Nature（2025-11）、ByteDance Seed-Prover、Harmonic Aristotle、2026 年 7 月 IMO 相关团队公开材料、Epoch FrontierMath。Dirac 属 Boundless Intuition；Pramaana 属 Panini 与 Hardy。
        </Text>
      </Stack>

      <Stack gap={10}>
        <H3>选择领域</H3>
        <Text size="small" tone="secondary">
          六块主干：代数、数论、几何、组合、分析、逻辑与基础。点选后只更换下面的对照，不改上方的推导课。
        </Text>
        <Row gap={8} wrap>
          {PROGRESS_FIELDS.map((f) => (
            <div key={f.id}>
              <Pill active={f.id === field.id} onClick={() => setFieldId(f.id)}>
                {f.label}
              </Pill>
            </div>
          ))}
        </Row>

        <Grid columns={2} gap={12}>
          <Card>
            <CardHeader trailing={<Pill size="sm">人类</Pill>}>{`${field.label} · 人`}</CardHeader>
            <CardBody>
              <Stack gap={12}>
                <PhaseBlock kicker="过去成就" body={field.humanPast} />
                <Divider />
                <PhaseBlock kicker="目前成就" body={field.humanNow} />
              </Stack>
            </CardBody>
          </Card>
          <Card>
            <CardHeader trailing={<Pill size="sm" active>AI</Pill>}>{`${field.label} · AI`}</CardHeader>
            <CardBody>
              <Stack gap={12}>
                <PhaseBlock kicker="过去成就" body={field.aiPast} />
                <Divider />
                <PhaseBlock kicker="目前成就" body={field.aiNow} />
              </Stack>
            </CardBody>
          </Card>
        </Grid>

        <Callout tone="info" title={`${field.label} · 未来可能`}>
          {field.future}
        </Callout>

        <Stack gap={4}>
          <SectionLabel>展开细节</SectionLabel>
          {field.details.map((detail) => (
            <div key={detail.title}>
              <CollapsibleSection title={detail.title}>
                <Stack gap={6}>
                  {detail.lines.map((line) => (
                    <div key={line}>
                      <Text size="small" tone="secondary">
                        {line}
                      </Text>
                    </div>
                  ))}
                </Stack>
              </CollapsibleSection>
            </div>
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
}

// ─── Small visual helpers ────────────────────────────────────────────────────

function PipelineFlow({
  activeIndex,
  onSelect,
}: {
  activeIndex: number;
  onSelect: (i: number) => void;
}) {
  const theme = useHostTheme();
  return (
    <Row gap={6} wrap align="center" style={{ rowGap: 10 }}>
      {PIPELINE.map((label, i) => {
        const active = i === activeIndex;
        const done = i < activeIndex;
        return (
          <div key={label} style={{ display: "contents" }}>
            <Row gap={6} align="center">
              <button
                type="button"
                onClick={() => onSelect(i)}
                style={{
                  border: `1px solid ${active ? theme.accent.primary : theme.stroke.secondary}`,
                  background: active
                    ? theme.fill.secondary
                    : done
                      ? theme.fill.tertiary
                      : theme.bg.elevated,
                  color: active ? theme.accent.primary : theme.text.primary,
                  borderRadius: 6,
                  padding: "8px 12px",
                  cursor: "pointer",
                  fontSize: 13,
                  fontWeight: active ? 600 : 400,
                  opacity: active ? 1 : done ? 0.85 : 0.55,
                  transition:
                    "opacity 180ms ease, border-color 180ms ease, background 180ms ease",
                  outline: "none",
                }}
              >
                <span style={{ color: theme.text.tertiary, marginRight: 6 }}>
                  {i + 1}
                </span>
                {label}
              </button>
              {i < PIPELINE.length - 1 ? (
                <span
                  style={{
                    color:
                      i < activeIndex
                        ? theme.accent.primary
                        : theme.text.quaternary,
                    fontSize: 14,
                    transition: "color 180ms ease",
                  }}
                >
                  →
                </span>
              ) : null}
            </Row>
          </div>
        );
      })}
    </Row>
  );
}

function GeometrySketch({ highlight }: { highlight: boolean }) {
  const theme = useHostTheme();
  const stroke = highlight ? theme.accent.primary : theme.stroke.primary;
  const dim = theme.text.tertiary;
  return (
    <svg
      width="100%"
      height="160"
      viewBox="0 0 280 160"
      style={{ maxWidth: 320, display: "block" }}
      role="img"
      aria-label="等腰三角形 ABC，顶角平分线 AD"
    >
      <polygon
        points="140,18 40,140 240,140"
        fill={theme.fill.tertiary}
        stroke={stroke}
        strokeWidth={2}
        style={{ transition: "stroke 200ms ease" }}
      />
      <line
        x1="140"
        y1="18"
        x2="140"
        y2="140"
        stroke={highlight ? theme.accent.primary : theme.stroke.secondary}
        strokeWidth={1.5}
        strokeDasharray="4 3"
        style={{ transition: "stroke 200ms ease" }}
      />
      <text x="140" y="12" textAnchor="middle" fill={dim} fontSize="12">
        A
      </text>
      <text x="28" y="150" fill={dim} fontSize="12">
        B
      </text>
      <text x="244" y="150" fill={dim} fontSize="12">
        C
      </text>
      <text x="148" y="152" fill={dim} fontSize="11">
        D
      </text>
      <text x="78" y="90" fill={dim} fontSize="11">
        AB
      </text>
      <text x="178" y="90" fill={dim} fontSize="11">
        AC
      </text>
    </svg>
  );
}

function StepList({
  steps,
  current,
}: {
  steps: string[];
  current: number;
}) {
  const theme = useHostTheme();
  return (
    <Stack gap={6}>
      {steps.map((step, i) => {
        const active = i === current;
        const past = i < current;
        return (
          <div
            key={i}
            style={{
              padding: "8px 10px",
              borderRadius: 6,
              border: `1px solid ${active ? theme.accent.primary : theme.stroke.tertiary}`,
              background: active ? theme.fill.secondary : "transparent",
              opacity: active ? 1 : past ? 0.75 : 0.4,
              transition: "opacity 200ms ease, border-color 200ms ease, background 200ms ease",
            }}
          >
            <Text size="small" tone={active ? "primary" : "secondary"}>
              <Text as="span" size="small" weight="semibold" tone={active ? "primary" : "tertiary"}>
                步骤 {i + 1}.{" "}
              </Text>
              {step}
            </Text>
          </div>
        );
      })}
    </Stack>
  );
}

function KnowledgeRow({ items }: { items: Knowledge[] }) {
  const theme = useHostTheme();
  return (
    <Grid columns={3} gap={8}>
      {items.map((k) => (
        <div
          key={k.id}
          style={{
            padding: 10,
            borderRadius: 6,
            border: `1px solid ${theme.stroke.tertiary}`,
            background: theme.fill.tertiary,
            minWidth: 0,
          }}
        >
          <Text size="small" weight="semibold">
            {k.id} · {k.label}
          </Text>
          <Text size="small" tone="secondary">
            {k.detail}
          </Text>
        </div>
      ))}
    </Grid>
  );
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <Text size="small" weight="semibold" tone="secondary" style={{ letterSpacing: 0.2 }}>
      {children}
    </Text>
  );
}

// ─── Main canvas ─────────────────────────────────────────────────────────────

export default function AiMathDerivationCourse() {
  const theme = useHostTheme();
  const [domainId, setDomainId] = useCanvasState<DomainId>("domain", "algebra");
  const [step, setStep] = useCanvasState("step", 0);
  const [playing, setPlaying] = useCanvasState("playing", false);
  const [pipelineIdx, setPipelineIdx] = useCanvasState("pipelineIdx", 0);
  const [pipePlaying, setPipePlaying] = useCanvasState("pipePlaying", false);

  const lesson = useMemo(
    () => DOMAINS.find((d) => d.id === domainId) ?? DOMAINS[0],
    [domainId],
  );

  const maxStep = lesson.steps.length - 1;

  // Keep step in range when switching domain
  useEffect(() => {
    if (step > maxStep) setStep(0);
  }, [domainId, maxStep, step, setStep]);

  // Auto-advance derivation steps
  useEffect(() => {
    if (!playing) return;
    if (step >= maxStep) {
      setPlaying(false);
      return;
    }
    const id = setInterval(() => {
      setStep((s) => {
        if (s >= maxStep) {
          setPlaying(false);
          return s;
        }
        return s + 1;
      });
    }, 1400);
    return () => clearInterval(id);
  }, [playing, step, maxStep, setStep, setPlaying]);

  // Auto-advance shared pipeline pulse
  useEffect(() => {
    if (!pipePlaying) return;
    const id = setInterval(() => {
      setPipelineIdx((i) => (i + 1) % PIPELINE.length);
    }, 1100);
    return () => clearInterval(id);
  }, [pipePlaying, setPipelineIdx]);

  const switchDomain = (id: DomainId) => {
    setDomainId(id);
    setStep(0);
    setPlaying(false);
  };

  const shell: CSSProperties = {
    maxWidth: 920,
    margin: "0 auto",
    padding: "28px 20px 48px",
  };

  const heroBand: CSSProperties = {
    padding: "20px 18px",
    borderRadius: 8,
    border: `1px solid ${theme.stroke.secondary}`,
    background: theme.bg.elevated,
  };

  return (
    <div style={shell}>
      <Stack gap={28}>
        {/* 1. Hero */}
        <div style={heroBand}>
          <Stack gap={12}>
            <Text size="small" tone="tertiary" weight="medium">
              互动演示课 · 知识 × 逻辑 × 校验
            </Text>
            <H1>AI 数学推导演示课</H1>
            <Text tone="secondary">
              用同一条推理管线，把代数、数论、几何、组合、分析与逻辑中的典型证明拆开：先检索知识，再选策略，逐步推导，最后校验。
            </Text>
            <Row gap={16} wrap>
              <Stat value="5" label="管线步骤" />
              <Stat value="6" label="领域范例" />
              <Stat value="3" label="核心维度" tone="info" />
            </Row>
            <Divider />
            <SectionLabel>概念管线（点击可高亮）</SectionLabel>
            <PipelineFlow
              activeIndex={pipelineIdx}
              onSelect={(i) => {
                setPipePlaying(false);
                setPipelineIdx(i);
              }}
            />
            <Row gap={8} align="center">
              <Button
                variant="primary"
                onClick={() => setPipePlaying((p) => !p)}
              >
                {pipePlaying ? "暂停管线" : "播放管线"}
              </Button>
              <Button
                variant="ghost"
                onClick={() => {
                  setPipePlaying(false);
                  setPipelineIdx(0);
                }}
              >
                重置
              </Button>
              <Text size="small" tone="tertiary">
                当前：{PIPELINE[pipelineIdx]}
              </Text>
            </Row>
            <Row gap={8} align="center">
              <Button
                variant="ghost"
                onClick={() => {
                  document.getElementById("math-progress")?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }}
              >
                跳到独立模块：数学领域 AI 最新进展
              </Button>
            </Row>
          </Stack>
        </div>

        {/* 2. Shared pipeline teaching */}
        <Stack gap={10}>
          <H2>共享推理管线</H2>
          <Text tone="secondary">
            AI（与人）可靠推导时，表面是公式，底层是固定流程。下面六个领域都复用这五步。
          </Text>
          <Grid columns="1.2fr 1fr" gap={12}>
            <Card>
              <CardHeader trailing={<Pill size="sm" active>{PIPELINE[pipelineIdx]}</Pill>}>
                五步含义
              </CardHeader>
              <CardBody>
                <Stack gap={8}>
                  {[
                    "读题：明确已知、待证与量词范围。",
                    "检索知识：调出定义、定理、标准形。",
                    "选推理策略：展开、代入、构造、反证、ε-δ…",
                    "逐步推导：每步只引用已有事实或规则。",
                    "校验：特值、边界、量词顺序、常见谬误。",
                  ].map((line, i) => (
                    <div key={line}>
                      <Text
                        size="small"
                        tone={i === pipelineIdx ? "primary" : "secondary"}
                        weight={i === pipelineIdx ? "semibold" : "normal"}
                        style={{
                          opacity: i === pipelineIdx ? 1 : 0.55,
                          transition: "opacity 180ms ease",
                        }}
                      >
                        {line}
                      </Text>
                    </div>
                  ))}
                </Stack>
              </CardBody>
            </Card>
            <Callout tone="info" title="课堂口诀">
              知识决定「能用什么」，逻辑决定「怎么串」，校验决定「敢不敢信」。缺一环，推导就不完整。
            </Callout>
          </Grid>
        </Stack>

        {/* 3–4. Domain navigator + lesson panel */}
        <Stack gap={12}>
          <H2>领域范例</H2>
          <Text tone="secondary">
            切换领域查看完整 AI 推导。代数 / 数论 / 分析 支持逐步动画；其余领域同样可用控件逐步浏览。
          </Text>
          <Row gap={8} wrap>
            {DOMAINS.map((d) => (
              <div key={d.id}>
                <Pill
                  active={d.id === domainId}
                  onClick={() => switchDomain(d.id)}
                >
                  {d.label}
                </Pill>
              </div>
            ))}
          </Row>

          <Card>
            <CardHeader
              trailing={
                <Pill size="sm">{`策略 · ${lesson.strategy}`}</Pill>
              }
            >
              {`${lesson.label} · 推导面板`}
            </CardHeader>
            <CardBody>
              <Stack gap={14}>
                <Stack gap={4}>
                  <SectionLabel>目标</SectionLabel>
                  <Text weight="semibold">{lesson.goal}</Text>
                </Stack>

                <Stack gap={6}>
                  <SectionLabel>知识卡片</SectionLabel>
                  <KnowledgeRow items={lesson.knowledge} />
                </Stack>

                {lesson.id === "geometry" ? (
                  <Stack gap={6}>
                    <SectionLabel>几何示意</SectionLabel>
                    <GeometrySketch highlight={step >= 3} />
                    <Text size="small" tone="tertiary">
                      高亮表示已引入顶角平分线 AD（步骤 4 起）。
                    </Text>
                  </Stack>
                ) : null}

                <Stack gap={8}>
                  <Row gap={8} align="center" wrap>
                    <SectionLabel>逐步推导</SectionLabel>
                    <Spacer />
                    <Text size="small" tone="tertiary">
                      {step + 1} / {lesson.steps.length}
                    </Text>
                  </Row>
                  <Row gap={8} wrap>
                    <Button
                      variant="primary"
                      onClick={() => setPlaying((p) => !p)}
                    >
                      {playing ? "暂停" : "播放"}
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => {
                        setPlaying(false);
                        setStep((s) => Math.min(s + 1, maxStep));
                      }}
                      disabled={step >= maxStep}
                    >
                      下一步
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setPlaying(false);
                        setStep((s) => Math.max(s - 1, 0));
                      }}
                      disabled={step <= 0}
                    >
                      上一步
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setPlaying(false);
                        setStep(0);
                      }}
                    >
                      重置
                    </Button>
                  </Row>
                  <StepList steps={lesson.steps} current={step} />
                </Stack>

                <Divider />

                <Callout tone="success" title="校验">
                  {lesson.verification}
                </Callout>

                <Callout tone="neutral" title="教学要点">
                  {lesson.takeaway}
                </Callout>
              </Stack>
            </CardBody>
          </Card>
        </Stack>

        {/* 5. Comparison */}
        <Stack gap={10}>
          <H2>对照：领域 × 知识 × 逻辑 × 校验</H2>
          <Text tone="secondary">
            一眼看出各领域「搬哪块知识、走哪条逻辑、用什么验收」。
          </Text>
          <Table
            headers={["领域", "知识", "逻辑策略", "校验方式"]}
            striped
            stickyHeader
            rows={DOMAINS.map((d) => [
              d.label,
              d.compare.knowledge,
              d.compare.logic,
              d.compare.verify,
            ])}
            rowTone={DOMAINS.map((d) =>
              d.id === domainId ? "info" : "neutral",
            )}
          />
        </Stack>

        {/* 6. Practice */}
        <Stack gap={10}>
          <H2>练习：连续三个整数之积能被 6 整除</H2>
          <Text>
            证明：对任意整数 n，乘积 <Code>n(n+1)(n+2)</Code> 能被 6 整除。
          </Text>
          <Text tone="secondary" size="small">
            先自己想骨架，再展开提示。提示按「管线」分层，不直接给完整答案。
          </Text>

          <CollapsibleSection title="提示 1 · 读题与目标" defaultOpen={false}>
            <Text size="small" tone="secondary">
              需证 6 | n(n+1)(n+2)。注意 6=2×3，且 2 与 3 互素，故只需证明该乘积同时被 2 与 3 整除。
            </Text>
          </CollapsibleSection>
          <CollapsibleSection title="提示 2 · 检索知识" defaultOpen={false}>
            <Stack gap={4}>
              <Text size="small" tone="secondary">
                K1：连续整数中必有偶数（被 2 整除）。
              </Text>
              <Text size="small" tone="secondary">
                K2：连续三个整数中必有一个被 3 整除（模 3 剩余系）。
              </Text>
              <Text size="small" tone="secondary">
                K3：若 m|a 且 n|a 且 gcd(m,n)=1，则 mn|a。
              </Text>
            </Stack>
          </CollapsibleSection>
          <CollapsibleSection title="提示 3 · 推理策略骨架" defaultOpen={false}>
            <Stack gap={4}>
              <Text size="small" tone="secondary">
                1）在 n, n+1, n+2 中论证存在偶数 ⇒ 被 2 整除。
              </Text>
              <Text size="small" tone="secondary">
                2）对模 3：n ≡ 0,1,2 三类分别指出谁被 3 整除。
              </Text>
              <Text size="small" tone="secondary">
                3）合并得被 6 整除。可用特值 n=1→6、n=2→24 做校验。
              </Text>
            </Stack>
          </CollapsibleSection>
          <Card collapsible defaultOpen={false}>
            <CardHeader>参考证明（展开查看）</CardHeader>
            <CardBody>
              <Stack gap={8}>
                <Text size="small">
                  在任意三个连续整数中，至少有一个偶数，故 2 | n(n+1)(n+2)。
                </Text>
                <Text size="small">
                  模 3 时，n 只能是 0、1、2 之一：若 n≡0 则 3|n；若 n≡1 则 3|(n+2)；若 n≡2 则 3|(n+1)。故 3 | n(n+1)(n+2)。
                </Text>
                <Text size="small">
                  因 2 与 3 互素，得 6 | n(n+1)(n+2)。
                </Text>
              </Stack>
            </CardBody>
          </Card>
        </Stack>

        {/* 7. Summary */}
        <Stack gap={10}>
          <H2>总结：三条带走</H2>
          <Grid columns={3} gap={10}>
            <div
              style={{
                padding: 14,
                borderRadius: 8,
                border: `1px solid ${theme.stroke.secondary}`,
                background: theme.fill.tertiary,
              }}
            >
              <H3>1. 知识</H3>
              <Text size="small" tone="secondary">
                先检索定义与标准形，再动手变形；没有知识锚点的「跳步」不可靠。
              </Text>
            </div>
            <div
              style={{
                padding: 14,
                borderRadius: 8,
                border: `1px solid ${theme.stroke.secondary}`,
                background: theme.fill.tertiary,
              }}
            >
              <H3>2. 逻辑</H3>
              <Text size="small" tone="secondary">
                策略要显式：展开、代入、构造、反证、ε-δ、推理规则——选对路径比堆公式重要。
              </Text>
            </div>
            <div
              style={{
                padding: 14,
                borderRadius: 8,
                border: `1px solid ${theme.stroke.secondary}`,
                background: theme.fill.tertiary,
              }}
            >
              <H3>3. 校验</H3>
              <Text size="small" tone="secondary">
                特值、边界、量词顺序与常见谬误对照，是 AI 推导可信任的最后闸门。
              </Text>
            </div>
          </Grid>
          <Callout tone="info" title="课后行动">
            任选一道新题，强制按「读题 → 知识 → 策略 → 推导 → 校验」写五段，再对照本课范例检查缺环。
          </Callout>
        </Stack>

        <Divider />

        <div id="math-progress">
          <MathProgressModule />
        </div>

        <Text size="small" tone="quaternary">
          推导领域：{DOMAIN_IDS.join(" · ")} · 推导进度与下方进展模块的领域选择分开保存，刷新后仍在。
        </Text>
      </Stack>
    </div>
  );
}
