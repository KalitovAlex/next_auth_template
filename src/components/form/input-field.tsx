import { InputFieldProps } from "@/shared/types/form";
import { Form, Input, InputNumber } from "antd";
import PhoneInput from "antd-phone-input";

export const InputField: React.FC<InputFieldProps> = ({
  name,
  label,
  required = false,
  type = "text",
  placeholder,
  maxSymbols,
  minSymbols,
  initialValue,
  error,
}) => (
  <Form.Item
    name={name}
    label={
      <span className="font-bold text-sm">
        <p className="text-black dark:text-white">{label}</p>
        {required ? <span className="text-red-500 ml-1">*</span> : null}
      </span>
    }
    rules={[{ required, message: `${label} обязателен` }]}
    validateStatus={error ? "error" : undefined}
    help={error}
  >
    {type === "password" ? (
      <Input.Password
        placeholder={placeholder}
        maxLength={maxSymbols}
        defaultValue={initialValue}
        minLength={minSymbols}
      />
    ) : type === "phone" ? (
      <PhoneInput
        placeholder={placeholder}
        enableSearch
        className="w-full"
        maxLength={maxSymbols}
        minLength={minSymbols}
        defaultValue={initialValue}
      />
    ) : type === "number" ? (
      <InputNumber
        placeholder={placeholder}
        className="w-full"
        maxLength={maxSymbols}
        minLength={minSymbols}
        defaultValue={initialValue}
      />
    ) : (
      <Input
        type={type}
        placeholder={placeholder}
        maxLength={maxSymbols}
        minLength={minSymbols}
        defaultValue={initialValue}
      />
    )}
  </Form.Item>
);
