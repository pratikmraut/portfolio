import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function loadWorker() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker;
}

const environment = {
  ASSETS: {
    fetch: async () => new Response("Not found", { status: 404 }),
  },
};

const executionContext = {
  waitUntil() {},
  passThroughOnException() {},
};

test("server-renders Pratik Raut's portfolio", async () => {
  const worker = await loadWorker();
  const response = await worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    environment,
    executionContext,
  );

  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  assert.equal(response.headers.get("x-content-type-options"), "nosniff");
  assert.equal(response.headers.get("x-frame-options"), "DENY");
  assert.match(response.headers.get("content-security-policy") ?? "", /frame-ancestors 'none'/);

  const html = await response.text();
  assert.match(html, /<title>Pratik Raut \| Backend Engineer<\/title>/i);
  assert.match(html, /Backend systems for the/);
  assert.match(html, /150\+/);
  assert.match(html, /Oracle FLEXCUBE/);
  assert.match(html, /HireME/);
  assert.match(html, /Interactive portfolio terminal/);
  assert.match(html, /pratik-hacker-portrait\.webp/);
  assert.match(html, /pr-favicon\.svg/);
  assert.match(html, /Identity verified/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|taking shape/i);
});

test("serves a live portfolio status endpoint", async () => {
  const worker = await loadWorker();
  const response = await worker.fetch(
    new Request("http://localhost/api/status", { headers: { accept: "application/json" } }),
    environment,
    executionContext,
  );

  assert.equal(response.status, 200);
  const body = await response.json();
  assert.equal(body.ok, true);
  assert.equal(body.service, "pratik-raut-portfolio");
  assert.match(body.requestId, /^[0-9a-f-]{36}$/i);
  assert.ok(!Number.isNaN(Date.parse(body.serverTime)));
});

test("removes all disposable starter preview code", async () => {
  const [page, layout, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(page, /<Terminal \/>/);
  assert.match(layout, /Pratik Raut \| Backend Engineer/);
  assert.doesNotMatch(layout, /next\/font|codex-preview|Starter Project/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  await assert.rejects(access(new URL("../app/_sites-preview", import.meta.url)));
});
