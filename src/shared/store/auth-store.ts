import { create } from "zustand";
import { authApi } from "@/shared/api/auth";
import { JWTEnum } from "@/shared/enums/auth";
import { AuthState } from "@/shared/types/auth";

export const useAuthStore = create<AuthState>((set) => ({
  isLoading: false,
  isAuthenticated: !!localStorage.getItem(JWTEnum.REFRESH_TOKEN),
  error: null,

  login: async (credentials) => {
    try {
      set({ isLoading: true, error: null });
      const data = await authApi.login(credentials);
      localStorage.setItem(JWTEnum.REFRESH_TOKEN, data.refreshToken);
      await fetch("/api/auth/set-token", {
        method: "POST",
        body: JSON.stringify({ token: data.refreshToken }),
      });
      set({ isAuthenticated: true });
    } catch (error) {
      set({ error: error as Error });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  refreshTokens: async () => {
    try {
      set({ isLoading: true, error: null });
      const refreshToken = localStorage.getItem(JWTEnum.REFRESH_TOKEN);

      if (!refreshToken) {
        throw new Error("No refresh token found");
      }

      const data = await authApi.refreshToken();
      set({ isAuthenticated: true });
      return data;
    } catch (error) {
      localStorage.removeItem(JWTEnum.REFRESH_TOKEN);
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
    localStorage.removeItem(JWTEnum.REFRESH_TOKEN);
    await fetch("/api/auth/remove-token", { method: "POST" });
    set({ isAuthenticated: false });
  },
}));
