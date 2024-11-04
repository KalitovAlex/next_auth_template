import { Metadata } from "next";
import { RegisterWidget } from "@/widgets/register/ui/register-widget";
import { RegisterMetadata } from "@/shared/enums/metadata";

export const metadata: Metadata = {
  title: RegisterMetadata.TITLE,
  description: RegisterMetadata.DESCRIPTION,
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A0A0B] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#00C1A0] rounded-full blur-[128px] opacity-[0.15]" />
      <div className="absolute top-20 right-20 w-[350px] h-[350px] bg-[#6C7281] rounded-full blur-[128px] opacity-[0.1]" />
      <div className="absolute bottom-20 left-20 w-[350px] h-[350px] bg-[#6C7281] rounded-full blur-[128px] opacity-[0.1]" />
      
      <RegisterWidget />
    </div>
  );
}
