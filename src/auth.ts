import bcrypt from 'bcryptjs';
import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import Credentials from 'next-auth/providers/credentials';

import { db } from '@/lib/db';
import { LoginSchema } from '@/validators/auth';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' }
      },
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await db.user.findUnique({ where: { email } });
          if (!user || !user.password) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) {
            // Convert id to string to match NextAuth User type
            return {
              ...user,
              id: String(user.id)
            };
          }
        }

        return null;
      }
    })
  ],
  adapter: PrismaAdapter(db as never),
  session: { strategy: 'jwt' },
  callbacks: {
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;

        // Fetch user to get username
        const user = await db.user.findUnique({
          where: { id: parseInt(token.sub) },
          select: { username: true }
        });

        if (user) {
          session.user.username = user.username;
        }
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    }
  },
  debug: process.env.NODE_ENV === 'development',
  secret: process.env.AUTH_SECRET
});
