"use client";

import { cn } from "@/lib/utils";
import { Doctor, User } from "@prisma/client";
import { GraduationCap, MapPin } from "lucide-react";
import Link from "next/link";
import { Photo } from "./photo";
import { buttonVariants } from "./ui/button";

interface DoctorInfoCardProps {
  doctor: Doctor;
  user: User | null;
  action?: boolean;
  className?: string;
}

export const DoctorInfoCard = ({
  action,
  doctor,
  user,
  className,
}: DoctorInfoCardProps) => {
  return (
    <section
      className={cn(
        "flex gap-6 w-full text-sm border rounded-md shadow_sm px-5 py-3",
        className
      )}
    >
      <Photo
        src={doctor.image}
        alt={doctor.name}
        className="max-w-[220px]"
        blurDataUrl={doctor.blurDataUrl}
      />
      <div>
        <h3 className="font-bold text-xl">{doctor.name}</h3>
        <div className="flex items-center gap-2 text-muted-foreground mt-1">
          <GraduationCap className="h-4 min-w-4" />
          {doctor.experience} years of experience
        </div>
        <div className="flex items-center gap-2 text-muted-foreground mt-1">
          <MapPin className="h-4 min-w-4" />
          {doctor.chamber}
        </div>
        <p className="px-3 bg-primary/10 text-primary w-fit rounded-full mt-2 font-medium">
          {doctor.category}
        </p>
        <h5 className="font-medium text-xl mt-2 text-primary">
          ${doctor.appointmentFee}{" "}
          <span className="text-muted-foreground text-sm">Appointment Fee</span>
        </h5>
        {action && (
          <Link
            href={`/doctors/${doctor.id}/appointment`}
            className={cn(buttonVariants(), "mt-3 rounded-full")}
          >
            Book An Appointment
          </Link>
        )}
      </div>
    </section>
  );
};
