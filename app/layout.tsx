import { cn } from '@/lib/utils';
import { Viewport } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';
import Analytics from './analytics';
import './globals.css';
import { defaultMetadata } from './metadata';
import { Providers } from './providers';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

export const metadata = defaultMetadata;

export const viewport: Viewport = {
  themeColor: '#ffffff',
  userScalable: false,
  maximumScale: 1.0,
  initialScale: 1.0,
  width: 'device-width',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#603cba" />
      </head>

      <body
        style={{
          textRendering: 'optimizeLegibility',
        }}
        className={cn(
          inter.className,
          'flex min-h-screen touch-manipulation flex-col antialiased',
        )}
      >
        <Providers>
          <a
            href="#main"
            className="sr-only absolute left-[-999px] top-[-999px] block border bg-[#ffc] text-black focus:not-sr-only focus:bottom-0 focus:top-0 focus:border-[#990000]"
            aria-label="skip"
            id="skip"
          >
            Skip Content
          </a>

          <Toaster />

          {children}
        </Providers>
      </body>

      <Analytics />
    </html>
  );
}
