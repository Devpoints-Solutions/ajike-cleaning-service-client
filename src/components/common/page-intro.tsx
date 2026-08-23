function PageIntro({
  eyebrow,
  title,
  children,
  action,
  bgImage,
}: {
  eyebrow: string;
  title: React.ReactNode | String;
  children: React.ReactNode;
  action?: React.ReactNode;
  bgImage: string;
}) {
  return (
    <section className="relative min-h-[390px] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${bgImage})`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[#061d31]/95 via-[#0b3554]/85 to-[#063f46]/85" />

      {/* Subtle navy tint */}
      <div className="absolute inset-0 bg-[#0b3554]/20" />

      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.35) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.35) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      <div className="page-intro container">
        <div className="page-intro-copy">
          <div className="eyebrow">{eyebrow}</div>
          <h1>{title}</h1>
          <p>{children}</p>
        </div>
        {action && <div className="page-intro-action">{action}</div>}
      </div>
    </section>
  );
}

export default PageIntro;
