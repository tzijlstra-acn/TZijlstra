"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "@/lib/navigation";
import { useAuthStore } from "@/store/auth";
import { AppShell } from "./AppShell";

/** Routes that bypass the auth gate (no shell, no redirect) */
const UNPROTECTED_PATHS = ["/gate"];

export function AuthGate({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const { isAuthenticated } = useAuthStore();
  const pathname = usePathname();
  const router = useRouter();
  const redirected = useRef(false);

  const isUnprotected = UNPROTECTED_PATHS.some((p) => pathname.startsWith(p));

  // Mark mounted after first client render — defers all auth logic to client side
  // so the initial render matches the server (which has no sessionStorage)
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (!isAuthenticated && !isUnprotected && !redirected.current) {
      redirected.current = true;
      const dest = pathname === "/" ? "/entry" : pathname;
      router.replace(`/gate?from=${encodeURIComponent(dest)}`);
    }
    if (isAuthenticated) redirected.current = false;
  }, [mounted, isAuthenticated, isUnprotected, pathname, router]);

  // Gate page: render children without shell (matches server)
  if (isUnprotected) {
    return <>{children}</>;
  }

  // Before hydration: render null — matches the server output
  if (!mounted) {
    return null;
  }

  // Client-only: redirect pending or not authenticated
  if (!isAuthenticated) {
    return null;
  }

  return <AppShell>{children}</AppShell>;
}
