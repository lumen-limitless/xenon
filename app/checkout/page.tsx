import { Section } from '@/components/ui/section'
import { stripe } from '@/lib/stripe'
import { Loader2 } from 'lucide-react'
import Stripe from 'stripe'

type PageProps = {
  params: {}
  searchParams: Record<string, string | Array<string> | undefined>
}

export const metadata = {
  title: 'Checkout',
}

async function getCheckoutSession(
  sessionId: string,
): Promise<Stripe.Response<Stripe.Checkout.Session> | null> {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId)
    return session
  } catch (error) {
    console.error(error)
    return null
  }
}

export default async function Page({ searchParams }: PageProps) {
  const session = await getCheckoutSession(searchParams['session_id'] as string)

  if (searchParams['session_id'] !== undefined)
    return (
      <>
        {session?.payment_status === 'paid' ? (
          <p>payment success</p>
        ) : (
          <p>payment failed</p>
        )}
      </>
    )

  return (
    <Section className="flex-grow pb-48 pt-10">
      <div className="container flex flex-col items-center justify-center">
        <h1 className="mb-4 text-3xl font-bold">
          Waiting for checkout session...
        </h1>
        <Loader2 className="h-32 w-32 animate-spin stroke-muted-foreground" />
      </div>
    </Section>
  )
}
