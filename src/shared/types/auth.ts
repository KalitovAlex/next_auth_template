import { z } from "zod";

export const authSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const registerSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phone: z.string(),
});

export type AuthFormData = z.infer<typeof authSchema>;

export type RegisterFormData = z.infer<typeof registerSchema>;

export interface JWT {
  accessToken: string;
  refreshToken: string;
}
export interface AuthState {
  isLoading: boolean;
  isAuthenticated: boolean;
  error: Error | null;
  setIsAuthenticated: (value: boolean) => void;
  refreshTokens: () => Promise<JWT>;
  logout: () => Promise<void>;
}
