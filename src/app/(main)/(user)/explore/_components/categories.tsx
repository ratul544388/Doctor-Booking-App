"use client";

import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { Button, buttonVariants } from "@/components/ui/button";
import { DoctorCategories } from "@/constants";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

interface CategoriesProps {}

export const Categories = ({}: CategoriesProps) => {
  const searchParams = useSearchParams();
  const activeLink = searchParams.get("category");
  const scrollRef = useRef<HTMLElement>(null);
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const currentRef = scrollRef.current;
    const handleScroll = () => {
      if (currentRef) {
        setScroll(currentRef.scrollLeft);
      }
    };
    currentRef?.addEventListener("scroll", handleScroll);

    return () => {
      currentRef?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClick = () => {
    const clientWidth = scrollRef.current?.clientWidth || 0;
    scrollRef.current?.scrollBy({
      left: -clientWidth,
      behavior: "smooth",
    });
  };

  const handleRightClick = () => {
    const clientWidth = scrollRef.current?.clientWidth || 0;
    scrollRef.current?.scrollBy({
      left: clientWidth,
      behavior: "smooth",
    });
  };

  return (
    <nav
      ref={scrollRef}
      className="z-40 flex items-center gap-3 overflow-x-auto scrollbar-none"
    >
      <Button
        onClick={handleClick}
        className={cn(
          "rounded-full absolute left-3 hidden shadow-[10px_0px_10px_rgba(0,0,0,0.06)]",
          scroll > 20 && "flex"
        )}
        size="icon"
        variant="outline"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <Link
        href="/explore"
        className={buttonVariants({
          variant: !activeLink ? "default" : "outline",
          size: "sm",
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
            size: "sm",
          })}
        >
          {label}
        </Link>
      ))}

      <Button
        onClick={handleRightClick}
        className={cn(
          "rounded-full absolute right-3 shadow-[-10px_0px_10px_rgba(0,0,0,0.06)]",
          scrollRef?.current?.scrollWidth! -
            scrollRef.current?.scrollLeft! -
            scrollRef.current?.clientWidth! <
            20 && "hidden"
        )}
        size="icon"
        variant="outline"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </nav>
  );
};
