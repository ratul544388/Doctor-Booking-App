"use server";

import { currentUser } from "@/lib/current-user";
import { db } from "@/lib/db";
import getBase64 from "@/lib/getLocalBase64";
import { DoctorSchema } from "@/schemas";
import * as z from "zod";

export async function getDoctors({
  category,
  q,
  doctorId,
  take,
}: { category?: string; q?: string; doctorId?: string; take?: number } = {}) {
  const doctors = await db.doctor.findMany({
    where: {
      ...(doctorId
        ? {
            id: {
              not: doctorId,
            },
          }
        : {}),
      ...(category
        ? {
            category: {
              equals: category,
              mode: "insensitive",
            },
          }
        : {}),
      ...(q
        ? {
            OR: [
              {
                name: {
                  contains: q,
                  mode: "insensitive",
                },
                category: {
                  contains: q,
                  mode: "insensitive",
                },
              },
            ],
          }
        : {}),
    },
    ...(take ? { take } : {}),
  });

  return doctors;
}

export async function createDoctor(values: z.infer<typeof DoctorSchema>) {
  try {
    const validatedFields = DoctorSchema.safeParse(values);
    if (!validatedFields.success) {
      return { error: "Invalid fields" };
    }

    const user = await currentUser();

    if (user?.role !== "ADMIN") {
      return { error: "Permission denied" };
    }

    const blurDataUrl = await getBase64(values.image);

    if (!blurDataUrl) {
      return { error: "Error while generating BlurDataUrl" };
    }

    await db.doctor.create({
      data: {
        ...values,
        blurDataUrl,
      },
    });

    return { success: "Doctor Added" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
}

export async function updateDoctor({
  values,
  doctorId,
}: {
  values: z.infer<typeof DoctorSchema>;
  doctorId: string;
}) {
  try {
    const validatedFields = DoctorSchema.safeParse(values);
    if (!validatedFields.success) {
      return { error: "Invalid fields" };
    }

    const user = await currentUser();

    if (user?.role !== "ADMIN") {
      return { error: "Permission denied" };
    }

    const blurDataUrl = await getBase64(values.image);

    await db.doctor.update({
      where: {
        id: doctorId,
      },
      data: {
        ...values,
        blurDataUrl,
      },
    });

    return { success: "Doctor Updated" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
}

export async function deleteDoctor(doctorId: string) {
  try {
    const user = await currentUser();

    if (user?.role !== "ADMIN") {
      return { error: "Permission denied" };
    }

    await db.doctor.delete({
      where: {
        id: doctorId,
      },
    });

    return { success: "Doctor Deleted" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
}
