import Link from "next/link";
import Image from "next/image";
import { Tractor } from "lucide-react";
import { RegisterForm } from "./_components/register-form";

export default function RegisterPage() {
  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2 h-screen overflow-hidden">
      {/* Left Side: Image */}
      <div className="hidden bg-gray-100 lg:block">
        <Image
          src="/login-background.jpg"
          alt="A beautiful farm landscape at sunrise"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.4]"
        />
      </div>

      {/* Right Side: Form */}
      <div className="flex items-center justify-center py-12 h-screen overflow-y-auto">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <div className="flex justify-center items-center gap-2">
              <Tractor className="h-8 w-8 text-primary" />
              <h1 className="text-3xl font-bold">Create an Account</h1>
            </div>
            <p className="text-balance text-muted-foreground">
              Enter your information to join our community.
            </p>
          </div>

          <RegisterForm />

          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
