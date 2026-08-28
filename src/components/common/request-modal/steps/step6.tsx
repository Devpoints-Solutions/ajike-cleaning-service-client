import { CheckCircle2, ArrowRight } from "lucide-react";

import { Link } from "wouter";

export function Step6({ step }: { step: number }) {
  return (
    <>
      {step === 6 && (
        <>
          <div className="success-panel">
            <div className="success-icon">
              <CheckCircle2 size={25} />
            </div>
            <h3>We have your request.</h3>
            <p className="text-center">
              A service coordinator will reach out during business hours to
              confirm the details and offer a visit window. No payment is needed
              to request an inspection.
            </p>
            <Link
              href="/dashboard"
              className="secondary-button"
              data-testid="button-close-request-success"
            >
              Back to dashboard <ArrowRight size={15} />
            </Link>
          </div>
        </>
      )}
    </>
  );
}
