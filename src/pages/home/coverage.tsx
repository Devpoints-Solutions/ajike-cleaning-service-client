import {
  ArrowRight,
  Home,
  Building2,
  Store,
  Building,
  ArrowUpRight,
} from "lucide-react";
import { Link } from "wouter";
import CtaButton from "@/components/common/cta-button";

const coverageCards = [
  {
    number: "01",
    title: "Homes & apartments",
    description:
      "Protect the spaces that hold your routines, pets, people, and weekends.",
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80",
    icon: Home,
  },
  {
    number: "02",
    title: "Offices & studios",
    description:
      "Keep shared spaces ready for teams, clients, and focused work.",
    image:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200&q=80",
    icon: Building2,
  },
  {
    number: "03",
    title: "Restaurants & retail",
    description:
      "Practical service plans designed around operating hours and inspections.",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
    icon: Store,
  },
  {
    number: "04",
    title: "Facilities & property teams",
    description:
      "Consistent documentation and a partner who understands multiple sites.",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
    icon: Building,
  },
];

function Coverage() {
  return (
    <section className="section coverage-section container" id="coverage">
      <div className="coverage-intro">
        <div className="eyebrow">Where we show up</div>
        <h2>One standard of care, wherever you work and live.</h2>
        <p>
          From a nursery bedroom to a busy kitchen, Ajike brings the same calm
          process, careful communication, and respect for your space.
        </p>

        <CtaButton
          text="Tell us about your space"
          props={{
            className: "secondary-button button-small",
            "data-testid": "button-coverage-request",
          }}
          icon={<ArrowRight size={14} />}
        />
      </div>
      <div className="coverage-list grid grid-cols-1 md:grid-cols-2 gap-6">
        {coverageCards.map((card) => {
          const Icon = card.icon;

          return (
            <Link
              href="/services"
              key={card.number}
              className="relative h-[200px] overflow-hidden rounded-2xl group cursor-pointer"
            >
              {/* Background Image */}
              <img
                src={card.image}
                alt={card.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Dark overlay */}
              <div
                className="
                absolute inset-0
                bg-gradient-to-t
                from-[#0a233e]
                via-[#061a2f]/75
                to-black/10
                transition-all duration-500
                group-hover:via-[#061a2f]/85
              "
              />

              {/* Content */}
              <div className="absolute inset-0 z-10 flex flex-col justify-end p-6 md:p-8">
                {/* Number + Icon */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="
                    flex items-center justify-center
                    w-10 h-10
                    rounded-full
                    bg-[#001625]
                    border border-white/25
                    backdrop-blur-md
                    transition-all duration-300
                    group-hover:bg-white/20
                    group-hover:scale-105
                  "
                  >
                    <Icon size={19} strokeWidth={1.8} className="text-white" />
                  </div>

                  <span className="text-xs font-semibold tracking-[0.25em] text-white/70">
                    {card.number}
                  </span>
                </div>

                {/* Title */}
                <h3
                  className="
                  mb-2
                  text-[0.7rem] md:text-[1rem]
                  font-bold
                  tracking-tight
                  text-[#1687b6]
                  drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]
                  transition-transform duration-300
                  group-hover:-translate-y-1
                "
                >
                  {card.title}
                </h3>

                {/* Description */}
                <p
                  className="
                  max-w-lg
                  text-sm md:text-[0.9rem]
                  leading-relaxed
                  text-white/85
                  drop-shadow-[0_1px_5px_rgba(0,0,0,0.6)]
                "
                >
                  {card.description}
                </p>

                {/* Arrow */}
                <div
                  className="
                  absolute
                  top-6 right-6
                  flex items-center justify-center
                  w-10 h-10
                  rounded-full
                  bg-white/10
                  border border-white/20
                  backdrop-blur-md
                  opacity-0
                  translate-y-2
                  transition-all duration-300
                  group-hover:opacity-100
                  group-hover:translate-y-0
                "
                >
                  <ArrowUpRight
                    size={19}
                    className="text-white"
                    strokeWidth={1.8}
                  />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default Coverage;
