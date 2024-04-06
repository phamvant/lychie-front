"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ReloadIcon } from "@radix-ui/react-icons";
import { getCsrfToken } from "next-auth/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

const formSchema = z.object({
  email: z.string().email().min(5),
  password: z.string().min(8),
  csrfToken: z.string(),
});

const SignInForm = () => {
  const [status, setStatus] = useState(true);
  const [isFetching, setIsFetching] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "pham.t.268.01@gmail.com",
      password: "thuan286",
      csrfToken: "",
    },
  });

  useEffect(() => {
    const getToken = async () => {
      const token = await getCsrfToken();
      form.setValue("csrfToken", token ?? "");
    };

    getToken();
  }, [form]);

  return (
    <Form {...form}>
      <form
        method="post"
        action="/api/auth/callback/credentials"
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="csrfToken"
          render={({ field }) => <input type="hidden" {...field} />}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Email" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        {status ? (
          <></>
        ) : (
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>Cant create account</AlertDescription>
          </Alert>
        )}
        <Button disabled={isFetching} type="submit">
          {isFetching ? (
            <>
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              <>Loading</>
            </>
          ) : (
            <>Summit</>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default SignInForm;
