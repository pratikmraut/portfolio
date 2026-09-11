import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, isAbsolute, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../dist/client/", import.meta.url));
const mount = "/portfolio/";
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".rsc": "text/x-component",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".pdf": "application/pdf",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

// Mirror project hosting: missing assets fail instead of falling back to index.html.
const server = createServer(async (request, response) => {
  if (request.method !== "GET" && request.method !== "HEAD") {
    response.writeHead(405, { Allow: "GET, HEAD" }).end();
    return;
  }
  try {
    const url = new URL(request.url ?? "/", "http://127.0.0.1");
    if (url.pathname === "/portfolio") {
      response.writeHead(308, { Location: `${mount}${url.search}` }).end();
      return;
    }
    if (!url.pathname.startsWith(mount)) {
      response.writeHead(404).end("Not found");
      return;
    }

    const requestedPath = decodeURIComponent(url.pathname.slice(mount.length));
    let filename = resolve(root, requestedPath);
    const relativePath = relative(root, filename);
    if (relativePath === ".." || relativePath.startsWith(`..${sep}`) || isAbsolute(relativePath)) {
      response.writeHead(404).end("Not found");
      return;
    }
    let info = await stat(filename);
    if (info.isDirectory()) {
      filename = resolve(filename, "index.html");
      info = await stat(filename);
    }
    if (!info.isFile()) {
      response.writeHead(404).end("Not found");
      return;
    }
    response.writeHead(200, {
      "Content-Type": types[extname(filename)] ?? "application/octet-stream",
      "Content-Length": info.size,
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    });
    if (request.method === "HEAD") response.end();
    else createReadStream(filename).on("error", () => response.destroy()).pipe(response);
  } catch {
    response.writeHead(404).end("Not found");
  }
});

server.listen(4175, "127.0.0.1", () => {
  console.log("Portfolio static test server: http://127.0.0.1:4175/portfolio/");
});
