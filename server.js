import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { Readable } from "node:stream";
import { URL } from "node:url";
import workerModule from "./dist/server/index.js";

const port = Number(process.env.PORT || 3000);
const host = process.env.HOST || "0.0.0.0";
const clientDistDir = path.resolve("dist/client");

const contentTypeByExt = {
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".pdf": "application/pdf",
  ".txt": "text/plain; charset=utf-8",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

function getContentType(filePath) {
  return contentTypeByExt[path.extname(filePath).toLowerCase()] || "application/octet-stream";
}

async function serveStaticFile(urlPath, res) {
  const requested = decodeURIComponent(urlPath === "/" ? "/index.html" : urlPath);
  const normalizedPath = path.normalize(requested).replace(/^(\.\.(\/|\\|$))+/, "");
  const filePath = path.join(clientDistDir, normalizedPath);

  if (!filePath.startsWith(clientDistDir)) return false;

  try {
    const fileStat = await stat(filePath);
    if (!fileStat.isFile()) return false;

    const body = await readFile(filePath);
    res.statusCode = 200;
    res.setHeader("content-type", getContentType(filePath));
    res.setHeader("content-length", String(body.length));
    res.end(body);
    return true;
  } catch {
    return false;
  }
}

function toWebRequest(req) {
  const protocol = req.headers["x-forwarded-proto"] || "http";
  const hostHeader = req.headers.host || `localhost:${port}`;
  const url = new URL(req.url || "/", `${protocol}://${hostHeader}`);

  const headers = new Headers();
  for (const [key, value] of Object.entries(req.headers)) {
    if (Array.isArray(value)) {
      for (const item of value) headers.append(key, item);
    } else if (value !== undefined) {
      headers.set(key, value);
    }
  }

  const hasBody = !["GET", "HEAD"].includes((req.method || "GET").toUpperCase());
  return new Request(url, {
    method: req.method || "GET",
    headers,
    body: hasBody ? Readable.toWeb(req) : undefined,
    duplex: hasBody ? "half" : undefined,
  });
}

const server = createServer(async (req, res) => {
  try {
    const requestUrl = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);
    if (await serveStaticFile(requestUrl.pathname, res)) return;

    const request = toWebRequest(req);
    const response = await workerModule.fetch(request, {}, {});

    res.statusCode = response.status;
    response.headers.forEach((value, key) => res.setHeader(key, value));

    if (!response.body) {
      res.end();
      return;
    }

    Readable.fromWeb(response.body).pipe(res);
  } catch (error) {
    console.error("Server request failed:", error);
    res.statusCode = 500;
    res.setHeader("content-type", "text/plain; charset=utf-8");
    res.end("Internal Server Error");
  }
});

server.listen(port, host, () => {
  console.log(`Server running on http://${host}:${port}`);
});
