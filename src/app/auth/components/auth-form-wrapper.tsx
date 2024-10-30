"use client";

import Link from "next/link";
import { REGISTER } from "@/shared/router/routes";
import { useTranslations } from "@/shared/hooks/use-translations";
import { AuthForm } from "./auth-form";

export function AuthFormWrapper() {
  const t = useTranslations();

  return (
    <div className="p-8 bg-white rounded-lg shadow-lg dark:bg-black/10">
      <AuthForm />
      <p className="mt-4 text-center flex flex-row justify-between">
        <p className="text-black dark:text-white font-medium">
          {t.auth.noAccount}
        </p>
        <Link href={REGISTER} className="font-bold text-primary">
          {t.auth.register}
        </Link>
      </p>
    </div>
  );
} 