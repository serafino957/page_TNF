# page_TNF

Static storefront for The North Face style e-commerce pages.

## Local preview

Use npm script:

```bash
npm start
```

Or run a static server from the `public` directory:

```bash
cd public
python3 -m http.server 5500
```

Open `http://localhost:5500`.

## Environment files

- `.env` is not required for this static frontend.
- If backend integration is added later, use `.env.example` as a template and keep real secrets only in local `.env`.

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

- This is a static frontend project. No real backend API, authentication, or payment processing is connected.
- Data is demo-only in browser storage (localStorage), so cart/account content is not persisted across devices.