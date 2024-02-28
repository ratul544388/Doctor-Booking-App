"use client";

import { useModalStore } from "@/hooks/use-modal-store";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { Modal } from "./modal";

import { createAppointMent } from "@/actions/appointment";
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
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { DatePicker } from "../date-picker";

interface AppointmentModal {}

export const AppointmentModal = ({}: AppointmentModal) => {
  const { isOpen, type, onClose, data } = useModalStore();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const open = isOpen && type === "appointmentModal";

  const form = useForm<z.infer<typeof AppointmentSchema>>({
    resolver: zodResolver(AppointmentSchema),
    defaultValues: {
      name: "",
      phone: undefined,
      address: "",
      appointmentDate: undefined,
    },
  });

  const { name, id } = data;

  function onSubmit(values: z.infer<typeof AppointmentSchema>) {
    startTransition(() => {
      createAppointMent({ values, doctorId: id as string }).then(
        ({ error, success }) => {
          if (success) {
            form.reset();
            onClose();
            toast.success(success);
            router.refresh();
          } else {
            toast.error(error);
          }
        }
      );
    });
  }

  return (
    <Modal open={open} title={`Book ${name} Appointment`} disabled={isPending}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col h-full gap-8"
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
          <Button disabled={isPending} type="submit" className="rounded-full mt-auto">
            Book
          </Button>
        </form>
      </Form>
    </Modal>
  );
};
