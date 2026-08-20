import { useState } from "react";

import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  CalendarCheck,
  ChevronDown,
  CircleDollarSign,
  House,
  PackageCheck,
  ReceiptText,
  RefreshCw,
} from "lucide-react";
import { SERVICES } from "@/lib/dummy-data";
import ServiceIcon from "@/components/common/service-icon";
import PageIntro from "@/components/common/page-intro";

function Pricing() {
  const [mode, setMode] = useState<"one-time" | "recurring">("one-time");
  const [context, setContext] = useState<"Home" | "Business">("Home");
  const [faqOpen, setFaqOpen] = useState(0);
  const prices =
    context === "Home"
      ? SERVICES.filter((service) => service.type === "Residential")
      : SERVICES.filter(
          (service) =>
            service.type === "Commercial" ||
            service.id === "general-pest" ||
            service.id === "rodent" ||
            service.id === "mosquito",
        );
  const pricingFaqs = [
    [
      "What does “from” mean?",
      "Starting prices give you a useful planning point for a standard visit. The final quote reflects size, access, severity, and the scope we confirm with you before work begins.",
    ],
    [
      "Is recurring service cheaper?",
      "Recurring care is priced around the rhythm and scope of your property. We recommend it only when repeat visits make practical sense, and you can review the plan after the first service.",
    ],
    [
      "Do you require a payment method to request?",
      "No. A request is a conversation, not a commitment. We confirm the details and price before any work starts.",
    ],
  ];
  return (
    <div>
      <main className="container page-container">
        <PageIntro
          eyebrow="Pricing / clear by design"
          title={
            <>
              Know the starting point.
              <br />
              <em>Choose the right rhythm.</em>
            </>
          }
          action={
            <button
              className="primary-button"
              // onClick={() => setRequestOpen(true)}
              data-testid="button-pricing-request"
            >
              Get a specific quote <ArrowRight size={15} />
            </button>
          }
        >
          Transparent starting prices for the everyday spaces we care for. Use
          these as a planning guide; your coordinator confirms the real scope
          and quote before a technician or cleaning lead begins.
        </PageIntro>
        <section className="pricing-controls">
          <div className="pricing-control">
            <span className="toolbar-label">Property context</span>
            <div className="segmented-control">
              {(["Home", "Business"] as const).map((item) => (
                <button
                  className={context === item ? "active" : ""}
                  onClick={() => setContext(item)}
                  key={item}
                  data-testid={`button-pricing-context-${item.toLowerCase()}`}
                >
                  {item === "Home" ? (
                    <House size={15} />
                  ) : (
                    <Building2 size={15} />
                  )}
                  {item}
                </button>
              ))}
            </div>
          </div>
          <div className="pricing-control">
            <span className="toolbar-label">Visit rhythm</span>
            <div className="segmented-control">
              {(["one-time", "recurring"] as const).map((item) => (
                <button
                  className={mode === item ? "active" : ""}
                  onClick={() => setMode(item)}
                  key={item}
                  data-testid={`button-pricing-mode-${item}`}
                >
                  {item === "one-time" ? (
                    <PackageCheck size={15} />
                  ) : (
                    <RefreshCw size={15} />
                  )}
                  {item === "one-time" ? "One-time" : "Recurring"}
                </button>
              ))}
            </div>
          </div>
        </section>
        <section className="pricing-board">
          <div className="pricing-board-head">
            <div>
              <div className="eyebrow">
                {context === "Home"
                  ? "Residential menu"
                  : "Commercial + flexible menu"}
              </div>
              <h2>
                {mode === "one-time"
                  ? "A focused visit, priced plainly."
                  : "A repeatable rhythm, built around you."}
              </h2>
            </div>
            <span className="pricing-as-of">
              <CalendarCheck size={14} /> Updated June 2025
            </span>
          </div>
          <div className="pricing-list">
            {prices.map((service, index) => (
              <article
                className="pricing-row"
                key={service.id}
                data-testid={`row-pricing-${service.id}`}
              >
                <div className="pricing-row-num">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div className="pricing-row-icon">
                  <ServiceIcon kind={service.icon} size={18} />
                </div>
                <div className="pricing-row-name">
                  <strong>{service.name}</strong>
                  <span>{service.type} · scope confirmed before work</span>
                </div>
                <div className="pricing-row-includes">
                  <span>Includes</span>
                  <p>
                    {mode === "one-time"
                      ? "Inspection + focused service notes"
                      : "Visit + plan review + reminders"}
                  </p>
                </div>
                <div className="pricing-row-price">
                  <strong>
                    {mode === "recurring"
                      ? service.price.replace("From ", "Plans from ")
                      : service.price}
                  </strong>
                  <button
                    className="text-button"
                    // onClick={() => setRequestOpen(true)}
                    data-testid={`button-pricing-request-${service.id}`}
                  >
                    Request <ArrowUpRight size={14} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section className="pricing-notes">
          <div className="pricing-note-card">
            <CircleDollarSign size={19} />
            <div>
              <h3>What the starting price covers</h3>
              <p>
                A standard visit, arrival window, professional equipment, and a
                clear completion record. Larger properties, active infestations,
                specialty products, and additional labor are discussed before
                approval.
              </p>
            </div>
          </div>
          <div className="pricing-note-card">
            <ReceiptText size={19} />
            <div>
              <h3>One-time or recurring?</h3>
              <p>
                Choose one-time for a reset, inspection, move, or occasional
                need. Choose recurring when prevention, consistency, or a
                regular cleaning cadence saves you more effort over time.
              </p>
            </div>
          </div>
        </section>
        <section className="pricing-reassurance">
          <div>
            <div className="eyebrow">Pricing reassurance</div>
            <h2>No surprise work in the middle.</h2>
            <p>
              Our quote is a checkpoint, not a trap. If the scope changes, we
              pause, explain why, and let you decide.
            </p>
            <button
              className="secondary-button button-small"
              // onClick={() => setRequestOpen(true)}
              data-testid="button-pricing-reassurance"
            >
              Ask for a quote <ArrowRight size={14} />
            </button>
          </div>
          <div className="faq-list">
            {pricingFaqs.map(([question, answer], index) => (
              <div
                className={`faq-item ${faqOpen === index ? "open" : ""}`}
                key={question}
              >
                <button
                  className="faq-question"
                  onClick={() => setFaqOpen(faqOpen === index ? -1 : index)}
                  aria-expanded={faqOpen === index}
                  data-testid={`button-pricing-faq-${index}`}
                >
                  {question}
                  <ChevronDown size={16} />
                </button>
                {faqOpen === index && (
                  <div
                    className="faq-answer"
                    data-testid={`text-pricing-faq-${index}`}
                  >
                    {answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Pricing;
