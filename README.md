# LS Gaming — Marketing Site

Premium dark casino-floor marketing site for LS Gaming, an Illinois video gaming terminal operator. Single-page React app with hash-based routing across 11 pages (home, about, services, games, locations, partners, player info, FAQ, careers, news, contact).

## Deploy to GitHub Pages

1. Create a new repository (or use an existing one), e.g. `lsgaming-site`.
2. Upload **everything in this folder** to the repo root — `index.html`, `.nojekyll`, and this README.
3. In the repo on GitHub: **Settings → Pages → Source: Deploy from a branch → Branch: `main` (or `master`) / root → Save.**
4. Wait ~1 minute. Your site will be live at https://assyrian-capital.github.io/lsgaming-site/.

For a custom domain (e.g. `lsgaming.com`), add a `CNAME` file with the bare domain (one line, no protocol) to this folder and configure DNS A records pointing to GitHub Pages IPs:

```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

## What's in `index.html`

A single self-contained file: all JSX, CSS, fonts, and the logo image are inlined. No build step. Just upload and serve.

## Local preview

Open `index.html` in any modern browser, or run any static server in this folder:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```
