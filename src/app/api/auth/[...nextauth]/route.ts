// src/app/api/auth/[...nextauth]/route.ts (Modify this file)

import NextAuth from 'next-auth';
import { authOptions } from '@/lib/auth'; // Import authOptions from the new file

const handler = NextAuth(authOptions);

// Export only the GET and POST handlers
export { handler as GET, handler as POST };