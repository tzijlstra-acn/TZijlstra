'use client';

import { useState } from 'react';
import { ACCOUNTS, Account } from '@/data/targetCompanies';
import { CompanyLogo } from '@/components/ui/CompanyLogo';
import { FlagIcon } from '@/components/ui/FlagIcon';
import { ProspectRadar } from '@/components/ui/ProspectRadar';
import { ChevronRight, X } from 'lucide-react';

// ── Tier colours ───────────────────────────────────────────────────────────────
const TIER_COLORS: Record<number, string> = {
  1: 'var(--lunar-green)',
  2: 'var(--lunar-cyan)',
  3: 'var(--lunar-amber)',
};

const TIER_LABELS: Record<number, string> = {
  1: 'Immediate Priority',
  2: 'Secondary',
  3: 'Longer Arc',
};

// ── Short labels for the filter rail ──────────────────────────────────────────
const VERTICAL_SHORT: Record<string, string> = {
  'DevTools & AI-Native SaaS':             'DevTools & AI SaaS',
  'System Integrators':                    'System Integrators',
  'LegalTech & Contract Intelligence':     'LegalTech',
  'RegTech & Compliance Automation':       'RegTech',
  'AI-Native Startups':                    'AI-Native Startups',
  'Enterprise Financial Services':         'Enterprise FinServ',
  'Enterprise Insurance':                  'Enterprise Insurance',
  'Enterprise Technology':                 'Enterprise Tech',
  'Semiconductor & Deep Tech':             'Semiconductor',
  'HealthTech & Medical AI':               'HealthTech',
  'Pharma & Life Sciences':                'Pharma & Life Sci',
  'Aerospace & Defence':                   'Aerospace & Defence',
  'Industrial & Manufacturing':            'Industrial',
  'Telco & Distribution Partners':         'Telco & Partners',
  'Energy & Utilities':                    'Energy & Utilities',
  'Mid-Market Banks & Fintechs':           'Banks & Fintechs',
  'Biotech & Research-Stage Pharma':       'Biotech & Pharma',
  'Research Universities':                 'Research Univ.',
  'Retail & Consumer':                     'Retail & Consumer',
  'Large Enterprises (Self-Hosted)':       'Large Enterprise',
  'Government-Adjacent / Sovereign Cloud': 'Sovereign Cloud',
};

// ── Sub-vertical list (stable order — tier 1 subverticals first) ──────────────
const ALL_SUB_VERTICALS = [...new Set(ACCOUNTS.map(a => a.subVertical))];

