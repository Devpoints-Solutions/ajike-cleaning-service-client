import { useState } from "react";
import Brand from "@/components/common/brand";
import { Link, useLocation } from "wouter";
import { Menu, ArrowRight, LayoutDashboard, LogOutIcon } from "lucide-react";
import { useAuthContext } from "@/features/contexts/auth-context";

function Header({
  onRequest,
  dashboard = false,
}: {
  onRequest: () => void;
  dashboard?: boolean;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [pathname] = useLocation();

  const { currentUser, isAuthenticated, signout } = useAuthContext();

  const role = currentUser?.role;

  const isAdmin = isAuthenticated && role === "admin";
  const isUser = isAuthenticated && role === "user";

  const dashboardPath = isAdmin
    ? "/admin/dashboard"
    : isUser
      ? "/dashboard"
      : "/auth/sign-in";

  const isCurrentPath = (href: string) => {
    if (!href) {
      return false;
    }

    if (href.startsWith("#")) {
      return (
        typeof window !== "undefined" &&
        window.location.hash === href &&
        (pathname === dashboardPath ||
          pathname === "/dashboard" ||
          pathname === "/admin/dashboard")
      );
    }

    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const closeMenu = () => setMenuOpen(false);

  const publicNavItems = [
    { href: "/", label: "Home", testId: "link-nav-home" },
    { href: "/services", label: "Services", testId: "link-nav-services" },
    { href: "/pricing", label: "Pricing", testId: "link-nav-pricing" },
    { href: "/about", label: "About", testId: "link-nav-about" },
    { href: "/contact", label: "Contact", testId: "link-nav-contact" },
  ];

  const dashboardNavItems = [
    { href: "#overview", label: "Overview", testId: "link-nav-overview" },
    { href: "#activity", label: "Activity", testId: "link-nav-activity" },
    { href: "#account", label: "Account", testId: "link-nav-account" },
  ];

  const navItems =
    isAuthenticated && dashboard ? dashboardNavItems : publicNavItems;

  return (
    <header className="site-header">
      <Brand />

      {/* Desktop Navigation */}
      <nav className="main-nav" aria-label="Main navigation">
        {navItems.map((item) => {
          const isActive = isCurrentPath(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={isActive ? "active" : undefined}
              aria-current={isActive ? "page" : undefined}
              data-testid={item.testId}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Header Actions */}
      <div className="header-actions">
        {isAuthenticated && (
          <div className="hidden sm:flex">
            <Link
              href={dashboardPath}
              className="header-link admin-header-link"
              data-testid="link-header-dashboard"
            >
              <LayoutDashboard size={13} />
              Dashboard
            </Link>

            <button
              type="button"
              className="header-link admin-header-link"
              onClick={signout}
              data-testid="button-header-logout"
            >
              <LogOutIcon size={14} />
            </button>
          </div>
        )}

        {!isAuthenticated && (
          <Link
            className="primary-button button-small"
            href="/auth/sign-in"
            data-testid="button-header-request"
          >
            Request service
            <ArrowRight size={14} />
          </Link>
        )}

        <button
          type="button"
          className="icon-button mobile-toggle"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle navigation"
          data-testid="button-mobile-menu"
        >
          <Menu size={18} />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mobile-menu-panel" data-testid="menu-mobile">
          {/* Public Navigation */}
          {publicNavItems.map((item) => {
            const isActive = isCurrentPath(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={isActive ? "active" : undefined}
                aria-current={isActive ? "page" : undefined}
                onClick={closeMenu}
                data-testid={`link-mobile-${item.label.toLowerCase()}`}
              >
                {item.label}
              </Link>
            );
          })}

          {/* Authenticated User Actions */}
          {isAuthenticated && (
            <>
              <Link
                href={dashboardPath}
                onClick={closeMenu}
                data-testid="link-mobile-dashboard"
              >
                Dashboard
              </Link>

              <button
                type="button"
                onClick={() => {
                  closeMenu();
                  onRequest();
                }}
                data-testid="button-mobile-request"
              >
                Request a service
                <ArrowRight size={14} />
              </button>

              <button
                type="button"
                className="header-link admin-header-link"
                onClick={() => {
                  closeMenu();
                  signout();
                }}
                data-testid="button-mobile-logout"
              >
                Sign out
                <LogOutIcon size={14} />
              </button>
            </>
          )}

          {/* Unauthenticated Actions */}
          {!isAuthenticated && (
            <Link
              className="secondary-button button-small"
              href="/auth/sign-in"
              onClick={closeMenu}
              data-testid="button-mobile-request"
            >
              Request service
              <ArrowRight size={14} />
            </Link>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;
