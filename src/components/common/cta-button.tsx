import { useAuthContext } from "@/features/contexts/auth-context";
import { Link } from "wouter";
import { useServiceContext } from "@/features/contexts/service-context";

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
  const { toggleModal } = useServiceContext();
  return (
    <>
      {isAuthenticated ? (
        <button {...props} onClick={toggleModal}>
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
