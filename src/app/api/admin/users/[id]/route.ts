import { NextResponse } from 'next/server';
import { users } from '@/lib/placeholder-data';

// Define allowed roles
type Role = "BUYER" | "FARMER" | "ADMIN";

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  // Await the resolved params object
  const { id } = await context.params;

  // Parse the request body
  const { role } = await request.json();

  // Validate the role field
  const allowedRoles: Role[] = ["BUYER", "FARMER", "ADMIN"];
  if (!allowedRoles.includes(role)) {
    return new NextResponse('Invalid role', { status: 400 });
  }

  const userIndex = users.findIndex((u) => u.id === id);

  if (userIndex === -1) {
    return new NextResponse('User not found', { status: 404 });
  }

  // Update the user's role in our "database"
  users[userIndex].role = role;
  console.log(`User ${id} role updated to:`, role);

  // Return the updated user (excluding sensitive fields like password)
  const {...updatedUser } = users[userIndex];
  return NextResponse.json(updatedUser);
}
