import { useState, useEffect } from "react";
import { SERVICES } from "../service-data";
import { categories } from "../service-data";
import { step1Schema } from "./steps-schema-validators";
import ServiceSelector from "../service-selector";
import type { Service, ErrorType } from "@/lib/types";

export function Step1({
  step,
  setCanContinue,
}: {
  step: number;
  setCanContinue: (canContinue: boolean, data: any) => void;
}) {
  const [step1Data, setStep1Data] = useState<{
    category: string;
    title: string;
    budget: string;
  } | null>();

  const [_error, setError] = useState<ErrorType>();

  function getStep1Data(name: string, value: string) {
    return setStep1Data((current) => ({
      category: current?.category ?? "",
      title: current?.title ?? "",
      budget: current?.budget ?? "",
      [name]: value,
    }));
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      (async () => {
        try {
          await step1Schema.validate(step1Data, { abortEarly: false });

          setError({ message: "", field: "" });


          setCanContinue(true,step1Data);
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
  }, [step1Data]);

  return (
    <>
      {step === 1 && (
        <>
          <div className="mb-6">
            <h1 className="text-[22px] font-bold tracking-[-0.3px] text-[#001625]">
              What do you need, and where?
            </h1>

            <p className="mt-1 text-[15px] text-[#53657a]">
              This tailors the services we show you next.
            </p>
          </div>
          <section className="mt-3">
            <h2 className="mb-3 text-[14px] font-semibold text-[#001625]">
              Category
            </h2>

            <div className="space-y-3">
              {categories.map((item) => (
                <ServiceSelector
                  key={item.id}
                  item={item}
                  selected={step1Data?.category === item.name}
                  onClick={() => {
                    getStep1Data("category", item.name);
                  }}
                />
              ))}
            </div>
          </section>

          {/* Service */}

          <section>
            <h2 className="mt-6 mb-3 text-[14px] font-semibold text-[#001625]">
              Select a service
            </h2>

            <div className="space-y-3">
              {step1Data?.category && step1Data?.category === "Cleaning"
                ? SERVICES.filter(
                    (service: Service) => service?.category === "Cleaning",
                  ).map((item) => (
                    <ServiceSelector
                      key={item.id}
                      item={item}
                      selected={step1Data?.title === item.name}
                      onClick={() => {
                        getStep1Data("title", item.name);
                        getStep1Data("budget", SERVICES?.find(service => service.name === item.name)?.price ?? "");
                      }}
                    />
                  ))
                : SERVICES.filter(
                    (service: Service) => service?.category === "Pest",
                  ).map((item) => (
                    <ServiceSelector
                      key={item.id}
                      item={item}
                      selected={step1Data?.title === item.name}
                      onClick={() => {
                        getStep1Data("title", item.name);
                        getStep1Data("budget", SERVICES?.find(service => service.name === item.name)?.price ?? "");
                      }}
                    />
                  ))}
            </div>
          </section>
        </>
      )}
    </>
  );
}
