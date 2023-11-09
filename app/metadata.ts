import { APP_DESCRIPTION, APP_NAME, APP_URL } from '@/lib/constants'
import { Metadata } from 'next'

export const defaultMetadata: Metadata = {
  title: {
    default: APP_NAME,
    template: `%s | ${APP_NAME}`,
  },
  applicationName: APP_NAME,
  description: APP_DESCRIPTION,
  metadataBase: new URL(APP_URL),
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
    url: new URL(APP_URL),
    locale: 'en_US',
  },

  twitter: {
    title: APP_NAME,
    creator: '@LumenLimitless',
    description: APP_DESCRIPTION,
    card: 'summary_large_image',
  },

  appleWebApp: {
    statusBarStyle: 'black-translucent',
    title: APP_NAME,
    capable: true,
  },

  robots: {
    index: true,
    follow: true,
  },

  formatDetection: {
    date: false,
    email: false,
    address: false,
    telephone: false,
  },
  manifest: null,
}
