import { useEffect, useState } from "react";
import AuthShell from "./auth-shell";
import { Link } from "wouter";
import { ArrowRight, Check } from "lucide-react";
import { accountVerificationSchema } from "@/helpers/data-validator-schema";
import {
  useVerifyAccountMutation,
  useCreateAccountMutation,
} from "@/features/apis/auth-apis";
import { useForm } from "@/features/hooks/use-form";
import { useToast } from "@/features/hooks/use-toast";
import { Loader } from "@/components/common/loader";
import { formatError } from "@/helpers/format-error";

function Verify() {
  const [verifyAccount, { isError, isLoading, error, isSuccess }] =
    useVerifyAccountMutation();

  const [countdown, setCountdown] = useState(60);
  const [isCounting, setIsCounting] = useState(true);

  const [getNewVerificationCode] = useCreateAccountMutation();

  const { toast } = useToast();

  const {
    data: formData,
    error: formError,
    isValid,
    getFormInput,
  } = useForm(accountVerificationSchema);

  useEffect(() => {
    if (isError && error) {
      toast({
        title: "Create user failed!",
        description: formatError(error),
        variant: "default",
      });
    }
  }, [isError, error]);

  useEffect(() => {
    if (countdown <= 0) return setIsCounting(false);

    if (!isCounting) return;

    const timer = setInterval(() => {
      setCountdown((count) => count - 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [countdown]);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!isValid) {
      return toast({
        title: `Invalid ${formError?.field} value`,
        description: formError?.message,
        variant: "default",
      });
    }

    verifyAccount(formData);
  };

  if (isSuccess)
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
            Thanks for confirming. You can now continue to login into your
            dashboard and request a service.
          </p>
          <Link
            className="primary-button"
            href="/auth/signin"
            data-testid="link-verify-dashboard"
          >
            Continue to login <ArrowRight size={15} />
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
            name="otp"
            maxLength={6}
            onChange={getFormInput}
            placeholder="• • • • • •"
            data-testid="input-verify-code"
          />

          {formError && formError?.message && formError?.field == "otp" && (
            <div
              className="auth-error"
              role="alert"
              data-testid="text-signup-error"
            >
              {formError?.message}
            </div>
          )}
        </div>
        <button
          className="primary-button"
          type="submit"
          data-testid="button-verify-submit"
        >
          {isLoading && <Loader />} Verify email <Check size={15} />
        </button>
      </form>
      <div className="auth-footer">
        {isCounting ? (
          <span data-testid="text-verify-resent">
            Request a new code after {countdown}
          </span>
        ) : (
          <button
            className="text-button"
            onClick={() => {
              getNewVerificationCode(history.state);
              setCountdown(60);
              setIsCounting(true);
            }}
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
