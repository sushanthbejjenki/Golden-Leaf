# Golden Leaf Tobacco & Vape — storefront prototype

A custom Next.js + TypeScript ecommerce UI inspired by the practical shopping patterns in the user-provided Element Vape screenshots/videos: compact announcement bar, searchable catalogue, category navigation, sidebar filters, sorting, product detail pages, cart drawer, cookie preferences, and an admin import preview. The Element Vape branding and screen recordings are not used as page backgrounds. The supplied Golden Leaf logo is used throughout.

## Functional in this starter

- Responsive neutral retail storefront with restrained gold accents and reduced-motion support.
- Search, category navigation, brand filtering, price-range filtering, in-catalogue toggle, and sorting.
- Dedicated product detail URLs at `/products/gl-101` etc., quick-view modal, related items, and quantity selection.
- Cart add/remove/quantity controls, subtotal, and cart persistence in browser local storage.
- Saved-products list stored in browser local storage.
- Cookie preference banner with Reject / Manage / Accept and persisted preference choices. No analytics or marketing provider is loaded.
- Draft privacy, terms, shipping, returns, and cookie-policy pages under `/policies/...`.
- Admin workspace preview (development only) with CSV parsing, required-column checks, price/stock validation, and sample row preview.
- Prisma/PostgreSQL schema included for future database-backed users, catalogue, inventory, orders, age-verification records, audit logs, and import jobs.
- Checkout remains disabled; sample products, artwork, prices, stock and reviews are not live offers.

## Run locally (Windows PowerShell)

Requires Node.js 20.9+.

```powershell
npm install
Copy-Item .env.example .env
npm run dev
```

Open http://localhost:3000. The `.npmrc` file configures the official npm registry and longer retry timeouts to help with transient `ECONNRESET` errors. If installation still fails, check `npm ping`, internet access, proxy/VPN settings, and firewall restrictions; the missing `next` command after a failed install is a consequence of dependencies not being installed.

## Database foundation

1. Create a PostgreSQL database and set `DATABASE_URL` in `.env`.
2. Run `npx prisma generate`.
3. Review the schema, then run `npx prisma migrate dev --name initial`.

## Important status: prototype, not production checkout

This version implements real client-side catalogue interactions, product-detail routes, browser-persistent demo cart/favorites, cookie preference UI, and local CSV validation. It does **not yet** provide server-side customer authentication, database-backed catalogue CRUD, persistent inventory/import commits, order processing, payment integration, provider-backed age/identity verification, live tax/shipping calculation, or fulfilment. The admin preview is not a secure admin system and must not be treated as one.

Do not enable sales until the US business jurisdiction, licensing, product authorization/eligibility, federal/state/local rules, PACT Act obligations where applicable, destination restrictions, carrier/delivery rules, tax obligations, age/identity verification, payment-provider eligibility, and final policies have been reviewed. A date-of-birth prompt alone is not adequate age verification. Keep `CHECKOUT_ENABLED=false` until the full legal and technical release gate is satisfied.

## Site entry age gate

A site-wide 21+ date-of-birth entry screen now wraps all app routes. Visitors who enter a date indicating they are under 21 are blocked from viewing the site. Successful confirmation is remembered in browser local storage (`gl-age-verified-v1`); the date of birth itself is not stored. Clear that browser storage to test the entry screen again.

**Important:** This is a client-side entry-screen safeguard, not formal identity verification and not sufficient by itself for legal compliance. Live checkout remains disabled. Before any real sales, add server-side age/identity verification and destination/product eligibility checks appropriate to the confirmed US jurisdiction.


## Visual direction update
The storefront uses a lighter US-retail-inspired layout: compact category navigation, prominent search, visible filters, clean product cards and cart controls. The refreshed palette uses charcoal, acid lime, teal, coral and lilac accents, with bold condensed headings and restrained motion instead of a royal gold-and-serif look.
