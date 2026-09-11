import { defineConfig } from "@playwright/test";

const liveUrl = process.env.PORTFOLIO_TEST_URL;
const baseURL = liveUrl ?? "http://127.0.0.1:4175/portfolio/";

export default defineConfig({
  testDir: "./tests",
  testMatch: "frontend.spec.ts",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  workers: 2,
  timeout: 30_000,
  expect: { timeout: 8_000 },
  outputDir: "tmp/playwright-results",
  reporter: "list",
  use: {
    baseURL,
    browserName: "chromium",
    channel: process.platform === "win32" ? "msedge" : undefined,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  projects: [
    { name: "desktop", use: { viewport: { width: 1440, height: 900 } } },
    { name: "mobile", use: { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true } },
    { name: "tablet", use: { viewport: { width: 900, height: 900 }, hasTouch: true } },
  ],
  webServer: liveUrl ? undefined : {
    command: "node tests/static-server.mjs",
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 15_000,
  },
});
