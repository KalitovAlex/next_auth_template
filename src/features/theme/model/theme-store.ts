import { create } from "zustand";
import { ThemeState } from "../types";
import { Theme, Themes } from "@/shared/config/theme";

const getInitialTheme = (): Theme => {
  if (typeof window === "undefined") return Themes.LIGHT;
  
  const savedTheme = localStorage.getItem("theme") as Theme;
  if (savedTheme && (savedTheme === Themes.LIGHT || savedTheme === Themes.DARK)) {
    return savedTheme;
  }

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return prefersDark ? Themes.DARK : Themes.LIGHT;
};

export const useThemeStore = create<ThemeState>((set) => ({
  theme: getInitialTheme(),
  setTheme: () =>
    set((state) => {
      const newTheme = state.theme === Themes.LIGHT ? Themes.DARK : Themes.LIGHT;
      if (typeof window !== "undefined") {
        localStorage.setItem("theme", newTheme);
        document.documentElement.classList.toggle("dark", newTheme === Themes.DARK);
      }
      return { theme: newTheme };
    }),
})); 