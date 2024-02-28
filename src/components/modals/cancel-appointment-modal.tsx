"use client";

import { cancelAppointment } from "@/actions/appointment";
import { useModalStore } from "@/hooks/use-modal-store";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Modal } from "./modal";

export const CancelAppointmentModal = () => {
  const { isOpen, type, data, onClose } = useModalStore();
  const [isPending, startTransition] = useTransition();
  const open = isOpen && type === "cancelAppointmentModal";
  const router = useRouter();

  const { id } = data;

  const onCancel = () => {
    startTransition(() => {
      cancelAppointment(id as string).then(({ success, error }) => {
        if (success) {
          toast.success(success);
          router.refresh();
          onClose();
        } else {
          toast.error(error);
        }
      });
  });
  };

  return (
    <Modal
      open={open}
      title="Cancel Appointment"
      description="Are you sure you want to cancel the appointment? This action cannot be undone."
      disabled={isPending}
      className="max-w-[400px]"
    >
      <div className="mt-5 flex items-center gap-3 justify-end">
        <Button onClick={onClose} disabled={isPending} variant="ghost">
          Cancel
        </Button>
        <Button disabled={isPending} onClick={onCancel} variant="destructive">
          Confirm
        </Button>
      </div>
    </Modal>
  );
};
