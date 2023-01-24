import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type SettingsState = {
  user: any;
  setUser: (userData: any) => void;
};

export const useSettingsStore = create(
  persist<SettingsState>(
    (set) => ({
      user: null,
      setUser: (userData: any) =>
        set(() => ({
          user: userData,
        })),
    }),
    {
      name: "@Exsto_settings",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
