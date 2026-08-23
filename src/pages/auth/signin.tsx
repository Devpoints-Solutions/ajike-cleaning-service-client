import { useEffect, useState } from "react";
import AuthShell from "./auth-shell";
import { Link, useLocation } from "wouter";
import { ArrowRight } from "lucide-react";
import PasswordField from "./password-field";
import { useForm } from "@/features/hooks/use-form";
import { loginSchema } from "@/helpers/data-validator-schema";
import {
  useLoginAccountMutation,
  useLoginWithGoogleMutation,
} from "@/features/apis/auth-apis";
import { useToast } from "@/features/hooks/use-toast";
import { Loader } from "@/components/common/loader";
import { useGoogleLogin } from "@react-oauth/google";
import { formatError } from "@/helpers/format-error";
import { useAuthContext } from "@/features/contexts/auth-context";
import GoogleButton from "./google-button";

function SignIn() {
  const [, setLocation] = useLocation();
  const [show, setShow] = useState(false);

  const [loginAccount, { isLoading, isSuccess, error, isError, data }] =
    useLoginAccountMutation();

  const [
    loginWithGoogle,
    {
      isLoading: googleIsLoading,
      isSuccess: googleSuccess,
      error: googleError,
      isError: googleIsError,
      data: googleData,
    },
  ] = useLoginWithGoogleMutation();

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) =>
      loginWithGoogle({ token: tokenResponse.access_token }),
    flow: "implicit",
  });

  const { updateIsAuthenticatedState } = useAuthContext();

  const {
    getFormInput,
    data: formData,
    error: formError,
    isValid,
  } = useForm(loginSchema);

  const { toast } = useToast();

  useEffect(() => {
    if (isError) {
      toast({
        title: "Login failed!",
        description: formatError(error),
        variant: "default",
      });
    }

    if (isSuccess && data && data?.data?.role === "user") {
      localStorage.setItem("isAuth", JSON.stringify(true));
      updateIsAuthenticatedState(data?.data);
      setLocation("/dashboard");
    }

    if (isSuccess && data && data?.data?.role === "admin") {
      localStorage.setItem("isAuth", JSON.stringify(true));
      updateIsAuthenticatedState(data?.data);
      setLocation("/admin/dashboard");
    }
  }, [isError, error, isSuccess, data]);

  useEffect(() => {
    if (googleIsError && googleError) {
      toast({
        title: "Login with google failed!",
        description: formatError(googleError),
        variant: "default",
      });
    }

    if (googleSuccess && googleData && googleData?.data?.role === "user") {
      localStorage.setItem("isAuth", JSON.stringify(true));
      updateIsAuthenticatedState(googleData?.data);
      setLocation("/dashboard");
    }

    if (googleSuccess && googleData && googleData?.data?.role === "admin") {
      localStorage.setItem("isAuth", JSON.stringify(true));
      updateIsAuthenticatedState(googleData?.data);
      setLocation("/admin/dashboard");
    }
  }, [googleError, googleSuccess, googleData, googleIsError]);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!isValid) {
      return toast({
        title: `Invalid ${formError?.field} value`,
        description: formError?.message,
        variant: "default",
      });
    }

    loginAccount(formData);
  };

  return (
    <AuthShell
      title="Your space, looked after."
      description="Sign in to see upcoming visits, service records, photo proof, and the next small step for your property."
    >
      <div className="auth-card-header">
        <h2>Sign in to Ajike</h2>
        <p>Your service history and care plan are waiting for you.</p>
      </div>
      <div className="mb-5 space-y-4">
        <GoogleButton
          label="Continue with Google"
          testId="button-google-signin"
          isLoading={googleIsLoading}
          onClick={handleGoogleLogin}
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
        <div className="auth-field">
          <label htmlFor="signin-email">Email address</label>
          <input
            id="signin-email"
            type="email"
            name="email"
            value={formData?.email}
            onChange={getFormInput}
            placeholder="you@example.com"
            data-testid="input-signin-email"
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
        <PasswordField
          id="signin-password"
          label="Password"
          value={formData?.password}
          onChange={(event) =>
            getFormInput({
              ...event,
              target: { ...event.target, name: "password" },
            })
          }
          show={show}
          onToggle={() => setShow(!show)}
        />
        {formError && formError.field === "password" && (
          <div
            className="auth-error"
            role="alert"
            data-testid="text-signin-error"
          >
            {formError.message}
          </div>
        )}
        <div className="form-inline">
          <span>Secure access</span>
          <Link href="/auth/forgot-password" data-testid="link-forgot-password">
            Forgot password?
          </Link>
        </div>
        <button
          className="primary-button"
          type="submit"
          data-testid="button-signin-submit"
        >
          {isLoading && <Loader />} Sign in <ArrowRight size={15} />
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
