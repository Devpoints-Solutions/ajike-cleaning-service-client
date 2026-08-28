import { CheckCircle2, ArrowRight } from "lucide-react";
import { useServiceContext } from "@/features/contexts/service-context";

export function Step6({ step }: { step: number }) {
  const { toggleNewModal } = useServiceContext();
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

            <button
              className="secondary-button"
              data-testid="button-close-request-success"
              onClick={() => {
                toggleNewModal();
                window.location.reload();
              }}
            >
              Back to dashboard <ArrowRight size={15} />
            </button>
          </div>
        </>
      )}
    </>
  );
}
