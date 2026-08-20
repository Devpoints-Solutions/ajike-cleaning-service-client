import { useEffect, useState } from "react";
import AuthShell from "./auth-shell";
import { Link } from "wouter";
import { ArrowRight, Check, KeyRound } from "lucide-react";
import PasswordField from "./password-field";
import {
  useRequestPasswordResetMutation,
  useUpdatePasswordMutation,
} from "@/features/apis/auth-apis";
import { useForm } from "@/features/hooks/use-form";
import { Loader } from "@/components/common/loader";
import { updatePasswordResetSchema } from "@/helpers/data-validator-schema";
import { formatError } from "@/helpers/format-error";
import { useToast } from "@/features/hooks/use-toast";

function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [countdown, setCountdown] = useState<number>(60);
  const [isCounting, setIsCounting] = useState<boolean>(true);

  const { toast } = useToast();

  const [updatePassword, { isSuccess, isError, error, isLoading }] =
    useUpdatePasswordMutation();

  const [requestPasswordReset, { isSuccess: newCodeSuccess }] =
    useRequestPasswordResetMutation();

  const {
    error: formError,
    data: formData,
    getFormInput,
    isValid,
  } = useForm(updatePasswordResetSchema);

  useEffect(() => {
    if (isError) {
      toast({
        title: "Password update failed!",
        description: formatError(error),
        variant: "default",
      });
    }

    if (newCodeSuccess) {
      toast({
        title: "Password code sent",
        description: `New code has been sent to your email`,
        variant: "default",
      });
    }
  }, [isError, error, newCodeSuccess]);

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

  if (isSuccess)
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
            Congratulation. You can now continue to login into your dashboard
            and request a service.
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
          if (!isValid)
            return toast({
              title: `Invalid ${formError?.field} value`,
              description: formError?.message,
              variant: "default",
            });
          updatePassword(formData);
        }}
      >
        <PasswordField
          id="reset-password"
          label="New password"
          value={formData?.password}
          onChange={(event) =>
            getFormInput({
              ...event,
              target: { ...event.target, name: "password" },
            })
          }
          show={showPassword}
          onToggle={() => setShowPassword(!showPassword)}
        />
        {formError && formError?.message && formError?.field == "password" && (
          <div
            className="auth-error"
            role="alert"
            data-testid="text-signup-error"
          >
            {formError?.message}
          </div>
        )}

        <PasswordField
          id="reset-confirm"
          label="Confirm new password"
          value={formData?.confirmPassword}
          onChange={(event) =>
            getFormInput({
              ...event,
              target: { ...event.target, name: "confirmPassword" },
            })
          }
          show={showConfirmPassword}
          onToggle={() => setShowConfirmPassword(!showConfirmPassword)}
        />

        {formError &&
          formError?.message &&
          formError?.field == "confirmPassword" && (
            <div
              className="auth-error"
              role="alert"
              data-testid="text-signup-error"
            >
              {formError?.message}
            </div>
          )}

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
          disabled={!isValid}
          data-testid="button-reset-submit"
        >
          {isLoading && <Loader />} Update password <Check size={15} />
        </button>

        <div className="auth-footer">
          {isCounting ? (
            <span data-testid="text-verify-resent">
              Request a new code after {countdown}
            </span>
          ) : (
            <button
              className="text-button"
              onClick={() => {
                requestPasswordReset(history.state);
                setCountdown(60);
                setIsCounting(true);
              }}
              data-testid="button-resend-code"
            >
              Resend code
            </button>
          )}
        </div>
      </form>
    </AuthShell>
  );
}

export default ResetPassword;
