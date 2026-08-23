import { useEffect, useState } from "react";
import AuthShell from "./auth-shell";
import { Link } from "wouter";
import { ArrowRight, Mail } from "lucide-react";
import { useToast } from "@/features/hooks/use-toast";
import PasswordField from "./password-field";
import { signupSchema } from "@/helpers/data-validator-schema";
import { useForm } from "@/features/hooks/use-form";
import { useCreateAccountMutation } from "@/features/apis/auth-apis";
import { Loader } from "@/components/common/loader";
import { formatError } from "@/helpers/format-error";
import GoogleButton from "./google-button";

const formInput = [
  { name: "firstName", placeholder: "John", label: "First name" },
  { name: "lastName", label: "Last name", placeholder: "Doe" },
  { name: "email", label: "email", placeholder: "johndoe@example.com" },
  { name: "phoneNumber", label: "Phone number", placeholder: "(555) 014-0288" },
  {
    name: "password",
    label: "Create a password",
    placeholder: "At least 8 characters",
  },
];

function SignUp() {
  const [show, setShow] = useState(false);
  const [consent, setConsent] = useState(false);

  const { data, getFormInput, error, isValid } = useForm(signupSchema);

  const [
    createAccount,
    { isLoading, isSuccess, data: requestData, isError, error: requestError },
  ] = useCreateAccountMutation();

  const { toast } = useToast();

  const submit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!isValid) {
      return toast({
        title: `Invalid ${error?.field} value`,
        description: error?.message,
        variant: "default",
      });
    }
    if (!consent) {
      return toast({
        title: "Accept Terms",
        description: "Agree to terms and privacy policy",
        variant: "default",
      });
    }

    createAccount({ ...data, confirmPassword: data.password, consent });
  };

  useEffect(() => {
    if (isError || requestError) {
      toast({
        title: "Account creation failed!",
        description: formatError(requestError),
        variant: "default",
      });
    }
  }, [isError, requestError]);

  if (isSuccess && requestData)
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
            Your account has been created. Verify your email to finish setting
            up your Ajike care space.
          </p>
          <Link
            className="primary-button"
            href="/auth/verify"
            data-testid="link-signup-verify"
            state={{ ...data, confirmPassword: data.password, consent }}
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
      <div className="mb-5 space-y-4">
        <GoogleButton
          label="Continue with Google"
          testId="button-google-signup"
        />
        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-slate-200" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-400">
            or
          </span>
          <div className="h-px flex-1 bg-slate-200" />
        </div>
      </div>
      <form className="auth-form" onSubmit={submit}>
        {formInput?.map((input, index) => {
          return input?.name !== "password" ? (
            <div className="auth-field" key={index}>
              <label htmlFor="signup-name">{input.label}</label>
              <input
                name={input.name}
                placeholder={input.placeholder}
                onChange={getFormInput}
              />

              {error && error?.message && error?.field == input.name && (
                <div
                  key={index + 1}
                  className="auth-error"
                  role="alert"
                  data-testid="text-signup-error"
                >
                  {error?.message}
                </div>
              )}
            </div>
          ) : (
            <>
              <PasswordField
                key={index * 5}
                id="signup-password"
                label={input.label}
                onChange={(event) =>
                  getFormInput({
                    ...event,
                    target: { ...event.target, name: input.name },
                  })
                }
                show={show}
                onToggle={() => setShow(!show)}
                placeholder={input.placeholder}
              />
              {error && error?.message && error?.field == input.name && (
                <div
                  key={index * 2}
                  className="auth-error"
                  role="alert"
                  data-testid="text-signup-error"
                >
                  {error?.message}
                </div>
              )}
            </>
          );
        })}

        <label className="check-row">
          <input
            type="checkbox"
            checked={consent}
            onChange={(event) => setConsent(event.target.checked)}
            data-testid="checkbox-signup-consent"
          />
          <span>
            I have read agree to the{" "}
            <Link className="text-button" href="/terms">
              Terms
            </Link>{" "}
            and{" "}
            <Link className="text-button" href="/privacy-policy">
              Privacy Policy
            </Link>
          </span>
        </label>

        <button
          className="primary-button"
          type="submit"
          data-testid="button-signup-submit"
        >
          {isLoading && <Loader />} Create account <ArrowRight size={15} />
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
