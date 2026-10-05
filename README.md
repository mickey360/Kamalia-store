# Kamalia Store — Next.js

This project converts the supplied Gemini-generated single-file React storefront into a standard Next.js App Router project. The original product catalog, shopping flow, admin UI, order tracking, WhatsApp ordering, coupon behavior, and embedded Prisma/Neon schema are preserved.

## Run

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Production build

```bash
npm run build
npm start
```

## Optional Neon/Prisma setup

Copy `.env.example` to `.env`, set `DATABASE_URL`, then run `npx prisma generate`. The current storefront state remains client-side, matching the supplied source; the Prisma schema is provided as the starting point for moving catalog/orders to Neon.

## Structure

- `app/` — Next.js App Router entry and global styles
- `components/layout/` — navbar/footer
- `components/pages/` — home, shop, product, checkout, tracking and success views
- `components/store/` — provider, cards and drawers
- `components/admin/` — admin and schema views
- `data/` — catalog seed data
- `prisma/` — PostgreSQL/Neon schema
