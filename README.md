# Moonshot AI EU Expansion: Candidate Strategy Exercise

Independent candidate analysis prepared by Thomas Zijlstra for a Business Builder and Ecosystem role at Moonshot AI.

## What this is

A structured hypothesis about how Moonshot AI might approach European market entry, covering market sizing, country prioritisation, regulatory compliance, go-to-market strategy, partner ecosystem design, and a 90-day operating plan. Built as an interactive dashboard with English and Simplified Chinese localisation.

## What this is not

- Moonshot AI's strategy or any internal view
- A commissioned or endorsed analysis
- A committed financial forecast
- Evidence of existing customer or partner relationships
- Legal advice

All financial scenarios are illustrative candidate models. All partner records are planning targets, not engaged relationships. All product and pricing references are candidate proposals or public information verified as of August 2026. Legal interpretations require qualified EU and UK counsel.

## Evidence taxonomy

Every data point in the application carries one of five labels:

| Label | Meaning |
|---|---|
| FACT | Verified external information with a cited source |
| MODEL | A calculation derived from stated assumptions — change the assumptions and the output changes |
| ASSUMPTION | A planning premise that requires validation before committing resources |
| RECOMMENDATION | Analyst or candidate judgment |
| OPEN QUESTION | An unresolved issue that must be answered before the phase ends |

All financial scenarios are candidate models, not committed forecasts.

## Recommended reviewer path (five minutes)

1. `/gate` — password gate
2. `/entry` — purpose and context
3. `/briefing` — six-scene executive briefing (arrow keys to advance)
4. `/90-days` — 90-day hypothesis with kill criteria
5. `/strategy` — strategic thesis and SWOT
6. `/sources` — evidence library

The full analysis (market sizing, country navigator, competition, regulation, partners, financials, risks, organisation, roadmap) is available via the sidebar.

## Architecture and stack

Next.js 15, TypeScript, Tailwind CSS, next-intl (English and Simplified Chinese), static export to GitHub Pages at `/TZijlstra`, Zustand for auth state, ECharts for charts, React Simple Maps for the map, Radix UI, Framer Motion.

## Local setup

```bash
npm install --legacy-peer-deps
npm run dev
```

The gate will fail open in development (any password accepted) when `NEXT_PUBLIC_GATE_PASS_HASH` is not set. This is intentional for local development.

## Deployment

Automatic via GitHub Actions on push to `main`. The `GATE_PASS_HASH` GitHub Actions secret must be set before deployment for the gate to enforce password protection. The secret value is the SHA-256 hex digest of the intended password:

```bash
echo -n "YourPassword" | sha256sum
```

## Security note

The password gate is a client-side session check. It does not make the repository source or the deployed static files confidential. This exercise contains only information that is safe for public exposure.

## AI-assistance disclosure

Claude was used as a research and implementation copilot throughout this exercise. The candidate selected the strategic questions, challenged assumptions, reviewed the evidence, and owns all conclusions. All strategic judgments are the candidate's own.

## Sources and evidence date

All sources are documented at `/sources`. URLs were verified accessible as of August 2026. Verify currency before use.
