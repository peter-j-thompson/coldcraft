import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import EmailGenerator from '@/components/EmailGenerator'
import UserMenu from '@/components/UserMenu'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Check subscription status
  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', user.id)
    .eq('status', 'active')
    .single()

  const hasActiveSubscription = !!subscription

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="border-b border-white/10 bg-slate-900/50 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-xl font-bold text-white">🧊 ColdCraft</div>
          <UserMenu user={user} hasSubscription={hasActiveSubscription} />
        </div>
      </header>

      {/* Main */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        {!hasActiveSubscription && (
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 mb-8">
            <p className="text-yellow-400 text-center">
              ⚡ You&apos;re on the free trial. <a href="/api/stripe/checkout" className="underline font-semibold">Upgrade to Pro ($49/mo)</a> for unlimited access.
            </p>
          </div>
        )}

        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-white mb-2">Generate Cold Emails</h1>
          <p className="text-gray-400">Paste a LinkedIn profile or company website URL</p>
        </div>

        <EmailGenerator />
      </main>
    </div>
  )
}
