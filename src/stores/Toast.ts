import { toast } from "react-toastify";
import { create } from "zustand";

type ToastState = {
  showToast: (
    type: "success" | "info" | "error" | "warning",
    message: string
  ) => void;
};

export const useToastStore = create<ToastState>((set) => ({
  showToast: (
    type: "success" | "info" | "error" | "warning",
    message: string
  ): void => {
    toast(message, {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      type: type,
      theme: "dark",
    });
  },
}));
