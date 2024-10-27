import { ReactNode } from 'react';

export interface InputFieldProps {
  label: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
  error?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  name?: string;
  disabled?: boolean;
  className?: string;
  children?: ReactNode;
}
