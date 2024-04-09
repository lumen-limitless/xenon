import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { eq } from 'drizzle-orm';
import NextAuth, { type NextAuthConfig } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { mergeAnonymousCartWithUserCart } from './lib/cart';
import { db } from './lib/drizzle';
import { userTable } from './schema';
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
    async session({ session, user }) {
      // console.debug('session', session);
      // console.debug('user', user);

      const role = (
        await db
          .select({
            role: userTable.role,
          })
          .from(userTable)
          .where(eq(userTable.id, user.id))
      )[0].role;

      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
          role,
        },
      };
    },
  },
  events: {
    async signIn({ user, account, profile, isNewUser }) {
      const userId = user.id;
      if (!userId) {
        return;
      }
      await mergeAnonymousCartWithUserCart(userId);
    },
  },

  adapter: DrizzleAdapter(db),
};

export const { handlers, auth, signIn, signOut } = NextAuth(config);
