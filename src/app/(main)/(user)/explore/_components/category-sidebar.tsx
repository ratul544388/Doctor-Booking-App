"use client";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { DoctorCategories } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export const CategorySidebar = ({ className }: { className?: string }) => {
  const searchParams = useSearchParams();
  return (
    <section className={cn("min-w-[200px]", className)}>
      <Command>
        <CommandInput placeholder="Search Category..." />
        <CommandEmpty>No Category found</CommandEmpty>
        <CommandGroup>
          {DoctorCategories.map(({ image, label }) => {
            const isActive =
              searchParams.get("category") === label.toLowerCase();
            return (
              <CommandItem key={label} className={cn("p-0")}>
                <Link
                  href={`/explore?category=${label.toLowerCase()}`}
                  className="flex w-full h-full gap-2 font-medium text-base py-2 px-4"
                >
                  <Image
                    src={image}
                    alt="Category Image"
                    width={25}
                    height={25}
                  />
                  {label}
                </Link>
              </CommandItem>
            );
          })}
        </CommandGroup>
      </Command>
    </section>
  );
};
