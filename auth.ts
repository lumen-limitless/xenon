import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth, { type NextAuthConfig } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { mergeAnonymousCartWithUserCart } from './lib/cart';
import { prisma } from './lib/prisma';

const config: NextAuthConfig = {
  theme: {
    // logo: 'https://example.com/logo.png',
  },

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
  ],

  callbacks: {
    session({ session, user }: any) {
      session.user.id = user.id;
      session.user.role = user.role;

      return session;
    },
  },
  events: {
    async signIn({ user, account, profile, isNewUser }) {
      await mergeAnonymousCartWithUserCart(user.id || '');
    },
  },

  adapter: PrismaAdapter(prisma),
};

export const { handlers, auth, signIn, signOut } = NextAuth(config);
