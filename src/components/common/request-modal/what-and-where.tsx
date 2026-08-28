import React, { useEffect, useState } from "react";
import { Loader } from "../loader";
import { Step1 } from "./steps/step1";
import { Step2 } from "./steps/step2";
import { Step3 } from "./steps/step3";
import { Step4 } from "./steps/step4";
import { Step5 } from "./steps/step5";
import { extractPrice } from "@/helpers/time";
import "react-datepicker/dist/react-datepicker.css";
import "./calandar.css";

import { ChevronRight, ChevronLeft } from "lucide-react";

import ProgressStepper from "./progress-stepper";
import { Step6 } from "./steps/step6";

function WhatAndWhere({
  isLoading,
  isSuccess,
  onSubmitRequest,
}: {
  isLoading: boolean;
  isSuccess: boolean;
  onSubmitRequest: (data: any) => void;
}) {
  const [step, setStep] = useState<number>(1);
  const [canContinue, setCanContinue] = useState<boolean>(false);
  const [stepsData, setStepsData] = useState<any>();

  function getStepsData(data: any): void {
    setStepsData({ ...stepsData, ...data });
  }

  const handleContinue = () => {
    if (!canContinue) return;

    if (step === 6) return;
    setStep((prev) => prev + 1);

    setCanContinue(false);
  };

  const submit = (event: React.FormEvent) => {
    event.preventDefault();

    const payload = {
      title: stepsData?.title,
      description: stepsData?.description,
      propertyType: stepsData?.propertyType,
      budget: stepsData?.planPeriod
        ? extractPrice(stepsData?.budget, stepsData?.planPeriod).toString()
        : stepsData.budget,
      customer: stepsData?.customerFirstName
        ? {
            firstName: stepsData?.customerFirstName,
            lastName: stepsData?.customerLastName,
            phoneNumber: stepsData?.customerPhoneNumber,
            email: stepsData?.customerEmail,
          }
        : null,
      plan: stepsData?.plan as "re-occurrent" | "one-time",
      planInterval: stepsData?.planInterval || null,
      planPeriod: stepsData?.planPeriod || null,
      category: stepsData?.category as "Pest" | "Cleaning" | "Both",
      address: stepsData?.address,
      postcode: stepsData?.postcode,
      serviceState: stepsData?.serviceState || null,
      serviceCity: stepsData?.serviceCity || null,
      status: "new",
      preferredDate: stepsData?.preferredDate,
    };

    onSubmitRequest({
      ...payload,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    });
  };

  useEffect(() => {
    if (step === 5) {
      setCanContinue(true);
    }
  }, [step, stepsData]);

  useEffect(() => {
    if (isSuccess) {
      setStep(step + 1);
    }
  }, [isSuccess]);

  return (
    <div className="min-h-screen  bg-[#fafbfc] text-[#001625]">
      <div className="mx-auto flex min-h-screen w-full max-w-[720px] flex-col">
        {/* Top border */}
        <div className="h-px w-full bg-[#dce5ed]" />

        {/* Main content */}
        <main className="flex-1 px-6 pb-28 pt-4 sm:px-7">
          <ProgressStepper currentStep={step} />

          {/* // steps here */}
          {step === 1 && (
            <Step1
              step={step}
              setCanContinue={(canContinue: boolean, data: any) => {
                setCanContinue(canContinue);

                getStepsData(data);
              }}
            />
          )}

          {step === 2 && (
            <Step2
              step={step}
              setCanContinue={(canContinue: boolean, data: any) => {
                setCanContinue(canContinue);

                getStepsData(data);
              }}
            />
          )}

          {step === 3 && (
            <Step3
              step={step}
              setCanContinue={(canContinue: boolean, data: any) => {
                setCanContinue(canContinue);

                getStepsData(data);
              }}
            />
          )}

          {step === 4 && (
            <Step4
              step={step}
              setCanContinue={(canContinue: boolean, data: any) => {
                setCanContinue(canContinue);

                getStepsData(data);
              }}
            />
          )}

          {step === 5 && !isSuccess && <Step5 data={stepsData} step={step} />}

          {step === 6 && isSuccess && <Step6 step={step} />}
        </main>

        {/* Bottom action */}
        <div className="fixed bottom-0 left-0 right-0 border-t border-[#dce5ed] bg-white">
          <div className="mx-auto flex  max-w-[720px] justify-between py-4 sm:px-7">
            <button
              type="button"
              onClick={() => setStep((prev) => prev - 1)}
              disabled={step <= 1 || isSuccess || isLoading}
              className="secondary-button button-small"
            >
              <ChevronLeft size={19} strokeWidth={2.2} />
              Go back
            </button>

            <button
              type="button"
              onClick={(event) => {
                if (step === 5) return submit(event);
                handleContinue();
              }}
              disabled={!canContinue || isLoading || isSuccess}
              className={`flex button-small h-[52px] min-w-[158px] items-center justify-center gap-2 rounded-full px-7 text-[15px] font-semibold transition-all duration-200 ${
                canContinue
                  ? "bg-[#1687b6] text-white shadow-sm hover:bg-[#11749d] active:scale-[0.98]"
                  : "cursor-not-allowed bg-[#1687b6]/50 text-white"
              }`}
            >
              {isLoading && <Loader />} Continue
              <ChevronRight size={19} strokeWidth={2.2} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WhatAndWhere;
