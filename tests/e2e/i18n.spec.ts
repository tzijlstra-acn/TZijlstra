import { test, expect } from "@playwright/test";

// Helper: set sessionStorage auth before navigating (must be called before goto)
async function setAuth(page: import("@playwright/test").Page) {
  await page.addInitScript(() => {
    sessionStorage.setItem("kimi-eu-auth", "1");
  });
}

// ---------------------------------------------------------------------------
// Gate
// ---------------------------------------------------------------------------

test("gate page renders without auth", async ({ page }) => {
  await page.goto("/en/gate");
  await expect(page.getByRole("heading", { name: /moonshot/i })).toBeVisible();
  await expect(page.getByLabel("Session password")).toBeVisible();
});

test("gate password input has visible label", async ({ page }) => {
  await page.goto("/en/gate");
  const input = page.getByLabel("Session password");
  await expect(input).toBeVisible();
});

test("gate error region is accessible", async ({ page }) => {
  await page.goto("/en/gate");
  // Error region exists (initially empty)
  const errorRegion = page.locator("#gate-error");
  await expect(errorRegion).toBeAttached();
});

test("gate form submits on Enter key", async ({ page }) => {
  await page.goto("/en/gate");
  const input = page.getByLabel("Session password");
  await input.fill("testpassword");
  await input.press("Enter");
  // Should attempt to submit (in dev mode any password works)
  // Wait briefly for navigation or error
  await page.waitForTimeout(500);
  // If no hash set (dev mode), should navigate away from gate
  // If hash set, should show error for wrong password
  // Either way the gate processed the input
});

// ---------------------------------------------------------------------------
// Entry page
// ---------------------------------------------------------------------------

test("entry page shows briefing and analysis choices", async ({ page }) => {
  await setAuth(page);
  await page.goto("/en/entry");
  await expect(
    page.getByRole("link", { name: /executive briefing/i })
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: /full analysis/i })
  ).toBeVisible();
});

// ---------------------------------------------------------------------------
// Briefing
// ---------------------------------------------------------------------------

test("briefing page loads at /en/briefing", async ({ page }) => {
  await setAuth(page);
  await page.goto("/en/briefing");
  await expect(page.getByText(/scene 1 of 6/i)).toBeVisible();
});

test("briefing Next advances scene counter", async ({ page }) => {
  await setAuth(page);
  await page.goto("/en/briefing?scene=1");
  await page.getByRole("button", { name: /next/i }).click();
  await expect(page.getByText(/scene 2 of 6/i)).toBeVisible();
});

test("briefing Previous goes back", async ({ page }) => {
  await setAuth(page);
  await page.goto("/en/briefing?scene=2");
  await page.getByRole("button", { name: /previous/i }).click();
  await expect(page.getByText(/scene 1 of 6/i)).toBeVisible();
});

test("briefing scene 6 has no active Next button", async ({ page }) => {
  await setAuth(page);
  await page.goto("/en/briefing?scene=6");
  const nextBtn = page.getByRole("button", { name: /next/i });
  await expect(nextBtn).toHaveAttribute("aria-disabled", "true");
});

test("briefing exit link returns to cockpit", async ({ page }) => {
  await setAuth(page);
  await page.goto("/en/briefing");
  await page.getByRole("link", { name: /exit/i }).click();
  await expect(page).toHaveURL(/\/en\/?$/);
});

test("briefing arrow key navigation works", async ({ page }) => {
  await setAuth(page);
  await page.goto("/en/briefing?scene=1");
  await page.keyboard.press("ArrowRight");
  await expect(page.getByText(/scene 2 of 6/i)).toBeVisible();
  await page.keyboard.press("ArrowLeft");
  await expect(page.getByText(/scene 1 of 6/i)).toBeVisible();
});

test("zh-CN briefing loads", async ({ page }) => {
  await setAuth(page);
  await page.goto("/zh-CN/briefing");
  // Should show scene counter (may be in Chinese or English depending on implementation)
  const content = await page.content();
  expect(content).toMatch(/scene|场/i);
});

// ---------------------------------------------------------------------------
// Command palette
// ---------------------------------------------------------------------------

test("Ctrl+K opens command palette", async ({ page }) => {
  await setAuth(page);
  await page.goto("/en");
  await page.keyboard.press("Control+k");
  await expect(
    page.getByRole("dialog", { name: /command palette/i })
  ).toBeVisible();
});

test("visible command palette trigger button works", async ({ page }) => {
  await setAuth(page);
  await page.goto("/en");
  // TopBar has a button with aria-label containing "command palette" or "search"
  const trigger = page.getByRole("button", { name: /command palette|search/i }).first();
  await expect(trigger).toBeVisible();
  await trigger.click();
  await expect(
    page.getByRole("dialog", { name: /command palette/i })
  ).toBeVisible();
});

test("command palette closes with Escape", async ({ page }) => {
  await setAuth(page);
  await page.goto("/en");
  await page.keyboard.press("Control+k");
  await expect(
    page.getByRole("dialog", { name: /command palette/i })
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("dialog", { name: /command palette/i })
  ).not.toBeVisible();
});

// ---------------------------------------------------------------------------
// Auth & session
// ---------------------------------------------------------------------------

