# Kimi EU Strategy OS

An interactive strategic analysis dashboard for Moonshot AI's European market entry — built as a candidate discussion prototype by Thomas Zijlstra.

## Important framing

**This is an independent candidate analysis based on public information. It is not commissioned or endorsed by Moonshot AI.** All financial figures, market estimates, and scenarios are illustrative assumptions, not validated Moonshot AI data or commitments.

Live deployment is password-gated for controlled presentation access. The password is not stored in this repository. See the Security note below for setup.

## What this dashboard contains

- **Executive Briefing** — A 6-scene linear presentation covering proposition, why now, beachhead markets, economics, red-team risks, and 90-day execution plan
- **Executive Cockpit** — Strategic overview with KPIs, revenue scenario chart, compliance status, and priority countries
- **Strategic Thesis** — Core principles, competitive moat analysis, and commercialization hypotheses
- **Market Sizing Lab** — TAM/SAM/SOM calculator with editable assumptions (TAM ~€31.5B by 2030)
- **Country Navigator** — 9 priority markets scored and sequenced, with comparison and sequencing views
- **Competition Arena** — Competitor positioning and capability mapping
- **Go-to-Market Playbooks** — GTM motions, pilot design, partner-led motion
- **Regulatory & Trust Center** — AI Act, GDPR, DORA compliance workstream tracker
- **90-Day Thesis** — Thomas Zijlstra's 30/60/90-day plan as European Market Entry Lead
- **Revenue & Financials** — Detailed financial model with editable assumptions
- **Risk Register** — 12 risks with severity, likelihood, mitigation, and owner
- **Partner Ecosystem**, **Organization & Skills**, **Roadmap & Stage Gates**, **Source Library**, **Board Memo**, **Decision Log**

## Recommended usage flow

1. Open the live URL (or run locally at http://localhost:3000/en)
2. Enter the session password at the gate
3. Select **Start 7-minute executive briefing** on the welcome screen
4. Navigate scenes with Next/Previous buttons or ← → arrow keys
5. After the briefing, select **Explore full analysis** for deep dives

## Scenario presets

The top bar shows three scenario presets:
- **Proof** (conservative): €250M revenue by 2030, 1.9% SAM share
- **Base**: €550M revenue by 2030, 4.1% SAM share
- **Scale** (upside): €950M revenue by 2030, 7.2% SAM share

All assumptions are editable in the Market Sizing Lab and Financials pages.

## Local development

```bash
npm install
npm run dev
```

Opens at http://localhost:3000/en. Without `NEXT_PUBLIC_GATE_PASS_HASH` set, any non-empty password is accepted (development mode — a console warning is logged).

### Production build

```bash
npm run build
```

Output is in `./out/` as a static site ready for GitHub Pages.

### Type checking

```bash
npx tsc --noEmit
```

### Linting

```bash
npm run lint
```

## Repository structure

```
src/
  app/[locale]/           — Next.js pages (locale-prefixed routes)
    gate/                 — Password gate page (no sidebar/nav)
    entry/                — Post-auth welcome page
    briefing/             — 6-scene executive briefing
    (all other routes)    — Market, countries, competition, etc.
  components/
    layout/               — AppShell, Sidebar, TopBar, AuthGate
    EvidenceBadge.tsx     — Source citation popover
    CommandPalette.tsx    — Cmd+K command palette
  store/
    index.ts              — Main Zustand store (persisted to localStorage)
    auth.ts               — Auth store (sessionStorage, clears on tab close)
  data/                   — Static data files (strategy, market, risks, etc.)
  i18n/                   — next-intl configuration
messages/
  en.json                 — English strings
  zh-CN.json              — Simplified Chinese strings
tests/e2e/                — Playwright end-to-end tests
.github/workflows/        — CI/CD (lint, type-check, build, GitHub Pages deploy)
```

## Methodology and limitations

- Market sizing (TAM/SAM/SOM) is built from a transparent formula model combining five EU AI spend pools. Sources are cited inline with evidence badges (FACT / MODEL / ASSUMPTION / RECOMMENDATION).
- Financial scenarios (Proof/Base/Scale) are illustrative ranges, not Moonshot AI projections. All assumptions are editable in the dashboard.
- Country scoring uses a composite of GDP, AI readiness index, and regulatory complexity — documented in the Country Navigator.
- All risk assessments are the candidate's independent judgment based on public regulatory and market information.
- This analysis was produced in August 2026. Market conditions, regulatory status, and Moonshot AI's actual plans may differ significantly.

## Security note

The gate uses a SHA-256 hash of the session password stored as an environment variable:

```
NEXT_PUBLIC_GATE_PASS_HASH=<sha256-hex-of-password>
```

Set this as a GitHub repository secret (`NEXT_PUBLIC_GATE_PASS_HASH`) for the deployment workflow. The password itself never appears in the codebase or build artifacts.

For local development without this variable set, any non-empty password is accepted (development mode).

Auth state is stored in `sessionStorage` — it clears when the browser tab is closed. The **Lock dashboard** button in the sidebar clears auth immediately and redirects to the gate.

---

## Separate project: NFR AI Cost Estimator

The file `index.html` in this repository is an unrelated single-file tool:

> An interactive, single-file presentation tool that estimates the cost of a **shared enterprise AI platform** serving Non-Financial Risk (NFR) and adjacent functions, for DACH banking, insurance, healthcare and telecom clients.
>
> Everything is contained in **`index.html`** — no build step, no dependencies to install. Open it directly in a browser or run `python3 -m http.server`.
>
> Includes: industry/region/currency selection, scenario picker, vendor-neutral model routing, "What drives it", "18-month gains", "One question" and "Models & math" views, and PDF exports.
>
> **All numbers are illustrative planning placeholders**, not measured values. This tool is **not an offer, proposal, quotation or commitment**.
