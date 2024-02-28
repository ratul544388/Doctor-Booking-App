"use client";

import { buttonVariants } from "@/components/ui/button";
import { DoctorCategories } from "@/constants";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface CategoriesProps {}

export const Categories = ({}: CategoriesProps) => {
  const searchParams = useSearchParams();
  const activeLink = searchParams.get("category");
  return (
    <nav className="flex gap-3 overflow-x-auto scrollbar-none">
      <Link
        href="/explore"
        className={buttonVariants({
          variant: !activeLink ? "default" : "outline",
        })}
      >
        All
      </Link>
      {DoctorCategories.map(({ label }) => (
        <Link
          key={label}
          href={`/explore?category=${label.toLowerCase()}`}
          className={buttonVariants({
            variant: activeLink === label.toLowerCase() ? "default" : "outline",
          })}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
};