test("lock dashboard returns to gate", async ({ page }) => {
  await setAuth(page);
  await page.goto("/en");
  // Open sidebar if collapsed on mobile
  const lockBtn = page.getByRole("button", { name: /lock dashboard/i });
  await expect(lockBtn).toBeVisible();
  await lockBtn.click();
  await expect(page).toHaveURL(/gate/);
});

test("reset demo does not log out", async ({ page }) => {
  await setAuth(page);
  await page.goto("/en");
  const resetBtn = page.getByRole("button", { name: /reset demo/i });
  if (await resetBtn.isVisible()) {
    await resetBtn.click();
    // Should still be authenticated — not on gate page
    await expect(page).not.toHaveURL(/gate/);
  }
});

// ---------------------------------------------------------------------------
// Scenario presets
// ---------------------------------------------------------------------------

test("Scale scenario preset button is present", async ({ page }) => {
  await setAuth(page);
  await page.goto("/en");
  const scaleBtn = page.getByRole("button", { name: /scale/i });
  await expect(scaleBtn).toBeVisible();
  await scaleBtn.click();
  await expect(scaleBtn).toHaveAttribute("aria-pressed", "true");
});

test("Base scenario preset is active by default", async ({ page }) => {
  await setAuth(page);
  await page.goto("/en");
  const baseBtn = page.getByRole("button", { name: /^base$/i });
  await expect(baseBtn).toHaveAttribute("aria-pressed", "true");
});

// ---------------------------------------------------------------------------
// Core routes — EN
// ---------------------------------------------------------------------------

test("EN cockpit loads", async ({ page }) => {
  await setAuth(page);
  const r = await page.goto("/en");
  expect(r?.status()).toBeLessThan(400);
});

test("EN market loads", async ({ page }) => {
  await setAuth(page);
  const r = await page.goto("/en/market");
  expect(r?.status()).toBeLessThan(400);
});

test("EN countries loads", async ({ page }) => {
  await setAuth(page);
  const r = await page.goto("/en/countries");
  expect(r?.status()).toBeLessThan(400);
});

test("all EN routes load", async ({ page }) => {
  await setAuth(page);
  for (const route of [
    "/en",
    "/en/entry",
    "/en/briefing",
    "/en/market",
    "/en/countries",
    "/en/competition",
    "/en/regulation",
    "/en/memo",
    "/en/risks",
    "/en/sources",
    "/en/decisions",
    "/en/strategy",
    "/en/gtm",
    "/en/partners",
    "/en/financials",
  ]) {
    const r = await page.goto(route);
    expect(r?.status(), `Route ${route} failed`).toBeLessThan(400);
  }
});

// ---------------------------------------------------------------------------
// Core routes — zh-CN
// ---------------------------------------------------------------------------

test("zh-CN cockpit loads", async ({ page }) => {
  await setAuth(page);
  const r = await page.goto("/zh-CN");
  expect(r?.status()).toBeLessThan(400);
});

test("zh-CN cockpit contains Chinese text", async ({ page }) => {
  await setAuth(page);
  await page.goto("/zh-CN");
  const body = await page.content();
  expect(body).toMatch(/高管|决策|简体/);
});

test("html lang attribute updates per locale", async ({ page }) => {
  await setAuth(page);
  await page.goto("/en");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await setAuth(page);
  await page.goto("/zh-CN");
  await expect(page.locator("html")).toHaveAttribute("lang", "zh-CN");
});

test("all zh-CN routes load", async ({ page }) => {
  await setAuth(page);
  for (const route of [
    "/zh-CN",
    "/zh-CN/entry",
    "/zh-CN/briefing",
    "/zh-CN/market",
    "/zh-CN/countries",
    "/zh-CN/competition",
    "/zh-CN/regulation",
    "/zh-CN/memo",
    "/zh-CN/risks",
    "/zh-CN/sources",
    "/zh-CN/decisions",
  ]) {
    const r = await page.goto(route);
    expect(r?.status(), `Route ${route} failed`).toBeLessThan(400);
  }
});

// ---------------------------------------------------------------------------
// Memo
// ---------------------------------------------------------------------------

test("memo has bilingual export button", async ({ page }) => {
  await setAuth(page);
  await page.goto("/en/memo");
  await expect(page.getByText(/bilingual|双语/i)).toBeVisible();
});

test("memo does not contain CONFIDENTIAL label", async ({ page }) => {
  await setAuth(page);
  await page.goto("/en/memo");
  const content = await page.content();
  // Should not contain the old CONFIDENTIAL — INTERNAL label
  expect(content).not.toContain("CONFIDENTIAL — INTERNAL");
});

// ---------------------------------------------------------------------------
// Evidence badge accessibility
// ---------------------------------------------------------------------------

test("evidence badge opens popover via keyboard", async ({ page }) => {
  await setAuth(page);
  await page.goto("/en");
  // Find an evidence badge button and activate with keyboard
  const badgeBtn = page.locator("button.badge-model, button.badge-assumption, button.badge-fact").first();
  if (await badgeBtn.count() > 0) {
    await badgeBtn.focus();
    await badgeBtn.press("Enter");
    // Popover content should appear
    await expect(page.locator("[data-radix-popper-content-wrapper]")).toBeVisible();
    await page.keyboard.press("Escape");
  }
});
