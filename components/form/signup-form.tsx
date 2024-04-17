"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import "dotenv/config";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { StateButton } from "../button/three-states-button";

const formSchema = z.object({
  username: z.string().min(2).max(50),
  email: z.string().email().min(5),
  password: z.string().min(8),
});

const SignUpForm = () => {
  const [status, setStatus] = useState<string>("idle");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setStatus("fetching");
    const res = await fetch(process.env.BACKEND_URL + "/auth/register", {
      method: "POST",
      body: JSON.stringify({
        userUsername: values.username,
        userEmail: values.email,
        userPassword: values.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      setStatus("error");
      return;
    }

    setStatus("success");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Username" {...field} />
              </FormControl>
            </FormItem>
          )}
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

        <StateButton
          status={status}
          state={{
            done: "Đăng kí thành công",
            error: "Đăng kí lỗi!",
            idle: "Đăng kí",
          }}
        />
      </form>
    </Form>
  );
};

export default SignUpForm;
