import { InputFieldProps } from "@/shared/types/form";
import { InputTypes } from "@/shared/enums/input";
import { Input } from "antd";

export const BaseInputField = ({
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
