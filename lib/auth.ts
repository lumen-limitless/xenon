import { PrismaAdapter } from '@auth/prisma-adapter'
import type { AuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { prisma } from './prisma'

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    // AppleProvider({
    //   clientId: process.env.APPLE_CLIENT_ID || '',
    //   clientSecret: process.env.APPLE_CLIENT_SECRET || '',
    // }),
  ],
  callbacks: {
    session({ session, token }) {
      console.debug(session)
      console.debug(token)
      return session
    },
  },
  adapter: PrismaAdapter(prisma),
}
