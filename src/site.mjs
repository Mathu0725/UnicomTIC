export const site = {
  origin: "https://unicomtic.org",
  name: "Unicom TIC",
  description: "Unicom Training and Innovation Center in Jaffna, Sri Lanka.",
  phoneDisplay: "+94 7400 30 977",
  phoneHref: "+94740030977",
  whatsapp: "94740030977",
  email: "info@unicomtic.org",
  address: "Unicom Training and Innovation Center, MPCS Building, No 127, Kankesanthurai Road, Jaffna, Sri Lanka",
  applyUrl: "https://forms.gle/f6gs124jBeM69RCj7",
  brochure: "/assets/docs/UNICOM_TIC_CLASS_OF_2026_BROCHURE.pdf",
  social: {
    facebook: "https://www.facebook.com/unicomtic",
    instagram: "https://www.instagram.com/unicomtic/",
    linkedin: "https://www.linkedin.com/company/unicom-tic/"
  }
};

export const primaryNav = [
  ["Home", "/"],
  ["Inspiring Journeys", "/home/inspiring-journeys/"],
  ["Contact", "/contact/"],
  ["Alumini", "/alumini/"]
];

export const exploreNav = [
  ["Programs", "/programs/"],
  ["Our Story", "/our-story/"],
  ["Meet the Team", "/meet-the-team/"],
  ["Students", "/students/"],
  ["Lecturers Hub", "/lecturers-hub/"],
  ["FAQ", "/faq/"],
  ["Code of Conduct", "/code-of-conduct/"]
];

const esc = (value = "") => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;");

export const icon = (name) => {
  const paths = {
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    close: '<path d="M6 6l12 12M18 6L6 18"/>',
    phone: '<path d="M22 16.9v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.2 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.69 2.8a2 2 0 0 1-.45 2.11L8.09 9.9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.33 1.84.56 2.8.69A2 2 0 0 1 22 16.9z"/>',
    mail: '<path d="M4 4h16v16H4zM4 6l8 7 8-7"/>',
    map: '<path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0z"/><circle cx="12" cy="10" r="2.5"/>',
    download: '<path d="M12 3v12m-5-5 5 5 5-5M5 21h14"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    play: '<path d="m8 5 11 7-11 7z"/>',
    refresh: '<path d="M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5"/>'
  };
  return `<svg class="icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${paths[name] || paths.arrow}</svg>`;
};

export const button = (label, href, kind = "primary", attrs = "") =>
  `<a class="button button--${kind}" href="${esc(href)}" ${attrs}>${esc(label)}${icon("arrow")}</a>`;

export const sectionHead = (eyebrow, title, intro = "", align = "", heading = "h2") => `
  <header class="section-head ${align ? `section-head--${align}` : ""}">
    ${eyebrow ? `<p class="eyebrow">${esc(eyebrow)}</p>` : ""}
    <${heading}>${esc(title)}</${heading}>
    ${intro ? `<p>${esc(intro)}</p>` : ""}
  </header>`;

export const pageHero = ({ eyebrow = "Unicom TIC", title, intro = "", image, position = "center" }) => `
  <section class="page-hero" style="--hero-image:url('${esc(image)}');--hero-position:${esc(position)}">
    <div class="container page-hero__inner">
      <p class="eyebrow eyebrow--light">${esc(eyebrow)}</p>
      <h1>${esc(title)}</h1>
      ${intro ? `<p>${esc(intro)}</p>` : ""}
    </div>
  </section>`;

export const cardGrid = (items, className = "feature-grid") => `
  <div class="${className}">
    ${items.map((item, index) => `
      <article class="feature-card">
        <span class="feature-card__index">${String(index + 1).padStart(2, "0")}</span>
        ${item.image ? `<img src="${esc(item.image)}" alt="${esc(item.alt || "")}" loading="lazy" width="640" height="480">` : ""}
        <h3>${esc(item.title)}</h3>
        ${item.kicker ? `<p class="card-kicker">${esc(item.kicker)}</p>` : ""}
        <p>${esc(item.text)}</p>
        ${item.href ? `<a class="text-link" href="${esc(item.href)}">${esc(item.linkLabel || "Learn more")}${icon("arrow")}</a>` : ""}
      </article>`).join("")}
  </div>`;

