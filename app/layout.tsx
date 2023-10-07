import { Banner } from '@/components/Banner'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Main from '@/components/Main'
import { Toaster } from '@/components/ui/toaster'
import { authOptions } from '@/lib/auth'
import { cn } from '@/lib/utils'
import { type CustomSession } from '@/types'
import { getServerSession } from 'next-auth'
import { Inter } from 'next/font/google'
import Analytics from './analytics'
import './globals.css'
import { defaultMetadata } from './metadata'
import { Providers } from './providers'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
})

export const metadata = defaultMetadata

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session: CustomSession | null = await getServerSession(authOptions)

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
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
          <Toaster />
          <Banner />
          <Header session={session} />

          <Main>{children}</Main>

          <Footer />
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}
