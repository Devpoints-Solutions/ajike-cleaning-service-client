import { ArrowRight } from "lucide-react";
import CtaButton from "@/components/common/cta-button";

function Featured() {
  return (
    <section className="section">
      <div className="featured-panel container">
        <div className="featured-copy">
          <div className="eyebrow">The Ajike difference</div>
          <h2>Every visit leaves a record.</h2>
          <p className="mb-5">
            You deserve more than a quick knock and a vague goodbye. We share
            what we found, what we did, and what to watch next — with before and
            after photo proof when it helps.
          </p>
          <CtaButton
            text="Book an accountable visit"
            icon={<ArrowRight size={15} />}
            props={{
              className: "text-button",
              "data-testid": "button-proof-request",
            }}
          />
        </div>
        <div className="proof-art" data-testid="img-before-after">
          <div className="proof-frame" />
          <div className="proof-dot" />
        </div>
      </div>
    </section>
  );
}

export default Featured;
