# SEO Strategy — Simplify Messaging / SmartSquawk

## Site summary
Single-page dark-mode marketing site for **SmartSquawk** (branded under Simplify Messaging), an AI-powered business SMS platform. Single public marketing page at `/`. The `/leads` route is an internal dashboard (not public-facing). Stack: Vite + React SPA, served as a pure client-side bundle. An `entry-server.tsx` exists but is not wired up to any prerender or SSR server.

## In scope
- The public marketing landing page (`/`, `index.html`)
- robots.txt, sitemap.xml, OG/Twitter meta, structured data, favicon

## Out of scope
- `/leads` — authenticated internal leads dashboard
- API server routes at `/api`

## Target audience
Business owners and teams seeking AI-powered SMS automation to replace legacy tools like Textline.

## Primary keywords
- Business text inbox AI
- AI business texting / SMS automation
- SmartSquawk (brand)
- Textline alternative

## Rendering mode
Pure SPA (Vite/React). `entry-server.tsx` provides a `render()` function but no build step calls it and no server uses it at runtime. All page content is client-rendered.

## Dismissed categories
- (None yet)
