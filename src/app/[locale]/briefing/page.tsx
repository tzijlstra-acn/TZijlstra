"use client";

import { useEffect, useRef, useCallback } from "react";
import { useQueryState } from "nuqs";
import { Link } from "@/lib/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  X,
  ExternalLink,
  TrendingUp,
  Globe2,
  Target,
  DollarSign,
  ShieldAlert,
  Calendar,
} from "lucide-react";
import { STRATEGIC_THESIS } from "@/data/strategy";
import { REVENUE_SCENARIOS, TAM_2030_BASE, calcSAM, SAM_DEFAULTS } from "@/data/market";
import { RISKS } from "@/data/risks";
import { PHASES } from "@/data/timeline";

const TOTAL_SCENES = 6;

const SCENE_TITLES = [
  "Proposition",
  "Why Now",
  "Beachhead",
  "Economics",
  "Red Team",
  "Execution",
];

const SCENE_ICONS = [Target, TrendingUp, Globe2, DollarSign, ShieldAlert, Calendar];

function SceneChip({
  n,
  active,
  onClick,
}: {
  n: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-2 h-2 rounded-full transition-all focus:outline-none focus-visible:ring-1"
      style={{
        background: active ? "var(--lunar-cyan)" : "var(--lunar-border-strong)",
        transform: active ? "scale(1.3)" : "scale(1)",
      }}
      aria-label={`Go to scene ${n}`}
      aria-pressed={active}
    />
  );
}

function Scene1() {
  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div>
        <div
          className="text-xs font-semibold uppercase tracking-widest mb-2"
          style={{ color: "var(--lunar-cyan)" }}
        >
          Strategic proposition
        </div>
        <h2
          className="text-2xl font-bold leading-snug mb-3"
          style={{ color: "var(--lunar-text-primary)" }}
        >
          {STRATEGIC_THESIS.headline}
        </h2>
        <p className="text-sm leading-relaxed" style={{ color: "var(--lunar-text-secondary)" }}>
          {STRATEGIC_THESIS.subheadline}
        </p>
      </div>

      <div
        className="p-4 rounded-xl"
        style={{
          background: "rgba(0,212,255,0.05)",
          border: "1px solid rgba(0,212,255,0.15)",
          borderLeft: "4px solid var(--lunar-cyan)",
        }}
      >
        <div
          className="text-xs font-semibold uppercase tracking-widest mb-1"
          style={{ color: "var(--lunar-cyan)" }}
        >
          {STRATEGIC_THESIS.moonshot.title}
        </div>
        <p className="text-sm font-medium leading-snug" style={{ color: "var(--lunar-text-primary)" }}>
          {STRATEGIC_THESIS.moonshot.text}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div
          className="p-4 rounded-lg"
          style={{
            background: "var(--lunar-elevated)",
            border: "1px solid var(--lunar-border-subtle)",
          }}
        >
          <div
            className="text-xs font-semibold uppercase tracking-wide mb-2"
            style={{ color: "var(--lunar-text-muted)" }}
          >
            Decision requested
          </div>
          <p className="text-sm" style={{ color: "var(--lunar-text-primary)" }}>
            Authorize and fund Phase 0 (Foundation) — the minimum legal, infrastructure,
            and commercial foundation required to operate lawfully in the EU/UK.
          </p>
          <p className="text-xs mt-2" style={{ color: "var(--lunar-amber)" }}>
            Investment: €5–8M · Timeline: Sep–Dec 2026 · No revenue target
          </p>
        </div>
        <div
          className="p-4 rounded-lg"
          style={{
            background: "var(--lunar-elevated)",
            border: "1px solid var(--lunar-border-subtle)",
          }}
        >
          <div
            className="text-xs font-semibold uppercase tracking-wide mb-2"
            style={{ color: "var(--lunar-text-muted)" }}
          >
            Role I am proposing to play
          </div>
          <p className="text-sm" style={{ color: "var(--lunar-text-primary)" }}>
            European Market Entry Lead — the person who builds the beachhead,
            signs the first enterprise accounts, and assembles the EU go-to-market motion.
          </p>
          <p className="text-xs mt-2" style={{ color: "var(--lunar-text-muted)" }}>
            Thomas Zijlstra · Candidate analysis · August 2026
          </p>
        </div>
      </div>
    </div>
  );
}

