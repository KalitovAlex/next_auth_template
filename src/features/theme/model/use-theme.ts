import { useThemeStore } from "./theme-store";
import { Themes } from "@/shared/config/theme";

export const useTheme = () => {
  const { theme, setTheme } = useThemeStore();
  
  const toggleTheme = () => {
    const newTheme = theme === Themes.LIGHT ? Themes.DARK : Themes.LIGHT;
    setTheme(newTheme);
    document.documentElement.classList.toggle(Themes.DARK, newTheme === Themes.DARK);
  };

  return { theme, setTheme: toggleTheme };
}; 