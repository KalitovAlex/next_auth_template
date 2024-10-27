"use client";

import { Button, App } from "antd";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthFormData, authSchema } from "@/shared/types/auth";
import { InputField } from "@/components/form/input-field";
import { AuthFormFields } from "@/shared/enums/auth";
import { InputTypes } from "@/shared/enums/input";
import { useAuth } from "../hooks/use-auth";

export function AuthForm() {
  const { message } = App.useApp();
  const { login, isLoading, error } = useAuth();

  const { control, handleSubmit } = useForm<AuthFormData>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: AuthFormData) => {
    try {
      await login(data);
      message.success("Successfully logged in!");
    } catch (err) {
      console.log(err);
      message.error(error?.message || "Something went wrong!");
    }
  };

  return (
    <div className="max-w-md w-full space-y-8 dark:text-white dark:bg-black/10">
      <div className="text-center">
        <h2 className="text-3xl font-bold">Sign in to your account</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <InputField<AuthFormData>
          name="email"
          control={control}
          label={AuthFormFields.EMAIL}
          type="email"
          required
        />
        <InputField<AuthFormData>
          name="password"
          control={control}
          label={AuthFormFields.PASSWORD}
          type={InputTypes.PASSWORD}
          required
        />
        <Button
          type="primary"
          htmlType="submit"
          className="font-bold"
          block
          loading={isLoading}
        >
          Sign in
        </Button>
      </form>
    </div>
  );
}
