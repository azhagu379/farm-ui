    import {
      Card,
      CardContent,
      CardDescription,
      CardHeader,
      CardTitle,
    } from '@/components/ui/card';
import { AddProductForm } from './_components/add-product-form';

    export default function AddProductPage() {
      return (
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle>Add New Product</CardTitle>
            <CardDescription>
              Fill out the details below to list a new item for sale. Your product will be submitted for approval.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AddProductForm />
          </CardContent>
        </Card>
      );
    }
    