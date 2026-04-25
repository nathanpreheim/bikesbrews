# Bikes and Brews MVP

A polished validation landing page for [bikesandbrews.co](https://bikesandbrews.co) designed to test whether Omaha has unmet demand for better daytime experiences before revealing a full product.

This repo is optimized for one job: validate the problem first. The page teases a future concept without over-explaining it, so it can be shared publicly without pretending product certainty already exists.

## What this includes

- Hero section with primary and secondary CTAs
- Problem exploration cards
- Audience framing cards
- Multi-step validation survey
- Abstract concept teaser cards
- Repeated early-access email CTA
- Placeholder analytics hooks
- Vercel-ready API routes for survey responses and early-access email capture
- Optional Resend email forwarding when env vars are configured

## Stack

- Next.js App Router
- TypeScript
- Responsive CSS
- No database
- No auth
- No payments

## Local setup

1. Install dependencies:

```bash
npm install
```

2. Build the app:

```bash
npm run build
```

3. Start the production server:

```bash
npm run start
```

4. Open [http://localhost:3000](http://localhost:3000)

## Recommended Vercel environment variables

- `RESEND_API_KEY`
- `CONTACT_EMAIL`

If you use Resend in production, also update the `from` address in `app/api/interest/route.ts` and `app/api/updates/route.ts` to a verified sending domain.

## Deploy to Vercel

1. Push the repo to GitHub
2. Import it into Vercel
3. Add environment variables when you wire up email and analytics
4. Deploy

## Environment variables to add later

- `RESEND_API_KEY`
  Used for email delivery through Resend.

- `CONTACT_EMAIL`
  Destination inbox for survey responses and early access signups.

- Analytics provider variables
  Add the keys required by the provider you choose, such as Plausible, PostHog, or Google Analytics.

## Where to wire future integrations

- Survey endpoint: `app/api/interest/route.ts`
- Repeated email CTA endpoint: `app/api/updates/route.ts`
- Client analytics helpers: `lib/analytics.ts`
- Form schema and payload shape: `lib/interest-form.ts`

## Suggested file structure

```text
app/
  api/interest/route.ts
  api/updates/route.ts
  globals.css
  layout.tsx
  page.tsx
components/
  audience-section.tsx
  concept-teaser-section.tsx
  email-cta-section.tsx
  footer.tsx
  hero-section.tsx
  problem-section.tsx
  survey-section.tsx
  ui.tsx
  validation-form.tsx
lib/
  analytics.ts
  content.ts
  interest-form.ts
```

## Notes

- The main survey currently posts to a local API route and logs submissions on the server.
- The repeated email CTA uses a separate lightweight API route so it can stay fast and simple.
- Analytics calls are placeholder-safe and can be swapped once you pick a provider.
- The page is intentionally curiosity-driven and problem-led rather than product-led.
