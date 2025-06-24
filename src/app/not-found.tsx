import Link from "next/link";
import { Tractor, SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 text-center">
      <div className="flex items-center justify-center mb-4">
        <Tractor className="h-12 w-12 text-primary" />
        <h1 className="ml-4 text-4xl font-bold">FarmConnect</h1>
      </div>
      <SearchX className="w-24 h-24 text-destructive mb-6" />
      <h2 className="text-3xl font-semibold mb-2">404 - Page Not Found</h2>
      <p className="text-muted-foreground mb-8 max-w-md">
        {`Oops! It looks like the page you're looking for has been moved, deleted, or perhaps it never existed in the first place. Let's get you back on track.`}
      </p>
      <Button asChild>
        <Link href="/">Go Back to Homepage</Link>
      </Button>
    </div>
  );
}
