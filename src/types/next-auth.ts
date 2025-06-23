import  { type DefaultSession } from 'next-auth';

declare module 'next-auth' {
 
  interface Session {
    user: {
      id: string;
      role: string;
    } & DefaultSession['user']; // This keeps the default properties like name, email, image
  }

  interface User {
    role: string;
  }
}
