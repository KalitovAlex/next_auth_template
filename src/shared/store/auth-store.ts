import { create } from "zustand";
import { authApi } from "@/shared/api/auth";
import { JWTEnum } from "@/shared/enums/auth";
import { AuthState } from "@/shared/types/auth";

const getInitialAuthState = () => {
  if (typeof window === "undefined") return false;
  return !!localStorage.getItem(JWTEnum.REFRESH_TOKEN);
};

export const useAuthStore = create<AuthState>((set) => ({
  isLoading: false,
  isAuthenticated: getInitialAuthState(),
  error: null,
  setIsAuthenticated: (value: boolean) => set({ isAuthenticated: value }),

  refreshTokens: async () => {
    try {
      set({ isLoading: true, error: null });
      const refreshToken =
        typeof window !== "undefined"
          ? localStorage.getItem(JWTEnum.REFRESH_TOKEN)
          : null;

      if (!refreshToken) {
        throw new Error("No refresh token found");
      }

      const data = await authApi.refreshToken();

      if (data.refreshToken) {
        if (typeof window !== "undefined") {
          localStorage.setItem(JWTEnum.REFRESH_TOKEN, data.refreshToken);
        }
        await fetch("/api/auth/set-token", {
          method: "POST",
          body: JSON.stringify({ token: data.refreshToken }),
        });
      }

      set({ isAuthenticated: true });
      return data;
    } catch (error) {
      if (typeof window !== "undefined") {
        localStorage.removeItem(JWTEnum.REFRESH_TOKEN);
      }
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
    if (typeof window !== "undefined") {
      localStorage.removeItem(JWTEnum.REFRESH_TOKEN);
    }
    await fetch("/api/auth/remove-token", { method: "POST" });
    set({ isAuthenticated: false });
  },
}));
