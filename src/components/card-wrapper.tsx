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
    <Card className={cn('w-full max-w-[400px]', className)}>
      <CardHeader className="items-center">
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};
