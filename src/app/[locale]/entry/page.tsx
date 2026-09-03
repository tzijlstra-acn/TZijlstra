"use client";

import { Link } from "@/lib/navigation";
import { BookOpen, ArrowRight, Shield } from "lucide-react";

export default function EntryPage() {
  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4">
      <div className="max-w-xl w-full space-y-8 text-center">
        {/* Attribution */}
        <div className="space-y-1">
          <div
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: "var(--lunar-cyan)" }}
          >
            Independent candidate analysis
          </div>
          <h1
            className="text-3xl font-bold"
            style={{ color: "var(--lunar-text-primary)" }}
          >
            Kimi EU Strategy OS
          </h1>
          <p className="text-sm" style={{ color: "var(--lunar-text-secondary)" }}>
            Thomas Zijlstra · Independent candidate analysis · September 2026
          </p>
        </div>

        {/* Description */}
        <p
          className="text-sm leading-relaxed max-w-md mx-auto"
          style={{ color: "var(--lunar-text-secondary)" }}
        >
          A structured analysis of Kimi&apos;s European market entry, covering market
          sizing, country prioritization, regulatory requirements, GTM strategy,
          and a 90-day execution plan.
        </p>

        {/* Choice buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
          <Link
            href="/briefing"
            className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50"
            style={{
              background: "var(--lunar-cyan)",
              color: "#000",
            }}
          >
            <BookOpen size={16} aria-hidden="true" />
            Start 7-minute executive briefing
          </Link>
          <Link
            href="/"
            className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50"
            style={{
              background: "var(--lunar-elevated)",
              color: "var(--lunar-text-primary)",
              border: "1px solid var(--lunar-border-strong)",
            }}
          >
            Explore full analysis
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>

        {/* Disclaimer */}
        <div
          className="flex items-start gap-2 p-3 rounded-lg max-w-sm mx-auto"
          style={{
            background: "rgba(0,212,255,0.04)",
            border: "1px solid rgba(0,212,255,0.1)",
          }}
        >
          <Shield
            size={12}
            className="flex-shrink-0 mt-0.5"
            style={{ color: "var(--lunar-text-muted)" }}
            aria-hidden="true"
          />
          <p className="text-xs text-left" style={{ color: "var(--lunar-text-muted)" }}>
            Not commissioned or endorsed by Moonshot AI. Based on public information
            and illustrative assumptions.
          </p>
        </div>
      </div>
    </div>
  );
}
