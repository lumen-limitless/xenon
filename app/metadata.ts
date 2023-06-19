import { Metadata } from 'next'

const APP_DESCRIPTION = 'lorem ipsum dolor sit amet'

const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || 'Next.js'
const TWITTER_CREATOR = process.env.NEXT_PUBLIC_TWITTER_CREATOR || '@nextjs'
const TWITTER_SITE =
  process.env.NEXT_PUBLIC_TWITTER_SITE || 'https://vercel.com'

export const defaultMetadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  applicationName: SITE_NAME,
  description: APP_DESCRIPTION,
  themeColor: '#FFFFFF',
  // metadataBase: new URL(APP_URL),
  generator: 'Next.js',
  keywords: [],
  icons: [
    {
      rel: 'apple-touch-icon',
      url: '/apple-icon-57x57.png',
      sizes: '57x57',
    },
    { rel: 'apple-touch-icon', url: '/apple-icon-60x60.png', sizes: '60x60' },
    { rel: 'apple-touch-icon', url: '/apple-icon-72x72.png', sizes: '72x72' },
    { rel: 'apple-touch-icon', url: '/apple-icon-76x76.png', sizes: '76x76' },
    {
      rel: 'apple-touch-icon',
      url: '/apple-icon-114x114.png',
      sizes: '114x114',
    },
    {
      rel: 'apple-touch-icon',
      url: '/apple-icon-120x120.png',
      sizes: '120x120',
    },
    {
      rel: 'apple-touch-icon',
      url: '/apple-icon-144x144.png',
      sizes: '144x144',
    },
    {
      rel: 'apple-touch-icon',
      url: '/apple-icon-152x152.png',
      sizes: '152x152',
    },
    {
      rel: 'apple-touch-icon',
      url: '/apple-icon-180x180.png',
      sizes: '180x180',
    },
    {
      rel: 'icon',
      url: '/android-icon-192x192.png',
      sizes: '192x192',
      type: 'image/png',
    },
    {
      rel: 'icon',
      url: '/favicon-32x32.png',
      sizes: '32x32',
      type: 'image/png',
    },
    {
      rel: 'icon',
      url: '/favicon-96x96.png',
      sizes: '96x96',
      type: 'image/png',
    },
    {
      rel: 'icon',
      url: '/favicon-16x16.png',
      sizes: '16x16',
      type: 'image/png',
    },
  ],

  viewport:
    'minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover',

  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: APP_DESCRIPTION,
    locale: 'en_US',
  },

  twitter: {
    title: SITE_NAME,
    site: TWITTER_SITE,
    creator: TWITTER_CREATOR,
    description: APP_DESCRIPTION,
    card: 'summary_large_image',
  },

  appleWebApp: {
    statusBarStyle: 'black-translucent',
    title: SITE_NAME,
    capable: true,
  },

  robots: {
    index: true,
    follow: true,
  },

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  manifest: '/manifest.json',

  other: {
    'mobile-web-app-capable': 'yes',
    'msapplication-TileColor': '#FFFFFF',
    'msapplication-TileImage': '/ms-icon-144x144.png',
    'msapplication-config': '/browserconfig.xml',
    'msapplication-tap-highlight': 'no',
  },
}
