import { ArrowUpRight, BadgeCheck, CalendarClock, MessageSquareText } from "lucide-react";

const steps = [
  {
    number: "01",
    badge: "Ask",
    title: "Share what you see",
    description:
      "Tell us about the space, the symptoms, and your timing. A request takes about two minutes.",
    icon: MessageSquareText,
  },
  {
    number: "02",
    badge: "Plan",
    title: "Meet your service pro",
    description:
      "We confirm the scope, explain the recommendation, and give you transparent pricing before work starts.",
    icon: CalendarClock,
  },
  {
    number: "03",
    badge: "Prove",
    title: "Get your place back",
    description:
      "We do the work carefully, share the result, and make the next step clear if follow-up is useful.",
    icon: BadgeCheck,
  },
];

function Process() {
  return (
    <div className="process-shell">
      <section className="container process-panel" id="process">
        <div className="section-heading process-heading">
          <div>
            <div className="eyebrow">No mystery in the middle</div>
            <h2>From “something is off” to handled.</h2>
          </div>
          <p>
            A simple service flow that keeps you informed without asking you to
            chase us.
          </p>
        </div>

        <div className="process-grid">
          {steps.map(({ number, badge, title, description, icon: Icon }) => (
            <article className="process-card" key={badge}>
              <div className="process-card-top">
                <span className="process-step-pill">{badge}</span>
                <div className="process-icon" aria-hidden="true">
                  <Icon size={19} />
                </div>
              </div>

              <div className="process-card-body">
                <span className="process-index">{number}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>

              <div className="process-card-footer">
                <span>Begin</span>
                <div className="process-arrow" aria-hidden="true">
                  <ArrowUpRight size={16} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Process;
