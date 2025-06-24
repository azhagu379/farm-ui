import { PlusCircle } from 'lucide-react';
import Link from 'next/link'; // 1. Import the Link component
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { FarmerProductTable } from './_components/farmer-product-table';

export default function FarmerDashboardPage() {
  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="flex items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Product Management
          </h1>
          <p className="text-muted-foreground">
            {`Here's a list of your products! You can add, edit, or delete them.`}
          </p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          {/* 2. The Button now has the `asChild` prop and is wrapped by a Link */}
          <Button size="sm" className="h-8 gap-1" asChild>
            <Link href="/farmer/products/add">
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Add Product
              </span>
            </Link>
          </Button>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>My Products</CardTitle>
          <CardDescription>
            Manage your inventory and view product status.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FarmerProductTable />
        </CardContent>
      </Card>
    </div>
  );
}
