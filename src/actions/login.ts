"use server";
import { getUserByEmail } from "@/data/user";
import { LoginSchema } from "@/schemas";
import * as z from "zod";
import bcrypt from "bcryptjs";

export async function login(values: z.infer<typeof LoginSchema>) {
  try {
    const validatedFields = LoginSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "Invalid Fields" };
    }

    const user = await getUserByEmail(values.email);

    if (!user) {
      return { error: "Email does not exists" };
    }

    const isCorrectPassword = bcrypt.compareSync(
      values.password,
      user.password as string
    );

    if (!isCorrectPassword) {
      return { error: "Incorrect Password" };
    }

    return { success: "Logged In!" };
  } catch (error) {
    return { error: "Something went wrong" };
  }
}
