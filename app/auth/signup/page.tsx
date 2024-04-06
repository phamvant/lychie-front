"use client";

import SignInForm from "@/components/form/signin-form";
import SignUpForm from "@/components/form/signup-form";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SignUpPage() {
  return (
    <div className="m-auto w-5/6 md:w-2/5 mt-10 ">
      <Card className="p-6">
        <CardHeader className="space-y-1 p-0">
          <CardTitle className="text-2xl">Create an account</CardTitle>
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <SignUpForm />
      </Card>
    </div>
  );
}
