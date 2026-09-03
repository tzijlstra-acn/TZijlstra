"use client";

import { useState } from "react";
import { usePathname } from "@/lib/navigation";
import { Link } from "@/lib/navigation";
import { useRouter } from "@/lib/navigation";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth";
import {
  LayoutDashboard,
  Target,
  BarChart2,
  Globe,
  Swords,
  Route,
  Trophy,
  Shield,
  Users,
  Calendar,
  Building2,
  TrendingUp,
  AlertTriangle,
  Package,
  Lightbulb,
  BookOpen,
  FileText,
  CheckSquare,
  ChevronDown,
  ChevronRight,
  Presentation,
  LogOut,
  Crosshair,
} from "lucide-react";

interface SidebarProps {
  open: boolean;
  isMobile?: boolean;
  onNavClick?: () => void;
}

function SectionHeader({ label, open }: { label: string; open: boolean }) {
  if (!open)
    return (
      <div
        className="my-1 border-t"
        style={{ borderColor: "var(--lunar-border-subtle)" }}
      />
    );
  return (
    <div className="px-3 pt-3 pb-1">
      <span
        className="text-xs font-semibold uppercase tracking-widest"
        style={{ color: "var(--lunar-text-muted)", fontSize: "0.6rem" }}
      >
        {label}
      </span>
    </div>
  );
}

