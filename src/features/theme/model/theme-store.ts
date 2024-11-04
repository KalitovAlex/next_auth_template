import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ThemeState } from "../types";
import { Themes } from "@/shared/config/theme";

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: Themes.LIGHT,
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: "theme-storage",
    }
  )
); 