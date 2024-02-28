"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";

interface PhotoProps {
  src: string;
  alt?: string;
  className?: string;
  blurDataUrl?: string;
}

export const Photo = ({
  src,
  alt = "Photo",
  className,
  blurDataUrl,
}: PhotoProps) => {
  return (
    <div
      className={cn(
        "relative w-full aspect-square rounded-md overflow-hidden",
        className
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover w-full h-full"
        placeholder="blur"
        blurDataURL={blurDataUrl}
      />
    </div>
  );
};
