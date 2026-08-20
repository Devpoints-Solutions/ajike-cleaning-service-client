function PageIntro({
  eyebrow,
  title,
  children,
  action,
}: {
  eyebrow: string;
  title: React.ReactNode | String;
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <section className="page-intro">
      <div className="page-intro-copy">
        <div className="eyebrow">{eyebrow}</div>
        <h1>{title}</h1>
        <p>{children}</p>
      </div>
      {action && <div className="page-intro-action">{action}</div>}
    </section>
  );
}

export default PageIntro;
