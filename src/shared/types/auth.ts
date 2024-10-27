import { z } from "zod";

export const authSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type AuthFormData = z.infer<typeof authSchema>;

export interface JWT {
  accessToken: string;
  refreshToken: string;
}
export interface AuthState {
  isLoading: boolean;
  isAuthenticated: boolean;
  error: Error | null;
  login: (credentials: AuthFormData) => Promise<void>;
  refreshTokens: () => Promise<void>;
  logout: () => void;
}
