import type { Account } from "./targetCompanies";

export interface AccountRadarScores {
  aiReceptivity: number;
  commercialFit: number;
  useCaseFit: number;
  techEcosystem: number;
  regulatoryReadiness: number;
  overall: number;
}

const SUBVERTICAL_RECEPTIVITY: Record<string, number> = {
  "DevTools & AI-Native SaaS": 9,
  "Enterprise Technology": 8,
  "Semiconductor & Deep Tech": 8,
  "HealthTech & Medical AI": 7,
  "FinTech & RegTech": 7,
  "Pharma & Life Sciences": 6,
  "Industrial & Manufacturing": 6,
  "Telco & Distribution Partners": 6,
  "Retail & Consumer": 6,
  "Aerospace & Defence": 5,
  "Enterprise Financial Services": 5,
  "Enterprise Insurance": 5,
  "Energy & Utilities": 5,
};

const SUBVERTICAL_USECASE_FIT: Record<string, number> = {
  "DevTools & AI-Native SaaS": 9,
  "FinTech & RegTech": 8,
  "Enterprise Financial Services": 8,
  "Pharma & Life Sciences": 8,
  "Enterprise Technology": 8,
  "HealthTech & Medical AI": 7,
  "Semiconductor & Deep Tech": 7,
  "Aerospace & Defence": 7,
  "Enterprise Insurance": 7,
  "Industrial & Manufacturing": 6,
  "Telco & Distribution Partners": 6,
  "Energy & Utilities": 6,
  "Retail & Consumer": 5,
};

const COUNTRY_TECH_ECOSYSTEM: Record<string, number> = {
  GB: 9,
  DE: 8,
  NL: 8,
  FR: 8,
  SE: 8,
  CH: 7,
  DK: 7,
  FI: 7,
  NO: 7,
  IE: 7,
  BE: 6,
  AT: 6,
  PL: 6,
  ES: 6,
  IT: 6,
  LU: 6,
  PT: 5,
  CZ: 5,
  HU: 5,
  RO: 5,
  GR: 5,
  US: 9,
};

const COUNTRY_REGULATORY_READINESS: Record<string, number> = {
  // EU member states — subject to EU AI Act
  DE: 8,
  FR: 8,
  NL: 8,
  SE: 8,
  FI: 8,
  DK: 7,
  AT: 7,
  BE: 7,
  IE: 7,
  IT: 7,
  ES: 7,
  PL: 6,
  CZ: 6,
  HU: 5,
  RO: 5,
  GR: 5,
  LU: 8,
  PT: 6,
  // Non-EU
  GB: 4,  // post-Brexit, FCA/MHRA, different framework
  CH: 5,  // nDSG, FINMA — not EU AI Act directly
  NO: 7,  // EEA — mirrors EU AI Act
  US: 3,
};

// Regulatory bonus for heavily regulated subverticals (already compliance-minded)
const SUBVERTICAL_REGULATORY_BONUS: Record<string, number> = {
  "Enterprise Financial Services": 2,
  "Enterprise Insurance": 2,
  "FinTech & RegTech": 2,
  "Pharma & Life Sciences": 1,
  "HealthTech & Medical AI": 1,
  "Aerospace & Defence": 1,
};

function clamp(n: number, min = 0, max = 10): number {
  return Math.min(max, Math.max(min, Math.round(n)));
}

export function computeAccountScores(account: Account): AccountRadarScores {
  const country = account.iso2[0] ?? "EU";
  const sv = account.subVertical;

  // AI Receptivity — how open is this company to AI adoption?
  const baseReceptivity = SUBVERTICAL_RECEPTIVITY[sv] ?? 6;
  const tierReceptivityBonus = account.tier === 1 ? 0.5 : account.tier === 3 ? -1 : 0;
  const aiReceptivity = clamp(baseReceptivity + tierReceptivityBonus);

  // Commercial Fit — how well does Kimi's offer match their procurement?
  const tierCommercial = account.tier === 1 ? 8.5 : account.tier === 2 ? 6.5 : 4.5;
  const highAcvCountries = ["CH", "DE", "NL", "GB", "SE", "NO"];
  const countryCommercialBonus = highAcvCountries.includes(country) ? 0.5 : 0;
  const commercialFit = clamp(tierCommercial + countryCommercialBonus);

  // Use-Case Fit — how directly do Kimi K3 capabilities address their workflows?
  const baseUseCaseFit = SUBVERTICAL_USECASE_FIT[sv] ?? 6;
  const tierUseCaseBonus = account.tier === 1 ? 0.5 : account.tier === 3 ? -1 : 0;
  const useCaseFit = clamp(baseUseCaseFit + tierUseCaseBonus);

  // Tech Ecosystem — strength of AI/tech ecosystem in their country/city
  const techEcosystem = clamp(COUNTRY_TECH_ECOSYSTEM[country] ?? 6);

  // Regulatory Readiness — alignment with EU AI Act compliance journey
  const baseReg = COUNTRY_REGULATORY_READINESS[country] ?? 6;
  const svRegBonus = SUBVERTICAL_REGULATORY_BONUS[sv] ?? 0;
  const regulatoryReadiness = clamp(baseReg + svRegBonus);

  // Weighted overall score
  const overall = clamp(
    aiReceptivity * 0.20 +
    commercialFit * 0.25 +
    useCaseFit * 0.25 +
    techEcosystem * 0.15 +
    regulatoryReadiness * 0.15
  );

  return { aiReceptivity, commercialFit, useCaseFit, techEcosystem, regulatoryReadiness, overall };
}
