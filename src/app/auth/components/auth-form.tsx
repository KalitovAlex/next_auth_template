"use client";

import { Button, Form } from "antd";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthFormData, authSchema } from "@/shared/types/auth";
import { InputField } from "@/components/form/input-field";

export function AuthForm() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<AuthFormData>({
    resolver: zodResolver(authSchema),
  });

  const onSubmit = (data: AuthFormData) => {
    console.log("Success:", data);
  };

  return (
    <div className="max-w-md w-full space-y-8 dark:text-white dark:bg-black/10">
      <div className="text-center">
        <h2 className="text-3xl font-bold">Sign in to your account</h2>
      </div>

      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
        <InputField
          label="Username"
          error={errors.username?.message}
          {...register("username")}
        />
        <InputField
          label="Password"
          type="password"
          error={errors.password?.message}
          {...register("password")}
        />
        <Form.Item>
          <Button type="primary" className="font-bold" htmlType="submit" block>
            Sign in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
