"use client";

import { useTransition } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { register } from "@/actions/register";
import { CardWrapper } from "@/components/card-wrapper";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { RegisterSchema } from "@/schemas";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { AuthButtons } from "../_components/auth-buttons";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof RegisterSchema>) {
    startTransition(() => {
      register(values).then(({ success, error }) => {
        if (success) {
          signIn("credentials", {
            email: values.email,
            password: values.password,
            callbackUrl: "/",
          });
          router.refresh();
        } else if (error) {
          window.alert(error);
        }
      });
    });
  }

  return (
    <CardWrapper title="🔐 Auth" description="Welcome back 👋">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    placeholder="John Wick"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
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
                  <Input
                    disabled={isPending}
                    placeholder="johnwich@example.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
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
                  <Input
                    disabled={isPending}
                    type="password"
                    placeholder="********"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isPending} type="submit" className="w-full">
            Register
          </Button>
          <AuthButtons />
          <Link
            href="/auth/login"
            className={cn(buttonVariants({ variant: "link" }), "mx-auto")}
          >
            Already have an account?
          </Link>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default RegisterPage;
