// File: src/lib/AuthOptions.js

import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '../db/dbconfig';

export const AuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt', // This should be correct for NextAuth.js v4
  },
  pages: {
    signIn: '/login',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user = { ...session.user, role: token.role };
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        const dbUser = await prisma.user.findFirst({
          where: { email: token.email },
        });

        if (dbUser) {
          return {
            id: dbUser.id,
            name: dbUser.name,
            role: dbUser.role,
            email: dbUser.email,
            picture: dbUser.image,
          };
        }
      }
      return token;
    },
  },
};
