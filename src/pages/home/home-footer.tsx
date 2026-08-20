import Brand from "@/components/common/brand";
import { Link } from "wouter";

function HomeFooter() {
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
        <Link href="/dashboard" data-testid="link-footer-dashboard">
          Customer dashboard
        </Link>
        <Link href="/auth/sign-in" data-testid="link-footer-sign-in">
          Sign in
        </Link>
      </div>
    </footer>
  );
}

export default HomeFooter;
