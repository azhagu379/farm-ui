import Link from "next/link";
import { Tractor, Construction } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

export default function ComingSoonPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/40 p-4 text-center">
      <div className="flex items-center justify-center mb-4">
        <Tractor className="h-12 w-12 text-primary" />
        <h1 className="ml-4 text-4xl font-bold">FarmConnect</h1>
      </div>
      <Construction className="w-24 h-24 text-primary mb-6 animate-pulse" />
      <h2 className="text-3xl font-semibold mb-2">Coming Soon!</h2>
      <p className="text-muted-foreground mb-8 max-w-md">
        {`We're busy cultivating this new feature for you. It's not quite ready yet, but it will be worth the wait!`}
      </p>
      <Button asChild>
        <Link href="/">Go Back</Link>
      </Button>
    </div>
  );
}
