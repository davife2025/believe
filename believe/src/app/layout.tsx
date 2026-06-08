import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Sidebar } from '@/components/layout/Sidebar'
import { KeyboardShortcutsProvider } from '@/components/layout/KeyboardShortcuts'
import { ToastProvider } from '@/components/ui/Toast'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default:  'Believe — Open Learning Platform',
    template: '%s · Believe',
  },
  description: 'The open learning platform for developers. AI, Blockchain, Security, and every opportunity to grow.',
  keywords:    ['AI', 'blockchain', 'web3', 'developer', 'learning', 'courses', 'resources'],
  authors:     [{ name: 'Believe' }],
  icons: { icon: '/favicon.svg' },
  openGraph: {
    title:       'Believe — Open Learning Platform',
    description: 'AI, Blockchain, Security, and every opportunity to grow as a developer.',
    type:        'website',
    locale:      'en_US',
  },
  twitter: {
    card:  'summary_large_image',
    title: 'Believe — Open Learning Platform',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${inter.variable} antialiased`}
        style={{
          fontFamily: 'var(--font-inter), system-ui, -apple-system, sans-serif',
          background: 'var(--surface-base)',
          color: 'var(--text-primary)',
        }}
      >
        <ToastProvider>
          <div className="flex min-h-screen">
            <Sidebar />
            {/* Desktop: offset for sidebar. Mobile: top padding for mobile header */}
            <main className="flex-1 lg:ml-64 pt-14 lg:pt-0 min-h-screen">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
                {children}
              </div>
            </main>
          </div>
          <KeyboardShortcutsProvider />
        </ToastProvider>
      </body>
    </html>
  )
}
