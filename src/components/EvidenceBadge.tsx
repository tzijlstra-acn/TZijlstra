"use client";

import * as Popover from "@radix-ui/react-popover";
import { getSource } from "@/data/sources";
import { X, ExternalLink } from "lucide-react";

type EvidenceType =
  | "FACT"
  | "MODEL"
  | "ASSUMPTION"
  | "RECOMMENDATION"
  | "OPEN QUESTION";

interface EvidenceBadgeProps {
  type: EvidenceType;
  sourceId?: string;
  formula?: string;
  reasoning?: string;
  className?: string;
}

const TYPE_CLASSES: Record<EvidenceType, string> = {
  FACT: "badge-fact",
  MODEL: "badge-model",
  ASSUMPTION: "badge-assumption",
  RECOMMENDATION: "badge-recommendation",
  "OPEN QUESTION": "badge-open-question",
};

export function EvidenceBadge({
  type,
  sourceId,
  formula,
  reasoning,
  className,
}: EvidenceBadgeProps) {
  const source = sourceId ? getSource(sourceId) : undefined;
  const hasContent = !!(source || formula || reasoning);

  // No popover content — just render a static badge
  if (!hasContent) {
    return (
      <span
        className={`${TYPE_CLASSES[type]} ${className || ""}`}
        aria-label={type}
      >
        {type}
      </span>
    );
  }

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button
          className={`${TYPE_CLASSES[type]} ${className || ""} cursor-pointer`}
          aria-label={`${type} — click for source details`}
          type="button"
        >
          {type}
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className="w-72 p-3 rounded-lg z-[200] text-xs shadow-xl"
          style={{
            background: "var(--lunar-panel)",
            border: "1px solid var(--lunar-border-strong)",
            color: "var(--lunar-text-primary)",
          }}
          sideOffset={6}
          collisionPadding={12}
        >
          {/* Header row */}
          <div className="flex items-start justify-between mb-2">
            <span className={TYPE_CLASSES[type]}>{type}</span>
            <Popover.Close
              className="p-0.5 rounded hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-1"
              aria-label="Close"
              style={{ color: "var(--lunar-text-muted)" }}
            >
              <X size={12} aria-hidden="true" />
            </Popover.Close>
          </div>

          {/* Source metadata */}
          {source && (
            <div className="mb-2 space-y-0.5">
              <div
                className="font-semibold"
                style={{ color: "var(--lunar-cyan)" }}
              >
                {sourceId}: {source.title}
              </div>
              <div style={{ color: "var(--lunar-text-secondary)" }}>
                {source.publisher}
                {source.retrievalDate ? ` · ${source.retrievalDate}` : ""}
              </div>
              {source.excerpt && (
                <div className="mt-1" style={{ color: "var(--lunar-text-muted)" }}>
                  {source.excerpt}
                </div>
              )}
              {source.url && (
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 flex items-center gap-1 hover:underline focus:outline-none focus-visible:ring-1 rounded"
                  style={{ color: "var(--lunar-cyan)" }}
                >
                  View source{" "}
                  <ExternalLink size={10} aria-hidden="true" />
                  <span className="sr-only">(opens in new tab)</span>
                </a>
              )}
            </div>
          )}

          {/* Formula */}
          {formula && (
            <div
              className="font-mono mt-1 px-2 py-1 rounded text-xs"
              style={{
                background: "var(--lunar-elevated)",
                color: "var(--lunar-violet)",
              }}
            >
              {formula}
            </div>
          )}

          {/* Reasoning */}
          {reasoning && (
            <div
              className="mt-1"
              style={{ color: "var(--lunar-text-secondary)" }}
            >
              {reasoning}
            </div>
          )}

          <Popover.Arrow
            style={{ fill: "var(--lunar-border-strong)" }}
            width={10}
            height={5}
          />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
