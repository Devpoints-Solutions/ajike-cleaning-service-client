import { useEffect } from "react";
import AuthShell from "./auth-shell";
import { Link } from "wouter";
import { ArrowRight, Mail } from "lucide-react";
import { useRequestPasswordResetMutation } from "@/features/apis/auth-apis";
import { useForm } from "@/features/hooks/use-form";
import { Loader } from "@/components/common/loader";
import { passwordResetSchema } from "@/helpers/data-validator-schema";
import { formatError } from "@/helpers/format-error";
import { useToast } from "@/features/hooks/use-toast";

function ForgotPassword() {
  const {
    getFormInput,
    error: formError,
    data: formData,
    isValid,
  } = useForm(passwordResetSchema);

  const { toast } = useToast();

  const [requestPasswordReset, { isLoading, data, isSuccess, error, isError }] =
    useRequestPasswordResetMutation();

  useEffect(() => {
    if (isError && error) {
      toast({
        title: "Passord reset request failed!",
        description: formatError(error),
        variant: "default",
      });
    }
  }, [isError, error]);

  if (isSuccess && data)
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
            If an Ajike account uses {data?.data?.email || "that email"}, a
            reset link will be waiting in its inbox shortly.
          </p>
          <Link
            className="primary-button"
            href="/auth/reset-password"
            data-testid="link-forgot-reset"
            state={{ email: data?.data?.email }}
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
          if (!isValid && formError)
            return toast({
              title: `Invalid ${formError?.field} value`,
              description: formError?.message,
              variant: "default",
            });

          requestPasswordReset(formData);
        }}
      >
        <div className="auth-field">
          <label htmlFor="forgot-email">Email address</label>
          <input
            id="forgot-email"
            type="email"
            name="email"
            value={formData?.email}
            onChange={getFormInput}
            placeholder="you@example.com"
            data-testid="input-forgot-email"
          />

          {formError && formError.field === "email" && (
            <div
              className="auth-error"
              role="alert"
              data-testid="text-signin-error"
            >
              {formError.message}
            </div>
          )}
        </div>
        <button
          className="primary-button"
          type="submit"
          data-testid="button-forgot-submit"
        >
          {isLoading && <Loader />} Reset Password <ArrowRight size={15} />
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
