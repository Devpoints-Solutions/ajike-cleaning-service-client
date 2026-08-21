import { useState } from "react";

import {
  ArrowRight,
  Check,
  ChevronDown,
  Info,
  ListFilter,
  Timer,
} from "lucide-react";
import { Link } from "wouter";
import { SERVICES, SERVICE_DETAILS } from "@/lib/dummy-data";
import ServiceIcon from "@/components/common/service-icon";
import PageIntro from "@/components/common/page-intro";
import CtaButton from "@/components/common/cta-button";

function Services() {
  const [filter, setFilter] = useState<"All" | "Residential" | "Commercial">(
    "All",
  );
  const [expanded, setExpanded] = useState<string | null>("general-pest");
  const visible = SERVICES.filter(
    (service) => filter === "All" || service.type === filter,
  );

  return (
    <div>
      <main className="container page-container">
        <PageIntro
          eyebrow="Services / field menu"
          title={
            <>
              A clear plan for
              <br />
              <em>the space you keep.</em>
            </>
          }
          action={
            <Link
              href="/pricing"
              className="secondary-button"
              data-testid="link-services-pricing"
            >
              See starting prices <ArrowRight size={15} />
            </Link>
          }
        >
          Every service starts with a careful look and ends with a useful
          record. Browse the full menu, understand what is included, and choose
          the next step that fits your property.
        </PageIntro>
        <section className="service-toolbar">
          <div>
            <span className="toolbar-label">Show me</span>
            <div
              className="filter-tabs"
              role="group"
              aria-label="Filter services"
            >
              {(["All", "Residential", "Commercial"] as const).map((item) => (
                <button
                  className={filter === item ? "active" : ""}
                  onClick={() => setFilter(item)}
                  key={item}
                  data-testid={`button-filter-services-${item.toLowerCase()}`}
                >
                  {item}
                  <span>
                    {item === "All"
                      ? SERVICES.length
                      : SERVICES.filter((service) => service.type === item)
                          .length}
                  </span>
                </button>
              ))}
            </div>
          </div>
          <div className="service-count">
            <ListFilter size={15} /> {visible.length} services in view
          </div>
        </section>
        <section className="service-detail-list">
          {visible.map((service, index) => {
            const detail = SERVICE_DETAILS[service.id];
            const isOpen = expanded === service.id;
            return (
              <article
                className={`service-detail-card ${isOpen ? "expanded" : ""}`}
                key={service.id}
                data-testid={`card-service-detail-${service.id}`}
              >
                <div className="service-detail-summary">
                  <div className="service-index">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div className="service-detail-icon">
                    <ServiceIcon kind={service.icon} size={21} />
                  </div>
                  <div className="service-detail-title">
                    <span className="service-tag">{service.type}</span>
                    <h2>{service.name}</h2>
                    <p>{service.detail}</p>
                  </div>
                  <div className="service-detail-price">
                    <strong>{service.price}</strong>
                    <span>starting point</span>
                  </div>
                  <button
                    className="icon-button service-expand"
                    onClick={() => setExpanded(isOpen ? null : service.id)}
                    aria-label={`${isOpen ? "Collapse" : "Expand"} ${service.name}`}
                    aria-expanded={isOpen}
                    data-testid={`button-expand-service-${service.id}`}
                  >
                    <ChevronDown size={18} />
                  </button>
                </div>
                {isOpen && (
                  <div className="service-detail-body">
                    <div className="service-info-block">
                      <span className="info-label">Best for</span>
                      <p>{detail.audience}</p>
                    </div>
                    <div className="service-info-block">
                      <span className="info-label">What is included</span>
                      <ul>
                        {detail.included.map((item) => (
                          <li key={item}>
                            <Check size={14} />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="service-info-block">
                      <span className="info-label">Visit + preparation</span>
                      <p>
                        <Timer size={14} /> {detail.duration}
                      </p>
                      <p className="prep-note">
                        <Info size={14} /> {detail.prep}
                      </p>
                    </div>
                    <div className="service-next">
                      <span className="info-label">Your next step</span>
                      <p>{detail.next}</p>

                      <CtaButton
                        text={`Request ${service.name}`}
                        icon={<ArrowRight size={14} />}
                        props={{
                          className: "primary-button button-small",
                          "data-testid": `button-request-detail-${service.id}`,
                        }}
                      />
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </section>
        <section className="service-guidance">
          <div>
            <div className="eyebrow">Not sure where to start?</div>
            <h2>Describe the symptom, not the solution.</h2>
          </div>
          <p>
            You do not need to identify a pest or know the exact square footage.
            Tell us what changed, where you noticed it, and when you need help.
            A coordinator can guide the right service.
          </p>

          <CtaButton
            text="Talk through my space"
            icon={<ArrowRight size={14} />}
            props={{
              className: "secondary-button button-small",
              "data-testid": "button-services-guidance",
            }}
          />
        </section>
      </main>
    </div>
  );
}

export default Services;
