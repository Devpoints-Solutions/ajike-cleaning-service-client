import { ArrowRight, MapPin } from "lucide-react";

function Hero() {
  return (
    <section className="hero" aria-label="Ajike home hero">
      <div className="hero-inner">
        <div className="hero-badge" data-testid="hero-badge">
          <span className="hero-badge-icon">
            <MapPin size={14} />
          </span>
          Now serving New Jersey &amp; New York
        </div>

        <h1>
          Reliable pest control
          <br />
          and cleaning across
          <span> New Jersey &amp; New York</span>
        </h1>

        <p>
          One trusted company for homes and businesses. Request a service, and
          our operations team assigns verified, trained professionals — with photo
          proof on every job.
        </p>

        <div className="hero-actions">
          <a className="primary-button hero-primary-button" href="#contact">
            Request Service <ArrowRight size={18} />
          </a>
          <a className="secondary-button hero-secondary-button" href="#careers">
            Apply to Work With Us
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
