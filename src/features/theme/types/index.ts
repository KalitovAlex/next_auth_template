import { Theme } from "@/shared/config/theme";

export interface ThemeState {
  theme: Theme;
  setTheme: () => void;
} 