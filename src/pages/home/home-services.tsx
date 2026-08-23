import { SERVICES } from "@/lib/dummy-data";
import ServiceIcon from "@/components/common/service-icon";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import CtaButton from "@/components/common/cta-button";
import { Link } from "wouter";

function HomeServices() {
  return (
    <section className="section" id="services">
      <div className="section-heading">
        <div>
          <div className="eyebrow">Pest + clean, under one roof</div>
          <h2>Care that meets the moment.</h2>
        </div>
        <p>
          Start with a one-time visit or ask us to build a recurring plan around
          your property.
        </p>
      </div>

      <div className="flex justify-end my-2 items-center">
        <Link
          className="mini-arrow text-[13px] hover:text-[#087eaf] font-semibold flex items-center"
          href="/services"
        >
          Explore services <ChevronRight size={16} />
        </Link>
      </div>
      <div className="services-grid">
        {SERVICES?.slice(0, 6).map((service, index) => (
          <article
            className={`service-card reveal delay-${(index % 3) + 1}`}
            key={service.id}
            data-testid={`card-service-${service.id}`}
          >
            <div>
              <div className="service-icon">
                <ServiceIcon kind={service.icon} />
              </div>
              <h3>{service.name}</h3>
              <p>{service.detail}</p>
            </div>
            <div className="service-foot">
              <span className="service-tag">
                {service.type} · {service.price}
              </span>
              <CtaButton
                text=""
                icon={<ArrowUpRight size={16} />}
                props={{
                  className: "icon-button mini-arrow",
                  "aria-label": `Request ${service.name}`,
                  "data-testid": `button-request-${service.id}`,
                }}
              />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default HomeServices;
