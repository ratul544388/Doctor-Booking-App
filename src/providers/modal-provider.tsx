"use client";

import { AppointmentModal } from "@/components/modals/appointment-modal";
import { CancelAppointmentModal } from "@/components/modals/cancel-appointment-modal";
import { useEffect, useState } from "react";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <AppointmentModal />
      <CancelAppointmentModal />
    </>
  );
};
