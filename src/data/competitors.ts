import { z } from "zod";

export const COMPETITOR_DIMENSIONS = [
  "frontier_quality",
  "agentic_coding",
  "long_context",
  "task_economics",
  "open_deployment",
  "eu_hosting",
  "enterprise_controls",
  "distribution",
  "trust_compliance",
  "eu_partnerability",
] as const;

export type CompetitorDimension = (typeof COMPETITOR_DIMENSIONS)[number];

export const DIMENSION_SOURCES: Record<CompetitorDimension, string> = {
  frontier_quality: "BenchLM BenchAlign v5.2, Sept 2026",
  agentic_coding: "BenchLM AG + CO categories, Sept 2026",
  long_context: "BenchLM Reasoning (LongBench v2); Kimi: 1M-token spec",
  task_economics: "Public API pricing pages, Aug 2026",
  open_deployment: "License terms; Hugging Face",
  eu_hosting: "Provider datacenter pages",
  enterprise_controls: "SOC 2 / ISO 27001; analyst",
  distribution: "Analyst judgment",
  trust_compliance: "EU AI Act filings; analyst",
  eu_partnerability: "Analyst judgment",
};

export const DIMENSION_LABELS: Record<CompetitorDimension, string> = {
  frontier_quality: "Frontier Quality",
  agentic_coding: "Agentic / Coding",
  long_context: "Long Context",
  task_economics: "Task Economics",
  open_deployment: "Open Deployment",
  eu_hosting: "EU Hosting",
  enterprise_controls: "Enterprise Controls",
  distribution: "Distribution",
  trust_compliance: "Trust & Compliance",
  eu_partnerability: "EU Partnerability",
};

export const CompetitorSchema = z.object({
  id: z.string(),
  name: z.string(),
  shortName: z.string(),
  color: z.string(),
  scores: z.record(z.string(), z.number()),
  isKimi: z.boolean().default(false).optional(),
  isKimiTarget: z.boolean().default(false).optional(),
  notes: z.string().optional(),
});

export type Competitor = z.infer<typeof CompetitorSchema>;

function buildScores(vals: number[]): Record<string, number> {
  return Object.fromEntries(
    COMPETITOR_DIMENSIONS.map((dim, i) => [dim, vals[i]])
  );
}

export const COMPETITORS: Competitor[] = [
  {
    id: "kimi_now",
    name: "Kimi (current)",
    shortName: "Kimi Now",
    color: "#00d4ff",
    isKimi: true,
    // BenchLM K3: overall 80.78 (#5), AG=74, CO=80. Long context: 1M-token spec.
    scores: buildScores([4.8, 4.8, 5.0, 3.6, 5.0, 1.5, 2.4, 2.8, 2.0, 2.0]),
    notes:
      "Kimi K3 — BenchLM rank #5 (80.78 BenchAlign). AG=74, CO=80. 1M-token context window (specification, unmatched in open weights). EU hosting not yet live; enterprise controls and trust compliance to be built out.",
  },
  {
    id: "kimi_target",
    name: "Kimi (target — 2027)",
    shortName: "Kimi Target",
    color: "#a855f7",
    isKimi: true,
    isKimiTarget: true,
    scores: buildScores([5.0, 4.9, 5.0, 4.2, 5.0, 5.0, 4.6, 4.0, 4.5, 4.0]),
    notes:
      "Forward projection to end-2027. Assumes K4/K5 frontier parity, EU hosting live, enterprise SSO/RBAC, DPA templates, and GPAI compliance workstreams complete.",
  },
  {
    id: "openai",
    name: "OpenAI / GPT",
    shortName: "OpenAI",
    color: "#10b981",
    // BenchLM GPT-5.6 Sol: overall 82.39 (#4), AG=69, CO=80, RE=85, MA=97
    scores: buildScores([4.9, 4.6, 4.4, 3.4, 2.0, 4.5, 5.0, 5.0, 4.7, 4.0]),
    notes:
      "GPT-5.6 Sol — BenchLM rank #4 (82.39 BenchAlign). AG=69, CO=80, RE=85. Dominant distribution. Strong enterprise controls via Azure EU regions. Closed weights.",
  },
  {
    id: "anthropic",
    name: "Anthropic / Claude",
    shortName: "Anthropic",
    color: "#f59e0b",
    // BenchLM Claude Fable 5: 83.32 (#2); Claude Opus 5: 83.24 (#3). AG=80, CO=82, RE=84, KN=97
    scores: buildScores([5.0, 4.9, 4.4, 3.2, 1.5, 4.3, 4.8, 4.6, 5.0, 4.2]),
    notes:
      "Claude Fable 5 / Opus 5 — BenchLM rank #2/#3 (83.24–83.32). Best AG=80, CO=82, KN=97. Agentic coding leader. Premium pricing. Via AWS EU regions. Closed weights.",
  },
  {
    id: "google",
    name: "Google / Gemini",
    shortName: "Google",
    color: "#3b82f6",
    // BenchLM Gemini 3.6 Flash: overall 75.84 (#10), AG=38, CO=66, KN=69. Flash model — Pro would rank higher.
    scores: buildScores([4.5, 3.2, 4.6, 4.3, 2.0, 4.7, 5.0, 5.0, 4.8, 4.5]),
    notes:
      "Gemini 3.6 Flash — BenchLM rank #10 (75.84). Flash model: AG=38, CO=66 (Pro model would score higher on agentic). Strong EU cloud footprint (GCP). Best multimodal. Competitive Flash pricing.",
  },
  {
    id: "mistral",
    name: "Mistral AI",
    shortName: "Mistral",
    color: "#ef4444",
    // Not in BenchLM top 25 — scores are analyst estimates
    scores: buildScores([4.0, 4.1, 4.0, 5.0, 5.0, 5.0, 4.5, 3.8, 4.8, 5.0]),
    notes:
      "Not in BenchLM top 25 (Sept 2026) — frontier quality and capability scores are analyst estimates. French company, EU-native. Best EU hosting story. Open weights (Apache 2.0). Price leader. Home turf advantage in France/Germany.",
  },
  {
    id: "qwen",
    name: "Alibaba / Qwen",
    shortName: "Qwen",
    color: "#06b6d4",
    // BenchLM Qwen3.8 Max: overall 79.4 (#7), AG=75, CO=67, RE=96 (top!), IF=94
    scores: buildScores([4.8, 4.4, 5.0, 4.7, 5.0, 3.7, 3.2, 4.0, 3.1, 2.8]),
    notes:
      "Qwen3.8 Max — BenchLM rank #7 (79.4). RE=96 (top performer — LongBench v2, MRCRv2), IF=94, AG=75. Open weights. China-origin data concern. Limited EU go-to-market infrastructure.",
  },
  {
    id: "deepseek",
    name: "DeepSeek",
    shortName: "DeepSeek",
    color: "#8b5cf6",
    // Not in BenchLM top 25 — scores are analyst estimates
    scores: buildScores([4.1, 4.3, 4.2, 5.0, 5.0, 2.5, 2.5, 3.8, 2.5, 2.5]),
    notes:
      "Not in BenchLM top 25 (Sept 2026) — capability scores are analyst estimates. Price leader on open weights. China-origin trust concern. Limited EU infrastructure or enterprise controls.",
  },
];

export const getCompetitor = (id: string): Competitor | undefined =>
  COMPETITORS.find((c) => c.id === id);

export const DEFAULT_SELECTED_COMPETITORS = [
  "kimi_now",
  "kimi_target",
  "anthropic",
  "mistral",
];
