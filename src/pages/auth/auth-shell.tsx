import React, { useEffect } from "react";
import { Link, useLocation } from "wouter";
import { ArrowLeft } from "lucide-react";
import Brand from "@/components/common/brand";
import { useAuthContext } from "@/features/contexts/auth-context";

function AuthShell({
  children,
  title,
  description,
}: {
  children: React.ReactNode;
  title: string;
  description: string;
}) {
  const [, navigate] = useLocation();
  const { isAuthenticated } = useAuthContext();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);
  return (
    <div className="auth-page">
      <div className="auth-brand-mobile">
        <Brand />

        <Link
          href="/"
          className="text-button"
          data-testid="button-back-to-home"
        >
          <ArrowLeft size={18} /> Go back
        </Link>
      </div>
      <aside className="auth-side">
        <Brand />
        <div className="auth-quote">
          <div className="eyebrow">Ajike pest control & cleaning</div>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
        <div className="auth-side-note">
          Licensed service. Clear records. Better mornings.
        </div>
      </aside>

      <main className="auth-main">
        <div className="auth-card">
          <div className="my-4 hidden md:block">
            <Link
              href="/"
              className="text-button "
              data-testid="button-back-to-home"
            >
              <ArrowLeft size={18} /> Go back
            </Link>
          </div>
          {children}
        </div>
      </main>
    </div>
  );
}

export default AuthShell;
