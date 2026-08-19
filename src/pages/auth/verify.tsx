import { useState } from "react";
import AuthShell from "./auth-shell";
import { Link } from "wouter";
import { ArrowRight, Check } from "lucide-react";

function Verify() {
  const [code, setCode] = useState("");
  const [verified, setVerified] = useState(false);
  const [resent, setResent] = useState(false);
  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (code.length >= 4) setVerified(true);
  };
  if (verified)
    return (
      <AuthShell
        title="You are all set."
        description="Your account is ready for the practical, transparent care Ajike is known for."
      >
        <div className="auth-success">
          <div className="success-icon">
            <Check size={25} />
          </div>
          <h3>Email verified.</h3>
          <p>
            Thanks for confirming. You can now see your customer dashboard and
            request a service.
          </p>
          <Link
            className="primary-button"
            href="/dashboard"
            data-testid="link-verify-dashboard"
          >
            Go to dashboard <ArrowRight size={15} />
          </Link>
        </div>
      </AuthShell>
    );
  return (
    <AuthShell
      title="One small check, then you are in."
      description="We use verification to keep your service records and property details in the right hands."
    >
      <div className="auth-card-header">
        <div className="eyebrow">Almost there</div>
        <h2>Verify your email</h2>
        <p>
          Enter the four-digit code we sent to your inbox. For this local demo,
          any four characters will verify.
        </p>
      </div>
      <form className="verification-box" onSubmit={submit}>
        <div className="auth-field">
          <label htmlFor="verify-code">Verification code</label>
          <input
            id="verify-code"
            className="code-input"
            maxLength={6}
            value={code}
            onChange={(event) => setCode(event.target.value)}
            placeholder="• • • •"
            data-testid="input-verify-code"
          />
        </div>
        <button
          className="primary-button"
          type="submit"
          data-testid="button-verify-submit"
        >
          Verify email <Check size={15} />
        </button>
      </form>
      <div className="auth-footer">
        {resent ? (
          <span data-testid="text-verify-resent">
            A fresh code is on its way.
          </span>
        ) : (
          <button
            className="text-button"
            onClick={() => setResent(true)}
            data-testid="button-resend-code"
          >
            Resend code
          </button>
        )}
      </div>
    </AuthShell>
  );
}

export default Verify;
