import { create } from "zustand";
import { persist } from "zustand/middleware";
import { LanguageState } from "../types";

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      language: "en",
      setLanguage: (language) => set({ language }),
    }),
    {
      name: "language-storage",
    }
  )
);
