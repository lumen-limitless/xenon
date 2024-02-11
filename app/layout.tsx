import Footer from '@/app/footer';
import Header from '@/app/header';
import Main from '@/app/main';
import { Banner } from '@/components/Banner';
import { cn } from '@/lib/utils';
import { Viewport } from 'next';
import { Inter } from 'next/font/google';
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
          <a href="#main" className="sr-only" aria-label="skip">
            skip to content
          </a>
          <Banner />
          <Header />

          <Main>{children}</Main>

          <Footer />
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
