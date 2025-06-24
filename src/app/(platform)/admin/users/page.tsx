    import {
      Card,
      CardContent,
      CardDescription,
      CardHeader,
      CardTitle,
    } from '@/components/ui/card';
import { UserTable } from './_components/user-table';

    export default function AdminUsersPage() {
      return (
        <Card>
          <CardHeader>
            <CardTitle>User Management</CardTitle>
            <CardDescription>
              View all users and manage their roles and permissions.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <UserTable />
          </CardContent>
        </Card>
      );
    }
    