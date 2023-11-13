import { prisma } from '@/lib/prisma'
import { stripe } from '@/lib/stripe'
import { NextRequest, NextResponse } from 'next/server'
import { buffer } from 'node:stream/consumers'
import Stripe from 'stripe'

export async function POST(req: NextRequest) {
  try {
    if (!req.body) throw new Error('No body')

    const rawBody = await buffer(req.body as any)

    const sig = req.headers.get('stripe-signature')!

    const event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!,
    )
    console.log('event', event)

    switch (event.type) {
      case 'payment_intent.succeeded':
        await handlePaymentIntentSucceeded(event)
        break
      case 'checkout.session.completed':
        await handleCheckoutSessionCompleted(event)
        break
      default:
        console.warn(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true }, { status: 200 })
  } catch (err) {
    console.error(err)
    return NextResponse.error()
  }
}

async function handlePaymentIntentSucceeded(
  event: Stripe.PaymentIntentSucceededEvent,
) {}

async function handleCheckoutSessionCompleted(
  event: Stripe.CheckoutSessionCompletedEvent,
) {
  if (event.data.object.payment_intent == null) {
    throw new Error('No payment intent')
  }

  const cartId = event.data.object.client_reference_id

  if (cartId == null) {
    throw new Error('No cart ID')
  }

  const cart = await prisma.cart.findUnique({
    where: {
      id: cartId,
    },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  })

  if (!cart) {
    throw new Error('No cart found for ID ' + cartId)
  }

  await prisma.$transaction(async (tx) => {
    await tx.order.create({
      data: {
        userId: cart.userId,
        total: cart.items.reduce(
          (acc, item) => acc + item.quantity * item.product.price,
          0,
        ),
        items: {
          create: cart.items.map((item) => ({
            quantity: item.quantity,
            product: {
              connect: {
                id: item.product.id,
              },
            },
          })),
        },
      },
    })

    for (const item of cart.items) {
      await tx.product.update({
        where: {
          id: item.product.id,
        },
        data: {
          stock: {
            decrement: item.quantity,
          },
        },
      })
    }

    await tx.cart.delete({
      where: {
        id: cart.id,
      },
    })
  })
}
