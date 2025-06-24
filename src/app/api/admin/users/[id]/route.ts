    import { NextResponse } from 'next/server';
    import { users } from '@/lib/placeholder-data';

    // This function handles updating a user's role
    export async function PUT(
      request: Request,
      { params }: { params: { id: string } }
    ) {
      const { id } = params;
      const { role } = await request.json();

      const userIndex = users.findIndex((u) => u.id === id);

      if (userIndex === -1) {
        return new NextResponse('User not found', { status: 404 });
      }

      // Update the user's role in our "database"
      users[userIndex].role = role;
      console.log(`User ${id} role updated to:`, role);

      // Return the updated user (without password)
      const {  ...updatedUser } = users[userIndex];
      return NextResponse.json(updatedUser);
    }
    