"use client";

import { InputTypes } from "@/shared/enums/input";
import { useRegister } from "../model/use-register";
import { Button, App } from "antd";
import { Form } from "@/shared/ui/form/form";
import { useTranslations } from "@/shared/hooks/use-translations";
import { createRegisterSchema } from "../types";
import { RegisterFormData } from "../types";

export function RegisterForm() {
  const { register } = useRegister();
  const { message } = App.useApp();
  const t = useTranslations();

  const fields = [
    {
      name: "email",
      label: t.register.form.email,
      type: InputTypes.TEXT,
      required: true,
    },
    {
      name: "password",
      label: t.register.form.password,
      type: InputTypes.PASSWORD,
      required: true,
    },
    {
      name: "phone",
      label: t.register.form.phone,
      type: InputTypes.PHONE,
      required: true,
    },
  ];

  const handleSubmit = async (data: RegisterFormData) => {
    try {
      await register(data);
      message.success(t.register.messages.success);
    } catch (error: unknown) {
      console.error(error);
      message.error(t.register.messages.error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-[28px] font-medium text-white">
          {t.register.title}
        </h1>
        <p className="text-[15px] text-[#6C7281]">
          {t.register.description}
        </p>
      </div>

      <div className="space-y-3">
        <button className="w-full h-[48px] flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 transition-colors rounded-xl text-white text-[15px]">
          <img src="/google.svg" alt="Google" className="w-5 h-5" />
          Sign up with Google
        </button>
        <button className="w-full h-[48px] flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 transition-colors rounded-xl text-white text-[15px]">
          <img src="/twitter.svg" alt="Twitter" className="w-5 h-5" />
          Sign up with Twitter
        </button>
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/10"></div>
        </div>
        <div className="relative flex justify-center text-[13px]">
          <span className="px-2 bg-[#17181C] text-[#6C7281]">or</span>
        </div>
      </div>

      <Form<RegisterFormData>
        fields={fields}
        schema={createRegisterSchema(t)}
        onSubmit={handleSubmit}
      >
        <Button
          type="primary"
          htmlType="submit"
          className="w-full h-[48px] bg-primary hover:bg-primary-hover text-white text-[15px] font-medium rounded-xl mt-2"
          block
        >
          {t.register.title}
        </Button>
      </Form>
    </div>
  );
}
