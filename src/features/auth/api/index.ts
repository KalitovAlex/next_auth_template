import { apiRequest } from "@/shared/api";
import { AuthFormData } from "../types";
import { JWTEnum } from "@/shared/enums/auth";

export const authApi = {
  login: async (credentials: AuthFormData) => {
    const response = await apiRequest.post("/auth/signin", credentials);
    return response.data;
  },

  register: async (credentials: AuthFormData) => {
    const response = await apiRequest.post("/auth/signup", credentials);
    return response.data;
  },

  refreshToken: async () => {
    if (typeof window === "undefined") {
      throw new Error("Cannot refresh token on server side");
    }

    const refreshToken = localStorage.getItem(JWTEnum.REFRESH_TOKEN);
    if (!refreshToken) {
      throw new Error("No refresh token available");
    }

    try {
      const response = await apiRequest.post(`/auth/refresh`, {
        refreshToken,
      });

      return response.data;
    } catch (error) {
      localStorage.removeItem(JWTEnum.REFRESH_TOKEN);
      throw error;
    }
  },
}; 