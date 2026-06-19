# page_TNF

Static storefront for The North Face style e-commerce pages.

## Local preview

Run a static server from the `public` directory:

```bash
cd public
python3 -m http.server 5500
```

Open `http://localhost:5500`.

## Public link with GitHub Pages

This repository now includes a deploy workflow at `.github/workflows/deploy-pages.yml`.

### One-time setup in GitHub UI

1. Open repository settings.
2. Go to **Pages**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.

### Deploy

1. Push to the `main` branch.
2. Wait for the **Deploy Static Site to Pages** workflow to finish.
3. Your site URL will be:

`https://serafino957.github.io/page_TNF/`

## Current limitations

- Backend server files referenced in `package.json` are missing (`server/server.js`), so `npm start` does not run.
- Some static files referenced by HTML are not present yet (for example `public/js/*` and `public/assets/*`).