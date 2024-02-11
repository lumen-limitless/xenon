import { Button } from '@/components/ui/button';
import { stripe } from '@/lib/stripe';
import { CheckCircle, XCircle } from 'lucide-react';
import Link from 'next/link';
import Stripe from 'stripe';

type PageProps = {
  params: {};
  searchParams: Record<string, string | string[] | undefined>;
};

export const metadata = {
  title: 'Checkout',
};

async function getCheckoutSession(
  sessionId: string,
): Promise<Stripe.Response<Stripe.Checkout.Session> | null> {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    return session;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default async function Page({ searchParams }: PageProps) {
  const session = await getCheckoutSession(
    searchParams['session_id'] as string,
  );

  if (searchParams['session_id'] === undefined || session === null)
    return <>Invalid checkout session</>;

  return (
    <section className="flex flex-grow pb-48 pt-10">
      <div className="container flex flex-col items-center justify-center">
        {session.payment_status === 'paid' ? (
          <CheckCircle className="h-24 w-24 text-green-500" />
        ) : (
          <XCircle className="h-24 w-24 text-red-500" />
        )}
        <div className="mb-5 text-center">
          <h1 className="mb-4 text-3xl font-bold">
            {session.payment_status === 'paid'
              ? 'Payment Successful'
              : 'Payment Failed'}
          </h1>
          <p className="text-muted-foreground">
            {session.payment_status === 'paid'
              ? 'Thank you for your purchase!'
              : 'Something went wrong with your payment. Please try again.'}
          </p>
        </div>

        <Button asChild>
          <Link href="/account/orders">View Orders</Link>
        </Button>
      </div>
    </section>
  );
}
