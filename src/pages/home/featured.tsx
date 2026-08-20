import { ArrowRight } from "lucide-react";

function Featured() {
  return (
    <section className="section">
      <div className="featured-panel">
        <div className="featured-copy">
          <div className="eyebrow">The Ajike difference</div>
          <h2>Every visit leaves a record.</h2>
          <p>
            You deserve more than a quick knock and a vague goodbye. We share
            what we found, what we did, and what to watch next — with before and
            after photo proof when it helps.
          </p>
          <button
            className="text-button"
            // onClick={() => request()}
            data-testid="button-proof-request"
          >
            Book an accountable visit <ArrowRight size={15} />
          </button>
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
