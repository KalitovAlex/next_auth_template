"use client";

import { AuthFormFields } from "@/shared/enums/auth";
import { InputTypes } from "@/shared/enums/input";
import { useAuth } from "../hooks/use-auth";
import { AuthFormData, authSchema } from "@/shared/types/auth";
import { Button, App } from "antd";
import { Form } from "@/components/form/form";
export function AuthForm() {
  const { login } = useAuth();
  const { message } = App.useApp();

  const fields = [
    {
      name: "email",
      label: AuthFormFields.EMAIL,
      type: InputTypes.TEXT,
      required: true,
    },
    {
      name: "password",
      label: AuthFormFields.PASSWORD,
      type: InputTypes.PASSWORD,
      required: true,
    },
  ];

  const handleSubmit = async (data: AuthFormData) => {
    try {
      await login(data);
      message.success("Form submitted successfully!");
    } catch (error: unknown) {
      console.error(error);
      message.error("Something went wrong!");
    }
  };

  return (
    <div className="max-w-md w-full space-y-8 dark:text-white dark:bg-black/10">
      <div className="text-center">
        <h2 className="text-3xl font-bold">Sign in to your account</h2>
      </div>
      <Form<AuthFormData>
        fields={fields}
        schema={authSchema}
        onSubmit={handleSubmit}
      >
        <Button
          type="primary"
          htmlType="submit"
          className="font-bold mt-2"
          block
        >
          Sign in
        </Button>
      </Form>
    </div>
  );
}
