import { create } from "zustand";

type State = {
  currentModal: string;
  showModal: (modalId: string) => void;
  hideModal: () => void;
  openedModal: (modalId: string, modalIdOpened: string) => boolean;
};

export const useModalStore = create<State>((set) => ({
  currentModal: "",
  openedModal: (modalId: string, modalIdOpened: string) =>
    modalId === modalIdOpened,
  showModal: (currentModal: string) => set(() => ({ currentModal })),
  hideModal: () => set(() => ({ currentModal: "" })),
}));
