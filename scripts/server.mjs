import http from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, relative, resolve, sep } from "node:path";

const root = resolve(import.meta.dirname, "..");
const port = Number(process.env.PORT || 8082);
const host = process.env.HOST || "0.0.0.0";
const mime = { ".html":"text/html; charset=utf-8", ".css":"text/css; charset=utf-8", ".js":"text/javascript; charset=utf-8", ".json":"application/json", ".xml":"application/xml", ".txt":"text/plain; charset=utf-8", ".png":"image/png", ".jpg":"image/jpeg", ".jpeg":"image/jpeg", ".webp":"image/webp", ".avif":"image/avif", ".svg":"image/svg+xml", ".ico":"image/x-icon", ".pdf":"application/pdf" };
const privateRoots = new Set([".git", ".codex", ".agents", ".aws", "node_modules", "qa", "scripts", "src"]);
const securityHeaders = {
  "Content-Security-Policy": "default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; form-action 'self' https://forms.gle https://wa.me; img-src 'self' data: https:; style-src 'self' 'unsafe-inline'; script-src 'self'; media-src 'self' https://unicomtic.org; frame-src https://www.youtube-nocookie.com; connect-src 'self' https://www.youtube-nocookie.com; font-src 'self' data: https:",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=()",
  "X-Frame-Options": "DENY",
  "X-DNS-Prefetch-Control": "off",
  "Cross-Origin-Opener-Policy": "same-origin-allow-popups"
};
if (process.env.ENABLE_HSTS === "true") securityHeaders["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains";

const respond = (res, status, headers = {}, body = "") => {
  res.writeHead(status, { ...securityHeaders, ...headers });
  if (body) res.end(body); else res.end();
};
const isPrivatePath = pathname => pathname.split("/").some(segment => privateRoots.has(segment) || segment === ".env" || segment.startsWith(".env."));
const isPublicPath = pathname => pathname === "/" || pathname === "/index.html" || pathname === "/robots.txt" || pathname === "/sitemap.xml" || pathname.startsWith("/assets/") || /\/index\.html$/.test(pathname);

http.createServer({ maxHeaderSize: 16 * 1024 }, async (req, res) => {
  if (req.method !== "GET" && req.method !== "HEAD") return respond(res, 405, { Allow: "GET, HEAD" }, "Method Not Allowed");
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    let pathname;
    try { pathname = decodeURIComponent(url.pathname); } catch { return respond(res, 400, {}, "Bad Request"); }
    if (pathname.includes("\0")) return respond(res, 400, {}, "Bad Request");
    if (isPrivatePath(pathname)) return respond(res, 403, {}, "Forbidden");
    if (!isPublicPath(pathname) && extname(pathname)) return respond(res, 403, {}, "Forbidden");
    let target = resolve(root, `.${pathname}`);
    const relativePath = relative(root, target);
    if (relativePath === ".." || relativePath.startsWith(`..${sep}`) || relativePath.includes(`..${sep}`)) return respond(res, 403, {}, "Forbidden");
    try { if ((await stat(target)).isDirectory()) target = join(target, "index.html"); }
    catch { if (!extname(target)) target = join(target, "index.html"); }
    if (isPrivatePath(relative(root, target).split(sep).join("/")) || !isPublicPath(`/${relative(root, target).split(sep).join("/")}`)) return respond(res, 403, {}, "Forbidden");
    const body = await readFile(target);
    const extension = extname(target).toLowerCase();
    const headers = { "Content-Type": mime[extension] || "application/octet-stream", "Cache-Control": extension === ".html" ? "no-cache" : url.searchParams.has("v") ? "public, max-age=31536000, immutable" : "public, max-age=86400" };
    if (req.method === "HEAD") return respond(res, 200, { ...headers, "Content-Length": String(body.length) });
    respond(res, 200, headers, body);
  } catch (error) {
    if (error?.code === "ENOENT" || error?.code === "EISDIR") return respond(res, 404, {}, "Not Found");
    respond(res, 500, {}, "Internal Server Error");
  }
}).listen(port, host, () => console.log(`Unicom TIC 2026 running at http://${host === "0.0.0.0" ? "localhost" : host}:${port}`));
