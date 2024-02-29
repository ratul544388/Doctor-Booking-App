"use client";

import { CardWrapper } from "@/components/card-wrapper";
import { DoctorSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Doctor } from "@prisma/client";
import { useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { z } from "zod";

import { createDoctor, updateDoctor } from "@/actions/doctors";
import { ImageUpload } from "@/components/image-upload";
import { Select } from "@/components/select";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DoctorCategories } from "@/constants";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect, useTransition } from "react";
import { toast } from "sonner";

interface DoctorFormProps {
  doctor?: Doctor;
  title?: string;
}

export const DoctorForm = ({ doctor, title }: DoctorFormProps) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<z.infer<typeof DoctorSchema>>({
    resolver: zodResolver(DoctorSchema),
    defaultValues: {
      name: "",
      category: "",
      chamber: "",
      appointmentFee: undefined,
      experience: undefined,
      image: "",
      description: "",
    },
  });

  function onSubmit(values: z.infer<typeof DoctorSchema>) {
    startTransition(() => {
      if (doctor) {
        updateDoctor({ values, doctorId: doctor.id }).then(
          ({ success, error }) => {
            if (success) {
              toast.success(success);
              router.push("/admin/doctors");
              router.refresh();
            } else {
              toast.error(error);
            }
          }
        );
      } else {
        createDoctor(values).then(({ success, error }) => {
          if (success) {
            toast.success(success);
            router.push("/admin/doctors");
            router.refresh();
          } else {
            toast.error(error);
          }
        });
      }
    });
  }

  useEffect(() => {
    if (doctor) {
      const { name, appointmentFee, description, category, image, experience, chamber } =
        doctor;
      form.reset({
        name,
        appointmentFee,
        description,
        category,
        image,
        experience,
        chamber,
      });
    }
  }, [form, doctor]);

  return (
    <CardWrapper title={title || "Add a new Doctor"} className="max-w-[500px]">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-8"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    placeholder="eg. Dr. Gavinda"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Select
                    disabled={isPending}
                    value={field.value}
                    onChange={field.onChange}
                    options={DoctorCategories.map((item) => item.label)}
                    placeholder="Select Category"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="experience"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Experience</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    type="number"
                    placeholder="Years of experience"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="appointmentFee"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Appointment Fee</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    type="number"
                    placeholder="Appointment fee"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="chamber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Chamber Location</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    placeholder="Enter Doctor Location"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <ImageUpload
                    disabled={isPending}
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <ReactQuill
                    className={cn(
                      isPending && "pointer-events-none opacity-60"
                    )}
                    placeholder="Write about the Doctor"
                    theme="snow"
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isPending} type="submit">
            {doctor ? "Save" : "Create"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
