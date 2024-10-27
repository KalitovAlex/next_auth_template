import { useAuthStore } from "@/shared/store/auth-store";

export const useAuthGuard = () => {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated;
};
