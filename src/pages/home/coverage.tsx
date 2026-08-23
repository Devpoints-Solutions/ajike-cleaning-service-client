import { ArrowRight } from "lucide-react";
import CtaButton from "@/components/common/cta-button";
import AboutImage from "@/assets/about.jpg";
import PricingImage from "@/assets/pricing.jpg";
import ServiceImage from "@/assets/services.jpg";
import SupportImage from "@/assets/support.jpg";

const coverageCards = [
  {
    id: "01",
    title: "Homes & apartments",
    description:
      "Protect the spaces that hold your routines, pets, people, and weekends.",
    image: AboutImage,
    alt: "A tidy and comfortable home interior",
  },
  {
    id: "02",
    title: "Offices & studios",
    description:
      "Keep shared spaces ready for teams, clients, and focused work.",
    image: ServiceImage,
    alt: "A polished work environment with a calm, professional feel",
  },
  {
    id: "03",
    title: "Restaurants & retail",
    description:
      "Practical service plans designed around operating hours and inspections.",
    image: PricingImage,
    alt: "A retail space prepared for customer-facing cleanliness",
  },
  {
    id: "04",
    title: "Facilities & property teams",
    description:
      "Consistent documentation and a partner who understands multiple sites.",
    image: SupportImage,
    alt: "A property support team maintaining a well-managed facility",
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
      <div className="coverage-list">
        {coverageCards.map(({ id, title, description, image, alt }) => (
          <div className="coverage-card" key={title}>
            <div className="coverage-visual">
              <img src={image} alt={alt} />
            </div>
            <div className="coverage-copy">
              <span className="coverage-num">{id}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Coverage;
