import { db } from '@/lib/drizzle';
import { stripe } from '@/lib/stripe';
import { cartTable, orderItemTable, orderTable, productTable } from '@/schema';
import { eq, sql } from 'drizzle-orm';
import type Stripe from 'stripe';

export default async function handleCheckoutSessionCompleted(
  data: Stripe.Checkout.Session,
): Promise<void> {
  if (data.payment_intent == null) {
    throw new Error('No payment intent');
  }

  const cartId = data.client_reference_id;

  if (cartId == null) {
    throw new Error('No cart ID');
  }

  const cart = await db.query.cartTable.findFirst({
    where: eq(cartTable.id, cartId),
  });

  if (!cart) {
    throw new Error('No cart found for ID ' + cartId);
  }

  const checkoutSession = await stripe.checkout.sessions.retrieve(data.id, {
    expand: ['line_items.data.price.product'],
  });

  const lineItems = checkoutSession.line_items?.data ?? [];

  console.debug('lineItems', JSON.stringify(lineItems, null, 2));

  //convert line items price product object to valid JSON
  const parsedLineItems = lineItems.map((item) => ({
    ...item,
    price: {
      ...item.price,
      product: JSON.parse(JSON.stringify(item.price?.product, null)),
    },
  }));

  await db.transaction(async (tx) => {
    // Create order
    const orderId = await tx
      .insert(orderTable)
      .values({
        metadata: {
          checkoutSessionId: data.id,
          paymentIntentId: data.payment_intent?.toString(),
        },
        name: data.shipping_details?.name,
        address1: data.shipping_details?.address?.line1,
        address2: data.shipping_details?.address?.line2,
        city: data.shipping_details?.address?.city,
        state: data.shipping_details?.address?.state,
        zip: data.shipping_details?.address?.postal_code,
        country: data.shipping_details?.address?.country,
        userId: cart.userId,
        total: data.amount_total ?? 0,
        subtotal: data.amount_subtotal ?? 0,
        shipping: data.shipping_cost?.amount_subtotal ?? 0,
        tax: 0,
      })
      .returning({ id: orderTable.id })
      .then((res) => res[0].id);

    await tx.insert(orderItemTable).values(
      parsedLineItems.map((item) => ({
        quantity: item.quantity ?? 0,
        productId: item.price.product.metadata['productId'],
        variantId: item.price.product.metadata['variantId'],
        orderId,
        price: item.price.unit_amount ?? 0,
      })),
    );

    // Update stock
    for (const item of parsedLineItems) {
      await tx
        .update(productTable)
        .set({
          stock: sql`${productTable.stock} - ${item.quantity ?? 0}`,
        })
        .where(eq(productTable.id, item.price.product.metadata['productId']));
    }

    // Delete cart
    await tx.delete(cartTable).where(eq(cartTable.id, cartId));
  });
}
