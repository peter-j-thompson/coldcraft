import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ColdCraft - AI Cold Emails That Get Replies',
  description: 'Paste a LinkedIn URL or company website. Our AI researches the prospect and generates personalized cold emails that actually work.',
  openGraph: {
    title: 'ColdCraft - AI Cold Emails That Get Replies',
    description: 'Paste a LinkedIn URL or company website. Our AI researches the prospect and generates personalized cold emails.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
