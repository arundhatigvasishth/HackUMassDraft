import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Press_Start_2P, VT323 } from 'next/font/google'
import './globals.css'

const pressStart = Press_Start_2P({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-press-start',
})

const vt323 = VT323({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-vt323',
})

export const metadata: Metadata = {
  title: 'HackUMass XV — HACK THE SYSTEM',
  description:
    'HackUMass XV: a 36-hour collegiate hackathon at UMass Amherst. Insert coin and hack the system. 600+ hackers, free dining, hardware lab, and top sponsors.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0a0a0a',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`bg-background ${pressStart.variable} ${vt323.variable}`}>
      <body className="antialiased">
        {children}
        <div className="crt-overlay" aria-hidden="true" />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
