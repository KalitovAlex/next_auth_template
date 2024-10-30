import { Metadata } from "next";
import { RegisterClient } from "./components/register-client";
import { RegisterMetadata } from "@/shared/enums/metadata";

export const metadata: Metadata = {
  title: RegisterMetadata.TITLE,
  description: RegisterMetadata.DESCRIPTION,
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black/90">
      <RegisterClient />
    </div>
  );
}
