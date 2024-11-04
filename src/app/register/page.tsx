import { Metadata } from "next";
import { RegisterWidget } from "@/widgets/register/ui/register-widget";
import { RegisterMetadata } from "@/shared/enums/metadata";

export const metadata: Metadata = {
  title: RegisterMetadata.TITLE,
  description: RegisterMetadata.DESCRIPTION,
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black/90">
      <RegisterWidget />
    </div>
  );
}
