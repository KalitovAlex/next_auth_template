import { InputFieldProps } from "@/shared/types/form";
import { Controller, Control, FieldValues, Path } from "react-hook-form";
import { BaseInputField } from "../input/base-input-field";

interface ControlledInputFieldProps<T extends FieldValues>
  extends Omit<InputFieldProps, "value" | "onChange" | "onBlur"> {
  control: Control<T>;
  name: Path<T>;
}

export function InputField<T extends FieldValues>({
  control,
  name,
  ...props
}: ControlledInputFieldProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <BaseInputField {...field} {...props} error={error?.message} />
      )}
    />
  );
}
