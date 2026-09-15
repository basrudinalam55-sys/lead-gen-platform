import type { Metadata, Viewport } from 'next'
import { Inter, Cal_Sans, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const cal = Cal_Sans({
  subsets: ['latin'],
  variable: '--font-cal',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'LeadGen Platform — Free API Powered Business Growth',
    template: '%s | LeadGen Platform',
  },
  description: 'Master platform for Google Maps Lead Gen, Competitor Price Monitoring, Social Media Content Pipeline, WhatsApp Automation & Local SEO — all powered by free APIs.',
  keywords: ['lead generation', 'business automation', 'free APIs', 'Google Maps', 'WhatsApp Business', 'Local SEO', 'social media automation'],
  authors: [{ name: 'LeadGen Platform' }],
  creator: 'LeadGen Platform',
  publisher: 'LeadGen Platform',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://leadgen-platform.vercel.app',
    siteName: 'LeadGen Platform',
    title: 'LeadGen Platform — Free API Powered Business Growth',
    description: 'Master platform for Google Maps Lead Gen, Competitor Price Monitoring, Social Media Content Pipeline, WhatsApp Automation & Local SEO',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'LeadGen Platform Dashboard',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LeadGen Platform',
    description: 'Master platform for business growth using free APIs',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: '#0c4a6e' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${cal.variable} ${jetbrains.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}