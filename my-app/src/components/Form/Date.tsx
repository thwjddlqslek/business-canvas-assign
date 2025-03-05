import "../../styles/Form.css";
import { DateProps } from "./types";

const Date = ({ label, name, value, onChange, required }: DateProps) => {
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
          onChange={onChange}
          className="field-date"
          required={required}
        />
      </div>
    </div>
  );
};

export default Date;
