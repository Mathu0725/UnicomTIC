import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { pages } from "../src/pages.mjs";

const root = resolve(import.meta.dirname, "..");
const dist = resolve(root, "dist");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.map(page => `  <url><loc>https://unicomtic.org${page.path}</loc></url>`).join("\n")}\n</urlset>\n`;

const robots = "User-agent: *\nAllow: /\nSitemap: https://unicomtic.org/sitemap.xml\n";
const notFound = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Page Not Found - Unicom TIC</title><meta name="robots" content="noindex"><link rel="stylesheet" href="/assets/css/site.css?v=20261007-12"></head><body><main class="section"><div class="container narrow"><p class="eyebrow">Unicom TIC</p><h1>Page not found</h1><p>The page you requested could not be found.</p><a class="button button--primary" href="/">Return home</a></div></main></body></html>`;

const writePublicSite = async targetRoot => {
  for (const page of pages) {
    const target = resolve(targetRoot, page.file);
    await mkdir(dirname(target), { recursive: true });
    await writeFile(target, page.render(), "utf8");
  }
  await writeFile(resolve(targetRoot, "sitemap.xml"), sitemap, "utf8");
  await writeFile(resolve(targetRoot, "robots.txt"), robots, "utf8");
  await writeFile(resolve(targetRoot, "404.html"), notFound, "utf8");
};

await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });
await writePublicSite(root);
await writePublicSite(dist);
await cp(resolve(root, "assets"), resolve(dist, "assets"), { recursive: true });
await cp(resolve(root, "staticwebapp.config.json"), resolve(dist, "staticwebapp.config.json"));

console.log(`Built ${pages.length} pages and generated dist/ for static hosting.`);
