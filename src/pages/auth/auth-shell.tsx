import React from "react";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import Brand from "@/components/common/brand";

function AuthShell({
  children,
  title,
  description,
}: {
  children: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="auth-page">
      <aside className="auth-side">
        <Brand />
        <div className="auth-quote">
          <div className="eyebrow">Ajike pest control & Cleaning!</div>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
        <div className="auth-side-note">
          Licensed service. Clear records. Better mornings.
        </div>
      </aside>

      <main className="auth-main">
        <div className="auth-card">
          <div className="admin-chat-back my-4">
            <Link
              href="/"
              className="text-button"
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
