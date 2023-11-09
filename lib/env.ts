import { z } from 'zod'

const envSchema = z.object({
  // Cookies
  COOKIE_SECRET: z.string().min(1),

  // Stripe
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().min(1),
  STRIPE_ACCOUNT_ID: z.string().min(1),
  STRIPE_SECRET_KEY: z.string().min(1),

  // NextAuth
  NEXTAUTH_URL: z.string().min(1),
  NEXTAUTH_SECRET: z.string().min(1),

  // NextAuth Providers
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),

  APPLE_CLIENT_ID: z.string(),
  APPLE_CLIENT_SECRET: z.string(),
})

export const env = envSchema.parse(process.env)
