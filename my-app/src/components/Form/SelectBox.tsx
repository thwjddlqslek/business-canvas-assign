import "../../styles/Form.css";
import { SelectBoxProps } from "./types";

const SelectBox = ({
  label,
  name,
  value,
  options,
  onChange,
  required,
}: SelectBoxProps) => {
  return (
    <div className="form-field">
      <label htmlFor={name} className="field-label">
        {label}
        {required && <span className="required-mark">*</span>}
      </label>
      <div className="select-container">
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className="field-select"
          required={required}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SelectBox;
