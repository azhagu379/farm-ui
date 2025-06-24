// src/lib/auth.ts (New file)

import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { users } from '@/lib/placeholder-data'; // Assuming this path is correct

// This defines the structure of your user object, including the 'role'
// You should also update src/types/next-auth.d.ts to extend NextAuth's types
// with 'id' and 'role' on the User and JWT types.
interface CustomUser {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role: string; // Add role to the user type
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;
        const user = users.find((user) => user.email === credentials.email);

        if (user && user.password === credentials.password) {
          // Cast user to CustomUser to ensure role is present
          return { id: user.id, name: user.name, email: user.email, role: user.role } as CustomUser;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = (user as CustomUser).id; // Cast user to CustomUser to access id and role
        token.role = (user as CustomUser).role;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  // Add pages configuration if you want custom login/error pages
  pages: {
    signIn: '/login', // Your login page route
    error: '/unauthorized', // Your custom error page route
  },
};