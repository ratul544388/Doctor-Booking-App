"use client";

import { DoctorInfoCard } from "@/components/doctor-info-card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useModalStore } from "@/hooks/use-modal-store";
import { cn } from "@/lib/utils";
import { Appointment as AppointmentData, Doctor, User } from "@prisma/client";
import { format } from "date-fns";

interface AppointmentProps {
  appointment: AppointmentData & {
    doctor: Doctor;
  };
}

export const Appointment = ({ appointment }: AppointmentProps) => {
  const { onOpen } = useModalStore();
  const info = [
    {
      label: "Name",
      value: appointment.name,
    },
    {
      label: "Phone",
      value: appointment.phone,
    },
    {
      label: "Address",
      value: appointment.address,
    },
    {
      label: "Appointment Date",
      value: format(appointment.appointmentDate, "dd MMM yy, hh:mm aa"),
    },
    {
      label: "Appointment Date",
      value: format(appointment.appointmentDate, "dd MMM yy, hh:mm aa"),
    },
  ];

  const status = appointment.status;

  return (
    <div className="flex flex-col lg:flex-row gap-5 border rounded-md shadow_sm p-5 w-full">
      <DoctorInfoCard
        doctor={appointment.doctor}
        className="shadow-transparent border-0 p-0"
      />
      <div className="w-full">
        <h2 className="text-xl font-bold">Patent Info:</h2>
        <Separator className="my-2" />
        {info.map(({ label, value }) => (
          <div key={label} className="flex gap-2 mt-2 text-sm font-medium">
            <p className="text-muted-foreground">{label}:</p>
            <p>{value}</p>
          </div>
        ))}
        <p className="font-medium text-muted-foreground mt-1">
          status:{" "}
          <span
            className={cn(
              "capitalize",
              status === "COMPLETE" && "text-green-600",
              status === "PENDING" && "text-orange-400",
              status === "CANCELED" && "text-destructive"
            )}
          >
            {appointment.status.toLowerCase()}
          </span>
        </p>
        {status === "PENDING" && (
          <Button
            className="mt-5"
            variant="destructive"
            onClick={() =>
              onOpen("cancelAppointmentModal", { id: appointment.id })
            }
          >
            Cancel Appointment
          </Button>
        )}
      </div>
    </div>
  );
};
