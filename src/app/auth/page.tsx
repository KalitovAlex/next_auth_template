import { AuthFormWidget } from "@/widgets/auth-form";
import { AuthMetadata } from "@/shared/enums/metadata";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: AuthMetadata.TITLE,
  description: AuthMetadata.DESCRIPTION,
};

export default function AuthPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black/90">
      <AuthFormWidget />
    </div>
  );
}
