import { z } from "zod";

interface ValidationMessages {
  validation: {
    email: string;
    password: string;
    required: string;
  };
}
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

export const createAuthSchema = (messages: ValidationMessages) =>
  z.object({
    email: z.string().email(messages.validation.email),
    password: z.string().min(6, messages.validation.password),
  });

export const createRegisterSchema = (messages: ValidationMessages) =>
  z.object({
    email: z.string().email(messages.validation.email),
    password: z.string().min(6, messages.validation.password),
    phone: z.string().min(1, messages.validation.required),
  });

export type AuthFormData = z.infer<ReturnType<typeof createAuthSchema>>;
export type RegisterFormData = z.infer<ReturnType<typeof createRegisterSchema>>;
