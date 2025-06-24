"use client";

import { useFarmerOrdersQuery } from "@/entities/farmer/hooks/useFarmerOrdersQuery";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LoaderCircle, AlertTriangle } from "lucide-react";
import { addresses } from "@/lib/placeholder-data"; // Use placeholder to find customer name

export default function FarmerOrdersPage() {
  const { data: orders, isLoading, isError } = useFarmerOrdersQuery();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Incoming Orders</CardTitle>
        <CardDescription>
          A list of all orders containing your products.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  <LoaderCircle className="h-6 w-6 animate-spin mx-auto" />
                </TableCell>
              </TableRow>
            )}
            {isError && (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center text-destructive h-24"
                >
                  <AlertTriangle className="h-6 w-6 mx-auto mb-2" />
                  Failed to load orders.
                </TableCell>
              </TableRow>
            )}
            {orders?.map((order) => {
              // Find the customer's name from the shipping address
              const customerAddress = addresses.find(
                (addr) => addr.id === order.shippingAddressId
              );
              return (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>
                    {new Date(order.orderDate).toLocaleDateString("en-IN")}
                  </TableCell>
                  <TableCell>{customerAddress?.fullName || "N/A"}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        order.status === "Delivered" ? "default" : "secondary"
                      }
                    >
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    ₹{order.totalAmount.toFixed(2)}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
