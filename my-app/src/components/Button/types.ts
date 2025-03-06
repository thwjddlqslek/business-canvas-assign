import { ReactNode } from "react";

export type ButtonVariant = "save" | "cancel" | "add";
export interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  className?: string;
}
