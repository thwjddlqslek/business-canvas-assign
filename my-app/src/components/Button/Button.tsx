import React from "react";
import "../../styles/Button.css";
import { ButtonProps } from "./types";

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant,
  disabled = false,
  className = "",
}) => {
  return (
    <button
      className={`button button-${variant} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
