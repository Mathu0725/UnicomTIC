import { readFile, access } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { pages } from "../src/pages.mjs";

const root = resolve(import.meta.dirname, "..");
const failures = [];
for (const file of ["dist/index.html", "dist/robots.txt", "dist/sitemap.xml", "dist/staticwebapp.config.json", "dist/404.html"]) {
  try { await access(resolve(root, file)); } catch { failures.push(`missing ${file}`); }
}
for (const file of ["robots.txt", "sitemap.xml"]) {
  try { await access(resolve(root, file)); } catch { failures.push(`missing ${file}`); }
}
const sitemap = await readFile(resolve(root, "sitemap.xml"), "utf8").catch(() => "");
const knownRoutes = new Set(pages.map(page => `https://unicomtic.org${page.path}`));
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1]);
if (new Set(sitemapUrls).size !== sitemapUrls.length) failures.push("sitemap contains duplicate URLs");
for (const url of knownRoutes) if (!sitemapUrls.includes(url)) failures.push(`sitemap missing ${url}`);

for (const page of pages) {
  const file = resolve(root, page.file);
  const html = await readFile(file, "utf8");
  const checks = [
    [/<title>[^<]+<\/title>/, "title"],
    [/<meta name="description" content="[^"]+">/, "meta description"],
    [/<meta name="robots" content="[^"]+">/, "robots meta"],
    [/<link rel="canonical" href="[^"]+">/, "canonical"],
    [/<meta property="og:image:alt" content="[^"]+">/, "Open Graph image alt"],
    [/<meta name="twitter:image:alt" content="[^"]+">/, "Twitter image alt"],
    [/<script type="application\/ld\+json">/, "structured data"]
  ];
  for (const [pattern, label] of checks) if (!pattern.test(html)) failures.push(`${page.path}: missing ${label}`);
  const h1s = html.match(/<h1\b/g) || [];
  if (h1s.length !== 1) failures.push(`${page.path}: expected 1 h1, found ${h1s.length}`);
  for (const match of html.matchAll(/<img\b[^>]*>/g)) if (!/\balt="[^"]*"/.test(match[0])) failures.push(`${page.path}: image without alt`);
  for (const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(match[1]); } catch { failures.push(`${page.path}: invalid JSON-LD`); }
  }
  for (const match of html.matchAll(/(?:src|href)="(\/(?:assets)[^"]+)"/g)) {
    const assetPath = match[1].split(/[?#]/, 1)[0];
    const asset = resolve(root, assetPath.slice(1));
    try { await access(asset); } catch { failures.push(`${page.path}: missing ${match[1]}`); }
  }
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}
console.log(`Checked ${pages.length} pages: metadata, headings, alt text, and local assets passed.`);
