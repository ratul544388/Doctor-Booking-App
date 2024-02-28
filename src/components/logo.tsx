"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  className?: string;
}

export const Logo = ({ className }: LogoProps) => {
  return (
    <Link href="/" className={cn(className)}>
      <Image src="/images/logo.svg" alt="Logo" height={40} width={120} />
    </Link>
  );
};
