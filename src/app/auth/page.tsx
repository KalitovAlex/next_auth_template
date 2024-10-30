import { Metadata } from "next";
import { AuthFormWrapper } from "./components/auth-form-wrapper";
import { AuthMetadata } from "@/shared/enums/metadata";

export const metadata: Metadata = {
  title: AuthMetadata.TITLE,
  description: AuthMetadata.DESCRIPTION,
};

export default function AuthPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black/90">
      <AuthFormWrapper />
    </div>
  );
}
