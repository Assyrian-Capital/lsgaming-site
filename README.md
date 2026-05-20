# LS Gaming — Marketing Site

Premium dark casino-floor marketing site for LS Gaming, an Illinois video gaming terminal operator. Single-page React app with hash-based routing across 11 pages.

## Files

- `index.html` — shell, loads everything
- `styles.css` — design system (colors, type, components)
- `components.jsx` — reusable: SlotMachine, IllinoisMap, PartnerForm, Carousel, FAQItem, Counter, Reveal
- `pages-main.jsx` — Home, About, Services, Games
- `pages-secondary.jsx` — Locations, Partners, Player Info, FAQ
- `pages-info.jsx` — Careers, News, Contact
- `app.jsx` — router, nav, footer (entry point)
- `assets/lsg-logo.webp`

## Deploy to GitHub Pages

1. Push everything in this folder to the repo root.
2. **Settings → Pages → Source: Deploy from a branch → Branch: `main` / `/(root)` → Save.**
3. Live at https://assyrian-capital.github.io/lsgaming-site/ within ~1 min.

The `.nojekyll` file is required so GitHub Pages doesn't strip the JSX files.

## Local preview

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## How it works

JSX is transpiled in the browser by Babel-standalone (pinned versions in `index.html`). No build step required — this is intentional so the site can be edited directly. For a faster production build, you'd want to precompile the JSX with Babel ahead of time and minify, but the current approach trades ~300ms of first-paint delay for editability.
