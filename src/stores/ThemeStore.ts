import { themeStoreType } from "@/types";
import { isDarkMode } from "@/utils/Utils";
import { create } from "zustand";

const doc = document.documentElement;

const themeStore = create<themeStoreType>((set) => ({
  theme: isDarkMode(),
  actions: {
    handleTheme: (v) =>
      set((s) => {
        doc.classList.remove(s.theme);
        doc.classList.add(v);
        return { theme: v };
      }),
  },
}));

const useTheme = () => themeStore((state) => state.theme);
const useThemeActions = (name: keyof themeStoreType["actions"]) =>
  themeStore((state) => state.actions[name]);

export { useTheme, useThemeActions };
