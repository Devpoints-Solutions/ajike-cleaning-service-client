import { SERVICES } from "@/lib/dummy-data";
import ServiceIcon from "@/components/common/service-icon";
import { ArrowUpRight } from "lucide-react";

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
      <div className="services-grid">
        {SERVICES.map((service, index) => (
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
              <button
                className="icon-button mini-arrow"
                // onClick={() => request(service.name)}
                aria-label={`Request ${service.name}`}
                data-testid={`button-request-${service.id}`}
              >
                <ArrowUpRight size={16} />
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default HomeServices;
