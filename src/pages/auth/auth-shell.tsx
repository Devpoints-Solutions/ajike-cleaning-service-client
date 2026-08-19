import React from "react";
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
          <div className="eyebrow">Ajike customer care</div>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
        <div className="auth-side-note">
          Licensed service. Clear records. Better mornings.
        </div>
      </aside>
      <main className="auth-main">
        <div className="auth-card">{children}</div>
      </main>
    </div>
  );
}

export default AuthShell;
