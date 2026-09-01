'use client';

import dynamic from 'next/dynamic';
import { computeAccountScores } from '@/data/accountScoring';
import type { Account } from '@/data/targetCompanies';

const ReactECharts = dynamic(() => import('echarts-for-react'), { ssr: false });

const DIMENSION_LABELS = [
  'AI Receptivity',
  'Commercial Fit',
  'Use-Case Match',
  'Tech Ecosystem',
  'Regulatory\nReadiness',
];

interface ProspectRadarProps {
  account: Account;
}

export function ProspectRadar({ account }: ProspectRadarProps) {
  const scores = computeAccountScores(account);

  const values = [
    scores.aiReceptivity,
    scores.commercialFit,
    scores.useCaseFit,
    scores.techEcosystem,
    scores.regulatoryReadiness,
  ];

  const option = {
    backgroundColor: 'transparent',
    radar: {
      indicator: DIMENSION_LABELS.map((name) => ({ name, max: 10 })),
      shape: 'polygon',
      splitNumber: 5,
      axisName: {
        color: 'var(--lunar-text-muted, #6b7280)',
        fontSize: 10,
        fontFamily: 'inherit',
      },
      splitLine: {
        lineStyle: { color: 'rgba(255,255,255,0.06)' },
      },
      splitArea: {
        show: true,
        areaStyle: {
          color: ['rgba(0,212,255,0.03)', 'transparent'],
        },
      },
      axisLine: {
        lineStyle: { color: 'rgba(255,255,255,0.08)' },
      },
    },
    series: [
      {
        type: 'radar',
        data: [
          {
            value: values,
            name: account.name,
            areaStyle: { color: 'rgba(0,212,255,0.12)' },
            lineStyle: { color: '#00d4ff', width: 2 },
            itemStyle: { color: '#00d4ff' },
            symbol: 'circle',
            symbolSize: 5,
          },
        ],
      },
    ],
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(10,14,24,0.95)',
      borderColor: 'rgba(0,212,255,0.2)',
      textStyle: { color: '#e2e8f0', fontSize: 11 },
      formatter: () => {
        return [
          `<b>${account.name}</b>`,
          ...DIMENSION_LABELS.map((l, i) => `${l.replace('\n', ' ')}: <b>${values[i]}/10</b>`),
          `<hr style="border-color:rgba(255,255,255,0.1);margin:4px 0"/>`,
          `Overall: <b>${scores.overall}/10</b>`,
        ].join('<br/>');
      },
    },
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <div className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--lunar-text-muted)' }}>
          Account Score Radar
        </div>
        <div
          className="text-xs font-mono font-bold px-2 py-0.5 rounded"
          style={{ background: 'rgba(0,212,255,0.1)', color: 'var(--lunar-cyan)' }}
        >
          {scores.overall}/10 overall
        </div>
      </div>
      <ReactECharts option={option} style={{ height: 220 }} opts={{ renderer: 'svg' }} />
      <div className="grid grid-cols-5 gap-1 mt-1">
        {[
          { label: 'AI\nReceptivity', value: scores.aiReceptivity },
          { label: 'Commercial\nFit', value: scores.commercialFit },
          { label: 'Use-Case\nMatch', value: scores.useCaseFit },
          { label: 'Tech\nEcosystem', value: scores.techEcosystem },
          { label: 'Regulatory\nReadiness', value: scores.regulatoryReadiness },
        ].map(({ label, value }) => (
          <div key={label} className="text-center">
            <div className="text-xs font-bold" style={{ color: 'var(--lunar-cyan)' }}>{value}</div>
            <div className="text-[9px] leading-tight whitespace-pre-line" style={{ color: 'var(--lunar-text-muted)' }}>{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
