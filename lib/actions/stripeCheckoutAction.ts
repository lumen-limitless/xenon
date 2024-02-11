'use server';

import { getCart } from '../cart';
import { stripe } from '../stripe';

/**
 *
 * @description Server action to create an order
 * @returns object with success key
 */
export async function stripeCheckoutAction(): Promise<string | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
      : 'http://localhost:3000';

    const cart = await getCart();

    if (cart === null || cart.size === 0) {
      throw new Error('Cart is empty');
    }

    // https://stripe.com/docs/api/checkout/sessions
    const session = await stripe.checkout.sessions.create({
      line_items: cart.items.map((item) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.product.title,
            images: [item.product.images[0]],
            metadata: {
              ['productId']: item.product.id,
            },
          },

          unit_amount: item.product.price,
        },
        quantity: item.quantity,
      })),

      client_reference_id: cart.id,

      mode: 'payment',

      shipping_address_collection: {
        allowed_countries: ['US'],
      },

      allow_promotion_codes: true,

      payment_method_types: ['card'],

      success_url: `${baseUrl}/checkout?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/checkout?session_id={CHECKOUT_SESSION_ID}`,

      automatic_tax: { enabled: true },
    });

    return session.url;
  } catch (error) {
    console.error(error);
    return null;
  }
}
