export const APP_URL = process.env.NEXT_PUBLIC_APP_URL
  ? `${process.env.NEXT_PUBLIC_APP_URL}`
  : process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : 'http://localhost:3000'

export const APP_NAME = 'Xenon'

export const APP_DESCRIPTION =
  'Xenon is a simple ecommerce boilerplate for Next.js'
