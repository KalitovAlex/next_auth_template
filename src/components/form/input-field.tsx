import { Input } from "antd";
import { InputTypes } from "@/shared/enums/input";
import { InputFieldProps } from "@/shared/types/form";
import { Controller, Control, FieldValues, Path } from "react-hook-form";

interface ControlledInputFieldProps<T extends FieldValues>
  extends Omit<InputFieldProps, "value" | "onChange" | "onBlur"> {
  control: Control<T>;
  name: Path<T>;
}

const BaseInputField = ({
  label,
  required = false,
  type = "text",
  error,
  value,
  onChange,
  ...props
}: InputFieldProps) => (
  <div className="space-y-1">
    <label className="block text-sm font-bold">
      <span className="text-black dark:text-white">{label}</span>
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>

    {type === InputTypes.PASSWORD ? (
      <Input.Password
        value={value}
        onChange={onChange}
        status={error ? "error" : undefined}
        {...props}
      />
    ) : (
      <Input
        type={type}
        value={value}
        onChange={onChange}
        status={error ? "error" : undefined}
        {...props}
      />
    )}

    {error && <p className="text-red-500 text-sm">{error}</p>}
  </div>
);

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
