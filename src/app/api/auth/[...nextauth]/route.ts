import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { users } from '@/shared/lib/placeholder-data'; // We will create this next

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        // Find the user in our placeholder data
        const user = users.find((user) => user.email === credentials.email);

        // IMPORTANT: In a real app, you would compare hashed passwords.
        if (user && user.password === credentials.password) {
          // Return user object without the password
          return { id: user.id, name: user.name, email: user.email };
        }

        // Return null if user not found or password doesn't match
        return null;
      },
    }),
  ],
  // We can add custom pages later if needed, e.g., pages: { signIn: '/login' }
});

export { handler as GET, handler as POST };
