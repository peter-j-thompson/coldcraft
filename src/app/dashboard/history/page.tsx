import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function HistoryPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: generations } = await supabase
    .from('generations')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(50)

  return (
    <div className="min-h-screen bg-slate-900">
      <header className="border-b border-white/10 bg-slate-900/50 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/dashboard" className="text-xl font-bold text-white">🧊 ColdCraft</Link>
          <Link href="/dashboard" className="text-gray-400 hover:text-white transition">
            ← Back to Generator
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-2xl font-bold text-white mb-8">Email History</h1>

        {!generations?.length ? (
          <div className="text-center py-12">
            <p className="text-gray-400">No emails generated yet.</p>
            <Link href="/dashboard" className="text-purple-400 hover:underline mt-2 inline-block">
              Generate your first email →
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {generations.map((gen) => (
              <div key={gen.id} className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="text-white font-medium">{gen.subject}</p>
                    <p className="text-gray-500 text-sm truncate max-w-md">{gen.url}</p>
                  </div>
                  <span className="text-gray-500 text-sm">
                    {new Date(gen.created_at).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-400 text-sm line-clamp-2">{gen.body}</p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
