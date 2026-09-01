"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useRouter } from "@/lib/navigation";
import { useAuthStore } from "@/store/auth";
import { useSearchParams } from "next/navigation";

async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function GateForm() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { login, isAuthenticated } = useAuthStore();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "/entry";

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.replace(from);
    }
  }, [isAuthenticated, router, from]);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!password.trim()) return;
    setSubmitting(true);
    setError("");

    try {
      const expectedHash = process.env.NEXT_PUBLIC_GATE_PASS_HASH;

      if (!expectedHash) {
        // Development mode: no hash configured — accept any non-empty password
        console.warn(
          "[Gate] NEXT_PUBLIC_GATE_PASS_HASH not set — development mode, any password accepted"
        );
        login();
        router.replace(from);
        return;
      }

      const inputHash = await hashPassword(password);
      if (inputHash === expectedHash) {
        login();
        router.replace(from);
      } else {
        setError("Incorrect password. Please try again.");
        setPassword("");
        inputRef.current?.focus();
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "var(--lunar-bg)" }}
    >
      <div className="w-full max-w-sm">
        {/* Brand mark */}
        <div className="flex flex-col items-center mb-8">
          <div className="kimi-mark mb-4" aria-hidden="true" />
          <h1
            className="text-lg font-bold tracking-widest uppercase"
            style={{ color: "var(--lunar-text-primary)" }}
          >
            Moonshot AI
          </h1>
          <p className="text-xs mt-1" style={{ color: "var(--lunar-text-muted)" }}>
            Kimi EU Strategy OS · Protected presentation
          </p>
        </div>

        <div
          className="p-6 rounded-xl"
          style={{
            background: "var(--lunar-surface)",
            border: "1px solid var(--lunar-border-strong)",
          }}
        >
          <p
            className="text-xs text-center mb-6"
            style={{ color: "var(--lunar-text-secondary)" }}
          >
            This is a password-protected candidate analysis. Enter the session
            password to continue.
          </p>

          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-1">
              <label
                htmlFor="gate-password"
                className="block text-xs font-medium mb-1.5"
                style={{ color: "var(--lunar-text-secondary)" }}
              >
                Session password
              </label>
              <input
                id="gate-password"
                ref={inputRef}
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                className="w-full px-3 py-2.5 rounded-lg text-sm outline-none transition-all focus-visible:ring-2 focus-visible:ring-cyan-400/50"
                style={{
                  background: "var(--lunar-elevated)",
                  border: `1px solid ${error ? "var(--lunar-red)" : "var(--lunar-border-strong)"}`,
                  color: "var(--lunar-text-primary)",
                }}
                placeholder="Enter password"
                disabled={submitting}
                aria-invalid={!!error}
                aria-describedby="gate-error"
              />
            </div>

            {/* Accessible error feedback */}
            <div
              id="gate-error"
              role="alert"
              aria-live="assertive"
              className="mb-4 mt-2 text-xs min-h-[1.25rem]"
              style={{ color: "var(--lunar-red)" }}
            >
              {error}
            </div>

            <button
              type="submit"
              disabled={submitting || !password.trim()}
              className="w-full py-2.5 rounded-lg text-sm font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50"
              style={{
                background: "var(--lunar-cyan)",
                color: "#000",
                opacity: submitting || !password.trim() ? 0.6 : 1,
                cursor: submitting || !password.trim() ? "not-allowed" : "pointer",
              }}
            >
              {submitting ? "Verifying…" : "Enter"}
            </button>
          </form>
        </div>

        <p
          className="text-xs text-center mt-6"
          style={{ color: "var(--lunar-text-muted)" }}
        >
          Independent candidate analysis · Not commissioned or endorsed by Moonshot AI
        </p>
      </div>
    </div>
  );
}

export default function GatePage() {
  return (
    <Suspense
      fallback={
        <div
          className="min-h-screen flex items-center justify-center"
          style={{ background: "var(--lunar-bg)" }}
        >
          <div className="kimi-mark" aria-hidden="true" />
        </div>
      }
    >
      <GateForm />
    </Suspense>
  );
}
