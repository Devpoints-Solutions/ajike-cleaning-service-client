import { Loader } from "@/components/common/loader";

type GoogleButtonProps = {
  label?: string;
  className?: string;
  testId?: string;
  isLoading: boolean;
  onClick: () => void;
};

function GoogleButton({
  label = "Continue with Google",
  className = "",
  testId = "button-google-auth",
  onClick,
  isLoading,
}: GoogleButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-testid={testId}
      className={`flex w-full items-center justify-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-sky-200 hover:bg-sky-50/60 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-sky-200 ${className}`}
    >
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 shrink-0">
        <path
          fill="#4285F4"
          d="M21.6 12.23c0-.72-.06-1.41-.18-2.07H12v3.92h5.39a4.62 4.62 0 0 1-2 3.03v2.52h3.23c1.89-1.74 2.98-4.31 2.98-7.4Z"
        />
        <path
          fill="#34A853"
          d="M12 22c2.7 0 4.97-.9 6.63-2.43l-3.23-2.52c-.9.6-2.04.96-3.4.96-2.61 0-4.82-1.76-5.61-4.13H.9v2.63A10 10 0 0 0 12 22Z"
        />
        <path
          fill="#FBBC05"
          d="M6.39 19.89A6 6 0 0 1 6 17.3V14.7H2.9A10 10 0 0 0 2 12c0-1.63.39-3.18 1.08-4.54L6.4 10.1A6 6 0 0 1 6.39 19.89Z"
        />
        <path
          fill="#EA4335"
          d="M12 3.98c1.47 0 2.79.51 3.83 1.51l2.87-2.87A9.97 9.97 0 0 0 12 2a10 10 0 0 0-9.1 5.46l3.5 2.7A6 6 0 0 1 12 3.98Z"
        />
      </svg>
      <span>{label}</span> {isLoading && <Loader />}
    </button>
  );
}

export default GoogleButton;
