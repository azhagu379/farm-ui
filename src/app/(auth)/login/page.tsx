'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Tractor } from 'lucide-react';

import { LoginForm } from './login-form';
// import { Button } from '@/shared/components/ui/button';

export default function LoginPage() {
  return (
    // The main container now has a fixed screen height and prevents overflow.
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
      {/* This section now handles its own scrolling if content overflows. */}
      <div className="flex items-center justify-center py-12 h-screen overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto grid w-[350px] gap-6"
        >
          <div className="grid gap-2 text-center">
            <div className="flex justify-center items-center gap-2">
              <Tractor className="h-8 w-8 text-primary" />
              <h1 className="text-3xl font-bold">FarmConnect</h1>
            </div>
            <p className="text-balance text-muted-foreground">
              Welcome back! Your fields await.
            </p>
          </div>

          {/* We are reusing the LoginForm component we already made */}
          <LoginForm />

          {/* <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div> */}

          {/* <Button variant="outline" className="w-full">
            <Bot className="mr-2 h-4 w-4" /> 
            Login with Google
          </Button> */}

          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="underline">
              Sign up
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
