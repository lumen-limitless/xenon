import { prisma } from '@/lib/prisma'
import { stripe } from '@/lib/stripe'
import type Stripe from 'stripe'

export default async function handleCheckoutSessionCompleted(
  data: Stripe.Checkout.Session,
) {
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
