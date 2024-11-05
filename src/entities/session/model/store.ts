import { create } from "zustand";
import { SessionState } from "../types";
import { authApi } from "@/features/auth/api";
import { config } from "@/shared/config";

const getInitialAuthState = () => {
  if (typeof window === "undefined") return false;
  return !!localStorage.getItem(config.auth.JWT.REFRESH_TOKEN);
};

export const useSessionStore = create<SessionState>((set) => ({
  isLoading: false,
  isAuthenticated: getInitialAuthState(),
  error: null,
  setIsAuthenticated: (value: boolean) => set({ isAuthenticated: value }),

  refreshTokens: async () => {
    try {
      set({ isLoading: true, error: null });
      const data = await authApi.refreshToken();

      if (data.refreshToken) {
        localStorage.setItem(config.auth.JWT.REFRESH_TOKEN, data.refreshToken);
        await fetch("/api/auth/set-token", {
          method: "POST",
          body: JSON.stringify({ token: data.refreshToken }),
        });
      }

      set({ isAuthenticated: true });
    } catch (error) {
      localStorage.removeItem(config.auth.JWT.REFRESH_TOKEN);
      await fetch("/api/auth/remove-token", { method: "POST" });
      set({
        error: error as Error,
        isAuthenticated: false,
      });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    localStorage.removeItem(config.auth.JWT.REFRESH_TOKEN);
    await fetch("/api/auth/remove-token", { method: "POST" });
    set({ isAuthenticated: false });
  },
}));
