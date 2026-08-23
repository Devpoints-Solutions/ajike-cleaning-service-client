import { SERVICES } from "@/lib/dummy-data";
import ServiceIcon from "@/components/common/service-icon";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import CtaButton from "@/components/common/cta-button";
import { Link } from "wouter";

const SERVICE_IMAGES: Record<string, string> = {
  "general-pest":
    "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=80",
  "bed-bug":
    "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
  rodent:
    "https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=900&q=80",
  mosquito:
    "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=80",
  "deep-clean":
    "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=80",
  "home-clean":
    "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=900&q=80",
  "office-clean":
    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80",
  "move-clean":
    "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=900&q=80",
};

function HomeServices() {
  return (
    <section className="section container" id="services">
      <div className="section-heading">
        <div>
          <div className="eyebrow" style={{ fontSize: "0.8rem" }}>
            Pest + clean, under one roof
          </div>
          <h2 className="mb-3" style={{ color: "#001625" }}>
            Care that meets the moment.
          </h2>
          <div className="my-6"></div>
          <p className="text-[0.9rem]">
            Start with a one-time visit or ask us to build a recurring plan
            around your property.
          </p>
        </div>

        <div className="flex justify-end my-2 items-center">
          <Link
            className="mini-arrow text-[1rem] hover:text-[#087eaf] font-semibold flex items-center"
            href="/services"
          >
            Explore services <ChevronRight size={16} />
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {SERVICES?.slice(0, 6).map((service, index) => (
          <Link
            href="/auth/sign-in"
            className={`service-card mb-6 reveal delay-${(index % 3) + 1}`}
            key={service.id}
            data-testid={`card-service-${service.id}`}
          >
            <div className="service-visual">
              <img
                src={SERVICE_IMAGES[service.id] ?? SERVICE_IMAGES["home-clean"]}
                alt={`${service.name} service`}
              />
              <div className="service-visual-overlay">
                <span className="service-tag service-tag-visual">
                  {service.type}
                </span>
                <div className="service-icon service-icon-visual">
                  <ServiceIcon kind={service.icon} />
                </div>
              </div>
            </div>

            <div className="service-content">
              <div>
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
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default HomeServices;
