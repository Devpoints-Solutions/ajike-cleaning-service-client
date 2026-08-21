import Brand from "@/components/common/brand";
import { useAuthContext } from "@/features/contexts/auth-context";
import { Link } from "wouter";

function HomeFooter() {
  const { isAuthenticated, currentUser } = useAuthContext();
  return (
    <footer className="site-footer">
      <div>
        <Brand />
        <p className="footer-note">
          Dependable pest control and cleaning for homes, businesses, and the
          people inside them.
        </p>
      </div>
      <div className="footer-links">
        <a href="#services" data-testid="link-footer-services">
          Services
        </a>
        <a href="#process" data-testid="link-footer-process">
          How it works
        </a>

        <Link href="/contact" data-testid="link-footer-process">
          Contact
        </Link>
        {isAuthenticated ? (
          <>
            {currentUser && currentUser?.role === "user" ? (
              <Link href="/dashboard" data-testid="link-footer-dashboard">
                dashboard
              </Link>
            ) : (
              <Link href="/admin/dashboard" data-testid="link-footer-dashboard">
                dashboard
              </Link>
            )}
          </>
        ) : (
          <Link href="/auth/sign-in" data-testid="link-footer-sign-in">
            Sign in
          </Link>
        )}
      </div>
    </footer>
  );
}

export default HomeFooter;
