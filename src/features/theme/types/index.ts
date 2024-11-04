import { Themes } from "@/shared/enums/theme";

export interface ThemeState {
  theme: Themes;
  setTheme: (theme: Themes) => void;
}
