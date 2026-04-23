import { createServer } from "node:http";
import { Readable } from "node:stream";
import { URL } from "node:url";
import workerModule from "./dist/server/index.js";

const port = Number(process.env.PORT || 3000);
const host = process.env.HOST || "0.0.0.0";

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
