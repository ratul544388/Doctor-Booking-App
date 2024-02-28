"use server";

import { db } from "@/lib/db";
import { RegisterSchema } from "@/schemas";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "@/data/user";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  try {
    const user = await getUserByEmail(values.email);

    if (user) {
      return { error: "User already exists" };
    }

    const hashedPassword = await bcrypt.hash(values.password, 10);

    await db.user.create({
      data: {
        ...values,
        password: hashedPassword,
      },
    });

    return { success: "Account Created" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};
