const routes = [
  "/",
  "/home/inspiring-journeys/",
  "/contact/",
  "/alumini/",
  "/programs/",
  "/our-story/",
  "/meet-the-team/",
  "/students/",
  "/lecturers-hub/",
  "/faq/",
  "/code-of-conduct/"
];

const targets = await fetch("http://127.0.0.1:9222/json").then(response => response.json());
const pageTarget = targets.find(target => target.type === "page");
if (!pageTarget) throw new Error("No browser page target found");
const socket = new WebSocket(pageTarget.webSocketDebuggerUrl);
const pending = new Map();
let id = 0;

socket.addEventListener("message", event => {
  const message = JSON.parse(event.data);
  if (message.id && pending.has(message.id)) {
    const { resolve, reject } = pending.get(message.id);
    pending.delete(message.id);
    message.error ? reject(new Error(message.error.message)) : resolve(message.result);
  }
});

await new Promise((resolve, reject) => {
  socket.addEventListener("open", resolve, { once: true });
  socket.addEventListener("error", reject, { once: true });
});

const send = (method, params = {}) => new Promise((resolve, reject) => {
  const requestId = ++id;
  pending.set(requestId, { resolve, reject });
  socket.send(JSON.stringify({ id: requestId, method, params }));
});

const waitForPage = async (route) => {
  for (let attempt = 0; attempt < 30; attempt += 1) {
    const state = await send("Runtime.evaluate", {
      expression: `JSON.stringify({ready:document.readyState,path:location.pathname,title:document.title})`,
      returnByValue: true
    });
    const value = JSON.parse(state.result.value);
    if (value.ready === "complete" && value.path === route && value.title) return;
    await new Promise(resolve => setTimeout(resolve, 200));
  }
  throw new Error(`Timed out loading ${route}`);
};

await send("Page.enable");
await send("Runtime.enable");
await send("Network.enable");
await send("Network.setCacheDisabled", { cacheDisabled: true });

const sizes = [
  { name: "mobile", width: 390, height: 844, deviceScaleFactor: 1, mobile: true },
  { name: "tablet", width: 768, height: 1024, deviceScaleFactor: 1, mobile: true },
  { name: "desktop", width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false }
];
const failures = [];
const captureScreenshots = process.env.QA_SCREENSHOTS === "1";

