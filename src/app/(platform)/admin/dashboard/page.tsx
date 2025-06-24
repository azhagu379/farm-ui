"use client";

import { usePlatformStatsQuery } from "@/entities/admin/hooks/usePlatformStatsQuery";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DollarSign,
  Users,
  Package,
  ShoppingCart,
  LoaderCircle,
  AlertTriangle,
} from "lucide-react";

export default function AdminDashboardPage() {
  const { data: stats, isLoading, isError } = usePlatformStatsQuery();

  const statCards = [
    {
      title: "Total Revenue",
      value: `₹${stats?.totalRevenue.toLocaleString("en-IN") || "0"}`,
      icon: DollarSign,
    },
    {
      title: "Total Orders",
      value: `+${stats?.totalOrders.toLocaleString("en-IN") || "0"}`,
      icon: ShoppingCart,
    },
    {
      title: "Total Products",
      value: `+${stats?.totalProducts.toLocaleString("en-IN") || "0"}`,
      icon: Package,
    },
    {
      title: "Total Users",
      value: `+${stats?.totalUsers.toLocaleString("en-IN") || "0"}`,
      icon: Users,
    },
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <LoaderCircle className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col justify-center items-center h-96 text-center text-destructive">
        <AlertTriangle className="h-10 w-10 mb-4" />
        <h3 className="text-xl font-semibold">Failed to load platform stats</h3>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          {`An overview of the entire platform's performance`}.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card) => (
          <Card key={card.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {card.title}
              </CardTitle>
              <card.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      {/* We can add more components here like recent orders or user tables later */}
    </div>
  );
}
