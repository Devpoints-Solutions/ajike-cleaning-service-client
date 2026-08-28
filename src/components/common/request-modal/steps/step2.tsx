import { useState, useEffect } from "react";
import { propertyTypes, plans, reOccurrentOptions } from "../service-data";
import ServiceSelector from "../service-selector";
import { step2Schema} from "../steps/steps-schema-validators.tsx";
import type { ErrorType } from "@/lib/types";

export function Step2({ step, setCanContinue }: { step: number, setCanContinue: (canContinue: boolean, data: any) => void }) {

  const [_error, setError] = useState<ErrorType>();
  const [step2Data, setStep2Data] = useState<{
    propertyType: string;
    plan: string;
    planInterval: string;
    planPeriod: string;
  } | null>();

  function getStep2Data(name: string, value: string) {
    return setStep2Data((current) => ({
      propertyType: current?.propertyType ?? "",
      plan: current?.plan ?? "",
      planInterval: current?.planInterval ?? "",
      planPeriod: current?.planPeriod ?? "",
      [name]: value,
    }));
  }


  useEffect(() => {
    const timer = setTimeout(() => {
      (async () => {
        try {
          await step2Schema.validate(step2Data, { abortEarly: false });

          setError({ message: "", field: "" });


          setCanContinue(true, step2Data);
        } catch (error: unknown) {
          setCanContinue(false, {});
          const err = error as any;
          if (err?.inner?.length > 0) {
            setError({
              message: err.inner[0].message,
              field: err.inner[0].path,
            });
          }
        }
      })();
    }, 0);

    return () => {
      clearTimeout(timer);
    };
  }, [step2Data]);
  return (
    <>
      {step === 2 && (
        <>
          <div className="mb-6">
            <h1 className="text-[22px] font-bold tracking-[-0.3px] text-[#001625]">
              Setlect your property type
            </h1>

            <p className="mt-1 text-[15px] text-[#53657a]">
              Choose a service plan that suits your need
            </p>
          </div>
          <section className="mt-3">
            <h2 className="mb-3 text-[14px] font-semibold text-[#001625]">
              Property Type
            </h2>

            <div className="space-y-3">
              {propertyTypes.map((item) => (
                <ServiceSelector
                  key={item.name}
                  item={item}
                  selected={step2Data?.propertyType === item.name}
                  onClick={() => {
                    getStep2Data("propertyType", item?.name);
                  }}
                />
              ))}
            </div>
          </section>

          <section className="mt-6">
            <h2 className="mb-3 text-[14px] font-semibold text-[#001625]">
              Plan
            </h2>

            <div className="space-y-3">
              {plans.map((item) => (
                <ServiceSelector
                  key={item.name}
                  item={item}
                  selected={step2Data?.plan === item.name}
                  onClick={() => {

                    getStep2Data("plan", item?.name);

                  }}
                />
              ))}
            </div>
          </section>

          {/* Service */}
          {step2Data?.plan === "Re-occurrent" && (
            <section>
              <h2 className="mt-6 text-[14px] font-semibold text-[#001625]">
                Plan Schedule
              </h2>

              <div className="space-y-3">
                {reOccurrentOptions.map((item: any) => (
                  <ServiceSelector
                    key={item.name}
                    item={item}
                    selected={step2Data?.planInterval === item.name}
                    onClick={() => {
                      // getFormInput(undefined, "planInterval", item?.name);

                      getStep2Data("planInterval", item?.name);

                      // if (data?.plan && data?.propertyType) {
                      //   setCanContinue(true);
                      // }
                    }}
                  />
                ))}
              </div>

              <div className="space-y-3 mt-3">
                <div className="field" style={{ height: "72px" }}>
                  <label htmlFor="address" style={{ fontSize: "13px" }}>
                    Period
                  </label>
                  <input
                      id="request-period"
                      name="planPeriod"
                      value={step2Data?.planPeriod}
                      onChange={(event) => {
                        getStep2Data("planPeriod", event?.target?.value);
                      }}
                      placeholder="0, 1, 3"
                      data-testid="input-request-address"
                      style={{ borderRadius: "15px" }}
                      type="number"
                  />
                </div>
              </div>
            </section>
          )}
        </>
      )}
    </>
  );
}
