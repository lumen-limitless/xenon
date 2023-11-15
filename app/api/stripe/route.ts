import { prisma } from '@/lib/prisma'
import { stripe } from '@/lib/stripe'
import { NextRequest, NextResponse } from 'next/server'
import { buffer } from 'node:stream/consumers'
import { ReadableStream } from 'node:stream/web'
import Stripe from 'stripe'

export async function POST(req: NextRequest) {
  try {
    if (req.body === null)
      return NextResponse.json({ received: false }, { status: 400 })

    const rawBody = await buffer(req.body as ReadableStream)

    const sig = req.headers.get('stripe-signature')

    if (sig === null) {
      return NextResponse.json({ received: false }, { status: 400 })
    }

    const event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!,
    )

    console.log(JSON.stringify(event, null, 2))

    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutSessionCompleted(event.data.object)
        break
      default:
        console.warn(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true }, { status: 200 })
  } catch (err) {
    console.error(err)
    if (err instanceof Stripe.errors.StripeSignatureVerificationError) {
      return NextResponse.json({ received: false }, { status: 400 })
    }
    return NextResponse.error()
  }
}

async function handleCheckoutSessionCompleted(data: Stripe.Checkout.Session) {
  if (data.payment_intent == null) {
    throw new Error('No payment intent')
  }

  const cartId = data.client_reference_id

  if (cartId == null) {
    throw new Error('No cart ID')
  }

  const cart = await prisma.cart.findUnique({
    where: {
      id: cartId,
    },
  })

  if (!cart) {
    throw new Error('No cart found for ID ' + cartId)
  }

  const checkoutSession = await stripe.checkout.sessions.retrieve(data.id, {
    expand: ['line_items.data.price.product'],
  })

  const lineItems = checkoutSession.line_items?.data ?? []

  console.debug('lineItems', JSON.stringify(lineItems, null, 2))

  //convert line items price product object to valid JSON
  const parsedLineItems = lineItems.map((item) => ({
    ...item,
    price: {
      ...item.price,
      product: JSON.parse(JSON.stringify(item.price?.product, null)),
    },
  }))

  await prisma.$transaction(async (tx) => {
    // Create order
    await tx.order.create({
      data: {
        checkoutSessionId: data.id,
        name: data.shipping_details?.name,
        address1: data.shipping_details?.address?.line1,
        address2: data.shipping_details?.address?.line2,
        city: data.shipping_details?.address?.city,
        state: data.shipping_details?.address?.state,
        zip: data.shipping_details?.address?.postal_code,
        country: data.shipping_details?.address?.country,
        userId: cart.userId,
        total: data.amount_total ?? 0,
        items: {
          create: parsedLineItems.map((item) => ({
            quantity: item.quantity ?? 0,
            productId: item.price.product.metadata['productId'],
          })),
        },
      },
    })

    // Update stock
    for (const item of parsedLineItems) {
      await tx.product.update({
        where: {
          id: item.price.product.metadata['productId'],
        },
        data: {
          stock: {
            decrement: item.quantity ?? 0,
          },
        },
      })
    }

    // Delete cart
    await tx.cart.delete({
      where: {
        id: cart.id,
      },
    })
  })
}
