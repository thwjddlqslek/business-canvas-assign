import { useState } from "react";
import "../../styles/Form.css";
import { DateProps } from "./types";

const Date = ({ label, name, value, onChange, required }: DateProps) => {
  const [hasValue, setHasValue] = useState(value);

  return (
    <div className="form-field">
      <label htmlFor={name} className="field-label">
        {label}
        {required && <span className="required-mark">*</span>}
      </label>
      <div className="date-input-container">
        <input
          type="date"
          id={name}
          name={name}
          value={value}
          onChange={(e) => {
            onChange(e);
            setHasValue(e.target.value);
          }}
          className={`field-date ${hasValue ? "has-value" : ""}`}
          required={required}
        />
      </div>
    </div>
  );
};

export default Date;
