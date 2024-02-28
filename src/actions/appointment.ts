"use server";
import { currentUser } from "@/lib/current-user";
import { db } from "@/lib/db";
import { AppointmentSchema } from "@/schemas";
import * as z from "zod";

export async function getAppointments({ userId }: { userId: string }) {
  const appointments = await db.appointment.findMany({
    where: {
      userId,
    },
    include: {
      doctor: true,
    },
  });

  return appointments;
}

export async function createAppointMent({
  values,
  doctorId,
}: {
  values: z.infer<typeof AppointmentSchema>;
  doctorId: string;
}) {
  try {
    const validatedFields = AppointmentSchema.safeParse(values);
    if (!validatedFields.success) {
      return { error: "Invalid fields" };
    }

    const user = await currentUser();

    if (!user) {
      return { error: "Permission denied" };
    }

    await db.appointment.create({
      data: {
        ...values,
        doctorId,
        userId: user.id,
      },
    });

    return { success: "Appointment booked!" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
}

export async function cancelAppointment(appointmentId: string) {
  try {
    const user = await currentUser();

    if (!user) {
      return { error: "Permission denied" };
    }

    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        appointments: {
          update: {
            where: {
              id: appointmentId,
            },
            data: {
              status: "CANCELED",
            },
          },
        },
      },
    });

    return { success: "Appointment canceled!" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
}