export function Sidebar({ open, isMobile = false, onNavClick }: SidebarProps) {
  const pathname = usePathname();
  const [appendixOpen, setAppendixOpen] = useState(false);
  const { logout } = useAuthStore();
  const router = useRouter();

  function handleLock() {
    logout();
    router.replace("/gate");
    if (onNavClick) onNavClick();
  }

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  const executiveItems = [
    { href: "/briefing" as const, label: "Executive Briefing", icon: Presentation },
    { href: "/" as const, label: "Executive Cockpit", icon: LayoutDashboard },
    { href: "/strategy" as const, label: "Strategic Thesis", icon: Target },
  ];

  const strategyItems = [
    { href: "/market" as const, label: "Market Sizing Lab", icon: BarChart2 },
    { href: "/countries" as const, label: "Country Navigator", icon: Globe },
    { href: "/competition" as const, label: "Competition Arena", icon: Swords },
    { href: "/gtm" as const, label: "Go-to-Market", icon: Route },
    { href: "/prospects" as const, label: "Prospect Intelligence", icon: Crosshair },
    { href: "/90-days" as const, label: "90-Day Thesis", icon: Trophy },
  ];

  const appendixItems = [
    { href: "/regulation" as const, label: "Regulatory & Trust", icon: Shield },
    { href: "/partners" as const, label: "Partner Ecosystem", icon: Users },
    { href: "/roadmap" as const, label: "Roadmap & Gates", icon: Calendar },
    { href: "/organization" as const, label: "Organization", icon: Building2 },
    { href: "/financials" as const, label: "Financials", icon: TrendingUp },
    { href: "/risks" as const, label: "Risk Register", icon: AlertTriangle },
    { href: "/portfolio" as const, label: "Product & Revenue", icon: Package },
    { href: "/use-cases" as const, label: "Use-Case Atlas", icon: Lightbulb },
    { href: "/sources" as const, label: "Source Library", icon: BookOpen },
    { href: "/memo" as const, label: "Leadership Memo", icon: FileText },
    { href: "/decisions" as const, label: "Decision Log", icon: CheckSquare },
  ];

  // Check if any appendix item is active (to auto-open appendix)
  const anyAppendixActive = appendixItems.some((item) => isActive(item.href));

  function NavItem({
    href,
    label,
    icon: Icon,
    small = false,
  }: {
    href: string;
    label: string;
    icon: React.ElementType;
    small?: boolean;
  }) {
    const active = isActive(href);
    return (
      <Link
        href={href as Parameters<typeof Link>[0]["href"]}
        onClick={onNavClick}
        className={cn(
          "nav-item mb-0.5",
          active && "active",
          !open && "justify-center",
          small && open && "py-1"
        )}
        aria-label={!open ? label : undefined}
        aria-current={active ? "page" : undefined}
      >
        <Icon
          size={small ? 13 : 16}
          className="flex-shrink-0"
          aria-hidden="true"
        />
        {open && (
          <span
            className={cn("flex-1 truncate", small ? "text-xs" : "text-sm")}
            style={
              small
                ? { color: active ? undefined : "var(--lunar-text-muted)" }
                : undefined
            }
          >
            {label}
          </span>
        )}
      </Link>
    );
  }

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-full flex flex-col transition-all duration-200 pointer-events-auto",
        "border-r",
        isMobile
          ? cn("z-50 w-52", open ? "translate-x-0" : "-translate-x-full")
          : cn("z-40", open ? "w-52" : "w-14")
      )}
      style={{
        background: "var(--lunar-surface)",
        borderColor: "var(--lunar-border-subtle)",
        zIndex: isMobile ? 50 : 40,
      }}
      aria-label="Main navigation"
      role={isMobile ? "dialog" : undefined}
      aria-modal={isMobile ? true : undefined}
    >
      {/* Logo */}
      <div
        className="flex items-center gap-3 px-3 py-4 border-b"
        style={{ borderColor: "var(--lunar-border-subtle)" }}
      >
        <img
          src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/logos/moonshot-wordmark.svg`}
          alt="Moonshot AI"
          aria-hidden={open ? undefined : true}
          style={{ height: open ? 16 : 20, opacity: 0.9, flexShrink: 0 }}
        />
        {open && (
          <div>
            <div
              className="text-xs font-medium"
              style={{ color: "var(--lunar-text-muted)" }}
            >
              EU Strategy OS
            </div>
            <div className="mt-1.5 flex items-center gap-1.5">
              <div
                className="flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center font-bold"
                style={{
                  background: "rgba(0,212,255,0.15)",
                  border: "1px solid rgba(0,212,255,0.35)",
                  color: "var(--lunar-cyan)",
                  fontSize: "0.42rem",
                  lineHeight: 1,
                }}
                aria-hidden="true"
              >
                TZ
              </div>
              <span style={{ color: "var(--lunar-text-muted)", fontSize: "0.6rem" }}>
                Thomas Zijlstra · Candidate
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-hidden relative">
        <nav className="h-full overflow-y-auto py-3 px-2" aria-label="Pages">
          {/* EXECUTIVE */}
          <SectionHeader label="EXECUTIVE" open={open} />
          {executiveItems.map((item) => (
            <NavItem key={item.href} {...item} />
          ))}

          {/* STRATEGY */}
          <SectionHeader label="STRATEGY" open={open} />
          {strategyItems.map((item) => (
            <NavItem key={item.href} {...item} />
          ))}

          {/* APPENDIX — collapsible */}
          <div className="mt-1">
            {open ? (
              <button
                onClick={() => setAppendixOpen((v) => !v)}
                className="w-full flex items-center justify-between px-3 pt-3 pb-1 focus:outline-none"
                aria-expanded={appendixOpen || anyAppendixActive}
              >
                <span
                  className="text-xs font-semibold uppercase tracking-widest"
                  style={{ color: "var(--lunar-text-muted)", fontSize: "0.6rem" }}
                >
                  APPENDIX
                </span>
                {appendixOpen || anyAppendixActive ? (
                  <ChevronDown size={10} style={{ color: "var(--lunar-text-muted)" }} />
                ) : (
                  <ChevronRight size={10} style={{ color: "var(--lunar-text-muted)" }} />
                )}
              </button>
            ) : (
              <div
                className="my-1 border-t"
                style={{ borderColor: "var(--lunar-border-subtle)" }}
              />
            )}

            {(appendixOpen || anyAppendixActive || !open) && (
              <div>
                {appendixItems.map((item) => (
                  <NavItem key={item.href} {...item} small={open} />
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Bottom scroll-fade indicator */}
        <div
          className="absolute bottom-0 left-0 right-0 h-8 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, transparent, var(--lunar-surface))",
          }}
          aria-hidden="true"
        />
      </div>

      {/* Lock Dashboard button */}
      <div
        className="border-t px-2 py-3"
        style={{ borderColor: "var(--lunar-border-subtle)" }}
      >
        <button
          onClick={handleLock}
          className={cn(
            "nav-item w-full mb-0",
            !open && "justify-center"
          )}
          style={{ color: "var(--lunar-red)" }}
          aria-label="Lock dashboard and return to gate"
          title="Lock dashboard"
        >
          <LogOut size={16} className="flex-shrink-0" aria-hidden="true" />
          {open && (
            <span className="text-sm">Lock dashboard</span>
          )}
        </button>
      </div>
    </aside>
  );
}
