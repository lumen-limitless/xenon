import { stripe } from '@/lib/stripe';
import { NextRequest, NextResponse } from 'next/server';
import { buffer } from 'node:stream/consumers';
import { ReadableStream } from 'node:stream/web';
import Stripe from 'stripe';
import handleCheckoutSessionCompleted from './handleCheckoutSessionCompleted';

export async function POST(req: NextRequest) {
  try {
    if (req.body === null)
      return NextResponse.json({ received: false }, { status: 400 });

    const rawBody = await buffer(req.body as ReadableStream);

    const sig = req.headers.get('stripe-signature');

    if (sig === null) {
      return NextResponse.json({ received: false }, { status: 400 });
    }

    const event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );

    console.log(JSON.stringify(event, null, 2));

    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutSessionCompleted(event.data.object);
        break;
      default:
        console.warn(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (err) {
    console.error(err);
    if (err instanceof Stripe.errors.StripeSignatureVerificationError) {
      return NextResponse.json({ received: false }, { status: 400 });
    }
    return NextResponse.error();
  }
}
