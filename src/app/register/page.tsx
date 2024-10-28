import { Metadata } from "next";
import Link from "next/link";
import { AUTH } from "@/shared/router/routes";
import { RegisterForm } from "./components/register-form";

export const metadata: Metadata = {
  title: "Register",
  description: "Create your account",
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black/90">
      <div className="p-8 bg-white rounded-lg shadow-lg dark:bg-black/10">
        <RegisterForm />
        <p className="mt-4 text-center flex flex-row justify-between">
          <p className="text-black dark:text-white font-medium">
            Already have an account?
          </p>
          <Link href={AUTH} className="font-bold text-primary">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
