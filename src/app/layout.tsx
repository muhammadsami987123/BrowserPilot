import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Providers } from '@/components/layout/Providers'
import './globals.css'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })

export const metadata: Metadata = {
  title: { default: 'BrowserPilot — AI Browser Automation', template: '%s | BrowserPilot' },
  description: 'Give AI a browser. Let it do the work. BrowserPilot automates browser tasks with real Playwright execution, live agent activity, and structured results.',
  keywords: ['browser automation', 'AI agent', 'Playwright', 'web scraping', 'task automation'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full`}>
      <body className="min-h-full bg-white text-gray-900 antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
