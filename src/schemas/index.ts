import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }),
  password: z
    .string()
    .min(8, { message: "Password must be 8 characters in length" }),
});

export const RegisterSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid Email" }),
  password: z
    .string()
    .min(8, { message: "Password must be 8 characters in length" }),
});

export const DoctorSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  image: z.string().min(1, { message: "Image is required" }),
  experience: z.coerce.number().min(1, { message: "Experience is required" }),
  category: z.string().min(1, { message: "Category is required" }),
  chamber: z.string().min(1, { message: "Chamber address is required" }),
  appointmentFee: z.coerce.number().min(1, { message: "Image is required" }),
  description: z.string().min(10, { message: "Description is required" }),
});

export const AppointmentSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  appointmentDate: z.date({ required_error: "Date is required" }),
  phone: z.string({required_error: "Phone number is required"})
    .refine((value) => value.length >= 10, {
      message: "Enter minimum 10 digits phone number",
    }),
});
