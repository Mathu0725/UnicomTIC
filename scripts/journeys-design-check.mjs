import { createRequire } from "node:module";
import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { pages } from "../src/pages.mjs";
import assert from "node:assert/strict";
import { homedir } from "node:os";

const require = createRequire(import.meta.url);
const runtimeModules = process.env.CODEX_RUNTIME_NODE_MODULES || resolve(homedir(), ".cache", "codex-runtimes", "codex-primary-runtime", "dependencies", "node", "node_modules");
const { chromium } = require(resolve(runtimeModules, "playwright"));

const root = resolve(import.meta.dirname, "..");
const output = resolve(root, "qa", "journeys-redesign");
const baselineMode = process.argv.includes("--baseline");
const baselineFile = resolve(output, "content-before.json");
await mkdir(output, { recursive: true });

const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || resolve(process.env.ProgramFiles || "C:/Program Files", "Google", "Chrome", "Application", "chrome.exe"), headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  await page.goto("http://localhost:8082/home/inspiring-journeys/", { waitUntil: "domcontentloaded" });
  const content = await page.evaluate(() => {
    const main = document.querySelector("main");
    const normalizeSharedUi = value => value.replaceAll("Register Now", "Apply Now").replaceAll("https://forms.gle/f6gs124jBeM69RCj7", "https://unicomtic.forms.app/");
    const walker = document.createTreeWalker(main, NodeFilter.SHOW_TEXT);
    const text = [];
    while (walker.nextNode()) {
      if (walker.currentNode.parentElement.closest("[data-media-feedback], [data-journey-preview], [data-lightbox-dialog]")) continue;
      const value = walker.currentNode.textContent.replace(/\s+/g, " ").trim();
      if (value) text.push(value);
    }
    return {
      text,
      headings: [...main.querySelectorAll("h1,h2,h3")].map(e => [e.tagName, e.textContent.trim()]),
      links: [...document.querySelectorAll("a")].map(e => [normalizeSharedUi(e.getAttribute("href") || ""), normalizeSharedUi(e.textContent.replace(/\s+/g, " ").trim())]),
      images: [...main.querySelectorAll("img:not([data-journey-preview])")].map(e => [e.getAttribute("src"), e.getAttribute("alt")]),
      videos: [...main.querySelectorAll("video,iframe")].map(e => [e.tagName, e.getAttribute("src"), e.getAttribute("title")]),
      sections: [...main.querySelectorAll("section[id]")].map(e => e.id),
      hero: document.querySelector(".page-hero").style.getPropertyValue("--hero-image"),
      labels: [...main.querySelectorAll("[aria-label], [title]")].filter(e => !e.closest("[data-media-feedback], [data-journey-preview], [data-lightbox-dialog]")).map(e => [e.getAttribute("aria-label"), e.getAttribute("title")]).sort((a,b) => JSON.stringify(a).localeCompare(JSON.stringify(b))),
      header: normalizeSharedUi(document.querySelector(".site-header").innerHTML),
      footer: document.querySelector(".site-footer").innerHTML
    };
  });
  const fileHashes = {};
  const hash = data => createHash("sha256").update(data).digest("hex");
  for (const item of pages) if (item.path !== "/home/inspiring-journeys/") fileHashes[item.file] = hash(await readFile(resolve(root, item.file)));
  const mediaHashes = {};
  for (const [src] of content.images) if (src?.startsWith("/assets/")) mediaHashes[src] = hash(await readFile(resolve(root, src.split("?")[0].slice(1))));
  const heroFile = content.hero.match(/url\(["']?([^"')]+)/)[1];
  mediaHashes[heroFile] = hash(await readFile(resolve(root, heroFile.slice(1))));
  if (baselineMode) {
    await writeFile(baselineFile, JSON.stringify({ content, fileHashes, mediaHashes }, null, 2));
    await page.screenshot({ path: resolve(output, "before-desktop.png") });
    console.log(`Captured baseline: ${content.headings.length} headings, ${content.images.filter(([src]) => src).length} gallery images, ${content.videos.length} videos, ${content.sections.length} sections.`);
  } else {
    const before = JSON.parse(await readFile(baselineFile, "utf8"));
    for (const key of Object.keys(content)) {
      const normalize = value => key === "labels" ? value.filter(([label]) => !["Close image", "Close menu", "Facebook", "Instagram", "LinkedIn", "Mobile navigation", "Open menu", "Primary navigation", "Social media", "Unicom TIC home"].includes(label)) : value;
      if (JSON.stringify(normalize(content[key])) !== JSON.stringify(normalize(before.content[key]))) throw new Error(`Content changed: ${key}`);
    }
    if (JSON.stringify(fileHashes) !== JSON.stringify(before.fileHashes)) throw new Error("An unrelated generated page changed.");
    if (JSON.stringify(mediaHashes) !== JSON.stringify(before.mediaHashes)) throw new Error("An original image changed.");
    console.log("Exact content, links, labels, media, section order, header/footer and unrelated-page preservation passed.");
    const results = [];
    for (const size of [
      { name: "desktop", width: 1440, height: 1000 },
      { name: "tablet", width: 768, height: 1024 },
      { name: "mobile", width: 390, height: 844 },
      { name: "small-mobile", width: 320, height: 760 }
    ]) {
      await page.setViewportSize({ width: size.width, height: size.height });
      const errors = [];
      const onError = error => errors.push(error.message);
      page.on("pageerror", onError);
      await page.goto("http://localhost:8082/home/inspiring-journeys/", { waitUntil: "domcontentloaded" });
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.waitForTimeout(150);
      const top = await page.evaluate(() => ({
        width: document.documentElement.scrollWidth,
        viewport: innerWidth,
        videoTop: document.querySelector(".inception-video").getBoundingClientRect().top,
        height: innerHeight,
        navigationFits: [...document.querySelectorAll(".journey-tabs a")].every(e => {
          const r = e.getBoundingClientRect();
          return r.left >= 0 && r.right <= innerWidth && e.scrollWidth <= e.clientWidth;
        })
      }));
      assert.equal(top.width, top.viewport, `${size.name}: horizontal overflow`);
      assert.ok(top.videoTop < top.height, `${size.name}: no following content in first viewport`);
      assert.ok(top.navigationFits, `${size.name}: section links clipped`);
      await page.screenshot({ path: resolve(output, `${size.name}-top.png`) });
      for (const section of content.sections) {
        await page.locator(`.journey-tabs a[href="#${section}"]`).click();
        await page.waitForTimeout(120);
        assert.equal(await page.locator('.journey-tabs [aria-current="location"]').getAttribute("href"), `#${section}`, `${size.name}: wrong active section`);
        const position = await page.evaluate(id => ({
          section: document.getElementById(id).getBoundingClientRect().top,
          navigation: document.querySelector(".journey-tabs").getBoundingClientRect().bottom
        }), section);
        assert.ok(position.section >= position.navigation - 1, `${size.name}: section behind sticky bars`);
        await page.screenshot({ path: resolve(output, `${size.name}-${section}.png`) });
      }
      const mediaLayout = await page.evaluate(() => {
        const frame = document.querySelector(".press-carousel__window").getBoundingClientRect();
        return {
          controlsOutside: [...document.querySelectorAll(".press-carousel__arrow")].every(e => e.getBoundingClientRect().bottom <= frame.top),
          tabsFit: [...document.querySelectorAll(".testimonial-selector__button")].every(e => {
            const r = e.getBoundingClientRect();
            return r.left >= 0 && r.right <= innerWidth && e.scrollWidth <= e.clientWidth;
          }),
          brokenImages: [...document.images].filter(e => e.getAttribute("src") && e.complete && !e.naturalWidth).map(e => e.src),
          columns: [...document.querySelectorAll(".photo-grid")].map(e => ({ count: e.children.length, columns: getComputedStyle(e).gridTemplateColumns.split(" ").length }))
        };
      });
      assert.ok(mediaLayout.controlsOutside, `${size.name}: newspaper controls overlap media`);
      assert.ok(mediaLayout.tabsFit, `${size.name}: testimonial tabs clipped`);
      assert.deepEqual(mediaLayout.brokenImages, [], `${size.name}: broken images`);
      await page.locator('#workshops [data-lightbox]').first().click();
      assert.ok(await page.locator("[data-lightbox-dialog]").evaluate(e => e.open));
      await page.keyboard.press("Escape");
      assert.ok(await page.locator("[data-lightbox-dialog]").evaluate(e => !e.open));
      await page.locator("[data-press-next]").click();
      assert.equal(await page.locator("[data-press-status]").textContent(), "02 / 04");
      await page.locator("[data-press-prev]").focus();
      await page.keyboard.press("ArrowRight");
      assert.equal(await page.locator("[data-press-status]").textContent(), "03 / 04");
      await page.locator('[data-press-dot="0"]').click();
      await page.evaluate(() => {
        const frame = document.querySelector(".press-carousel__window");
        const offset = document.querySelector(".site-header").getBoundingClientRect().height + document.querySelector(".journey-tabs").getBoundingClientRect().height + 24;
        scrollTo({ top: frame.getBoundingClientRect().top + scrollY - offset, behavior: "instant" });
      });
      await page.waitForTimeout(150);
      await page.evaluate(() => {
        window.journeyPointerTrace = [];
        for (const name of ["pointerdown", "pointerup", "pointercancel", "dragstart"]) document.addEventListener(name, event => {
          window.journeyPointerTrace.push({ event: name, target: event.target.tagName, class: event.target.className, x: event.clientX, y: event.clientY });
        }, { capture: true, once: true });
      });
      const pressBounds = await page.locator(".press-carousel__window").boundingBox();
      await page.mouse.move(pressBounds.x + pressBounds.width * .8, pressBounds.y + pressBounds.height * .5);
      await page.mouse.down();
      await page.mouse.move(pressBounds.x + pressBounds.width * .2, pressBounds.y + pressBounds.height * .5, { steps: 10 });
      await page.mouse.up();
      const swipeState = await page.evaluate(() => ({ status: document.querySelector("[data-press-status]").textContent, trace: window.journeyPointerTrace, frame: document.querySelector(".press-carousel__window").getBoundingClientRect().toJSON() }));
      assert.equal(swipeState.status, "02 / 04", `${size.name}: ${JSON.stringify(swipeState)}`);
      assert.ok(await page.locator("[data-lightbox-dialog]").evaluate(e => !e.open), `${size.name}: swipe opened lightbox`);
      for (let index = 0; index < 4; index++) {
        await page.locator(`[data-press-dot="${index}"]`).click();
        await page.waitForTimeout(120);
        const completeImage = await page.locator(`[data-press-slide]:nth-child(${index + 1}) img`).evaluate(image => {
          const frame = document.querySelector(".press-carousel__window").getBoundingClientRect();
          const bounds = image.getBoundingClientRect();
          return bounds.height <= frame.height + 1 && bounds.width <= frame.width + 1 && getComputedStyle(image).objectFit === "contain";
        });
        assert.ok(completeImage, `${size.name}: press image ${index + 1} cropped`);
        if (index === 2) await page.screenshot({ path: resolve(output, `${size.name}-press-portrait.png`) });
      }
      for (let index = 0; index < 3; index++) {
        await page.locator(`[data-testimonial-tab="${index}"]`).click();
        assert.equal(await page.locator('[data-testimonial-tab][aria-selected="true"]').getAttribute("data-testimonial-tab"), String(index));
        assert.equal(await page.locator("[data-testimonial-panel]:visible").count(), 1);
      }
      await page.locator('[data-testimonial-tab="0"]').focus();
      await page.keyboard.press("End");
      assert.equal(await page.locator('[data-testimonial-tab][aria-selected="true"]').getAttribute("data-testimonial-tab"), "2");
      await page.keyboard.press("Home");
      assert.equal(await page.locator('[data-testimonial-tab][aria-selected="true"]').getAttribute("data-testimonial-tab"), "0");
      await page.evaluate(async () => {
        const video = document.querySelector("#testimonial-panel-1 video");
        const canvas = document.createElement("canvas");
        canvas.width = 32; canvas.height = 32;
        canvas.getContext("2d").fillRect(0,0,32,32);
        video.srcObject = canvas.captureStream(1);
        video.muted = true;
        await video.play();
      });
      assert.ok(await page.locator("#testimonial-panel-1 video").evaluate(e => !e.paused));
      await page.locator('[data-testimonial-tab="1"]').click();
      assert.ok(await page.locator("#testimonial-panel-1 video").evaluate(e => e.paused), `${size.name}: video continues after switching`);
      await page.evaluate(() => {
        const video = document.querySelector("#testimonial-panel-1 video");
        video.srcObject.getTracks().forEach(track => track.stop()); video.srcObject = null;
      });
      assert.deepEqual(errors, [], `${size.name}: JavaScript errors`);
      page.off("pageerror", onError);
      results.push({ size, top, mediaLayout, interactions: "passed" });
      console.log(`${size.name}: screenshots, layout, active navigation, lightbox, press controls/swipe and testimonial switching/pause passed.`);
    }
    await page.route("https://unicomtic.org/**/*.mp4", route => route.abort());
    await page.goto("http://localhost:8082/home/inspiring-journeys/?qa=failure#testimonials", { waitUntil: "domcontentloaded" });
    await page.locator("#testimonial-panel-1 button[data-journey-preview]").click();
    await page.locator('#testimonial-panel-1 [data-media-feedback]').waitFor({ state: "visible" });
    await page.waitForFunction(() => document.querySelector('#testimonial-panel-1 [data-media-status]').textContent.includes("unavailable"));
    assert.ok(await page.locator('#testimonial-panel-1 [data-video-retry]').isVisible());
    await page.locator('#testimonial-panel-1 [data-video-retry]').click();
    assert.equal(await page.locator('#testimonial-panel-1 video').getAttribute("src"), content.videos[1][1]);
    await page.waitForFunction(() => document.querySelector('#testimonial-panel-1 [data-media-status]').textContent.includes("unavailable"));
    await page.screenshot({ path: resolve(output, "video-failure-state.png") });
    await page.route("https://www.youtube-nocookie.com/**", route => route.abort());
    await page.locator('#inception button[data-journey-preview]').click();
    await page.waitForFunction(() => document.querySelector('#inception [data-media-status]').textContent.includes("unavailable"));
    assert.ok(await page.locator('#inception [data-video-retry]').isVisible());
    await page.screenshot({ path: resolve(output, "inception-failure-state.png") });
    await writeFile(resolve(output, "verification.json"), JSON.stringify({ contentPreserved: true, unrelatedPagesPreserved: true, results, videoFailureAndRetry: "passed" }, null, 2));
    console.log("Native video and YouTube failure/retry passed. Verification and responsive screenshots saved in qa/journeys-redesign.");
  }
} finally {
  await browser.close();
}
