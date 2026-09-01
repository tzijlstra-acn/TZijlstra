'use client';

import { useState } from 'react';

interface CompanyLogoProps {
  domain?: string;
  name: string;
  size?: number;
  className?: string;
}

function logoSources(domain: string): string[] {
  return [
    `https://logo.clearbit.com/${domain}`,
    `https://cdn.brandfetch.io/${domain}/w/400/h/400/logo`,
    `https://www.google.com/s2/favicons?domain=${domain}&sz=128`,
  ];
}

export function CompanyLogo({ domain, name, size = 32, className }: CompanyLogoProps) {
  const sources = domain ? logoSources(domain) : [];
  const [idx, setIdx] = useState(0);

  const failed = idx >= sources.length;

  if (!failed) {
    return (
      <div
        style={{ width: size, height: size, flexShrink: 0, borderRadius: 6, overflow: 'hidden' }}
        className={className}
      >
        <img
          src={sources[idx]}
          alt={name}
          width={size}
          height={size}
          style={{ width: size, height: size, objectFit: 'contain', background: 'white', padding: 2 }}
          onError={() => setIdx(i => i + 1)}
        />
      </div>
    );
  }

  // Absolute last resort — subtle box, no text
  return (
    <div
      style={{
        width: size,
        height: size,
        flexShrink: 0,
        borderRadius: 6,
        background: 'var(--lunar-elevated)',
        border: '1px solid var(--lunar-border-subtle)',
      }}
      className={className}
    />
  );
}
