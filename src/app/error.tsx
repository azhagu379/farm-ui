"use client"; // Error components must be Client Components

import { useEffect } from "react";
import Link from "next/link";
import { Tractor, AlertTriangle } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 text-center">
      <div className="flex items-center justify-center mb-4">
        <Tractor className="h-12 w-12 text-primary" />
        <h1 className="ml-4 text-4xl font-bold">FarmConnect</h1>
      </div>
      <AlertTriangle className="w-24 h-24 text-destructive mb-6" />
      <h2 className="text-3xl font-semibold mb-2">Something Went Wrong</h2>
      <p className="text-muted-foreground mb-8 max-w-md">
        {`We're sorry, but an unexpected error occurred. Our team has been notified. Please try again or return to the homepage.`}
      </p>
      <div className="flex gap-4">
        <Button onClick={() => reset()}>Try Again</Button>
        <Button variant="outline" asChild>
          <Link href="/">Go Back to Homepage</Link>
        </Button>
      </div>
    </div>
  );
}
