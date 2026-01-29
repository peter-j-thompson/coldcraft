#!/bin/bash
# ColdCraft - Vercel Environment Setup Script
# Usage: ./scripts/setup-vercel-env.sh

TOKEN="GcZpEGU6zlnqN849UgVwsBQs"
PROJECT="coldcraft"

echo "🧊 ColdCraft Environment Variable Setup"
echo "========================================"
echo ""

# Function to add env var
add_env() {
    local name=$1
    local prompt=$2
    
    echo -n "$prompt: "
    read -r value
    
    if [ -n "$value" ]; then
        echo "$value" | vercel env add "$name" production --token "$TOKEN" 2>/dev/null
        echo "✅ Added $name"
    else
        echo "⏭️  Skipped $name"
    fi
}

echo "Supabase (from supabase.com/dashboard > Settings > API)"
echo "--------------------------------------------------------"
add_env "NEXT_PUBLIC_SUPABASE_URL" "Project URL (https://xxx.supabase.co)"
add_env "NEXT_PUBLIC_SUPABASE_ANON_KEY" "anon public key"
add_env "SUPABASE_SERVICE_ROLE_KEY" "service_role key"

echo ""
echo "Stripe (from dashboard.stripe.com)"
echo "-----------------------------------"
add_env "STRIPE_SECRET_KEY" "Secret key (sk_...)"
add_env "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY" "Publishable key (pk_...)"
add_env "STRIPE_WEBHOOK_SECRET" "Webhook secret (whsec_...)"
add_env "STRIPE_PRICE_ID" "Price ID for $49/mo (price_...)"

echo ""
echo "OpenAI (from platform.openai.com)"
echo "----------------------------------"
add_env "OPENAI_API_KEY" "API Key (sk-...)"

echo ""
echo "========================================"
echo "✅ Environment variables configured!"
echo ""
echo "Now redeploy with:"
echo "  vercel --prod --token $TOKEN"
echo ""
