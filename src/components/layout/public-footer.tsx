import Brand from "../common/brand";
import { Link } from "wouter";

function PublicFooter() {
  return (
    <footer className="container page-container site-footer extended-footer">
      <div>
        <Brand />
        <p className="footer-note">
          Dependable pest control and cleaning for homes, businesses, and the
          people inside them.
        </p>
        <span className="footer-coordinates">
          FIELD OFFICE · LOCAL METRO · 07:00—19:00
        </span>
      </div>
      <div className="footer-column">
        <span className="footer-label">Explore</span>
        <Link href="/about" data-testid="link-footer-about">
          About Ajike
        </Link>
        <Link href="/services" data-testid="link-footer-services">
          Services
        </Link>
        <Link href="/pricing" data-testid="link-footer-pricing">
          Pricing
        </Link>
      </div>
      <div className="footer-column">
        <span className="footer-label">Your records</span>
        <Link href="/dashboard" data-testid="link-footer-dashboard">
          Customer dashboard
        </Link>
        <Link href="/admin/dashboard" data-testid="link-footer-admin">
          Admin dashboard
        </Link>
        <Link href="/auth/sign-in" data-testid="link-footer-sign-in">
          Sign in
        </Link>
      </div>
    </footer>
  );
}

export default PublicFooter;
