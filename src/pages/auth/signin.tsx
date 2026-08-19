import { useState } from "react";
import AuthShell from "./auth-shell";
import { Link, useLocation } from "wouter";
import { ArrowRight } from "lucide-react";
import PasswordField from "./password-field";

function SignIn() {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!email || !password) {
      setError("Enter your email and password to continue.");
      return;
    }
    setError("");
    setLocation("/dashboard");
  };
  return (
    <AuthShell
      title="Your space, looked after."
      description="Sign in to see upcoming visits, service records, photo proof, and the next small step for your property."
    >
      <div className="auth-card-header">
        <div className="eyebrow">Welcome back</div>
        <h2>Sign in to Ajike</h2>
        <p>Your service history and care plan are waiting for you.</p>
      </div>
      <form className="auth-form" onSubmit={submit}>
        <div className="auth-field">
          <label htmlFor="signin-email">Email address</label>
          <input
            id="signin-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            data-testid="input-signin-email"
          />
        </div>
        <PasswordField
          id="signin-password"
          label="Password"
          value={password}
          onChange={setPassword}
          show={show}
          onToggle={() => setShow(!show)}
        />
        {error && (
          <div
            className="auth-error"
            role="alert"
            data-testid="text-signin-error"
          >
            {error}
          </div>
        )}
        <div className="form-inline">
          <span>Secure local demo access</span>
          <Link href="/auth/forgot-password" data-testid="link-forgot-password">
            Forgot password?
          </Link>
        </div>
        <button
          className="primary-button"
          type="submit"
          data-testid="button-signin-submit"
        >
          Sign in <ArrowRight size={15} />
        </button>
      </form>
      <div className="auth-footer">
        New to Ajike?{" "}
        <Link href="/auth/sign-up" data-testid="link-signup">
          Create an account
        </Link>
      </div>
    </AuthShell>
  );
}

export default SignIn;
