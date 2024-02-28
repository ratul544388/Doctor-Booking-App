"use client";

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { createAppointMent } from "@/actions/appointment";
import { CardWrapper } from "@/components/card-wrapper";
import { DatePicker } from "@/components/date-picker";
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
import { AppointmentSchema } from "@/schemas";
import { Doctor } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
interface AppointmentFormProps {
  doctor: Doctor;
}

export const AppointmentForm = ({ doctor }: AppointmentFormProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof AppointmentSchema>>({
    resolver: zodResolver(AppointmentSchema),
    defaultValues: {
      name: "",
      phone: undefined,
      address: "",
      appointmentDate: undefined,
    },
  });

  function onSubmit(values: z.infer<typeof AppointmentSchema>) {
    startTransition(() => {
      createAppointMent({ values, doctorId: doctor.id }).then(
        ({ error, success }) => {
          if (success) {
            form.reset();
            toast.success(success);
            router.push("/my-appointments")
            router.refresh();
          } else {
            toast.error(error);
          }
        }
      );
    });
  }

  return (
    <CardWrapper title={`Book An Appointment`} className="gap-0">
      <h1 className="font-semibold text-primary text-center">{doctor.name}</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col h-full gap-8 mt-5"
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
                    placeholder="Enter patent name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    disabled={isPending}
                    placeholder="Enter patent phone number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    placeholder="Enter patent address"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="appointmentDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Appointment date</FormLabel>
                <FormControl>
                  <DatePicker
                    disabled={isPending}
                    placeholder="Pick Appointment Date"
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={isPending}
            type="submit"
            className="rounded-full mt-auto"
          >
            Book
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
