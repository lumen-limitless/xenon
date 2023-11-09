import Stripe from 'stripe'
import { env } from './env'

const { STRIPE_SECRET_KEY, STRIPE_ACCOUNT_ID } = env

export const stripe = new Stripe(STRIPE_SECRET_KEY, {
  stripeAccount: STRIPE_ACCOUNT_ID,
  apiVersion: '2023-10-16',
})
