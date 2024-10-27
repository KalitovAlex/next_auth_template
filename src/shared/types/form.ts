
export interface InputFieldProps {
  name: string;
  label: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
  maxSymbols?: number;
  minSymbols?: number;
  initialValue?: string;
  error?: string;
}
