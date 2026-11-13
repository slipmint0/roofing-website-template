# Summit Ridge Roofing Website Template

A responsive, single-page US residential and commercial roofing website template for **Summit Ridge Roofing**, powered by Vite with plain HTML, CSS, and vanilla JavaScript.

## Features

- Single-page layout with sticky header navigation, hero showcase, 6 service cards, 4 trust highlights, 6 before-and-after project gallery cards, sample customer reviews, service area cities, a 5-question FAQ accordion, a validated quote request form, footer, and a sticky mobile call/quote bar.
- Flat, high-contrast navy (`#06101E`) and safety orange (`#FF5500`) theme with mobile-first `360px` responsiveness and compressed WebP photography in `public/images/`.

## Quick Customization

Open `index.html` and edit the `window.SITE_CONFIG` object near the top of `<head>` to update:

- Business name and logo wording
- Phone number (`REPLACE: phone`) and email address
- Office address and contractor license number (`PLACEHOLDER: replace with real data`)
- Primary city and service-area city list (`REPLACE: city`)

You can also search `index.html` for `REPLACE:` and `PLACEHOLDER:` comments to update any sample stats, review text, or project photos.

## Local Development & Build

```bash
npm install
npm run dev
```

Create a production build in `dist/`:

```bash
npm run build
```
