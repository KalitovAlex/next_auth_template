"use client";

import Link from "next/link";
import { RegisterForm } from "@/features/register";
import { AUTH } from "@/shared/router/routes";
import { useTranslations } from "@/shared/hooks/use-translations";

export const RegisterWidget = () => {
  const t = useTranslations();
  return (
    <div className="p-8 bg-white rounded-lg shadow-lg dark:bg-black/10">
      <RegisterForm />
      <div className="mt-4 text-center flex flex-row justify-between">
        <span className="text-black dark:text-white font-medium">
          {t.auth.haveAccount}
        </span>
        <Link href={AUTH} className="font-bold text-primary">
          {t.auth.auth}
        </Link>
      </div>
    </div>
  );
}; 