import { Eye, EyeOff } from "lucide-react";
import type { ChangeEvent } from "react";

function PasswordField({
  id,
  label,
  value,
  onChange,
  show,
  onToggle,
  placeholder = "Enter your password",
}: {
  id: string;
  label: string;
  value?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  show: boolean;
  onToggle: () => void;
  placeholder?: string;
}) {
  return (
    <div className="auth-field">
      <label htmlFor={id}>{label}</label>
      <div className="input-wrap">
        <input
          id={id}
          type={show ? "text" : "password"}
          value={value}
          onChange={(event) => onChange(event)}
          placeholder={placeholder}
          data-testid={`input-${id}`}
        />
        <button
          className="icon-button password-toggle"
          type="button"
          onClick={onToggle}
          aria-label={show ? "Hide password" : "Show password"}
          data-testid={`button-toggle-${id}`}
        >
          {show ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
    </div>
  );
}

export default PasswordField;
