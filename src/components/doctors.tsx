"use client";

import { useModalStore } from "@/hooks/use-modal-store";
import { cn } from "@/lib/utils";
import { Doctor, User } from "@prisma/client";
import { TrashIcon } from "@radix-ui/react-icons";
import { EditIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CategoryBadge } from "./category-badge";
import { Button, buttonVariants } from "./ui/button";

interface DoctorsProps {
  doctors: Doctor[];
  isAdmin?: boolean;
  className?: string;
  user?: User | null;
}

export const Doctors = ({
  doctors,
  isAdmin,
  className,
  user,
}: DoctorsProps) => {
  const { onOpen } = useModalStore();
  const router = useRouter();
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (isAdmin) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <section
      className={cn(
        "w-full grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6",
        className
      )}
    >
      {doctors.map(
        ({
          name,
          appointmentFee,
          category,
          id,
          image,
          experience,
          blurDataUrl,
        }) => (
          <div
            key={id}
            className="flex flex-col pb-2 rounded-md overflow-hidden border bg-background shadow-[0px_0px_4px_rgba(0,0,0,0.2)] hover:shadow-[0px_0px_6px_rgba(0,0,0,0.2)]"
          >
            <Link
              href={`/doctors/${id}`}
              onClick={handleClick}
              className="group flex flex-col"
            >
              <div className="relative w-full aspect-square overflow-hidden">
                <Image
                  src={image}
                  alt={name}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-300"
                  placeholder="blur"
                  blurDataURL={blurDataUrl}
                />
              </div>
              <div className="flex flex-col p-3 pb-0">
                <CategoryBadge category={category} />
                <h3 className="font-semibold text-lg mt-2 line-clamp-1">
                  {name}
                </h3>
                <p className="text-primary text-sm line-clamp-1">
                  Experience {experience} years
                </p>
                <h5 className="font-semibold mt-2">
                  ${appointmentFee}{" "}
                  <span className="text-muted-foreground">Fee</span>
                </h5>
              </div>
            </Link>
            {isAdmin ? (
              <div className="flex items-center justify-center gap-4 mt-3">
                <Link
                  href={`/admin/doctors/${id}/edit`}
                  className={cn(
                    buttonVariants({ variant: "outline", size: "icon" }),
                    "h-8 w-8 rounded-full"
                  )}
                >
                  <EditIcon className="h-4 w-4" />
                </Link>
                <Button
                  className="h-8 w-8 rounded-full"
                  variant="outline"
                  size="icon"
                >
                  <TrashIcon className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Link
                href={`/doctors/${id}/appointment`}
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "w-full rounded-full max-w-[90%] mx-auto border-[1.3px] border-primary bg-background text-foreground mt-3 hover:bg-primary hover:text-white"
                )}
              >
                Book Now
              </Link>
            )}
          </div>
        )
      )}
    </section>
  );
};
