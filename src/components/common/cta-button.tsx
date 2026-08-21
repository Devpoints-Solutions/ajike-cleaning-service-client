import { useAuthContext } from "@/features/contexts/auth-context";
import { Link } from "wouter";

function CtaButton({
  text,
  props,
  icon,
}: {
  text: string;
  props: any;
  icon: React.ReactNode;
}) {
  const { isAuthenticated } = useAuthContext();
  return (
    <>
      {isAuthenticated ? (
        <button {...props}>
          {text}
          {icon}
        </button>
      ) : (
        <Link {...props} href="/auth/login">
          {text} {icon}
        </Link>
      )}
    </>
  );
}

export default CtaButton;
