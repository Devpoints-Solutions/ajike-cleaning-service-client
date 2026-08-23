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
          <div className="coverage-visual">
            <img src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80" alt="Homes & apartments" />
          </div>

          <div className="coverage-overlay">
            <span className="coverage-num">01</span>
            <h3>Homes & apartments</h3>
            <p>
              Protect the spaces that hold your routines, pets, people, and
              weekends.
            </p>
          </div>
        </div>
        <div className="coverage-card">
          <div className="coverage-visual">
            <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200&q=80" alt="Offices & studios" />
          </div>

          <div className="coverage-overlay">
            <span className="coverage-num">02</span>
            <h3>Offices & studios</h3>
            <p>Keep shared spaces ready for teams, clients, and focused work.</p>
          </div>
        </div>
        <div className="coverage-card">
          <div className="coverage-visual">
            <img src="https://images.unsplash.com/photo-1541542684-7f15a7b6b49b?auto=format&fit=crop&w=1200&q=80" alt="Restaurants & retail" />
          </div>

          <div className="coverage-overlay">
            <span className="coverage-num">03</span>
            <h3>Restaurants & retail</h3>
            <p>
              Practical service plans designed around operating hours and
              inspections.
            </p>
          </div>
        </div>
        <div className="coverage-card">
          <div className="coverage-visual">
            <img src="https://images.unsplash.com/photo-1505691723518-36a3f0ef8bca?auto=format&fit=crop&w=1200&q=80" alt="Facilities & property teams" />
          </div>

          <div className="coverage-overlay">
            <span className="coverage-num">04</span>
            <h3>Facilities & property teams</h3>
            <p>
              Consistent documentation and a partner who understands multiple
              sites.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Coverage;
