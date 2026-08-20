import { ArrowRight } from "lucide-react";

function FinalCta() {
  return (
    <section className="final-cta">
      <div>
        <div className="eyebrow">Good spaces start with a conversation</div>
        <h2>Ready to feel on top of it?</h2>
      </div>
      <button
        className="primary-button"
        // onClick={() => request()}
        data-testid="button-final-request"
      >
        Request your service <ArrowRight size={16} />
      </button>
    </section>
  );
}

export default FinalCta;
