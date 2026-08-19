import { useState } from "react";
import AuthShell from "./auth-shell";
import { Link } from "wouter";
import { ArrowRight, Mail } from "lucide-react";
import PasswordField from "./password-field";

function SignUp() {
  const [success, setSuccess] = useState(false);
  const [show, setShow] = useState(false);
  const [password, setPassword] = useState("");
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState("");
  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!consent) {
      setError("Please agree to service updates to continue.");
      return;
    }
    setError("");
    setSuccess(true);
  };
  if (success)
    return (
      <AuthShell
        title="A better record starts here."
        description="Your Ajike account keeps the details together, from first request to finished proof."
      >
        <div className="auth-success">
          <div className="success-icon">
            <Mail size={24} />
          </div>
          <h3>Check your inbox.</h3>
          <p>
            We created your local demo account. Verify your email to finish
            setting up your Ajike care space.
          </p>
          <Link
            className="primary-button"
            href="/auth/verify"
            data-testid="link-signup-verify"
          >
            Continue to verification <ArrowRight size={15} />
          </Link>
        </div>
      </AuthShell>
    );
  return (
    <AuthShell
      title="Make care easier to keep up with."
      description="Create a customer space for service requests, recurring plans, and the proof you want to keep."
    >
      <div className="auth-card-header">
        <div className="eyebrow">A clear record of care</div>
        <h2>Create your account</h2>
        <p>
          It takes less than a minute. You can request service without a payment
          method.
        </p>
      </div>
      <form className="auth-form" onSubmit={submit}>
        <div className="auth-field">
          <label htmlFor="signup-name">Full name</label>
          <input
            id="signup-name"
            required
            placeholder="Amina Johnson"
            data-testid="input-signup-name"
          />
        </div>
        <div className="auth-field">
          <label htmlFor="signup-email">Email address</label>
          <input
            id="signup-email"
            required
            type="email"
            placeholder="you@example.com"
            data-testid="input-signup-email"
          />
        </div>
        <div className="auth-field">
          <label htmlFor="signup-phone">Phone number</label>
          <input
            id="signup-phone"
            required
            type="tel"
            placeholder="(555) 014-0288"
            data-testid="input-signup-phone"
          />
        </div>
        <PasswordField
          id="signup-password"
          label="Create a password"
          value={password}
          onChange={setPassword}
          show={show}
          onToggle={() => setShow(!show)}
          placeholder="At least 8 characters"
        />
        <label className="check-row">
          <input
            type="checkbox"
            checked={consent}
            onChange={(event) => setConsent(event.target.checked)}
            data-testid="checkbox-signup-consent"
          />
          <span>
            I agree to receive service updates and understand Ajike will use
            these details to coordinate my care.
          </span>
        </label>
        {error && (
          <div
            className="auth-error"
            role="alert"
            data-testid="text-signup-error"
          >
            {error}
          </div>
        )}
        <button
          className="primary-button"
          type="submit"
          data-testid="button-signup-submit"
        >
          Create account <ArrowRight size={15} />
        </button>
      </form>
      <div className="auth-footer">
        Already have an account?{" "}
        <Link href="/auth/sign-in" data-testid="link-signin-from-signup">
          Sign in
        </Link>
      </div>
    </AuthShell>
  );
}

export default SignUp;
