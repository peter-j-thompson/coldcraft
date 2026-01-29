# 🚀 ColdCraft Deployment Guide

## Current Status
- ✅ **Vercel:** Deployed to https://coldcraft-omega.vercel.app
- ✅ **GitHub:** https://github.com/peter-j-thompson/coldcraft
- ⏳ **Supabase:** Needs project creation
- ⏳ **Stripe:** Needs product/price setup
- ⏳ **OpenAI:** Needs API key
- ⏳ **Resend:** Optional (for future email sending)

---

## Step 1: Create Supabase Project

1. Go to [supabase.com/dashboard](https://supabase.com/dashboard)
2. Login with `somethingpeter@gmail.com`
3. Click "New Project"
4. **Name:** `coldcraft`
5. **Database Password:** Generate a strong one (save it!)
6. **Region:** West US (or closest to your users)
7. Wait for project to be created (~2 min)

### Run the Schema
1. In your Supabase project, go to **SQL Editor**
2. Click "New Query"
3. Copy/paste the contents of `supabase/schema.sql`
4. Click "Run"
5. You should see "Success. No rows returned"

### Get Your Keys
Go to **Settings > API** and copy:
- `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
- `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `service_role` key → `SUPABASE_SERVICE_ROLE_KEY`

### Enable Google OAuth (Optional)
1. Go to **Authentication > Providers**
2. Enable Google
3. Follow the setup instructions to get OAuth credentials
4. Add authorized redirect URL: `https://coldcraft-omega.vercel.app/auth/callback`

---

## Step 2: Set Up Stripe

1. Go to [dashboard.stripe.com](https://dashboard.stripe.com)
2. **Create a Product:**
   - Name: "ColdCraft Pro"
   - Description: "Unlimited cold email generation"
3. **Add a Price:**
   - $49/month recurring
   - Copy the Price ID (starts with `price_`)
4. **Get API Keys:**
   - Go to **Developers > API Keys**
   - Copy `Publishable key` → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - Copy `Secret key` → `STRIPE_SECRET_KEY`

### Set Up Webhook
1. Go to **Developers > Webhooks**
2. Click "Add endpoint"
3. **URL:** `https://coldcraft-omega.vercel.app/api/stripe/webhook`
4. **Events to send:**
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
5. After creating, click the webhook and copy the **Signing secret** → `STRIPE_WEBHOOK_SECRET`

---

## Step 3: Get OpenAI API Key

1. Go to [platform.openai.com](https://platform.openai.com)
2. **API Keys > Create new secret key**
3. Copy it → `OPENAI_API_KEY`

---

## Step 4: Add Environment Variables to Vercel

Go to [Vercel Dashboard](https://vercel.com/peters-projects-339cee05/coldcraft/settings/environment-variables)

Add these variables (all environments):

| Variable | Value |
|----------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Your Supabase service role key |
| `STRIPE_SECRET_KEY` | `sk_live_...` or `sk_test_...` |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | `pk_live_...` or `pk_test_...` |
| `STRIPE_WEBHOOK_SECRET` | `whsec_...` |
| `STRIPE_PRICE_ID` | `price_...` (your $49/mo price) |
| `OPENAI_API_KEY` | `sk-...` |
| `RESEND_API_KEY` | Optional for now |
| `NEXT_PUBLIC_APP_URL` | ✅ Already set: `https://coldcraft-omega.vercel.app` |

After adding all variables, click **Redeploy** with "Use existing Build Cache" unchecked.

---

## Step 5: Test the App

1. Go to https://coldcraft-omega.vercel.app
2. Click "Sign In"
3. Enter your email and check for magic link
4. Generate a test email
5. Try the upgrade flow (use Stripe test mode first!)

---

## Quick Commands

### Redeploy from CLI
```bash
cd ~/clawd/coldcraft
vercel --prod --token GcZpEGU6zlnqN849UgVwsBQs
```

### Add env var from CLI
```bash
vercel env add VAR_NAME production --token GcZpEGU6zlnqN849UgVwsBQs
```

### View logs
```bash
vercel logs coldcraft-omega.vercel.app --token GcZpEGU6zlnqN849UgVwsBQs
```

---

## Domain Setup (Optional)

To add a custom domain like `coldcraft.io`:

1. Go to Vercel project settings > Domains
2. Add your domain
3. Configure DNS as instructed
4. Update `NEXT_PUBLIC_APP_URL` to your new domain
5. Update Stripe webhook URL
6. Update Supabase redirect URL

---

## Architecture

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Next.js App   │────▶│    Supabase     │     │     Stripe      │
│   (Vercel)      │     │  (Auth + DB)    │     │   (Payments)    │
└────────┬────────┘     └─────────────────┘     └────────┬────────┘
         │                                               │
         │              ┌─────────────────┐              │
         └─────────────▶│     OpenAI      │◀─────────────┘
                        │   (GPT-4o)      │
                        └─────────────────┘
```

---

## Troubleshooting

### "Unauthorized" error on dashboard
- Check Supabase URL and anon key are correct
- Make sure you ran the schema.sql

### Stripe checkout not working
- Verify STRIPE_PRICE_ID is correct
- Check Stripe webhook is receiving events

### AI generation fails
- Check OPENAI_API_KEY is valid
- Check your OpenAI account has credits

### Magic link emails not arriving
- Check Supabase email settings (SMTP or default)
- Check spam folder

---

## Cost Estimates

| Service | Free Tier | Paid |
|---------|-----------|------|
| Vercel | 100GB bandwidth | $20/mo Pro |
| Supabase | 500MB DB, 50K MAU | $25/mo Pro |
| OpenAI | None (pay as go) | ~$0.01-0.03/email |
| Stripe | 2.9% + $0.30/tx | Same |

**Break-even:** ~3-4 paying customers covers infrastructure.

---

## Need Help?

Check the Vercel deployment logs:
```bash
vercel logs coldcraft-omega.vercel.app --token GcZpEGU6zlnqN849UgVwsBQs -f
```

Or run locally to debug:
```bash
cp .env.local.example .env.local
# Fill in values
npm run dev
```
