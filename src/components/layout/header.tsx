import { useState } from "react";
import Brand from "@/components/common/brand";
import { Link } from "wouter";
import { Menu, ArrowRight, LayoutDashboard } from "lucide-react";

function Header({
  onRequest,
  dashboard = false,
}: {
  onRequest: () => void;
  dashboard?: boolean;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="site-header">
      <Brand />
      <nav className="main-nav" aria-label="Main navigation">
        {dashboard ? (
          <>
            <a href="#overview" data-testid="link-nav-overview">
              Overview
            </a>
            <a href="#activity" data-testid="link-nav-activity">
              Activity
            </a>
            <a href="#account" data-testid="link-nav-account">
              Account
            </a>
          </>
        ) : (
          <>
            <Link href="/services" data-testid="link-nav-services">
              Services
            </Link>
            <Link href="/pricing" data-testid="link-nav-pricing">
              Pricing
            </Link>
            <Link href="/about" data-testid="link-nav-about">
              About
            </Link>
          </>
        )}
      </nav>
      <div className="header-actions">
        <Link
          href="/dashboard"
          className="header-link"
          data-testid="link-header-dashboard"
        >
          {dashboard ? "Account" : "Sign in"}
        </Link>
        <Link
          href="/admin/dashboard"
          className="header-link admin-header-link"
          data-testid="link-header-admin"
        >
          <LayoutDashboard size={13} /> Admin
        </Link>
        <button
          className="secondary-button button-small"
          onClick={onRequest}
          data-testid="button-header-request"
        >
          Request service <ArrowRight size={14} />
        </button>
        <button
          className="icon-button mobile-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
          data-testid="button-mobile-menu"
        >
          <Menu size={18} />
        </button>
      </div>
      {menuOpen && (
        <div className="mobile-menu-panel" data-testid="menu-mobile">
          <Link
            href="/services"
            onClick={() => setMenuOpen(false)}
            data-testid="link-mobile-services"
          >
            Services
          </Link>
          <Link
            href="/pricing"
            onClick={() => setMenuOpen(false)}
            data-testid="link-mobile-pricing"
          >
            Pricing
          </Link>
          <Link
            href="/about"
            onClick={() => setMenuOpen(false)}
            data-testid="link-mobile-about"
          >
            About Ajike
          </Link>
          <Link
            href="/dashboard"
            onClick={() => setMenuOpen(false)}
            data-testid="link-mobile-dashboard"
          >
            Customer dashboard
          </Link>
          <Link
            href="/admin/dashboard"
            onClick={() => setMenuOpen(false)}
            data-testid="link-mobile-admin"
          >
            Admin dashboard
          </Link>
          <button
            onClick={() => {
              setMenuOpen(false);
              onRequest();
            }}
            data-testid="button-mobile-request"
          >
            Request a service <ArrowRight size={14} />
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
