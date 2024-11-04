"use client";

import Link from "next/link";
import { REGISTER } from "@/shared/router/routes";
import { useTranslations } from "@/shared/hooks/use-translations";
import { AuthForm } from "@/features/auth/ui/auth-form";

export function AuthFormWidget() {
  const t = useTranslations();

  return (
    <div className="w-[460px] relative z-10">
      <div className="flex justify-center mb-8">
        <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
          >
            <path d="M12 2L2 7L12 12L22 7L12 2Z" />
          </svg>
        </div>
      </div>

      <div className="bg-[#17181C] backdrop-blur-xl rounded-2xl p-8 shadow-xl">
        <AuthForm />

        <div className="mt-6 flex items-center justify-between text-[15px]">
          <span className="text-[#6C7281]">{t.auth.noAccount}</span>
          <Link
            href={REGISTER}
            className="text-white hover:text-primary transition-colors"
          >
            {t.auth.register}
          </Link>
        </div>
      </div>
    </div>
  );
}
