"use client";

import { useAppStore } from "@/store";
import type { ScenarioKey } from "@/data/market";
import { cn } from "@/lib/utils";
import {
  PanelLeft,
  Moon,
  Sun,
  Menu,
  Search,
  RotateCcw,
  Copy,
  Check,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "@/lib/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";

/** Scenario presets: Proof / Base / Scale map to conservative / base / upside */
const SCENARIOS: { key: ScenarioKey; label: string; color: string }[] = [
  { key: "conservative", label: "Proof", color: "#7a90b0" },
  { key: "base", label: "Base", color: "#00d4ff" },
  { key: "upside", label: "Scale", color: "#10b981" },
];

interface TopBarProps {
  onCommandPalette: () => void;
  isMobile?: boolean;
}

export function TopBar({ onCommandPalette, isMobile = false }: TopBarProps) {
  const {
    activeScenario,
    setScenario,
    setSidebarOpen,
    sidebarOpen,
    resetAll,
  } = useAppStore();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  useEffect(() => setMounted(true), []);

  const isOnBriefing = pathname.startsWith("/briefing");

  function handleResetDemo() {
    const changed = activeScenario !== "base";
    if (changed) {
      const ok = window.confirm(
        "Reset demo to defaults? This restores the Base scenario and all assumptions. Your session stays logged in."
      );
      if (!ok) return;
    }
    resetAll();
    if (isOnBriefing) {
      router.replace("/briefing?scene=1");
    }
  }

  async function handleCopyLink() {
    const base = window.location.origin + window.location.pathname;
    const scene = isOnBriefing
      ? (new URLSearchParams(window.location.search).get("scene") ?? "1")
      : "1";
    const url = isOnBriefing
      ? `${base}?scene=${scene}&scenario=${activeScenario}`
      : `${window.location.href.split("?")[0]}?scenario=${activeScenario}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore
    }
  }

  return (
    <header
      className="fixed top-0 right-0 z-30 flex items-center gap-2 px-3 py-2 border-b"
      style={{
        left: isMobile ? 0 : sidebarOpen ? "13rem" : "3.5rem",
        height: "3rem",
        background: "var(--lunar-surface)",
        borderColor: "var(--lunar-border-subtle)",
        transition: "left 0.2s",
      }}
      role="banner"
    >
      {/* Sidebar toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="p-1.5 rounded hover:bg-white/5 transition-colors flex-shrink-0"
        aria-label="Toggle sidebar"
        style={{ color: "var(--lunar-text-secondary)" }}
      >
        {isMobile ? <Menu size={18} /> : <PanelLeft size={16} />}
      </button>

      {/* Title */}
      <div className="hidden md:flex flex-col min-w-0 flex-shrink-0">
        <span
          className="text-xs font-bold tracking-widest uppercase whitespace-nowrap"
          style={{ color: "var(--lunar-text-muted)" }}
        >
          Moonshot AI · Kimi EU Strategy
        </span>
        <span
          className="text-xs whitespace-nowrap"
          style={{ color: "var(--lunar-text-muted)", fontSize: "0.6rem" }}
        >
          Thomas Zijlstra, Candidate Analysis, August 2026
        </span>
      </div>

      {/* Visible Cmd+K button */}
      <button
        onClick={onCommandPalette}
        className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-lg text-xs transition-colors hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50 flex-shrink-0"
        style={{
          background: "var(--lunar-elevated)",
          border: "1px solid var(--lunar-border-subtle)",
          color: "var(--lunar-text-muted)",
        }}
        aria-label="Open command palette (Ctrl+K or Cmd+K)"
      >
        <Search size={12} aria-hidden="true" />
        <span className="hidden lg:inline">Search or jump to…</span>
        <kbd
          className="font-mono text-xs px-1 py-0.5 rounded"
          style={{
            background: "var(--lunar-panel)",
            color: "var(--lunar-text-muted)",
            fontSize: "0.65rem",
          }}
        >
          ⌘K
        </kbd>
      </button>

      {/* Mobile search button */}
      <button
        onClick={onCommandPalette}
        className="sm:hidden p-1.5 rounded hover:bg-white/5 transition-colors"
        aria-label="Open command palette"
        style={{ color: "var(--lunar-text-secondary)" }}
      >
        <Search size={16} />
      </button>

      {/* Scenario selector */}
      <div
        className="flex items-center gap-0.5 p-0.5 rounded-lg flex-shrink-0"
        style={{
          background: "var(--lunar-elevated)",
          border: "1px solid var(--lunar-border-subtle)",
        }}
        role="group"
        aria-label="Revenue scenario preset"
      >
        {SCENARIOS.map((s) => (
          <button
            key={s.key}
            onClick={() => setScenario(s.key)}
            className={cn("px-2.5 py-1 rounded text-xs font-medium transition-all duration-150")}
            style={{
              background:
                activeScenario === s.key ? s.color + "22" : "transparent",
              color:
                activeScenario === s.key ? s.color : "var(--lunar-text-muted)",
              border:
                activeScenario === s.key
                  ? `1px solid ${s.color}44`
                  : "1px solid transparent",
            }}
            aria-pressed={activeScenario === s.key}
            title={`${s.label} scenario`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="flex-1" />

      {/* Reset Demo */}
      <button
        onClick={handleResetDemo}
        className="p-1.5 rounded hover:bg-white/5 transition-colors flex-shrink-0"
        aria-label="Reset demo to defaults"
        title="Reset demo"
        style={{ color: "var(--lunar-text-muted)" }}
      >
        <RotateCcw size={14} aria-hidden="true" />
      </button>

      {/* Copy briefing link */}
      <button
        onClick={handleCopyLink}
        className="p-1.5 rounded hover:bg-white/5 transition-colors flex-shrink-0"
        aria-label={copied ? "Link copied!" : "Copy briefing link"}
        title={copied ? "Copied!" : "Copy current link"}
        style={{ color: copied ? "var(--lunar-green)" : "var(--lunar-text-muted)" }}
      >
        {copied ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
      </button>

      {/* Language switcher */}
      <LanguageSwitcher />

      {/* Theme toggle */}
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="p-1.5 rounded hover:bg-white/5 transition-colors flex-shrink-0"
        aria-label="Toggle theme"
        style={{ color: "var(--lunar-text-secondary)" }}
      >
        {mounted && (theme === "dark" ? <Moon size={15} /> : <Sun size={15} />)}
      </button>
    </header>
  );
}
