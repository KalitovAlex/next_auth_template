import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { LanguageState } from "../types/locale";

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