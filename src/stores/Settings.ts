import { create } from "zustand";
import { persist } from "zustand/middleware";

type SettingsState = {
  logoUrl: string;
  setCurrentMenu: (menu: string) => void;
  setLogoUrl: (url: string) => void;
};

export const useSettingsStore = create(
  persist<SettingsState>(
    (set) => ({
      logoUrl: "",
      setCurrentMenu: (menu: string) =>
        set((state) => ({ ...state, currentMenu: menu })),
      setLogoUrl: (url: string) => set((state) => ({ ...state, logoUrl: url })),
    }),
    {
      name: "@Exsto_settings",
      getStorage: () => localStorage,
    }
  )
);
