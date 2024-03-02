"use client";

import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { FiSearch } from "react-icons/fi";
import { useDebounceValue } from "usehooks-ts";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { EmptyState } from "./empty-state";

export const Search = ({
  className,
  results,
}: {
  className?: string;
  results?: number;
}) => {
  const [value, setValue] = useState("");
  const [debounceValue] = useDebounceValue(value, 500);
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    if (debounceValue) {
      router.push(`${pathname}?q=${debounceValue}`, { scroll: false });
    } else {
      router.push(pathname, { scroll: false });
    }
  }, [debounceValue, router, pathname]);

  return (
    <div className={cn("w-full max-w-[500px] mx-auto flex flex-col gap-5 items-center justify-center", className)}>
      <Input
        className={cn(
          "w-full border-blue-500"
        )}
        placeholder="Search Doctors..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {/* {debounceValue && !results && <EmptyState title="No results found!" />} */}
    </div>
  );
};
