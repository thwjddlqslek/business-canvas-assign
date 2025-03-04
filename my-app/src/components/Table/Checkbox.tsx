import React from "react";
import { CheckboxProps } from "../Table/types";
import "../../styles/Table.css";

const Checkbox: React.FC<CheckboxProps> = ({
  id,
  checked,
  onChange,
  label,
}) => {
  return (
    <div>
      <input
        type="checkbox"
        id={id}
        className="checkbox"
        checked={checked}
        onChange={(e) => onChange && onChange(e.target.checked)}
      />
      <label htmlFor={id} className="checkbox-label">
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
