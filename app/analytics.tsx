'use client'

import { Analytics as VercelAnalytics } from '@vercel/analytics/react'
import { GoogleAnalytics } from 'nextjs-google-analytics'

export default function Analytics() {
  return (
    <>
      <GoogleAnalytics trackPageViews />
      <VercelAnalytics />
    </>
  )
}
