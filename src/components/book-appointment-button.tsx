"use client";

import { useModalStore } from "@/hooks/use-modal-store";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode } from "react";
import { Button } from "./ui/button";
import { User } from "@prisma/client";

interface BookAppointmentButtonProps {
  doctorId: string;
  className?: string;
  children: ReactNode;
  doctorName: string;
  user?: User | null;
}

export const BookAppointmentButton = ({
  user,
  doctorId,
  className,
  children,
  doctorName,
}: BookAppointmentButtonProps) => {
  const { onOpen } = useModalStore();
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    if (!user?.id) {
      return router.push(`/auth/login?redirect_url=${pathname}`);
    }
    onOpen("appointmentModal", { id: doctorId, name: doctorName });
  };

  return (
    <Button onClick={handleClick} className={cn("rounded-full", className)}>
      {children}
    </Button>
  );
};