// ── Page ───────────────────────────────────────────────────────────────────────
export default function ProspectsPage() {
  const [tierFilter, setTierFilter] = useState<1 | 2 | 3 | 'all'>('all');
  const [verticalFilter, setVerticalFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'tier' | 'name' | 'vertical'>('tier');
  const [selected, setSelected] = useState<Account | null>(null);

  const filtered = ACCOUNTS
    .filter(a => tierFilter === 'all' || a.tier === tierFilter)
    .filter(a => verticalFilter === 'all' || a.subVertical === verticalFilter)
    .sort((a, b) => {
      if (sortBy === 'tier') return a.tier - b.tier || a.name.localeCompare(b.name);
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return a.subVertical.localeCompare(b.subVertical) || a.tier - b.tier;
    });

  function filterBtn(active: boolean) {
    return {
      background: active ? 'rgba(0,212,255,0.1)' : 'transparent',
      color: active ? 'var(--lunar-cyan)' : 'var(--lunar-text-muted)',
      border: active ? '1px solid rgba(0,212,255,0.2)' : '1px solid transparent',
    } as React.CSSProperties;
  }

  return (
    <div className="flex flex-col space-y-4 max-w-[1600px] mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold" style={{ color: 'var(--lunar-text-primary)' }}>
          Prospect Intelligence
        </h1>
        <p className="text-sm mt-1" style={{ color: 'var(--lunar-text-secondary)' }}>
          {ACCOUNTS.length} accounts across Europe: enterprise anchors and API pipeline, unified by strategic tier
        </p>
      </div>

      {/* 3-Panel Layout */}
      <div className="grid grid-cols-[200px_1fr_280px] gap-4">

        {/* LEFT RAIL — filters */}
        <div className="flex flex-col gap-3">
          {/* Tier */}
          <div className="lunar-card p-3">
            <div className="stat-label mb-2">Priority Tier</div>
            <div className="flex flex-col gap-1">
              {(['all', 1, 2, 3] as const).map(t => (
                <button
                  key={t}
                  onClick={() => setTierFilter(t)}
                  className="text-xs px-2 py-1.5 rounded text-left"
                  style={filterBtn(tierFilter === t)}
                  aria-pressed={tierFilter === t}
                >
                  {t === 'all' ? 'All tiers' : `T${t}: ${TIER_LABELS[t]}`}
                </button>
              ))}
            </div>
          </div>

          {/* Sub-vertical — scrollable, non-truncating */}
          <div className="lunar-card p-3 flex flex-col min-h-0">
            <div className="stat-label mb-2">Sub-Vertical</div>
            <div className="flex flex-col gap-1 overflow-y-auto" style={{ maxHeight: '340px' }}>
              <button
                onClick={() => setVerticalFilter('all')}
                className="text-xs px-2 py-1.5 rounded text-left"
                style={filterBtn(verticalFilter === 'all')}
                aria-pressed={verticalFilter === 'all'}
              >
                All segments
              </button>
              {ALL_SUB_VERTICALS.map(v => (
                <button
                  key={v}
                  onClick={() => setVerticalFilter(v)}
                  className="text-xs px-2 py-1.5 rounded text-left leading-tight"
                  style={filterBtn(verticalFilter === v)}
                  aria-pressed={verticalFilter === v}
                >
                  {VERTICAL_SHORT[v] ?? v}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* CENTER — Table */}
        <div className="lunar-card p-0 overflow-hidden flex flex-col">
          <div
            className="flex items-center justify-between px-4 py-3 border-b flex-shrink-0"
            style={{ borderColor: 'var(--lunar-border-subtle)' }}
          >
            <span className="text-sm font-semibold" style={{ color: 'var(--lunar-text-primary)' }}>
              {filtered.length} Prospect{filtered.length !== 1 ? 's' : ''}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xs" style={{ color: 'var(--lunar-text-muted)' }}>Sort:</span>
              {(['tier', 'name', 'vertical'] as const).map(s => (
                <button
                  key={s}
                  onClick={() => setSortBy(s)}
                  className="text-xs px-2 py-1 rounded capitalize"
                  style={filterBtn(sortBy === s)}
                  aria-pressed={sortBy === s}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div className="overflow-y-auto" style={{ maxHeight: '65vh' }}>
            <table className="w-full text-sm" role="table" aria-label="Qualified prospect accounts">
              <thead className="sticky top-0" style={{ background: 'var(--lunar-surface)' }}>
                <tr style={{ borderBottom: '1px solid var(--lunar-border-subtle)' }}>
                  <th className="text-left px-4 py-2 font-medium text-xs" style={{ color: 'var(--lunar-text-muted)' }}>Company</th>
                  <th className="text-left px-3 py-2 font-medium text-xs" style={{ color: 'var(--lunar-text-muted)' }}>Location</th>
                  <th className="text-left px-3 py-2 font-medium text-xs hidden lg:table-cell" style={{ color: 'var(--lunar-text-muted)' }}>Sub-Vertical</th>
                  <th className="text-left px-3 py-2 font-medium text-xs" style={{ color: 'var(--lunar-text-muted)' }}>Tier</th>
                  <th className="text-left px-3 py-2 font-medium text-xs hidden xl:table-cell" style={{ color: 'var(--lunar-text-muted)' }}>Focus Point</th>
                  <th className="w-6 px-3 py-2" />
                </tr>
              </thead>
              <tbody>
                {filtered.map(a => {
                  const primaryISO2 = a.iso2[0] ?? '';
                  const isSelected = selected?.name === a.name;
                  const tierColor = TIER_COLORS[a.tier];
                  return (
                    <tr
                      key={a.name}
                      className="cursor-pointer transition-colors hover:bg-white/5"
                      style={{
                        borderBottom: '1px solid var(--lunar-border-subtle)',
                        background: isSelected ? 'rgba(0,212,255,0.05)' : undefined,
                      }}
                      onClick={() => setSelected(isSelected ? null : a)}
                      role="row"
                      aria-selected={isSelected}
                      tabIndex={0}
                      onKeyDown={e => e.key === 'Enter' && setSelected(isSelected ? null : a)}
                    >
                      {/* Company — logo + name */}
                      <td className="px-4 py-2.5">
                        <div className="flex items-center gap-2.5">
                          <CompanyLogo domain={a.domain} name={a.name} size={28} />
                          <span className="font-medium" style={{ color: 'var(--lunar-text-primary)' }}>
                            {a.name}
                          </span>
                        </div>
                      </td>
                      {/* Location */}
                      <td className="px-3 py-2.5">
                        <div className="flex items-center gap-1.5">
                          {primaryISO2 && <FlagIcon iso2={primaryISO2} size={14} />}
                          <span className="text-xs" style={{ color: 'var(--lunar-text-secondary)' }}>
                            {primaryISO2}
                          </span>
                        </div>
                      </td>
                      {/* Sub-vertical */}
                      <td className="px-3 py-2.5 hidden lg:table-cell">
                        <span className="text-xs" style={{ color: 'var(--lunar-text-muted)' }}>
                          {VERTICAL_SHORT[a.subVertical] ?? a.subVertical}
                        </span>
                      </td>
                      {/* Tier badge */}
                      <td className="px-3 py-2.5">
                        <span
                          className="text-xs px-2 py-0.5 rounded-full whitespace-nowrap"
                          style={{ background: `${tierColor}18`, color: tierColor }}
                        >
                          T{a.tier}
                        </span>
                      </td>
                      {/* Focus Point */}
                      <td className="px-3 py-2.5 hidden xl:table-cell" style={{ maxWidth: '200px' }}>
                        <span className="text-xs" style={{ color: 'var(--lunar-text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block' }}>
                          {a.useCases[0]}
                        </span>
                      </td>
                      {/* Chevron */}
                      <td className="px-3 py-2.5 text-center">
                        <ChevronRight
                          size={14}
                          style={{ color: isSelected ? 'var(--lunar-cyan)' : 'var(--lunar-text-muted)' }}
                          aria-hidden="true"
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="flex flex-col gap-3">
          {selected ? (
            <div
              className="lunar-card overflow-y-auto"
              style={{ border: `1px solid ${TIER_COLORS[selected.tier]}40`, maxHeight: '75vh' }}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    <CompanyLogo domain={selected.domain} name={selected.name} size={36} />
                  </div>
                  <div>
                    <div className="font-bold text-base leading-tight" style={{ color: 'var(--lunar-text-primary)' }}>
                      {selected.name}
                    </div>
                    <div className="text-xs mt-0.5 flex items-center gap-1" style={{ color: 'var(--lunar-text-muted)' }}>
                      {selected.iso2[0] && <FlagIcon iso2={selected.iso2[0]} size={12} />}
                      {selected.iso2.join(' · ')}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="p-1 rounded hover:opacity-70 flex-shrink-0"
                  style={{ color: 'var(--lunar-text-muted)' }}
                  aria-label="Close"
                >
                  <X size={14} />
                </button>
              </div>

              {/* Tier + vertical */}
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{ background: `${TIER_COLORS[selected.tier]}18`, color: TIER_COLORS[selected.tier] }}
                >
                  Tier {selected.tier}: {TIER_LABELS[selected.tier]}
                </span>
              </div>
              <div className="text-xs mb-3 font-medium" style={{ color: 'var(--lunar-text-muted)' }}>
                {selected.subVertical}
              </div>

              {/* Pitch */}
              <div
                className="p-3 rounded-lg mb-4 text-xs"
                style={{ background: 'rgba(0,212,255,0.04)', border: '1px solid rgba(0,212,255,0.12)' }}
              >
                <div className="font-semibold mb-1" style={{ color: 'var(--lunar-cyan)' }}>Pitch</div>
                <div style={{ color: 'var(--lunar-text-secondary)' }}>{selected.pitch}</div>
              </div>

              {/* Focus Points */}
              <div className="stat-label mb-2">Focus Points</div>
              <div className="space-y-1.5 mb-4">
                {selected.useCases.map((uc, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2 text-xs p-2 rounded"
                    style={{ background: 'var(--lunar-elevated)', border: '1px solid var(--lunar-border-subtle)' }}
                  >
                    <span
                      className="flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center font-bold"
                      style={{
                        background: `${TIER_COLORS[selected.tier]}18`,
                        color: TIER_COLORS[selected.tier],
                        fontSize: '0.6rem',
                        lineHeight: 1,
                      }}
                    >
                      {i + 1}
                    </span>
                    <span style={{ color: 'var(--lunar-text-secondary)' }}>{uc}</span>
                  </div>
                ))}
              </div>

              {/* Account Score Radar */}
              <div
                className="p-3 rounded-xl"
                style={{ background: 'var(--lunar-elevated)', border: '1px solid var(--lunar-border-subtle)' }}
              >
                <ProspectRadar account={selected} />
              </div>
            </div>
          ) : (
            /* Tier summary */
            <div className="lunar-card">
              <div className="stat-label mb-3">Tier Breakdown</div>
              <div className="space-y-3">
                {([1, 2, 3] as const).map(t => {
                  const count = ACCOUNTS.filter(a => a.tier === t).length;
                  const isActive = tierFilter === t;
                  return (
                    <button
                      key={t}
                      onClick={() => setTierFilter(isActive ? 'all' : t)}
                      className="w-full flex items-center gap-3 p-2 rounded-lg text-left hover:bg-white/5 transition-colors"
                      style={{ border: '1px solid var(--lunar-border-subtle)' }}
                      aria-pressed={isActive}
                    >
                      <span
                        className="text-xs px-2 py-0.5 rounded-full font-mono"
                        style={{ background: `${TIER_COLORS[t]}18`, color: TIER_COLORS[t] }}
                      >
                        T{t}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-medium" style={{ color: 'var(--lunar-text-primary)' }}>
                          {TIER_LABELS[t]}
                        </div>
                        <div className="text-xs" style={{ color: 'var(--lunar-text-muted)' }}>
                          {count} accounts
                        </div>
                      </div>
                      <span className="text-sm font-mono font-bold" style={{ color: TIER_COLORS[t] }}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
              <div className="mt-3 text-xs" style={{ color: 'var(--lunar-text-muted)' }}>
                Click any row to see the full pitch and focus points
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
