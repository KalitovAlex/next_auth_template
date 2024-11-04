"use client";

import { InputTypes } from "@/shared/enums/input";
import { useRegister } from "../model/use-register";
import { Button, App } from "antd";
import { Form } from "@/components/form/form";
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
    <div className="max-w-md w-full space-y-8 dark:text-white dark:bg-black/10">
      <div className="text-center">
        <h2 className="text-3xl font-bold">{t.register.title}</h2>
      </div>
      <Form<RegisterFormData>
        fields={fields}
        schema={createRegisterSchema(t)}
        onSubmit={handleSubmit}
      >
        <Button
          type="primary"
          htmlType="submit"
          className="font-bold mt-2"
          block
        >
          {t.register.title}
        </Button>
      </Form>
    </div>
  );
}