const header = (path) => {
  const links = primaryNav.map(([label, href]) =>
    `<a href="${href}" ${path === href ? 'aria-current="page"' : ""}>${esc(label)}</a>`).join("");
  const explore = exploreNav.map(([label, href]) => `<a href="${href}">${esc(label)}</a>`).join("");
  return `
    <a class="skip-link" href="#main-content">Skip to content</a>
    <header class="site-header" data-header>
      <div class="container header-inner">
        <a class="brand" href="/" aria-label="Unicom TIC home">
          <img src="/assets/images/unicom-tic-logo.png" alt="Unicom TIC - Training and Innovation Centre" width="260" height="98">
        </a>
        <nav class="desktop-nav" aria-label="Primary navigation">
          ${links}
          <div class="nav-more">
            <button type="button" aria-expanded="false" data-more-toggle>Explore ${icon("plus")}</button>
            <div class="nav-more__panel" data-more-panel>${explore}</div>
          </div>
        </nav>
        <a class="header-apply" href="${site.applyUrl}" target="_blank" rel="noopener">Register Now${icon("arrow")}</a>
        <button class="menu-toggle" type="button" aria-label="Open menu" aria-controls="mobile-menu" aria-expanded="false" data-menu-toggle>${icon("menu")}<span>Menu</span></button>
      </div>
      <nav class="mobile-nav" id="mobile-menu" aria-label="Mobile navigation" data-mobile-nav>
        <div class="mobile-nav__head"><span>Navigation</span><button type="button" aria-label="Close menu" data-menu-close>${icon("close")}</button></div>
        ${links}<div class="mobile-nav__more" data-mobile-more><button type="button" class="mobile-nav__more-toggle" aria-expanded="false" aria-controls="mobile-explore" data-mobile-more-toggle>Explore ${icon("plus")}</button><div class="mobile-nav__more-panel" id="mobile-explore" data-mobile-more-panel hidden>${explore}</div></div>
        <a class="mobile-nav__apply" href="${site.applyUrl}" target="_blank" rel="noopener">Register Now</a>
      </nav>
    </header>`;
};

const footer = () => `
  <footer class="site-footer site-footer--legacy" id="site-footer">
    <div class="container legacy-footer__top">
      <a class="legacy-footer__brand" href="/" aria-label="Unicom TIC home">
        <img src="/assets/images/unicom-tic-logo.png" alt="Unicom TIC" width="260" height="98" loading="lazy">
      </a>
      <address class="legacy-footer__contact">
        <a href="tel:${site.phoneHref}">${site.phoneDisplay}</a><br>
        Unicom Training and Innovation Center,<br>
        MPCS Building, No 127, Kankesanthurai Road,<br>
        Jaffna
      </address>
    </div>
    <div class="container legacy-footer__bottom">
      <p>&copy; 2023. All rights Reserved.</p>
      <div class="legacy-footer__social" aria-label="Social media"><a href="${site.social.facebook}" target="_blank" rel="noopener" aria-label="Facebook">FB</a><a href="${site.social.instagram}" target="_blank" rel="noopener" aria-label="Instagram">IG</a><a href="${site.social.linkedin}" target="_blank" rel="noopener" aria-label="LinkedIn">IN</a></div>
    </div>
  </footer>`;

export const layout = ({ path, title, description, image = "/assets/images/home-hero.jpg", body, schema = [], bodyClass = "", assetVersion = "" }) => {
  const canonical = `${site.origin}${path}`;
  const pageName = path === "/" ? site.name : title.replace(/\s+-\s+Unicom TIC$/, "");
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": ["Organization", "EducationalOrganization"],
      "@id": `${site.origin}/#organization`,
      name: site.name,
      url: site.origin,
      logo: `${site.origin}/assets/images/unicom-tic-logo.png`,
      telephone: site.phoneDisplay,
      email: site.email,
      address: { "@type": "PostalAddress", streetAddress: "MPCS Building, No 127, Kankesanthurai Road", addressLocality: "Jaffna", addressCountry: "LK" },
      sameAs: Object.values(site.social)
    },
    {
      "@type": "WebPage",
      "@id": `${canonical}#webpage`,
      url: canonical,
      name: title,
      description,
      isPartOf: { "@type": "WebSite", "@id": `${site.origin}/#website`, url: site.origin, name: site.name },
      primaryImageOfPage: { "@type": "ImageObject", url: `${site.origin}${image}` }
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${canonical}#breadcrumbs`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: site.name, item: `${site.origin}/` },
        ...(path === "/" ? [] : [{ "@type": "ListItem", position: 2, name: pageName, item: canonical }])
      ]
    },
    ...schema
  ];
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1">
  <link rel="canonical" href="${canonical}">
  <meta property="og:type" content="website">
  <meta property="og:locale" content="en_LK">
  <meta property="og:site_name" content="Unicom TIC">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${site.origin}${image}">
  <meta property="og:image:alt" content="${esc(title)}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(title)}">
  <meta name="twitter:description" content="${esc(description)}">
  <meta name="twitter:image" content="${site.origin}${image}">
  <meta name="twitter:image:alt" content="${esc(title)}">
  <meta name="theme-color" content="#4F4F4F">
  <link rel="icon" href="/assets/images/favicon.png" sizes="any">
  <link rel="stylesheet" href="/assets/css/site.css?v=${assetVersion || "20261007-12"}">
  <script type="application/ld+json">${JSON.stringify(schemas)}</script>
  <script type="module" src="/assets/js/site.js?v=${assetVersion || "20261007-12"}"></script>
</head>
<body class="${esc(bodyClass)}">
  ${header(path)}
  <main id="main-content">${body}</main>
  ${footer()}
</body>
</html>`;
};

export { esc };
