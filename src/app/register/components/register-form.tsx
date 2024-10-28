"use client";

import { AuthFormFields } from "@/shared/enums/auth";
import { InputTypes } from "@/shared/enums/input";
import { useRegister } from "../hooks/use-register";
import { RegisterFormData, registerSchema } from "@/shared/types/auth";
import { Button, App } from "antd";
import { Form } from "@/components/form/form";

export function RegisterForm() {
  const { register } = useRegister();
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
    {
      name: "phone",
      label: AuthFormFields.PHONE,
      type: InputTypes.PHONE,
      required: true,
    },
  ];

  const handleSubmit = async (data: RegisterFormData) => {
    try {
      await register(data);
      message.success("Registration successful!");
    } catch (error: unknown) {
      console.error(error);
      message.error("Registration failed!");
    }
  };

  return (
    <div className="max-w-md w-full space-y-8 dark:text-white dark:bg-black/10">
      <div className="text-center">
        <h2 className="text-3xl font-bold">Create your account</h2>
      </div>
      <Form<RegisterFormData>
        fields={fields}
        schema={registerSchema}
        onSubmit={handleSubmit}
      >
        <Button
          type="primary"
          htmlType="submit"
          className="font-bold mt-2"
          block
        >
          Register
        </Button>
      </Form>
    </div>
  );
}
