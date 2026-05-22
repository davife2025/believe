import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Sidebar } from '@/components/layout/Sidebar'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'Believe — Your Knowledge Command Center',
  description: 'AI, Blockchain, Security, and Developer Opportunities — all in one place.',
  icons: { icon: '/favicon.ico' },
  openGraph: {
    title: 'Believe',
    description: 'Your personal AI + Web3 knowledge command center.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans bg-[#0a0a0f] text-zinc-100 antialiased`}>
        <div className="flex min-h-screen">
          <Sidebar />
          {/* Desktop: ml-64 for sidebar. Mobile: pt-14 for top header bar */}
          <main className="flex-1 lg:ml-64 pt-14 lg:pt-0 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  )
}
