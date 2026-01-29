# 🧊 ColdCraft

AI-powered cold email generator for freelancers. Paste a LinkedIn URL or company website, get a personalized cold email.

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Supabase
1. Create a project at [supabase.com](https://supabase.com)
2. Go to SQL Editor and run `supabase/schema.sql`
3. Enable Google OAuth in Authentication > Providers (optional)
4. Copy your project URL and keys

### 3. Set Up Stripe
1. Create a product + price at [stripe.com/dashboard](https://dashboard.stripe.com)
2. Set price to $49/mo recurring
3. Copy the price ID (starts with `price_`)
4. Set up webhook endpoint: `https://your-domain.com/api/stripe/webhook`
   - Events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`

### 4. Configure Environment
```bash
cp .env.local.example .env.local
# Fill in all the values
```

### 5. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/coldcraft)

1. Push to GitHub
2. Import to Vercel
3. Add environment variables
4. Deploy!

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Auth & DB:** Supabase
- **Payments:** Stripe
- **AI:** OpenAI GPT-4
- **Email:** Resend (for future email sending)

## Features

- ✅ Magic link + Google OAuth
- ✅ LinkedIn/website URL research
- ✅ AI-generated personalized emails
- ✅ Stripe subscription ($49/mo)
- ✅ Free trial (5 emails)
- ✅ Copy to clipboard

## Future Ideas

- [ ] Email sending via Resend
- [ ] Save email templates
- [ ] Bulk generation
- [ ] Email tracking
- [ ] CRM integrations

## License

MIT
