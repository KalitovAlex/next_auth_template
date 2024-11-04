export const Themes = {
  DARK: "dark",
  LIGHT: "light",
} as const;

export const ThemeToolTip = {
  DARK: "Switch to Light Mode",
  LIGHT: "Switch to Dark Mode",
} as const;

export type Theme = typeof Themes[keyof typeof Themes]; 