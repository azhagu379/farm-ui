import { Tractor, HardHat } from "lucide-react";

export default function MaintenancePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 text-center">
      <div className="flex items-center justify-center mb-4">
        <Tractor className="h-12 w-12 text-primary" />
        <h1 className="ml-4 text-4xl font-bold">FarmConnect</h1>
      </div>
      <HardHat className="w-24 h-24 text-yellow-500 mb-6" />
      <h2 className="text-3xl font-semibold mb-2">Down for Maintenance</h2>
      <p className="text-muted-foreground mb-8 max-w-md">
        {` We are currently performing some scheduled maintenance to improve our
        platform. We'll be back online shortly. Thank you for your patience!`}
      </p>
      <p className="text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} FarmConnect
      </p>
    </div>
  );
}
