import { useRouter } from "next/navigation";
import { AuthFormData } from "@/shared/types/auth";
import { AUTH } from "@/shared/router/routes";
import { authApi } from "@/shared/api/auth";
import { useMutation } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/shared/enums/query-keys";

export const useRegister = () => {
  const router = useRouter();

  const { mutateAsync: register } = useMutation({
    mutationKey: [QUERY_KEYS.REGISTER],
    mutationFn: (credentials: AuthFormData) => authApi.register(credentials),
    onSuccess: () => {
      router.push(AUTH);
    },
  });

  return {
    register,
  };
};
