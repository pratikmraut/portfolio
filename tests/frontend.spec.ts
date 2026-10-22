import { readFile } from "node:fs/promises";
import { expect, test, type Page } from "@playwright/test";

const sections = [
  ["Impact", "impact"],
  ["Experience", "experience"],
  ["Projects", "projects"],
  ["Stack", "stack"],
  ["Contact", "contact"],
] as const;

const expectedProjects = [
  ["Payment Operations Investigator", "https://github.com/pratikmraut/payment-operations-investigator"],
  ["AutoPay Guard", "https://github.com/pratikmraut/autopay-guard"],
  ["HireME", "https://github.com/pratikmraut/inside-eye"],
  ["Visitor Authorization System", "https://github.com/pratikmraut/authorised-visitor-validation"],
] as const;

async function expectSection(page: Page, id: string) {
  await expect(page).toHaveURL(new RegExp(`#${id}$`));
  const section = page.locator(`#${id}`);
  await expect(section).toBeFocused();
  const heading = section.getByRole("heading").first();
  await expect(heading).toBeInViewport({ ratio: 1 });
  // A sticky top navigation must not cover the destination heading.
  await expect.poll(async () => {
    const headingBox = await heading.boundingBox();
    const railBox = await page.getByRole("complementary", { name: "Portfolio navigation" }).boundingBox();
    const width = page.viewportSize()!.width;
    const headerBottom = railBox && railBox.width > width * 0.9 ? railBox.y + railBox.height : 0;
    return (headingBox?.y ?? -1) >= headerBottom - 1;
  }).toBe(true);
}

function recordUnexpectedNavigation(page: Page) {
  const requests: string[] = [];
  const errors: string[] = [];
  page.on("request", (request) => {
    const url = new URL(request.url());
    if (
      (request.isNavigationRequest() && request.frame() === page.mainFrame()) ||
      url.pathname.endsWith(".rsc") ||
      url.searchParams.has("_rsc") ||
      request.headers().rsc === "1"
    ) requests.push(request.url());
  });
  page.on("pageerror", (error) => errors.push(error.message));
  return { requests, errors };
}

test.beforeEach(async ({ page, baseURL }) => {
  await page.goto(baseURL!, { waitUntil: "networkidle" });
});

