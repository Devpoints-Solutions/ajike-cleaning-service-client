import { ArrowRight } from "lucide-react";
import CtaButton from "@/components/common/cta-button";

function FinalCta() {
  return (
    <section className="final-cta container">
      <div>
        <div className="eyebrow">Good spaces start with a conversation</div>
        <h2>Ready to feel on top of it?</h2>
      </div>

      <CtaButton
        text="Request your service"
        icon={<ArrowRight size={16} />}
        props={{
          className: "primary-button",
          "data-testid": "button-final-request",
        }}
      />
    </section>
  );
}

export default FinalCta;
