import Link from "next/link";
import { Tractor, ShieldOff } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 text-center">
      <div className="flex items-center justify-center mb-4">
        <Tractor className="h-12 w-12 text-primary" />
        <h1 className="ml-4 text-4xl font-bold">FarmConnect</h1>
      </div>
      <ShieldOff className="w-24 h-24 text-red-500 mb-6" />
      <h2 className="text-3xl font-semibold mb-2">Access Denied</h2>
      <p className="text-muted-foreground mb-8 max-w-md">
        You do not have the necessary permissions to view this page. If you
        believe this is an error, please contact support.
      </p>
      <Button asChild>
        <Link href="/">Return to Dashboard</Link>
      </Button>
    </div>
  );
}
