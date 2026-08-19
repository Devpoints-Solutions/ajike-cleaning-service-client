import { useState } from "react";
import AuthShell from "./auth-shell";
import { Link } from "wouter";
import { ArrowRight, Mail } from "lucide-react";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  if (sent)
    return (
      <AuthShell
        title="A fresh start is close."
        description="We keep recovery simple, so you can get back to taking care of what matters."
      >
        <div className="auth-success">
          <div className="success-icon">
            <Mail size={24} />
          </div>
          <h3>Reset link requested.</h3>
          <p>
            If an Ajike account uses {email || "that email"}, a reset link will
            be waiting in its inbox shortly.
          </p>
          <Link
            className="primary-button"
            href="/auth/reset-password"
            data-testid="link-forgot-reset"
          >
            Set a new password <ArrowRight size={15} />
          </Link>
        </div>
      </AuthShell>
    );
  return (
    <AuthShell
      title="Let us get you back in."
      description="No judgment, no long process. Tell us the email on your Ajike account and we will point you to the next step."
    >
      <div className="auth-card-header">
        <div className="eyebrow">Account recovery</div>
        <h2>Forgot your password?</h2>
        <p>We will send a local demo reset link to your email address.</p>
      </div>
      <form
        className="auth-form"
        onSubmit={(event) => {
          event.preventDefault();
          setSent(true);
        }}
      >
        <div className="auth-field">
          <label htmlFor="forgot-email">Email address</label>
          <input
            id="forgot-email"
            required
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            data-testid="input-forgot-email"
          />
        </div>
        <button
          className="primary-button"
          type="submit"
          data-testid="button-forgot-submit"
        >
          Send reset link <ArrowRight size={15} />
        </button>
      </form>
      <div className="auth-footer">
        <Link href="/auth/sign-in" data-testid="link-forgot-signin">
          Back to sign in
        </Link>
      </div>
    </AuthShell>
  );
}

export default ForgotPassword;
