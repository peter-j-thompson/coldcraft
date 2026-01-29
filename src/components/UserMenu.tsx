'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import type { User } from '@supabase/supabase-js'

interface UserMenuProps {
  user: User
  hasSubscription: boolean
}

export default function UserMenu({ user, hasSubscription }: UserMenuProps) {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-gray-300 hover:text-white transition"
      >
        <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
          {user.email?.[0].toUpperCase()}
        </div>
        <span className="hidden sm:inline">{user.email}</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <>
          <div className="fixed inset-0" onClick={() => setOpen(false)} />
          <div className="absolute right-0 mt-2 w-56 bg-slate-800 border border-white/10 rounded-xl shadow-xl py-2 z-50">
            <div className="px-4 py-2 border-b border-white/10">
              <p className="text-white text-sm font-medium truncate">{user.email}</p>
              <p className="text-xs text-gray-400">
                {hasSubscription ? '✅ Pro Plan' : '⏰ Free Trial'}
              </p>
            </div>

            {!hasSubscription && (
              <a
                href="/api/stripe/checkout"
                className="block px-4 py-2 text-purple-400 hover:bg-white/5 transition"
              >
                ⚡ Upgrade to Pro
              </a>
            )}

            {hasSubscription && (
              <a
                href="/api/stripe/portal"
                className="block px-4 py-2 text-gray-300 hover:bg-white/5 transition"
              >
                Manage Subscription
              </a>
            )}

            <button
              onClick={handleSignOut}
              className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-white/5 transition"
            >
              Sign Out
            </button>
          </div>
        </>
      )}
    </div>
  )
}
