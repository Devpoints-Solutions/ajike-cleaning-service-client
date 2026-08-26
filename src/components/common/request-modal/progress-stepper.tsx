import { Fragment } from "react";
import { steps } from "./service-data";

function ProgressStepper({ currentStep }: { currentStep: number }) {
  return (
    <div className="mb-8">
      {/* Step title */}
      <div className="mb-3 flex items-center gap-2 text-sm">
        <span className="font-medium text-[#001625]">
          Step {currentStep} of 6
        </span>

        <span className="text-[#1687b6]">·</span>

        <span className="font-medium text-[#1687b6]">What & where</span>
      </div>

      {/* Steps */}
      <div className="flex items-center">
        {steps.map((step, index) => {
          const isActive = step === currentStep;
          const isCompleted = step < currentStep;

          return (
            <Fragment key={step}>
              <div
                className={`relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition-all ${
                  isActive || isCompleted
                    ? "bg-[#1687b6] text-white ring-4 ring-[#1687b6]/15"
                    : "bg-[#e8eef4] text-[#53657a]"
                }`}
              >
                {step}
              </div>

              {index < steps.length - 1 && (
                <div className="mx-2 h-[2px] flex-1 bg-[#dce5ed] sm:mx-3" />
              )}
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}

export default ProgressStepper;
