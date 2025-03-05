import React from "react";
import { CheckboxProps } from "../Table/types";
import "../../styles/Table.css";

const Checkbox: React.FC<CheckboxProps> = ({
  id,
  name,
  checked,
  onChange,
  label,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.checked);
    }
  };
  return (
    <div className={label ? "form-field checkbox-wrapper" : "checkbox-wrapper"}>
      {label && (
        <label htmlFor={id} className="field-label">
          {label}
        </label>
      )}
      <div className="checkbox-container">
        <input
          type="checkbox"
          id={id}
          name={name}
          className="checkbox"
          checked={checked}
          onChange={handleChange}
        />
        <label htmlFor={id} className="checkbox-label"></label>
      </div>
    </div>
  );
};

export default Checkbox;
