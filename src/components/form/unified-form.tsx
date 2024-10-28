"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputField } from "./input-field";
import { UnifiedFormProps } from "@/shared/types/form";
import { Path } from "react-hook-form";
import "@/shared/styles/globals.css";

export function UnifiedForm<T extends Record<string, unknown>>({
  fields,
  schema,
  onSubmit,
  children,
}: UnifiedFormProps<T>) {
  const { control, handleSubmit } = useForm<T>({
    resolver: zodResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {fields.map((field) => (
        <InputField
          key={field.name}
          name={field.name as Path<T>}
          control={control}
          label={field.label}
          type={field.type}
          required={field.required}
        />
      ))}
      {children}
    </form>
  );
}
