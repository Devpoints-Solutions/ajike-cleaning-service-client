import { useState } from "react";
import AuthShell from "./auth-shell";
import { Link } from "wouter";
import { ArrowRight, Check, KeyRound } from "lucide-react";
import PasswordField from "./password-field";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);
  const [success, setSuccess] = useState(false);
  const strength =
    password.length > 11
      ? "Strong"
      : password.length > 7
        ? "Good"
        : password.length > 3
          ? "Getting there"
          : "Start typing";
  if (success)
    return (
      <AuthShell
        title="New key, same calm."
        description="Your account is ready for your next service request, with every detail in its place."
      >
        <div className="auth-success">
          <div className="success-icon">
            <KeyRound size={23} />
          </div>
          <h3>Password updated.</h3>
          <p>
            Your new password is active in this local demo. You can sign in
            whenever you are ready.
          </p>
          <Link
            className="primary-button"
            href="/auth/sign-in"
            data-testid="link-reset-signin"
          >
            Return to sign in <ArrowRight size={15} />
          </Link>
        </div>
      </AuthShell>
    );
  return (
    <AuthShell
      title="Choose something memorable."
      description="A strong password keeps your service history, property notes, and care records protected."
    >
      <div className="auth-card-header">
        <div className="eyebrow">Password reset</div>
        <h2>Set a new password</h2>
        <p>
          Use at least eight characters. A phrase you remember is usually best.
        </p>
      </div>
      <form
        className="auth-form"
        onSubmit={(event) => {
          event.preventDefault();
          if (password.length >= 8 && password === confirm) setSuccess(true);
        }}
      >
        <PasswordField
          id="reset-password"
          label="New password"
          value={password}
          onChange={setPassword}
          show={show}
          onToggle={() => setShow(!show)}
        />
        <div className="password-meter">
          <span>{strength}</span>
          <div className="plan-progress">
            <span style={{ width: `${Math.min(100, password.length * 8)}%` }} />
          </div>
        </div>
        <PasswordField
          id="reset-confirm"
          label="Confirm new password"
          value={confirm}
          onChange={setConfirm}
          show={show}
          onToggle={() => setShow(!show)}
        />
        {confirm && password !== confirm && (
          <div className="auth-error" data-testid="text-reset-mismatch">
            Passwords do not match yet.
          </div>
        )}
        <button
          className="primary-button"
          type="submit"
          disabled={password.length < 8 || password !== confirm}
          data-testid="button-reset-submit"
        >
          Update password <Check size={15} />
        </button>
      </form>
      <div className="auth-footer">
        <Link href="/auth/sign-in" data-testid="link-reset-cancel">
          Cancel and return
        </Link>
      </div>
    </AuthShell>
  );
}

export default ResetPassword;
