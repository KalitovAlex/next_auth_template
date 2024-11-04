import { Controller, FieldValues } from "react-hook-form";
import { BaseInputField } from "../input/base-input-field";
import { ControlledInputFieldProps } from "@/shared/types/form";

export function InputField<T extends FieldValues>({
  control,
  name,
  label,
  ...props
}: ControlledInputFieldProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <BaseInputField
          {...field}
          {...props}
          label={label}
          error={error?.message}
        />
      )}
    />
  );
} 