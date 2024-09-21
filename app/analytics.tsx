'use client';

import { GoogleAnalytics } from '@next/third-parties/google';
import { Analytics as VercelAnalytics } from '@vercel/analytics/react';

export default function Analytics() {
  return (
    <>
      <GoogleAnalytics gaId="G-H3834R7E84" />
      <VercelAnalytics />
    </>
  );
}
