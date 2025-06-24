    import { NextResponse } from 'next/server';
    import { users } from '@/lib/placeholder-data';

    // This function simulates fetching all users for the admin panel.
    export async function GET() {
      // In a real app, you would never return passwords, even hashes.
      // This is simplified for our mock setup.
      const usersWithoutPasswords = users.map(({ ...user }) => user);

      // Simulate network latency
      await new Promise((resolve) => setTimeout(resolve, 500));

      return NextResponse.json(usersWithoutPasswords);
    }
    