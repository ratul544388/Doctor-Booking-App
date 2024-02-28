"use client";

import { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { cn } from "@/lib/utils";

interface CardWrapperProps {
  children: ReactNode;
  title: string;
  description?: string;
  className?: string;
}

export const CardWrapper = ({
  children,
  title,
  description,
  className,
}: CardWrapperProps) => {
  return (
    <section
      className={cn(
        "flex flex-col gap-6 w-full max-w-[400px] mx-auto bg-background shadow_sm border rounded-lg px-5 py-4",
        className
      )}
    >
      <div className="">
        <h1 className="text-center text-lg font-semibold">{title}</h1>
        <p className="text-center">{description}</p>
      </div>
      <div className="">{children}</div>
    </section>
  );
};
