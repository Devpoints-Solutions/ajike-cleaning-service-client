import { ArrowRight } from "lucide-react";
import CtaButton from "@/components/common/cta-button";

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
        <div className="coverage-card">
          <span className="coverage-num">01</span>
          <h3>Homes & apartments</h3>
          <p>
            Protect the spaces that hold your routines, pets, people, and
            weekends.
          </p>
        </div>
        <div className="coverage-card">
          <span className="coverage-num">02</span>
          <h3>Offices & studios</h3>
          <p>Keep shared spaces ready for teams, clients, and focused work.</p>
        </div>
        <div className="coverage-card">
          <span className="coverage-num">03</span>
          <h3>Restaurants & retail</h3>
          <p>
            Practical service plans designed around operating hours and
            inspections.
          </p>
        </div>
        <div className="coverage-card">
          <span className="coverage-num">04</span>
          <h3>Facilities & property teams</h3>
          <p>
            Consistent documentation and a partner who understands multiple
            sites.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Coverage;
