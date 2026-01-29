'use client'

import { useState } from 'react'

export default function EmailGenerator() {
  const [url, setUrl] = useState('')
  const [context, setContext] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{ subject: string; body: string; research: string } | null>(null)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setResult(null)

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, context }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to generate email')
      }

      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = () => {
    if (result) {
      navigator.clipboard.writeText(`Subject: ${result.subject}\n\n${result.body}`)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="space-y-8">
      {/* Input Form */}
      <form onSubmit={handleGenerate} className="space-y-4">
        <div>
          <label className="block text-sm text-gray-400 mb-2">Prospect URL</label>
          <input
            type="url"
            placeholder="https://linkedin.com/in/... or https://company.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 text-lg"
            required
          />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2">
            What you&apos;re selling (optional)
          </label>
          <textarea
            placeholder="E.g., freelance web developer specializing in Shopify stores..."
            value={context}
            onChange={(e) => setContext(e.target.value)}
            className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 h-24 resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-purple-500 hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 rounded-xl font-semibold text-lg transition flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Researching & Writing...
            </>
          ) : (
            '✨ Generate Email'
          )}
        </button>
      </form>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
          <p className="text-red-400">{error}</p>
        </div>
      )}

      {/* Result */}
      {result && (
        <div className="bg-white/5 border border-white/20 rounded-2xl overflow-hidden">
          {/* Research */}
          <div className="border-b border-white/10 p-6">
            <h3 className="text-sm font-medium text-purple-400 mb-2">🔍 Research Notes</h3>
            <p className="text-gray-300 text-sm whitespace-pre-wrap">{result.research}</p>
          </div>

          {/* Email */}
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-sm font-medium text-purple-400">✉️ Generated Email</h3>
              <button
                onClick={copyToClipboard}
                className="text-sm text-gray-400 hover:text-white transition"
              >
                {copied ? '✅ Copied!' : '📋 Copy'}
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Subject</label>
                <p className="text-white font-medium">{result.subject}</p>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Body</label>
                <div className="text-gray-200 whitespace-pre-wrap leading-relaxed">
                  {result.body}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
