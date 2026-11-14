# Summit Ridge Roofing Website Template

A fast, mobile-first, single-page website template for a US residential and commercial roofing contractor. Built with semantic HTML, modern CSS, vanilla JavaScript, and Vite, and ready to deploy directly to Vercel with zero framework bloat.

---

## Key Features

- **Conversion-Focused Single-Page Layout**:
  - Sticky header with responsive desktop links, quick-call CTA, and mobile overlay menu.
  - Full-viewport hero (`100svh` safe) with credentials and key company stats.
  - 6 roofing & exterior service cards that pre-select the matching service in the quote form.
  - 4 company trust pillars, 6 Before/After project cards, sample customer reviews, local service-area city grid, 5-question FAQ accordion, contact section, footer, and a safe-area-aware sticky mobile call/quote bar.
- **Mobile-First Before & After Gallery + Lightbox**:
  - Stacks Before and After photos vertically on phones (`< 640px`) and displays them side-by-side at `640px+`, using `4:3` compressed WebP images with explicit dimensions and `loading="lazy"`.
  - Accessible `<button>` image triggers open a full-screen lightbox (`role="dialog"`, `aria-modal="true"`) with `object-fit: contain`, Previous/Next buttons, touch swipe navigation, keyboard support (`ArrowLeft`, `ArrowRight`, `Escape`, `Tab` focus trap), scroll-position preservation, and `prefers-reduced-motion` support.
- **Working Quote Form (Web3Forms)**:
  - Client-side validation for full name, 10-digit US phone number, email address, and service selection.
  - Submits via `fetch` (`POST` with `FormData`) to Web3Forms with a hidden `botcheck` honeypot, `"Sending..."` button state, and clear confirmation or fallback call-us messaging.
- **SEO, Open Graph & Schema.org JSON-LD**:
  - Canonical link, `robots` meta tag, `< 60`-character title, `< 160`-character meta description, Open Graph + Twitter large-image cards, `public/robots.txt`, and `public/sitemap.xml`.
  - Embedded `RoofingContractor` (including `areaServed` and 6-service `hasOfferCatalog`), `FAQPage`, and `WebSite` JSON-LD blocks hydrated dynamically from `window.SITE_CONFIG` (with no placeholder review/rating schema).
- **Analytics Ready**:
  - Includes Google Tag Manager head integration and `@vercel/analytics` injection via `src/main.ts`.

---

## Project Structure

```text
.
├── index.html              # Complete single-page markup, CSS, SITE_CONFIG, Schema.org JSON-LD, and UI/form JS
├── package.json            # Vite, TypeScript, and @vercel/analytics dependencies & scripts
├── vite.config.ts          # Vite configuration (dev server on port 3000, build output to dist/)
├── tsconfig.json           # TypeScript configuration
├── src/
│   └── main.ts             # Vercel Web Analytics initialization
└── public/
    ├── favicon.svg         # Brand SVG favicon
    ├── robots.txt          # Crawler instructions and sitemap location
    ├── sitemap.xml         # XML sitemap listing the home page
    └── images/             # Compressed WebP hero and 6 Before/After project photo pairs
```

---

## Quick Customization Guide

### 1. Update Business Details (`window.SITE_CONFIG`)

Open `index.html` and edit `window.SITE_CONFIG` inside `<head>`. Updating this single object automatically updates your company name, header logo, phone links, email links, office address, service-area cities, SEO/OG metadata, and Schema.org structured data across the page:

- `businessName`, `logoPrefix`, `logoAccent`, `logoSuffix`
- `phoneDisplay` & `phoneHref`
- `email` & `officeAddress`
- `licenseNumber` & `contactLicenseNumber`
- `primaryCity` & `serviceAreas`

### 2. Replace Remaining Placeholders

Search `index.html` for `REPLACE:` and `PLACEHOLDER:` comments to swap out template defaults:

- **URLs & Schema**: Update the canonical URL, `og:url`, `og:image`, `twitter:image`, `siteUrl`, `postalCode`, `openingHours`, and `priceRange` in `<head>`, plus the matching domain in `public/robots.txt` and `public/sitemap.xml`.
- **Quote Form Endpoint**: Replace the hidden `access_key` input value inside `#quoteForm` with your own Web3Forms access key.
- **Analytics**: Update or remove the `GTM-PPRS4F2R` Google Tag Manager container ID in `<head>` and `@vercel/analytics` in `src/main.ts` if not needed.
- **Reviews, Stats & License Numbers**: Replace the sample customer reviews, hero stats, and `[YOUR LICENSE #]` placeholders with your real business data.
- **Photos**: Replace the WebP files in `public/images/` (`hero-roofing-crew.webp` and `gallery-1-before.webp` through `gallery-6-after.webp`) while keeping `4:3` framing and descriptive `alt` text.

---

## Local Development & Build

### Prerequisites

- Node.js 18+ and npm

### Run Locally

```bash
npm install
npm run dev
```

The development server runs at `http://localhost:3000`.

### Type Check & Production Build

```bash
npm run lint
npm run build
```

Production assets are output to `dist/`. You can preview the built site locally with:

```bash
npm run preview
```

---

## Deploying to Vercel

This project builds cleanly on Vercel with default settings:

- **Install Command**: `npm install`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
