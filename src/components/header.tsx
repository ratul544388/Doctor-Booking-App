"use client";

import { adminNavLinks, navLinks } from "@/constants";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./logo";
import { MaxWidthWrapper } from "./max-width-wrapper";
import { UserButton } from "./user-button";
import { User } from "@prisma/client";
import { Button, buttonVariants } from "./ui/button";
import { MobileSidebar } from "./mobile-sidebar";

export const Header = ({ user }: { user: User | null }) => {
  const pathname = usePathname();
  const links = user?.role === "ADMIN" ? adminNavLinks : navLinks;
  return (
    <header className="fixed inset-x-0 top-0 z-50 h-[70px] bg-background border-b shadow-sm">
      <MaxWidthWrapper className="flex items-center justify-between h-full">
        <div className="flex items-center gap-10">
          <div className="sm:hidden min-w-[15px]">
            <MobileSidebar user={user} />
          </div>
          <Logo />
          <nav className="hidden sm:flex gap-6">
            {links.map(({ href, label }) => {
              const isActive = pathname === href;
              return (
                <Link
                  href={href}
                  key={label}
                  className={cn(
                    "relative font-medium text-gray-700",
                    isActive && "text-foreground"
                  )}
                >
                  {label}
                  <motion.span
                    variants={{
                      hidden: { left: "50%", right: "50%" },
                      visible: { left: 0, right: 0 },
                    }}
                    initial="hidden"
                    animate={isActive ? "visible" : "hidden"}
                    className="absolute h-1 rounded-full gradient left-0 -bottom-1.5"
                  />
                </Link>
              );
            })}
          </nav>
        </div>
        {user ? (
          <UserButton user={user} />
        ) : (
          <div className="flex items-center gap-3">
            <Link
              href="/auth/register"
              className={buttonVariants({ variant: "outline", size: "sm" })}
            >
              Register
            </Link>
            <Link href="/auth/login" className={buttonVariants({ size: "sm" })}>
              Login
            </Link>
          </div>
        )}
      </MaxWidthWrapper>
    </header>
  );
};
