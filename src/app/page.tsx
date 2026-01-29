import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Nav */}
      <nav className="flex justify-between items-center p-6 max-w-6xl mx-auto">
        <div className="text-2xl font-bold text-white">🧊 ColdCraft</div>
        <Link 
          href="/login" 
          className="bg-white text-slate-900 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition"
        >
          Sign In
        </Link>
      </nav>

      {/* Hero */}
      <main className="max-w-6xl mx-auto px-6 pt-20 pb-32">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Cold emails that <span className="text-purple-400">actually work</span>
          </h1>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Paste a LinkedIn URL or company website. Our AI researches the prospect and crafts a personalized cold email that gets replies.
          </p>
          <Link
            href="/login"
            className="inline-block bg-purple-500 hover:bg-purple-600 text-white text-lg px-8 py-4 rounded-xl font-semibold transition shadow-lg shadow-purple-500/25"
          >
            Start Free Trial →
          </Link>
          <p className="text-gray-400 mt-4 text-sm">Then $49/mo. Cancel anytime.</p>
        </div>

        {/* How it works */}
        <div className="mt-32 grid md:grid-cols-3 gap-8">
          <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-8">
            <div className="text-4xl mb-4">🔗</div>
            <h3 className="text-xl font-semibold text-white mb-2">1. Paste a URL</h3>
            <p className="text-gray-400">LinkedIn profile or company website. We handle both.</p>
          </div>
          <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-8">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-white mb-2">2. AI Research</h3>
            <p className="text-gray-400">We scrape public info and find personalization angles.</p>
          </div>
          <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-8">
            <div className="text-4xl mb-4">✉️</div>
            <h3 className="text-xl font-semibold text-white mb-2">3. Get Your Email</h3>
            <p className="text-gray-400">Personalized cold email ready to send. Edit or send directly.</p>
          </div>
        </div>

        {/* Social proof */}
        <div className="mt-32 text-center">
          <p className="text-gray-400 mb-8">Trusted by freelancers and agencies worldwide</p>
          <div className="flex justify-center items-center gap-12 opacity-50">
            <div className="text-2xl text-white">💼 Agencies</div>
            <div className="text-2xl text-white">👨‍💻 Freelancers</div>
            <div className="text-2xl text-white">🚀 Startups</div>
          </div>
        </div>

        {/* Pricing */}
        <div className="mt-32 max-w-md mx-auto">
          <div className="bg-white/5 backdrop-blur border border-purple-500/50 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-2">Pro Plan</h3>
            <div className="text-5xl font-bold text-white mb-2">$49<span className="text-xl text-gray-400">/mo</span></div>
            <ul className="text-gray-300 text-left space-y-3 my-8">
              <li className="flex items-center gap-2">✅ Unlimited email generations</li>
              <li className="flex items-center gap-2">✅ LinkedIn + website research</li>
              <li className="flex items-center gap-2">✅ Send emails directly</li>
              <li className="flex items-center gap-2">✅ Email templates</li>
              <li className="flex items-center gap-2">✅ Priority support</li>
            </ul>
            <Link
              href="/login"
              className="block w-full bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-lg font-semibold transition"
            >
              Get Started
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8">
        <div className="max-w-6xl mx-auto px-6 text-center text-gray-400">
          <p>© 2025 ColdCraft. Built for freelancers who hustle.</p>
        </div>
      </footer>
    </div>
  )
}
