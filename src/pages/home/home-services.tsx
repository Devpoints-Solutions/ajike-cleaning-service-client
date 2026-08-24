import { SERVICES } from "@/lib/dummy-data";
import ServiceIcon from "@/components/common/service-icon";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import CtaButton from "@/components/common/cta-button";
import mosquitoImage from "@/assets/mosquito.png";
import rodentsImage from "@/assets/rodents.png";
import pestControl from "@/assets/about.png";
import { motion } from "motion/react";
import { Link } from "wouter";

const SERVICE_IMAGES: Record<string, string> = {
  "general-pest": pestControl,
  "bed-bug":
    "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
  rodent: rodentsImage,
  mosquito: mosquitoImage,
  "deep-clean":
    "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=80",
  "home-clean":
    "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=900&q=80",
  "office-clean":
    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80",
  "move-clean":
    "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=900&q=80",
};
const MotionLink = motion(Link);

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

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {SERVICES?.slice(0, 6).map((service) => (
          <MotionLink
            to={`/services`}
            key={service.id}
            data-testid={`card-service-${service.id}`}
            // @ts-ignore
            className="service-card mb-6 block cursor-pointer overflow-hidden rounded-2xl"
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.15,
            }}
            whileHover={{
              y: -6,
              scale: 1.015,
            }}
            whileTap={{
              scale: 0.98,
            }}
            transition={{
              duration: 0.18,
              ease: "easeOut",
            }}
          >
            <div className="service-visual overflow-hidden">
              <motion.img
                src={SERVICE_IMAGES[service.id] ?? SERVICE_IMAGES["home-clean"]}
                alt={`${service.name} service`}
                className="h-full w-full object-cover"
                whileHover={{
                  scale: 1.05,
                }}
                transition={{
                  duration: 0.2,
                  ease: "easeOut",
                }}
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

                <div
                  className="icon-button mini-arrow"
                  aria-label={`Request ${service.name}`}
                  data-testid={`button-request-${service.id}`}
                >
                  <ArrowUpRight size={16} />
                </div>
              </div>
            </div>
          </MotionLink>
        ))}
      </div>
    </section>
  );
}

export default HomeServices;