test("initial load renders its assets and hydrates without browser errors", async ({ page }) => {
  const origin = new URL(page.url()).origin;
  const assetTypes = new Set(["image", "stylesheet", "script", "font"]);
  const failures: string[] = [];
  const errors: string[] = [];
  page.on("requestfailed", (request) => {
    if (new URL(request.url()).origin === origin && assetTypes.has(request.resourceType())) {
      failures.push(`${request.url()}: ${request.failure()?.errorText}`);
    }
  });
  page.on("response", (response) => {
    if (new URL(response.url()).origin === origin && assetTypes.has(response.request().resourceType()) && response.status() >= 400) {
      failures.push(`${response.status()} ${response.url()}`);
    }
  });
  page.on("pageerror", (error) => errors.push(error.message));
  const response = await page.reload({ waitUntil: "networkidle" });
  expect(response?.status()).toBe(200);
  const portrait = page.getByRole("img", { name: "Hacker-style portrait of Pratik Raut" });
  await expect.poll(() => portrait.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
  await page.getByRole("button", { name: "help", exact: true }).click();
  await expect(page.getByRole("log")).toContainText("whoami");
  expect(failures).toEqual([]);
  expect(errors).toEqual([]);
});

test("all navigation links scroll, repeat, and preserve the loaded page", async ({ page }) => {
  const observed = recordUnexpectedNavigation(page);
  const nav = page.getByRole("navigation", { name: "Main navigation" });
  await expect(nav).toBeVisible();
  for (const [label, id] of sections) {
    const link = nav.getByRole("link", { name: new RegExp(`${label}$`) });
    await link.click();
    await expectSection(page, id);
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await link.click();
    await expectSection(page, id);
  }
  await page.getByRole("link", { name: "Pratik Raut, home" }).click();
  await expect(page).toHaveURL(/#top$/);
  await expect(page.locator("#hero-title")).toBeInViewport({ ratio: 1 });
  expect(observed.requests).toEqual([]);
  expect(observed.errors).toEqual([]);
});

test("Back and Forward retain terminal input and command history", async ({ page }) => {
  const initialUrl = page.url();
  const log = page.getByRole("log");
  await page.getByRole("button", { name: "help", exact: true }).click();
  await expect(log).toContainText("whoami");
  await page.getByRole("textbox", { name: "Enter a portfolio command" }).fill("draft command");
  const observed = recordUnexpectedNavigation(page);
  const nav = page.getByRole("navigation", { name: "Main navigation" });
  await nav.getByRole("link", { name: /Projects$/ }).click();
  await expectSection(page, "projects");
  await nav.getByRole("link", { name: /Experience$/ }).click();
  await expectSection(page, "experience");
  await page.evaluate(() => history.back());
  await expectSection(page, "projects");
  await page.evaluate(() => history.forward());
  await expectSection(page, "experience");
  await page.evaluate(() => history.back());
  await expectSection(page, "projects");
  await page.evaluate(() => history.back());
  await expect(page).toHaveURL(initialUrl);
  await expect(page.locator("#top")).toBeFocused();
  await expect(page.locator("#hero-title")).toBeInViewport({ ratio: 1 });
  await expect(page.getByRole("textbox")).toHaveValue("draft command");
  await expect(log).toContainText("whoami");
  expect(observed.requests).toEqual([]);
  expect(observed.errors).toEqual([]);
});

test("hero experience call to action scrolls without a document navigation", async ({ page }) => {
  const observed = recordUnexpectedNavigation(page);
  await page.getByRole("link", { name: "View experience", exact: true }).click();
  await expectSection(page, "experience");
  expect(observed.requests).toEqual([]);
  expect(observed.errors).toEqual([]);
});

test("contact and certification links open their destinations in separate tabs", async ({ page, context }) => {
  // Validate our link behavior without depending on external sites or login pages.
  await context.route(/^https:\/\/(catalog-education\.oracle\.com|github\.com)\//, (route) =>
    route.fulfill({ status: 200, contentType: "text/html", body: "<title>External destination</title>" }),
  );
  const originalUrl = page.url();
  const observed = recordUnexpectedNavigation(page);
  const certifications = page.locator("#credentials").getByRole("link");
  await expect(certifications).toHaveCount(5);
  for (const certification of await certifications.all()) {
    await expect(certification).toHaveAttribute("href", /^https:\/\/catalog-education\.oracle\.com\/ords\/certview\/sharebadge\?id=[A-F0-9]{64}$/);
    await expect(certification).toHaveAttribute("target", "_blank");
  }
  const contact = page.locator("#contact");
  await expect(contact.getByRole("link", { name: /EMAIL/ })).toHaveAttribute("href", "mailto:pratikmraut.8@gmail.com");
  for (const name of ["LinkedIn", "GitHub", "LeetCode", "CodeChef"]) {
    await expect(contact.getByRole("link", { name: new RegExp(`^${name}`) })).toHaveAttribute("href", /^https:\/\//);
  }
  for (const link of [certifications.first(), contact.getByRole("link", { name: /^GitHub/ })]) {
    const destination = await link.getAttribute("href");
    const popupPromise = page.waitForEvent("popup");
    await link.click();
    const popup = await popupPromise;
    await expect(popup).toHaveURL(destination!);
    await popup.close();
    await expect(page).toHaveURL(originalUrl);
  }
  expect(observed.requests).toEqual([]);
  expect(observed.errors).toEqual([]);
});

test("direct fragment URLs reveal the right section", async ({ page, baseURL }) => {
  await page.goto("about:blank");
  await page.goto(new URL("#experience", baseURL).href, { waitUntil: "networkidle" });
  await expectSection(page, "experience");
});

test("four numbered projects show readable headings and open the correct repositories", async ({ page, context }) => {
  await context.route(/^https:\/\/github\.com\//, (route) =>
    route.fulfill({ status: 200, contentType: "text/html", body: "<title>Project repository</title>" }),
  );
  const cards = page.locator("#projects .project-card");
  await expect(cards).toHaveCount(expectedProjects.length);
  const observed = recordUnexpectedNavigation(page);
  const originalUrl = page.url();
  for (const [index, [name, url]] of expectedProjects.entries()) {
    const card = cards.nth(index);
    const heading = card.getByRole("heading", { name, exact: true });
    await expect(heading).toBeVisible();
    await expect(card.locator(".project-topline")).toContainText(`repo_${String(index + 1).padStart(2, "0")}`);
    await expect.poll(() => heading.evaluate((element: HTMLElement) =>
      element.scrollWidth <= element.clientWidth + 1 && element.scrollHeight <= element.clientHeight + 1,
    ), { message: `${name} is readable without clipping` }).toBe(true);
    await expect.poll(() => card.evaluate((element: HTMLElement) => {
      const cardBounds = element.getBoundingClientRect();
      // The intentionally clipped ::after decoration extends past the card.
      // Measure real content instead, including its own overflowing text.
      return Array.from(element.children).every((child) => {
        const content = child as HTMLElement;
        const bounds = content.getBoundingClientRect();
        return bounds.left >= cardBounds.left - 1 && bounds.right <= cardBounds.right + 1 &&
          bounds.top >= cardBounds.top - 1 && bounds.bottom <= cardBounds.bottom + 1 &&
          content.scrollWidth <= content.clientWidth + 1 && content.scrollHeight <= content.clientHeight + 1;
      });
    }), { message: `${name} content fits its card without clipping` }).toBe(true);
    const link = card.getByRole("link", { name: /View repository/ });
    await expect(link).toHaveAttribute("href", url);
    await expect(link).toHaveAttribute("target", "_blank");
    await expect(link).toHaveAttribute("rel", /\b(?:noopener|noreferrer)\b/);
    const popupPromise = page.waitForEvent("popup");
    await link.click();
    const popup = await popupPromise;
    await expect(popup).toHaveURL(url);
    await popup.close();
    await expect(page).toHaveURL(originalUrl);
  }
  expect(observed.requests).toEqual([]);
  expect(observed.errors).toEqual([]);
});

test("terminal commands respond and section commands navigate", async ({ page }) => {
  const log = page.getByRole("log");
  const input = page.getByRole("textbox", { name: "Enter a portfolio command" });
  const observed = recordUnexpectedNavigation(page);
  await page.getByRole("button", { name: "help", exact: true }).click();
  await expect(log).toContainText("whoami");
  await input.fill("not-a-command");
  await input.press("Enter");
  await expect(log).toContainText("command not found: not-a-command");
  await page.getByRole("button", { name: "status", exact: true }).click();
  await expect(log).toContainText("PORTFOLIO ONLINE");
  await input.fill("clear");
  await input.press("Enter");
  await expect(log).toBeEmpty();
  await page.getByRole("button", { name: "projects", exact: true }).click();
  await expectSection(page, "projects");
  await expect(log).toContainText("Opening selected repositories");
  expect(observed.requests).toEqual([]);
  expect(observed.errors).toEqual([]);
});

test("resume button downloads the intended PDF", async ({ page, request }) => {
  const expectedBytes = await readFile(new URL("../public/Pratik_Raut_Java_Backend_Engineer.pdf", import.meta.url));
  const link = page.getByRole("link", { name: "Download resume", exact: true });
  const href = await link.getAttribute("href");
  const response = await request.get(new URL(href!, page.url()).href);
  expect(response.status()).toBe(200);
  expect(response.headers()["content-type"]).toContain("application/pdf");
  const responseBytes = await response.body();
  expect(responseBytes.subarray(0, 5).toString()).toBe("%PDF-");
  expect(responseBytes.equals(expectedBytes), "Hosted PDF matches the current checked-in resume").toBe(true);
  const downloadPromise = page.waitForEvent("download");
  await link.click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe("Pratik_Raut_Java_Backend_Engineer.pdf");
  const downloadedFile = await download.path();
  expect(downloadedFile).toBeTruthy();
  const bytes = await readFile(downloadedFile!);
  expect(bytes.subarray(0, 5).toString()).toBe("%PDF-");
  expect(bytes.length).toBeGreaterThan(1_000);
  expect(bytes.equals(expectedBytes), "Downloaded PDF matches the current checked-in resume").toBe(true);
});

test("keyboard skip link moves focus into main content", async ({ page }) => {
  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: "Skip to main content" });
  await expect(skip).toBeFocused();
  await expect(skip).toBeInViewport({ ratio: 1 });
  await page.keyboard.press("Enter");
  await expect(page.locator("#main-content")).toBeFocused();
});

test("reduced motion navigation reaches the destination immediately", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  const nav = page.getByRole("navigation", { name: "Main navigation" });
  await nav.getByRole("link", { name: /Contact$/ }).click();
  const box = await page.locator("#contact-title").boundingBox();
  expect(box).not.toBeNull();
  expect(box!.y).toBeGreaterThanOrEqual(0);
  expect(box!.y + box!.height).toBeLessThanOrEqual(page.viewportSize()!.height);
});

test("page fits narrow phones, tablets, and wide desktop windows", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "Widths are covered once in a desktop browser context.");
  for (const width of [320, 390, 768, 900, 1024, 1280, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    await expect.poll(() => page.evaluate(() =>
      document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1,
    ), { message: `No page overflow at ${width}px` }).toBe(true);
    await expect(page.getByRole("navigation", { name: "Main navigation" })).toBeVisible();
    await expect.poll(() => page.locator("#projects .project-card h3").evaluateAll((headings) =>
      headings.every((heading) => heading.scrollWidth <= heading.clientWidth + 1 && heading.scrollHeight <= heading.clientHeight + 1),
    ), { message: `Project headings are not clipped at ${width}px` }).toBe(true);
  }
});

test("static hosting returns real 404s for missing assets", async ({ request, baseURL }, testInfo) => {
  test.skip(Boolean(process.env.PORTFOLIO_TEST_URL) || testInfo.project.name !== "desktop");
  const response = await request.get(new URL("missing-regression-check.rsc", baseURL).href);
  expect(response.status()).toBe(404);
  expect(await response.text()).not.toContain("<html");
});
