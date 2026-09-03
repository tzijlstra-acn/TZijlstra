"use client";

import { Link } from "@/lib/navigation";
import { BookOpen, ArrowRight, Shield, ExternalLink } from "lucide-react";
import { useTranslations } from "next-intl";

export default function EntryPage() {
  const t = useTranslations("entry");

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4">
      <div className="max-w-xl w-full space-y-8 text-center">
        {/* Attribution */}
        <div className="space-y-1">
          <div
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: "var(--lunar-cyan)" }}
          >
            {t("eyebrow")}
          </div>
          <h1
            className="text-3xl font-bold"
            style={{ color: "var(--lunar-text-primary)" }}
          >
            {t("title")}
          </h1>
          <p className="text-sm" style={{ color: "var(--lunar-text-secondary)" }}>
            {t("subtitle")}
          </p>
          <a
            href="https://tzijlstra-acn.github.io/CV/cv.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs hover:underline focus:outline-none focus-visible:ring-1 rounded mt-1"
            style={{ color: "var(--lunar-text-muted)" }}
          >
            {t("cvLink")}
            <ExternalLink size={10} aria-hidden="true" />
            <span className="sr-only">(opens in new tab)</span>
          </a>
        </div>

        {/* Description */}
        <p
          className="text-sm leading-relaxed max-w-md mx-auto"
          style={{ color: "var(--lunar-text-secondary)" }}
        >
          {t("body")}
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
            {t("startBriefing")}
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
            {t("exploreAnalysis")}
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
            {t("disclaimer")}
          </p>
        </div>
      </div>
    </div>
  );
}
