"use client";

import { UploadButton } from "@/lib/uploadthing";
import "@uploadthing/react/styles.css";
import Image from "next/image";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  value?: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export const ImageUpload = ({ value, onChange, disabled }: ImageUploadProps) => {
  return (
    <div className="relative w-[200px] aspect-square border-[1.5px] border-dashed rounded-lg overflow-hidden mx-auto flex items-center justify-center">
      {value ? (
        <>
          <Image
            src={value}
            alt="Uploaded image"
            fill
            className="object-cover"
          />
          <Button
            disabled={disabled}
            onClick={() => onChange("")}
            className="h-8 w-8 rounded-full absolute right-0.5 top-0.5"
            size="icon"
            type="button"
            variant="ghost"
          >
            <X className="h-4 w-4 text-muted-foreground" />
          </Button>
        </>
      ) : (
        <UploadButton
          endpoint="imageUploader"
          className={cn(disabled && "pointer-events-none opacity-60")}
          appearance={{
            button:
              "ut-uploading: bg-transparent hover:bg-accent text-black text-sm font-medium border shadow-sm after:bg-primary/50",
          }}
          content={{
            button: "📸 Photo",
          }}
          onClientUploadComplete={(res) => {
            onChange(res?.[0].url);
          }}
          onUploadError={() => {
            toast.error("Error while uploading image");
          }}
        />
      )}
    </div>
  );
};
