import { type CustomSession } from '@/types'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { type User } from '@prisma/client'
import { type AuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { prisma } from './prisma'

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  callbacks: {
    session(params) {
      const session = params.session as CustomSession
      session.user = params.user as User

      return session
    },
  },
  adapter: PrismaAdapter(prisma),
}
