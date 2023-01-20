import { create } from "zustand";

type State = {
  isLoading: boolean;
  setLoading: (status: boolean) => void;
  showLoading: () => void;
  hideLoading: () => void;
};

export const useLoadingStore = create<State>((set) => ({
  isLoading: false,
  setLoading: (status: boolean) => set(() => ({ isLoading: status })),
  showLoading: () => set(() => ({ isLoading: true })),
  hideLoading: () => set(() => ({ isLoading: false })),
}));
