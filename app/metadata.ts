import { APP_DESCRIPTION, APP_NAME } from '@/lib/constants'
import { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_APP_URL
  ? `https://${process.env.NEXT_PUBLIC_APP_URL}`
  : process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : 'http://localhost:3000'

export const defaultMetadata: Metadata = {
  title: {
    default: APP_NAME,
    template: `%s | ${APP_NAME}`,
  },
  applicationName: APP_NAME,
  description: APP_DESCRIPTION,
  metadataBase: new URL(baseUrl),
  generator: 'Next.js',
  keywords: [
    'ecommerce',
    'online store',
    'online shopping',
    'online shop',
    'online store builder',
    'online store platform',
    'clothing store',
    'electronics store',
    'online fashion store',
    'online clothing store',
    'online store website',
    'online shop website',
    'online store builder',
    'nextjs',
    'nextjs ecommerce',
    'nextjs ecommerce template',
    'nextjs ecommerce boilerplate',
    'nextjs ecommerce example',
  ],

  openGraph: {
    type: 'website',
    siteName: APP_NAME,
    title: APP_NAME,
    description: APP_DESCRIPTION,
    url: new URL(baseUrl),
    locale: 'en_US',
  },

  twitter: {
    title: APP_NAME,
    creator: '@LumenLimitless',
    description: APP_DESCRIPTION,
    card: 'summary_large_image',
  },

  appleWebApp: {
    statusBarStyle: 'default',
    title: APP_NAME,
    capable: true,
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },

  formatDetection: {
    date: false,
    email: false,
    address: false,
    telephone: false,
  },

  manifest: '/manifest.json',
}
