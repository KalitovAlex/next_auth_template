import { AuthMetadata } from "@/shared/enums/metadata";
import { Metadata } from "next";
import { AuthForm } from "./components/auth-form";
import Link from "next/link"; // Импортируем Link для навигации
import { REGISTER } from "@/shared/router/routes";

export const metadata: Metadata = {
  title: AuthMetadata.TITLE,
  description: AuthMetadata.DESCRIPTION,
};

export default function AuthPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black/90">
      <div className="p-8 bg-white rounded-lg shadow-lg dark:bg-black/10">
        <AuthForm />
        <p className="mt-4 text-center flex flex-row justify-between">
          <p className="text-black dark:text-white font-medium">
            You dont have an account?
          </p>
          <Link href={REGISTER} className="font-bold text-primary">
            Register it
          </Link>
        </p>
      </div>
    </div>
  );
}
