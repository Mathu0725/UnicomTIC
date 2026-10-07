# Unicom TIC 2026

A zero-dependency, production-ready static rebuild of the Unicom TIC website.

## Commands

```powershell
npm run build
npm run check
npm run check:security
npm start
```

The build system generates every public HTML route from reusable components and structured page data. The generated site is served directly from this project folder.

## Structure

- `src/site.mjs` - site configuration, shared components, metadata, and layout
- `src/pages.mjs` - page-specific content and composition
- `assets/css/site.css` - design system and responsive styles
- `assets/js/site.js` - navigation, accordions, galleries, and WhatsApp form
- `assets/images` - original Unicom TIC media only
- `scripts/build.mjs` - static page, sitemap, and robots generator
- `scripts/check.mjs` - route, metadata, heading, image, and internal-link checks

## Deployment

The project is a static site. `npm run build` keeps the local preview files at the project root and generates a clean public deployment bundle in `dist/`. Deploy `dist/` to Azure Static Web Apps, Netlify, Vercel, or any static web server. Do not publish the project root directly when the host can use `dist/`.

### Azure Static Web Apps

- App location: `/`
- Output location: `dist`
- API location: leave empty
- Build command: `npm run build`

The generated `dist/staticwebapp.config.json` provides Azure security headers and a 404 response. `src/`, `scripts/`, `qa/`, and development files remain outside the deployed bundle.

### GitHub push-to-deploy

The repository includes `.github/workflows/azure-static-web-apps.yml`. After connecting the repository to an Azure Static Web App, add the Azure deployment token as the GitHub Actions secret `AZURE_STATIC_WEB_APPS_API_TOKEN`. Every push to `main` then builds the project and deploys only `dist/`; no desktop server or manual ZIP upload is required.

## Security and SEO

The build generates page metadata, canonical URLs, Open Graph and Twitter tags, JSON-LD, `sitemap.xml`, and `robots.txt`. `npm run check` validates these files and `npm run check:security` validates the local server headers, private-path blocking, traversal handling, supported methods, and 404 responses.

The bundled Node server is suitable for local or private-LAN previews. For public hosting, place the static files behind an HTTPS-enabled web server or managed static host, keep port 8082 off the public internet, and enable HSTS only after HTTPS is confirmed with `ENABLE_HSTS=true`.
