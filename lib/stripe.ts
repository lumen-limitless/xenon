import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  stripeAccount: process.env.STRIPE_ACCOUNT_ID!,
  apiVersion: '2023-10-16',
});
