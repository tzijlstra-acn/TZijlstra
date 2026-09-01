"use client";

import { useEffect, useRef } from "react";
import { useRouter, usePathname } from "@/lib/navigation";
import { useAuthStore } from "@/store/auth";
import { AppShell } from "./AppShell";

/** Routes that bypass the auth gate (no shell, no redirect) */
const UNPROTECTED_PATHS = ["/gate"];

export function AuthGate({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore();
  const pathname = usePathname(); // locale-stripped path from next-intl
  const router = useRouter();
  const redirected = useRef(false);

  const isUnprotected = UNPROTECTED_PATHS.some((p) => pathname.startsWith(p));

  useEffect(() => {
    if (!isAuthenticated && !isUnprotected && !redirected.current) {
      redirected.current = true;
      // Default landing after auth: /entry unless they were already headed somewhere specific
      const dest = pathname === "/" ? "/entry" : pathname;
      router.replace(`/gate?from=${encodeURIComponent(dest)}`);
    }
    // Reset flag if auth state changes
    if (isAuthenticated) redirected.current = false;
  }, [isAuthenticated, isUnprotected, pathname, router]);

  // Gate page renders without shell
  if (isUnprotected) {
    return <>{children}</>;
  }

  // Brief null while client-side redirect fires
  if (!isAuthenticated) {
    return null;
  }

  return <AppShell>{children}</AppShell>;
}