function Scene2() {
  const signals = [
    {
      n: 1,
      label: "Regulatory Milestone",
      observation:
        "EU AI Act GPAI obligations took effect in 2025–2026, with enforcement ramping through 2027.",
      implication:
        "The first AI provider to publish a complete, audited EU compliance architecture earns shortlisting advantage at every enterprise RFP — before competitors can catch up.",
      color: "var(--lunar-violet)",
    },
    {
      n: 2,
      label: "Market Data",
      observation: `EU AI spend pools are growing at ~37% CAGR. Total addressable market reaches €${TAM_2030_BASE.toFixed(0)}B by 2030 across five spend pools.`,
      implication:
        "2026–2027 is the strategic window to establish market presence and partner ecosystem depth before US hyperscalers complete their EU data-residency builds.",
      color: "var(--lunar-cyan)",
    },
    {
      n: 3,
      label: "Market Signal",
      observation:
        "EU enterprises face growing pressure to reduce dependence on US-only AI hyperscalers, combined with reluctance to adopt China-origin models without EU data controls.",
      implication:
        "Kimi's combination of frontier capability + open weights + EU data residency is structurally unique — no current provider occupies this position.",
      color: "var(--lunar-green)",
    },
  ];

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div>
        <div
          className="text-xs font-semibold uppercase tracking-widest mb-2"
          style={{ color: "var(--lunar-cyan)" }}
        >
          Three converging signals
        </div>
        <h2
          className="text-2xl font-bold leading-snug mb-1"
          style={{ color: "var(--lunar-text-primary)" }}
        >
          Why this moment, not next year
        </h2>
        <p className="text-sm" style={{ color: "var(--lunar-text-secondary)" }}>
          Each signal creates urgency independently. Together, they create a closing window.
        </p>
      </div>

      <div className="space-y-4">
        {signals.map((s) => (
          <div
            key={s.n}
            className="p-4 rounded-xl"
            style={{
              background: "var(--lunar-elevated)",
              border: `1px solid ${s.color}30`,
              borderLeft: `4px solid ${s.color}`,
            }}
          >
            <div className="flex items-start gap-3">
              <span
                className="flex-shrink-0 text-xs font-mono px-1.5 py-0.5 rounded"
                style={{ background: `${s.color}15`, color: s.color }}
              >
                {s.label}
              </span>
            </div>
            <div className="mt-3 space-y-2">
              <div>
                <span
                  className="text-xs font-semibold uppercase tracking-wide"
                  style={{ color: "var(--lunar-text-muted)" }}
                >
                  Observation:&nbsp;
                </span>
                <span className="text-sm" style={{ color: "var(--lunar-text-primary)" }}>
                  {s.observation}
                </span>
              </div>
              <div>
                <span
                  className="text-xs font-semibold uppercase tracking-wide"
                  style={{ color: "var(--lunar-text-muted)" }}
                >
                  Implication:&nbsp;
                </span>
                <span className="text-sm" style={{ color: s.color }}>
                  {s.implication}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Scene3() {
  const beachheadCountries = [
    {
      id: "uk",
      name: "United Kingdom",
      flag: "🇬🇧",
      score: 84,
      role: "Developer & API growth engine",
      rationale:
        "Post-Brexit regulatory environment more permissive than EU. Highest developer density in Europe. AI Action Plan signals government support. Outside EU AI Act in 2026 — no compliance gate for initial traction.",
    },
    {
      id: "de",
      name: "Germany",
      flag: "🇩🇪",
      score: 83,
      role: "EU enterprise & industrial anchor",
      rationale:
        "Largest EU economy. SAP, Siemens, VW — high-context AI workloads requiring EU data residency. Enterprise credibility market. Compliance capability becomes commercial filter.",
    },
    {
      id: "nl",
      name: "Netherlands",
      flag: "🇳🇱",
      score: 79,
      role: "EU operating, cloud, ISV hub",
      rationale:
        "Natural EU HQ location. Amsterdam: primary EU data center target. ASML, ING, Booking.com — strong ISV ecosystem. Coordination hub for EU operating model.",
    },
  ];

  const tier1Segments = [
    "Financial services (banks, insurers) with EU data sovereignty requirements",
    "Enterprise software companies embedding AI into products (ISVs)",
    "Research universities and pharma with long-context analysis needs",
    "Consulting and legal firms in AI-assisted knowledge work",
  ];

  const outOfScope = [
    "Government, defence, and critical infrastructure (prohibited category risk)",
    "Southern and eastern Europe in Phase 1 (resource constraint)",
    "Sovereign/on-prem deployments before Gate A (EU data boundary) satisfied",
    "Consumer market (B2C) — enterprise-first to build trust foundation",
  ];

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div>
        <div
          className="text-xs font-semibold uppercase tracking-widest mb-2"
          style={{ color: "var(--lunar-cyan)" }}
        >
          Phase 1 beachhead — 2027H1
        </div>
        <h2
          className="text-2xl font-bold leading-snug mb-1"
          style={{ color: "var(--lunar-text-primary)" }}
        >
          Three markets, deliberate sequence
        </h2>
        <p className="text-sm" style={{ color: "var(--lunar-text-secondary)" }}>
          UK for speed, Germany for enterprise credibility, Netherlands for EU operating model.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {beachheadCountries.map((c) => (
          <div
            key={c.id}
            className="p-4 rounded-xl"
            style={{
              background: "var(--lunar-elevated)",
              border: "1px solid var(--lunar-border-subtle)",
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl" aria-hidden="true">{c.flag}</span>
              <div>
                <div className="text-sm font-semibold" style={{ color: "var(--lunar-text-primary)" }}>
                  {c.name}
                </div>
                <div className="text-xs font-mono" style={{ color: "var(--lunar-cyan)" }}>
                  Score {c.score}/100
                </div>
              </div>
            </div>
            <div className="text-xs font-medium mb-2" style={{ color: "var(--lunar-violet)" }}>
              {c.role}
            </div>
            <p className="text-xs leading-relaxed" style={{ color: "var(--lunar-text-muted)" }}>
              {c.rationale}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div
          className="p-4 rounded-lg"
          style={{
            background: "var(--lunar-elevated)",
            border: "1px solid var(--lunar-border-subtle)",
          }}
        >
          <div
            className="text-xs font-semibold uppercase tracking-wide mb-2"
            style={{ color: "var(--lunar-green)" }}
          >
            Initial customer segments
          </div>
          <ul className="space-y-1.5">
            {tier1Segments.map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-xs">
                <span style={{ color: "var(--lunar-green)", flexShrink: 0 }}>▸</span>
                <span style={{ color: "var(--lunar-text-secondary)" }}>{s}</span>
              </li>
            ))}
          </ul>
        </div>
        <div
          className="p-4 rounded-lg"
          style={{
            background: "var(--lunar-elevated)",
            border: "1px solid rgba(239,68,68,0.2)",
          }}
        >
          <div
            className="text-xs font-semibold uppercase tracking-wide mb-2"
            style={{ color: "var(--lunar-red)" }}
          >
            Deliberately out of scope
          </div>
          <ul className="space-y-1.5">
            {outOfScope.map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-xs">
                <span style={{ color: "var(--lunar-red)", flexShrink: 0 }}>✕</span>
                <span style={{ color: "var(--lunar-text-secondary)" }}>{s}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function Scene4() {
  const sam = calcSAM(TAM_2030_BASE, SAM_DEFAULTS);

  const scenarios = [
    {
      key: "conservative" as const,
      label: "Proof",
      subtitle: "Conservative",
      color: "#7a90b0",
      revenue: REVENUE_SCENARIOS.conservative.revenue2030,
      samShare: REVENUE_SCENARIOS.conservative.samShare,
      description:
        "UK developer traction only. No EU enterprise pipeline in 2027. Compliance delays push enterprise beyond 2028.",
    },
    {
      key: "base" as const,
      label: "Base",
      subtitle: "Base",
      color: "var(--lunar-cyan)",
      revenue: REVENUE_SCENARIOS.base.revenue2030,
      samShare: REVENUE_SCENARIOS.base.samShare,
      description:
        "UK + DE/NL enterprise pipeline. 4 AEs at 75% attainment. EU data boundary live by Gate A. SI partner ecosystem scaling.",
    },
    {
      key: "upside" as const,
      label: "Scale",
      subtitle: "Upside",
      color: "var(--lunar-green)",
      revenue: REVENUE_SCENARIOS.upside.revenue2030,
      samShare: REVENUE_SCENARIOS.upside.samShare,
      description:
        "Rapid enterprise adoption. OEM channel live. 2–3 SI partners generating pipeline. Sovereign AI contract in 2028.",
    },
  ];

  const keyAssumptions = [
    { label: "EU data residency live", value: "Gate A — Dec 2026", confidence: "CRITICAL PATH" },
    { label: "Enterprise sales cycle", value: "~120 days", confidence: "ASSUMPTION" },
    { label: "AE quota attainment", value: "75%", confidence: "ASSUMPTION" },
    { label: "Avg contract value", value: "€250K ARR", confidence: "ASSUMPTION" },
    { label: "Partner contribution", value: "20% of revenue", confidence: "ASSUMPTION" },
  ];

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div>
        <div
          className="text-xs font-semibold uppercase tracking-widest mb-2"
          style={{ color: "var(--lunar-cyan)" }}
        >
          Illustrative financial model · Based on public information
        </div>
        <h2
          className="text-2xl font-bold leading-snug mb-1"
          style={{ color: "var(--lunar-text-primary)" }}
        >
          Economics: ranges, not precision
        </h2>
        <p className="text-sm" style={{ color: "var(--lunar-text-secondary)" }}>
          SAM: ~€{sam.toFixed(0)}B (2030) · TAM: €{TAM_2030_BASE.toFixed(0)}B · All figures are illustrative assumptions
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {scenarios.map((s) => (
          <div
            key={s.key}
            className="p-4 rounded-xl"
            style={{
              background: "var(--lunar-elevated)",
              border: `1px solid ${s.color}30`,
              borderTop: `3px solid ${s.color}`,
            }}
          >
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-sm font-bold" style={{ color: s.color }}>
                {s.label}
              </span>
              <span className="text-xs" style={{ color: "var(--lunar-text-muted)" }}>
                ({s.subtitle})
              </span>
            </div>
            <div className="text-2xl font-mono font-bold mb-1" style={{ color: s.color }}>
              €{s.revenue}M
            </div>
            <div className="text-xs mb-3" style={{ color: "var(--lunar-text-muted)" }}>
              {s.samShare}% of SAM by 2030
            </div>
            <p className="text-xs leading-relaxed" style={{ color: "var(--lunar-text-secondary)" }}>
              {s.description}
            </p>
          </div>
        ))}
      </div>

      <div
        className="p-4 rounded-lg"
        style={{
          background: "var(--lunar-elevated)",
          border: "1px solid var(--lunar-border-subtle)",
        }}
      >
        <div
          className="text-xs font-semibold uppercase tracking-wide mb-3"
          style={{ color: "var(--lunar-text-muted)" }}
        >
          Most influential assumptions
        </div>
        <div className="space-y-2">
          {keyAssumptions.map((a) => (
            <div key={a.label} className="flex items-center justify-between">
              <span className="text-xs" style={{ color: "var(--lunar-text-secondary)" }}>
                {a.label}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono" style={{ color: "var(--lunar-text-primary)" }}>
                  {a.value}
                </span>
                <span
                  className="text-xs px-1.5 py-0.5 rounded font-mono"
                  style={{
                    background: a.confidence === "CRITICAL PATH" ? "rgba(245,158,11,0.1)" : "rgba(100,140,200,0.1)",
                    color: a.confidence === "CRITICAL PATH" ? "var(--lunar-amber)" : "var(--lunar-text-muted)",
                  }}
                >
                  {a.confidence}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Scene5() {
  const topRisks = [
    {
      risk: RISKS.find((r) => r.id === "r01")!,
      earliestSignal:
        "Enterprise RFP exclusion lists citing China-origin AI before 2027H1 launch",
      killCriterion:
        ">50% of qualified prospects disqualify on origin in 90-day pilot discovery",
    },
    {
      risk: RISKS.find((r) => r.id === "r03")!,
      earliestSignal:
        "DPA investigation triggered before EU data boundary is live",
      killCriterion:
        "Regulatory enforcement action before Gate A (data boundary) satisfied",
    },
    {
      risk: RISKS.find((r) => r.id === "r02")!,
      earliestSignal:
        "EU AI Office pre-classification notification for systemic-risk review",
      killCriterion:
        "Systemic-risk classification without compliance program ready — delays all EU commercial activity",
    },
  ];

  const severityColor: Record<string, string> = {
    critical: "var(--lunar-red)",
    high: "var(--lunar-amber)",
    medium: "var(--lunar-cyan)",
    low: "var(--lunar-green)",
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div>
        <div
          className="text-xs font-semibold uppercase tracking-widest mb-2"
          style={{ color: "var(--lunar-red)" }}
        >
          Red team — top 3 risks
        </div>
        <h2
          className="text-2xl font-bold leading-snug mb-1"
          style={{ color: "var(--lunar-text-primary)" }}
        >
          Where this thesis could fail
        </h2>
        <p className="text-sm" style={{ color: "var(--lunar-text-secondary)" }}>
          Risks are drawn from the full risk register. Format: Risk → Signal → Mitigation → Kill criterion.
        </p>
      </div>

      <div className="space-y-4">
        {topRisks.map(({ risk, earliestSignal, killCriterion }, i) => (
          <div
            key={risk.id}
            className="p-4 rounded-xl"
            style={{
              background: "var(--lunar-elevated)",
              border: `1px solid ${severityColor[risk.defaultSeverity]}30`,
              borderLeft: `4px solid ${severityColor[risk.defaultSeverity]}`,
            }}
          >
            <div className="flex items-start gap-3 mb-3">
              <span
                className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold font-mono"
                style={{
                  background: `${severityColor[risk.defaultSeverity]}15`,
                  color: severityColor[risk.defaultSeverity],
                }}
                aria-hidden="true"
              >
                {i + 1}
              </span>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="text-sm font-semibold" style={{ color: "var(--lunar-text-primary)" }}>
                    {risk.title}
                  </span>
                  <span
                    className="text-xs px-1.5 py-0.5 rounded font-mono"
                    style={{
                      background: `${severityColor[risk.defaultSeverity]}15`,
                      color: severityColor[risk.defaultSeverity],
                    }}
                  >
                    {risk.defaultSeverity.toUpperCase()}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wide mb-0.5" style={{ color: "var(--lunar-text-muted)" }}>
                      Earliest signal
                    </div>
                    <p className="text-xs leading-relaxed" style={{ color: "var(--lunar-text-secondary)" }}>
                      {earliestSignal}
                    </p>
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wide mb-0.5" style={{ color: "var(--lunar-text-muted)" }}>
                      Mitigation
                    </div>
                    <p className="text-xs leading-relaxed" style={{ color: "var(--lunar-text-secondary)" }}>
                      {risk.mitigation}
                    </p>
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wide mb-0.5" style={{ color: "var(--lunar-red)" }}>
                      Kill criterion
                    </div>
                    <p className="text-xs leading-relaxed" style={{ color: "var(--lunar-text-secondary)" }}>
                      {killCriterion}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Link
        href="/risks"
        className="inline-flex items-center gap-1 text-xs"
        style={{ color: "var(--lunar-cyan)" }}
      >
        View full risk register <ExternalLink size={10} />
      </Link>
    </div>
  );
}

function Scene6() {
  const phase0 = PHASES.find((p) => p.id === "phase_0");

  const thirtyDays = [
    { output: "Hire VP Trust & Safety + EU legal counsel", kpi: "Roles filled", decision: "Owners for compliance workstreams" },
    { output: "EU data centre agreement signed (Amsterdam/Frankfurt)", kpi: "Gate A prerequisite #1", decision: "Phase 1 infrastructure foundation" },
    { output: "GPAI classification legal opinion received", kpi: "Gate A prerequisite #2", decision: "Compliance obligation scope known" },
  ];

  const sixtyDays = [
    { output: "K3 license EU commercial use confirmed", kpi: "Gate A prerequisite #3", decision: "OEM and enterprise revenue lines unlocked" },
    { output: "DPA template v1 approved by counsel", kpi: "Contractual compliance", decision: "Sales can begin data agreements" },
    { output: "ICP definition and top-20 account list finalized", kpi: "Enterprise pipeline readiness", decision: "Sales team has targets" },
  ];

  const ninetyDays = [
    { output: "Gate A satisfied: all prerequisites met", kpi: "Go/No-Go for Phase 1", decision: "Authorize Phase 1 launch (Jan 2027)" },
    { output: "First 3 design-partner conversations initiated", kpi: "Pipeline signal", decision: "Proof scenario validated or hypothesis killed" },
    { output: "Revenue model stress-tested vs. real conversations", kpi: "Assumptions validated", decision: "Board presentation ready" },
  ];

  const executiveQuestions = [
    "Are you prepared to invest €5–8M in Phase 0 with no revenue target — purely to become launchable?",
    "Which of the three commercialization hypotheses (UK developer beachhead, EU AI Act compliance premium, or SI open-weight ecosystem) should we prioritize first?",
    "What is the acceptable timeline for EU data residency — and who in Moonshot AI owns that decision?",
  ];

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div>
        <div
          className="text-xs font-semibold uppercase tracking-widest mb-2"
          style={{ color: "var(--lunar-cyan)" }}
        >
          {phase0 ? `${phase0.label} · ${phase0.dateRange}` : "Phase 0 · Sep–Dec 2026"}
        </div>
        <h2
          className="text-2xl font-bold leading-snug mb-1"
          style={{ color: "var(--lunar-text-primary)" }}
        >
          30/60/90-day execution plan
        </h2>
        <p className="text-sm" style={{ color: "var(--lunar-text-secondary)" }}>
          Phase 0 is a preparation phase — no revenue target. Gate A triggers Phase 1 (Jan 2027).
        </p>
      </div>

      <div className="space-y-3">
        {[
          { label: "30 days", color: "var(--lunar-cyan)", items: thirtyDays },
          { label: "60 days", color: "var(--lunar-violet)", items: sixtyDays },
          { label: "90 days", color: "var(--lunar-amber)", items: ninetyDays },
        ].map(({ label, color, items }) => (
          <div key={label}>
            <div
              className="text-xs font-semibold uppercase tracking-widest mb-2"
              style={{ color }}
            >
              {label}
            </div>
            <div className="space-y-2">
              {items.map((item, i) => (
                <div
                  key={i}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 rounded-lg"
                  style={{
                    background: "var(--lunar-elevated)",
                    border: "1px solid var(--lunar-border-subtle)",
                  }}
                >
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wide mb-0.5" style={{ color: "var(--lunar-text-muted)" }}>Output</div>
                    <p className="text-xs" style={{ color: "var(--lunar-text-primary)" }}>{item.output}</p>
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wide mb-0.5" style={{ color: "var(--lunar-text-muted)" }}>Proof / KPI</div>
                    <p className="text-xs" style={{ color }}>{item.kpi}</p>
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wide mb-0.5" style={{ color: "var(--lunar-text-muted)" }}>Decision point</div>
                    <p className="text-xs" style={{ color: "var(--lunar-text-secondary)" }}>{item.decision}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div
        className="p-4 rounded-xl"
        style={{
          background: "rgba(168,85,247,0.05)",
          border: "1px solid rgba(168,85,247,0.2)",
        }}
      >
        <div
          className="text-xs font-semibold uppercase tracking-widest mb-3"
          style={{ color: "var(--lunar-violet)" }}
        >
          Key executive questions
        </div>
        <div className="space-y-3">
          {executiveQuestions.map((q, i) => (
            <div key={i} className="flex items-start gap-3">
              <span
                className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold font-mono"
                style={{
                  background: "rgba(168,85,247,0.15)",
                  color: "var(--lunar-violet)",
                }}
                aria-hidden="true"
              >
                {i + 1}
              </span>
              <p className="text-sm" style={{ color: "var(--lunar-text-primary)" }}>
                {q}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const SCENES = [Scene1, Scene2, Scene3, Scene4, Scene5, Scene6];

export default function BriefingPage() {
  const [sceneParam, setSceneParam] = useQueryState("scene", {
    defaultValue: "1",
    shallow: false,
  });

  const sceneNum = Math.max(1, Math.min(TOTAL_SCENES, parseInt(sceneParam ?? "1", 10) || 1));
  const prevSceneRef = useRef(sceneNum);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const direction = sceneNum > prevSceneRef.current ? 1 : -1;
  useEffect(() => {
    prevSceneRef.current = sceneNum;
  }, [sceneNum]);

  // Manage focus on scene change
  useEffect(() => {
    headingRef.current?.focus();
  }, [sceneNum]);

  const goTo = useCallback(
    (n: number) => {
      const clamped = Math.max(1, Math.min(TOTAL_SCENES, n));
      setSceneParam(String(clamped));
    },
    [setSceneParam]
  );

  // Arrow key navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      )
        return;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        goTo(sceneNum + 1);
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        goTo(sceneNum - 1);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [sceneNum, goTo]);

  const SceneComponent = SCENES[sceneNum - 1];
  const SceneIcon = SCENE_ICONS[sceneNum - 1];

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--lunar-bg)" }}>
      {/* Top bar */}
      <header
        className="sticky top-0 z-10 flex items-center gap-4 px-6 py-3 border-b"
        style={{
          background: "var(--lunar-surface)",
          borderColor: "var(--lunar-border-subtle)",
        }}
      >
        <Link
          href="/"
          className="flex items-center gap-1.5 text-xs transition-colors focus:outline-none focus-visible:ring-2 rounded px-1"
          style={{ color: "var(--lunar-text-muted)" }}
          aria-label="Exit briefing"
        >
          <X size={14} aria-hidden="true" />
          Exit briefing
        </Link>

        <div className="flex-1 flex items-center justify-center gap-2">
          <SceneIcon size={14} style={{ color: "var(--lunar-cyan)" }} aria-hidden="true" />
          <span className="text-xs font-semibold" style={{ color: "var(--lunar-text-primary)" }}>
            {SCENE_TITLES[sceneNum - 1]}
          </span>
          <span className="text-xs" style={{ color: "var(--lunar-text-muted)" }}>
            — Scene {sceneNum} of {TOTAL_SCENES}
          </span>
        </div>

        <Link
          href="/"
          className="flex items-center gap-1 text-xs transition-colors focus:outline-none focus-visible:ring-2 rounded px-1"
          style={{ color: "var(--lunar-cyan)" }}
          aria-label="Explore full analysis"
        >
          Explore full analysis
          <ExternalLink size={12} aria-hidden="true" />
        </Link>
      </header>

      {/* Scene dots */}
      <div className="flex items-center justify-center gap-2 py-3" aria-label="Scene navigation">
        {Array.from({ length: TOTAL_SCENES }, (_, i) => (
          <SceneChip
            key={i}
            n={i + 1}
            active={i + 1 === sceneNum}
            onClick={() => goTo(i + 1)}
          />
        ))}
      </div>

      {/* Scene content */}
      <main
        id="briefing-content"
        className="flex-1 overflow-y-auto px-4 sm:px-8 py-6"
        tabIndex={-1}
      >
        {/* Visually hidden heading for focus management */}
        <h1
          ref={headingRef}
          className="sr-only"
          tabIndex={-1}
          aria-live="polite"
        >
          Scene {sceneNum} of {TOTAL_SCENES}: {SCENE_TITLES[sceneNum - 1]}
        </h1>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={sceneNum}
            initial={{ opacity: 0, x: direction * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -40 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <SceneComponent />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom navigation */}
      <footer
        className="sticky bottom-0 flex items-center justify-between px-6 py-4 border-t"
        style={{
          background: "var(--lunar-surface)",
          borderColor: "var(--lunar-border-subtle)",
        }}
      >
        <button
          onClick={() => goTo(sceneNum - 1)}
          disabled={sceneNum <= 1}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50"
          style={{
            background: "var(--lunar-elevated)",
            color: sceneNum <= 1 ? "var(--lunar-text-muted)" : "var(--lunar-text-primary)",
            border: "1px solid var(--lunar-border-subtle)",
            opacity: sceneNum <= 1 ? 0.4 : 1,
            cursor: sceneNum <= 1 ? "not-allowed" : "pointer",
          }}
          aria-label="Previous scene"
          aria-disabled={sceneNum <= 1}
        >
          <ArrowLeft size={14} aria-hidden="true" />
          Previous
        </button>

        <div className="text-xs" style={{ color: "var(--lunar-text-muted)" }}>
          Use ← → arrow keys to navigate
        </div>

        <button
          onClick={() => {
            if (sceneNum < TOTAL_SCENES) {
              goTo(sceneNum + 1);
            }
          }}
          disabled={sceneNum >= TOTAL_SCENES}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50"
          style={{
            background: sceneNum < TOTAL_SCENES ? "var(--lunar-cyan)" : "var(--lunar-elevated)",
            color: sceneNum < TOTAL_SCENES ? "#000" : "var(--lunar-text-muted)",
            border: "1px solid transparent",
            opacity: sceneNum >= TOTAL_SCENES ? 0.4 : 1,
            cursor: sceneNum >= TOTAL_SCENES ? "not-allowed" : "pointer",
          }}
          aria-label="Next scene"
          aria-disabled={sceneNum >= TOTAL_SCENES}
        >
          Next
          <ArrowRight size={14} aria-hidden="true" />
        </button>
      </footer>
    </div>
  );
}
