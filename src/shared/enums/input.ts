import { InputFieldProps } from "../types/form";
import { Control, FieldValues, Path } from "react-hook-form";

export enum InputTypes {
  TEXT = "text",
  PASSWORD = "password",
  EMAIL = "email",
  PHONE = "phone",
  NUMBER = "number",
}

export interface ControlledInputFieldProps<T extends FieldValues>
  extends Omit<InputFieldProps, "value" | "onChange" | "onBlur"> {
  control: Control<T>;
  name: Path<T>;
}
