import { PrismaAdapter } from '@auth/prisma-adapter'
import { type AuthOptions } from 'next-auth'
import { type Adapter } from 'next-auth/adapters'
import GoogleProvider from 'next-auth/providers/google'
import { mergeAnonymousCartWithUserCart } from './cart'
import { prisma } from './prisma'

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    // ...add more providers here
  ],
  callbacks: {
    session({ session, user }) {
      session.user.id = user.id
      session.user.role = user.role

      return session
    },
  },
  events: {
    async signIn({ user, account, profile, isNewUser }) {
      await mergeAnonymousCartWithUserCart(user.id)
    },
  },
  adapter: PrismaAdapter(prisma) as Adapter,
}
