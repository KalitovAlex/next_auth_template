import { AuthMetadata } from "@/shared/enums/metadata";
import { AuthFormWidget } from "@/widgets/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: AuthMetadata.TITLE,
  description: AuthMetadata.DESCRIPTION,
};

export default function AuthPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#0A0A0B] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#00C1A0] dark:bg-[#007A6D] rounded-full blur-[128px] opacity-[0.15]" />
      <div className="absolute top-20 right-20 w-[350px] h-[350px] bg-[#6C7281] dark:bg-[#4B545D] rounded-full blur-[128px] opacity-[0.1]" />
      <div className="absolute bottom-20 left-20 w-[350px] h-[350px] bg-[#6C7281] dark:bg-[#4B545D] rounded-full blur-[128px] opacity-[0.1]" />

      <AuthFormWidget />
    </div>
  );
}
