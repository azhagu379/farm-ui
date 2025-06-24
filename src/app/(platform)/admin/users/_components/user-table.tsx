"use client";

import {
  useUsersQuery,
  useUpdateUserRoleMutation,
} from "@/entities/admin/hooks/useAdmin";
import { type User } from "@/entities/user/types";
import { LoaderCircle, AlertTriangle } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function UserTable() {
  const { data: users, isLoading, isError } = useUsersQuery();
  const updateUserRoleMutation = useUpdateUserRoleMutation();

  const handleRoleChange = (userId: string, role: User["role"]) => {
    updateUserRoleMutation.mutate({ userId, role });
  };

  // Implemented the loading state UI
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <LoaderCircle className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  // Implemented the error state UI
  if (isError) {
    return (
      <div className="flex flex-col justify-center items-center h-96 text-center text-destructive">
        <AlertTriangle className="h-10 w-10 mb-4" />
        <h3 className="text-xl font-semibold">Failed to load users</h3>
        <p>Please try again later.</p>
      </div>
    );
  }
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead className="hidden md:table-cell">Date Joined</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users?.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>
              <Select
                defaultValue={user.role}
                onValueChange={(newRole) =>
                  handleRoleChange(user.id, newRole as User["role"])
                }
                disabled={updateUserRoleMutation.isPending}
              >
                <SelectTrigger className="w-[120px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="BUYER">Buyer</SelectItem>
                  <SelectItem value="FARMER">Farmer</SelectItem>
                  <SelectItem value="ADMIN">Admin</SelectItem>
                </SelectContent>
              </Select>
            </TableCell>
            <TableCell className="hidden md:table-cell">
              {new Date(user.createdAt!).toLocaleDateString("en-IN")}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
