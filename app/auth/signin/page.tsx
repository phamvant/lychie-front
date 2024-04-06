"use client";

import SignInForm from "@/components/form/signin-form";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSession } from "next-auth/react";

export default function SignInPage() {
  const { data: session } = useSession();

  return (
    <div className="m-auto w-5/6 md:w-2/5 mt-10 ">
      <Card className="p-6">
        <CardHeader className="space-y-1 p-0">
          <CardTitle className="text-2xl">Sign In</CardTitle>
          <CardDescription>
            Enter your email address and password below
          </CardDescription>
        </CardHeader>
        <SignInForm />
      </Card>
    </div>
  );
}
