"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { type Product } from "@/entities/product/types";
import {
  useCreateProductMutation,
  useUpdateProductMutation,
} from "@/entities/product/hooks/use-product-mutation";
import { useCategoriesQuery } from "@/entities/category/hooks/useCategoriesQuery";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Product name must be at least 3 characters." }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters." }),
  price: z.coerce
    .number()
    .positive({ message: "Price must be a positive number." }),
  stock: z.coerce
    .number()
    .int()
    .min(0, { message: "Stock cannot be negative." }),
  categoryId: z.string({ required_error: "Please select a category." }),
  images: z.array(z.string().url()).optional(),
});

interface AddProductFormProps {
  initialData?: Product | null;
}

export function AddProductForm({ initialData }: AddProductFormProps) {
  const router = useRouter();
  const createProductMutation = useCreateProductMutation();
  const updateProductMutation = useUpdateProductMutation();
  const { data: categories, isLoading: isLoadingCategories } =
    useCategoriesQuery();

  const isEditMode = !!initialData;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:
      isEditMode && initialData
        ? {
            name: initialData.name,
            description: initialData.description,
            price: initialData.price,
            stock: initialData.stock,
            categoryId: initialData.category,
            images: initialData.imageUrl || [],
          }
        : {
            name: "",
            description: "",
            price: 0,
            stock: 0,
          },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Find the full category name from the selected categoryId
    const categoryName =
      categories?.find((cat) => cat.id === values.categoryId)?.name || "";

    const payload = {
      ...values,
      category: categoryName, // Add the missing 'category' property
    };

    if (isEditMode && initialData) {
      updateProductMutation.mutate(
        { id: initialData.id, ...payload },
        {
          onSuccess: () => {
            router.push("/farmer/dashboard");
          },
        }
      );
    } else {
      createProductMutation.mutate(payload, {
        onSuccess: () => {
          router.push("/farmer/dashboard");
        },
      });
    }
  }

  const isLoading =
    createProductMutation.isPending || updateProductMutation.isPending;
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g., Organic Alphonso Mangoes"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="description"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Describe your product..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-6">
          <FormField
            name="price"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price (in ₹)</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="stock"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stock Quantity</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          name="categoryId"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={isLoadingCategories}
              >
                <FormControl>
                  <SelectTrigger>
                    {isLoadingCategories ? (
                      "Loading..."
                    ) : (
                      <SelectValue placeholder="Select a category" />
                    )}
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories?.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-4 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/farmer/dashboard")}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading
              ? "Saving..."
              : isEditMode
                ? "Save Changes"
                : "Submit for Approval"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
