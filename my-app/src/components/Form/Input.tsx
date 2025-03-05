import "../../styles/Form.css";
import { InputProps } from "./types";

const Input = ({
  label,
  name,
  value,
  onChange,
  required,
  placeholder,
}: InputProps) => {
  return (
    <div className="form-field">
      <label htmlFor={name} className="field-label">
        {label}
        {required && <span className="required-mark">*</span>}
      </label>
      <input
        type="text"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="field-input"
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
};

export default Input;
