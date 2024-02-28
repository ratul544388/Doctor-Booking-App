import { create } from "zustand";

export type ModalType =
  | "appointmentModal"
  | "lgoutModal"
  | "deleteDoctorModal"
  | "cancelAppointmentModal"

interface ModalData {
  id?: string;
  name?: string;
}

interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ type: null, isOpen: false }),
}));
