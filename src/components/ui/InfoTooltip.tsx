'use client';

import * as Tooltip from '@radix-ui/react-tooltip';
import { HelpCircle } from 'lucide-react';

interface InfoTooltipProps {
  text: string;
  size?: number;
}

export function InfoTooltip({ text, size = 13 }: InfoTooltipProps) {
  return (
    <Tooltip.Provider delayDuration={200}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <button
            type="button"
            className="inline-flex flex-shrink-0 rounded-full focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400"
            style={{ color: 'var(--lunar-text-muted)', verticalAlign: 'middle', lineHeight: 1 }}
            aria-label="More information"
          >
            <HelpCircle size={size} />
          </button>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            sideOffset={6}
            className="z-50 w-56 rounded-xl px-3 py-2 text-xs leading-relaxed shadow-xl"
            style={{
              background: 'var(--lunar-surface)',
              border: '1px solid var(--lunar-border-strong)',
              color: 'var(--lunar-text-secondary)',
            }}
          >
            {text}
            <Tooltip.Arrow style={{ fill: 'var(--lunar-border-strong)' }} />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
