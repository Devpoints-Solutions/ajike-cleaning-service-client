import {
  ArrowRight,
  ChevronDown,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";
import CtaButton from "@/components/common/cta-button";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-copy reveal">
        <div className="eyebrow">The accountable care team</div>
        <h1>
          A cleaner, safer place to <em>come home to.</em>
        </h1>
        <p>
          Ajike brings pest control and cleaning together under one dependable
          team — with licensed professionals, clear pricing, and proof of the
          work when we are done.
        </p>
        <div className="hero-actions">
          <CtaButton
            text="Request a service"
            icon={<ArrowRight size={16} />}
            props={{
              className: "primary-button",
              "data-testid": "button-hero-request",
            }}
          />

          <a
            className="secondary-button"
            href="#services"
            data-testid="link-hero-services"
          >
            Explore services <ChevronDown size={15} />
          </a>
        </div>
        <div className="hero-note">
          <ShieldCheck size={15} /> Licensed, insured, and careful in the
          details.
        </div>
      </div>
      <div
        className="hero-visual reveal delay-2"
        data-testid="img-hero-property"
      >
        <div className="visual-orbit" />
        <div className="visual-card float">
          <strong>4.9 / 5</strong>
          <span>from 286 local visits</span>
        </div>
        <div className="visual-house">
          <span className="roof" />
          <span className="body" />
          <span className="window" />
          <span className="door" />
        </div>
        <div className="visual-caption">
          One team / every room <ArrowUpRight size={13} />
        </div>
      </div>
    </section>
  );
}

export default Hero;
