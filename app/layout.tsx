import { Toaster } from '@/components/ui/toaster'
import { authOptions } from '@/lib/auth'
import { cn } from '@/lib/utils'
import { getServerSession } from 'next-auth'
import { Roboto } from 'next/font/google'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Main from '../components/Main'
import './globals.css'
import { defaultMetadata } from './metadata'
import { Providers } from './provider'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
})

export const metadata = defaultMetadata

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

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
          roboto.className,
          'flex min-h-screen touch-manipulation flex-col bg-background text-foreground antialiased',
        )}
      >
        <Providers>
          <a href="#main" className="sr-only" aria-label="skip">
            skip to content
          </a>
          <Toaster />
          <div className="flex w-full items-center justify-center bg-blue-800 py-2 text-white">
            Free shipping on all orders over $50!
          </div>
          <Header session={session} />

          <Main>{children}</Main>

          <Footer />
        </Providers>
      </body>
    </html>
  )
}
