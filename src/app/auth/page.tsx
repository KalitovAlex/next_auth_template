import { AuthMetadata } from "@/shared/enums/metadata";
import { Metadata } from "next";
import { AuthForm } from "./components/auth-form";

export const metadata: Metadata = {
  title: AuthMetadata.TITLE,
  description: AuthMetadata.DESCRIPTION,
};

export default function AuthPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black/90">
      <div className="p-8 bg-white rounded-lg shadow-lg dark:bg-black/10">
        <AuthForm />
      </div>
    </div>
  );
}
