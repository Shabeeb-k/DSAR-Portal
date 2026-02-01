This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# DSAR Portal - SaaS Machine Test

## Setup Steps

1. **Clone the repo & install dependencies:**
   ```sh
   git clone <your-repo-url>
   cd dsarportal
   npm install
   ```

2. **Configure environment variables:**
   - Copy `.env.local` and fill in:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - `SUPABASE_SERVICE_ROLE_KEY`
     - `STRIPE_SECRET_KEY`
     - `STRIPE_WEBHOOK_SECRET`
     - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
     - `STRIPE_SUBSCRIPTION_PRICE_ID`
     - `NEXT_PUBLIC_BASE_URL` (e.g. http://localhost:3000)

3. **Supabase DB setup:**
   - Create a Supabase project.
   - Run the SQL in `supabase_schema.sql` in the Supabase SQL editor.

4. **Stripe setup:**
   - Create a Stripe account (test mode).
   - Create a subscription product and price, copy the price ID to `STRIPE_SUBSCRIPTION_PRICE_ID`.
   - Set webhook endpoint to `/api/stripe-webhook` for events:
     - `checkout.session.completed`
     - `customer.subscription.created`
     - `customer.subscription.updated`
     - `customer.subscription.deleted`

5. **Run the app:**
   ```sh
   npm run dev
   ```

## Test Credentials
- **Admin:**
  - Register a user, then set their role to `admin` in the Supabase `profiles` table.
- **Owner:**
  - Register via `/auth/register`.

## Features
- Company registration, admin approval, unique public URL
- DSAR form (public), DSAR management (owner/admin)
- Stripe subscription gating
- Role-based access, Zod validation, audit logs, email stub

## Bonus
- Email notification stub: logs to console on DSAR creation
- Audit logs: status changes for company and DSAR requests

---

**For any issues, check the console/logs for error details.**

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
