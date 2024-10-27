import { useRouter } from "next/navigation";
import { useAuthStore } from "@/shared/store/auth-store";
import { HOME } from "@/shared/router/routes";
import { AuthFormData } from "@/shared/types/auth";

export const useAuth = () => {
  const router = useRouter();
  const { login, isLoading, error } = useAuthStore();

  const handleLogin = async (credentials: AuthFormData) => {
    await login(credentials);
    router.push(HOME);
  };

  return {
    login: handleLogin,
    isLoading,
    error,
  };
};
