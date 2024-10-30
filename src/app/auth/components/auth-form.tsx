"use client";

import { InputTypes } from "@/shared/enums/input";
import { useAuth } from "../hooks/use-auth";
import { AuthFormData, createAuthSchema } from "@/shared/types/auth";
import { Button, App } from "antd";
import { Form } from "@/components/form/form";
import { useTranslations } from "@/shared/hooks/use-translations";

export function AuthForm() {
  const { login } = useAuth();
  const { message } = App.useApp();
  const t = useTranslations();
  
  const authSchema = createAuthSchema(t);

  const fields = [
    {
      name: "email",
      label: t.auth.form.email,
      type: InputTypes.TEXT,
      required: true,
    },
    {
      name: "password",
      label: t.auth.form.password,
      type: InputTypes.PASSWORD,
      required: true,
    },
  ];

  const handleSubmit = async (data: AuthFormData) => {
    try {
      await login(data);
      message.success(t.auth.messages.success);
    } catch (error: unknown) {
      console.error(error);
      message.error(t.auth.messages.error);
    }
  };

  return (
    <div className="max-w-md w-full space-y-8 dark:text-white dark:bg-black/10">
      <div className="text-center">
        <h2 className="text-3xl font-bold">{t.auth.title}</h2>
      </div>
      <Form<AuthFormData>
        fields={fields}
        schema={authSchema}
        onSubmit={handleSubmit}
      >
        <Button type="primary" htmlType="submit" className="font-bold mt-2" block>
          {t.auth.title}
        </Button>
      </Form>
    </div>
  );
}
