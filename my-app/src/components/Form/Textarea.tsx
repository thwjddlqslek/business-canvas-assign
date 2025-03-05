import "../../styles/Form.css";
import { TextareaProps } from "./types";

const Textarea = ({
  label,
  name,
  value,
  onChange,
  required,
  placeholder,
}: TextareaProps) => {
  return (
    <div className="form-field">
      <label htmlFor={name} className="field-label">
        {label}
        {required && <span className="required-mark">*</span>}
      </label>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="field-textarea"
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
};

export default Textarea;
