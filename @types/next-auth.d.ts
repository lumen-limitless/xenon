import { type Role, type User } from '@prisma/client';
import { type DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      role: Role;
    } & DefaultSession['user'];
  }
}

declare module 'next-auth/adapters' {
  interface AdapterUser extends User {}
}
