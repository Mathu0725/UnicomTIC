import assert from "node:assert/strict";

const base = process.env.BASE_URL || "http://127.0.0.1:8082";
const request = (path, options = {}) => fetch(`${base}${path}`, { redirect: "manual", ...options });
const securityHeaderNames = ["content-security-policy", "x-content-type-options", "referrer-policy", "permissions-policy", "x-frame-options"];

const home = await request("/");
assert.equal(home.status, 200, "homepage should be reachable");
for (const name of securityHeaderNames) assert.ok(home.headers.get(name), `missing ${name}`);
assert.match(home.headers.get("content-security-policy"), /object-src 'none'/);
assert.match(home.headers.get("content-security-policy"), /frame-ancestors 'none'/);

const head = await request("/", { method: "HEAD" });
assert.equal(head.status, 200, "HEAD should be supported");
assert.equal(await head.text(), "", "HEAD should not return a response body");

const method = await request("/", { method: "POST" });
assert.equal(method.status, 405, "unsupported methods should be rejected");
assert.equal(method.headers.get("allow"), "GET, HEAD");

for (const path of ["/src/site.mjs", "/scripts/server.mjs", "/.env", "/qa/journeys-redesign/verification.json", "/%2e%2e/%2e%2e/src/site.mjs"]) {
  const response = await request(path);
  assert.ok([403, 404].includes(response.status), `${path} should not be public`);
}

const missing = await request("/does-not-exist/");
assert.equal(missing.status, 404, "missing routes should return 404");
console.log(`Security checks passed at ${base}: headers, methods, traversal, private paths, and 404 handling.`);