for (const size of sizes) {
  await send("Emulation.setDeviceMetricsOverride", { width: size.width, height: size.height, deviceScaleFactor: size.deviceScaleFactor, mobile: size.mobile });
  for (const route of routes) {
    await send("Page.navigate", { url: `http://localhost:8082${route}` });
    await waitForPage(route);
    const result = await send("Runtime.evaluate", {
      expression: `JSON.stringify({width:document.documentElement.scrollWidth,client:document.documentElement.clientWidth,h1:document.querySelectorAll('h1').length,h1Overflow:[...document.querySelectorAll('h1')].some(element=>element.scrollWidth>element.clientWidth+1),images:[...document.images].filter(image=>image.hasAttribute('src')&&image.complete&&!image.naturalWidth).length})`,
      returnByValue: true
    });
    const metrics = JSON.parse(result.result.value);
    if (metrics.width > metrics.client) failures.push(`${size.name} ${route}: horizontal overflow ${metrics.width}px > ${metrics.client}px`);
    if (metrics.h1 !== 1) failures.push(`${size.name} ${route}: ${metrics.h1} h1 elements`);
    if (metrics.h1Overflow) failures.push(`${size.name} ${route}: h1 content overflows its box`);
    if (metrics.images) failures.push(`${size.name} ${route}: ${metrics.images} broken images`);
    if (size.name === "mobile" && route === "/") {
      const menu = await send("Runtime.evaluate", {
        expression: `(() => { const toggle=document.querySelector('[data-menu-toggle]'); const nav=document.querySelector('[data-mobile-nav]'); if(!toggle||!nav)return {expanded:'missing',open:false}; toggle.click(); return {expanded:toggle.getAttribute('aria-expanded'),open:nav.classList.contains('is-open')}; })()`,
        returnByValue: true
      });
      const menuValue = menu.result.value || { expanded: "missing", open: false };
      if (menuValue.expanded !== "true" || !menuValue.open) failures.push("mobile /: menu interaction failed");
      await send("Runtime.evaluate", { expression: `document.querySelector('[data-menu-close]')?.click()` });
    }
    if (size.name === "mobile" && route === "/contact/") {
      const form = await send("Runtime.evaluate", {
        expression: `(() => { let opened=''; window.open=(url)=>{opened=url}; const form=document.querySelector('[data-whatsapp-form]'); form.elements.name.value='QA User'; form.elements.phone.value='0740000000'; form.elements.email.value='qa@example.com'; form.elements.enquiry.value='Course information'; form.dispatchEvent(new Event('submit',{bubbles:true,cancelable:true})); return opened; })()`,
        returnByValue: true
      });
      if (!form.result.value.startsWith("https://wa.me/94740030977?text=") || !form.result.value.includes("QA%20User")) failures.push("mobile /contact/: WhatsApp form interaction failed");
    }
    if (size.name === "desktop" && route === "/home/inspiring-journeys/") {
      const lightbox = await send("Runtime.evaluate", {
        expression: `(() => { document.querySelector('[data-lightbox]').click(); const dialog=document.querySelector('[data-lightbox-dialog]'); const result=dialog.open && dialog.querySelector('img').src.includes('/assets/images/'); dialog.close(); return result; })()`,
        returnByValue: true
      });
      if (!lightbox.result.value) failures.push("desktop /home/inspiring-journeys/: lightbox interaction failed");
    }
    if (size.name === "desktop" && route === "/") {
      const carousel = await send("Runtime.evaluate", {
        expression: `(() => { const slides=[...document.querySelectorAll('.hero-slide')]; const before=slides.findIndex(slide=>slide.classList.contains('is-active')); document.querySelector('[data-hero-next]').click(); const after=slides.findIndex(slide=>slide.classList.contains('is-active')); return {before,after}; })()`,
        returnByValue: true
      });
      if (carousel.result.value.before === carousel.result.value.after) failures.push("desktop /: hero carousel interaction failed");
      if (captureScreenshots) {
        await send("Runtime.evaluate", { expression: "window.scrollTo(0,0)" });
        const topShot = await send("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
        await writeFile(resolve(import.meta.dirname, "..", "qa", "home-desktop-updated.png"), Buffer.from(topShot.data, "base64"));
        await send("Runtime.evaluate", { expression: "document.documentElement.style.scrollBehavior='auto';document.querySelector('.team-preview').scrollIntoView({block:'center',behavior:'instant'})" });
        await new Promise(resolve => setTimeout(resolve, 250));
        const teamShot = await send("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
        await writeFile(resolve(import.meta.dirname, "..", "qa", "home-team-updated.png"), Buffer.from(teamShot.data, "base64"));
        await send("Runtime.evaluate", { expression: "window.scrollTo({top:document.body.scrollHeight,behavior:'instant'})" });
        await new Promise(resolve => setTimeout(resolve, 250));
        const footerShot = await send("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
        await writeFile(resolve(import.meta.dirname, "..", "qa", "home-footer-updated.png"), Buffer.from(footerShot.data, "base64"));
      }
    }
    if (size.name === "desktop" && route === "/alumini/") {
      const alumniContent = await send("Runtime.evaluate", {
        expression: `(() => { const first=document.querySelector('.alumni-story details'); first?.querySelector('summary')?.click(); const expanded=first?.open; const before=document.querySelector('.alumni-story.is-active h3')?.textContent.trim(); document.querySelector('[data-alumni-next]')?.click(); const after=document.querySelector('.alumni-story.is-active h3')?.textContent.trim(); const status=document.querySelector('[data-alumni-status]')?.textContent.trim(); document.querySelector('[data-alumni-dot="0"]')?.click(); first?.removeAttribute('open'); return {stories:document.querySelectorAll('.alumni-story').length,reviews:document.querySelectorAll('.alumni-review-grid blockquote').length,names:[...document.querySelectorAll('.alumni-story h3,.alumni-review-grid footer')].map(element=>element.textContent.trim()),expanded,before,after,status}; })()`,
        returnByValue: true
      });
      const alumniValue = alumniContent.result.value;
      if (alumniValue.stories !== 4 || alumniValue.reviews !== 12 || alumniValue.names.length !== 16 || !alumniValue.expanded || alumniValue.before !== "Sankeerthan Dayanithi" || alumniValue.after !== "Gopikrishna Sivapakthan" || alumniValue.status !== "02 / 04") failures.push("desktop /alumini/: restored content, carousel, or Read More interaction failed");
      if (captureScreenshots) {
        await send("Runtime.evaluate", { expression: "window.scrollTo(0,0)" });
        await new Promise(resolve => setTimeout(resolve, 250));
        const alumniTop = await send("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
        await writeFile(resolve(import.meta.dirname, "..", "qa", "alumni-desktop-top.png"), Buffer.from(alumniTop.data, "base64"));
        await send("Runtime.evaluate", { expression: "document.documentElement.style.scrollBehavior='auto';document.querySelector('.alumni-story').scrollIntoView({block:'center',behavior:'instant'})" });
        await new Promise(resolve => setTimeout(resolve, 250));
        const alumniStory = await send("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
        await writeFile(resolve(import.meta.dirname, "..", "qa", "alumni-desktop-story.png"), Buffer.from(alumniStory.data, "base64"));
        await send("Runtime.evaluate", { expression: "document.querySelector('.alumni-reviews').scrollIntoView({block:'start',behavior:'instant'})" });
        await new Promise(resolve => setTimeout(resolve, 250));
        const alumniReviews = await send("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
        await writeFile(resolve(import.meta.dirname, "..", "qa", "alumni-desktop-reviews.png"), Buffer.from(alumniReviews.data, "base64"));
        await send("Runtime.evaluate", { expression: "window.scrollTo({top:document.body.scrollHeight,behavior:'instant'})" });
        await new Promise(resolve => setTimeout(resolve, 250));
        const alumniFooter = await send("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
        await writeFile(resolve(import.meta.dirname, "..", "qa", "alumni-desktop-footer.png"), Buffer.from(alumniFooter.data, "base64"));
      }
    }
    if (captureScreenshots && size.name === "mobile" && ["/", "/contact/", "/alumini/"].includes(route)) {
      const shot = await send("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
      const name = route === "/" ? "home-mobile-cdp.png" : route === "/contact/" ? "contact-mobile-cdp.png" : "alumni-mobile-cdp.png";
      await writeFile(resolve(import.meta.dirname, "..", "qa", name), Buffer.from(shot.data, "base64"));
      if (route === "/alumini/") {
        await send("Runtime.evaluate", { expression: "document.documentElement.style.scrollBehavior='auto';document.querySelector('.alumni-stories').scrollIntoView({block:'start',behavior:'instant'})" });
        await new Promise(resolve => setTimeout(resolve, 250));
        const storyShot = await send("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
        await writeFile(resolve(import.meta.dirname, "..", "qa", "alumni-mobile-story.png"), Buffer.from(storyShot.data, "base64"));
      }
    }
  }
}

socket.close();
if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}
console.log(`Browser checked ${routes.length} routes at mobile, tablet, and desktop widths: no overflow or broken images.`);
import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";

