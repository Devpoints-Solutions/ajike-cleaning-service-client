import { useState, useEffect } from "react";
import type { ErrorType } from "@/lib/types";
import { Switch } from "@/components/ui/switch";
import { step4Schema } from "./steps-schema-validators";

import { UserRoundPlus, UserRoundCheck } from "lucide-react";

export function Step4({ step, setCanContinue }: { step: number, setCanContinue: (canContinue: boolean, data: any) => void }) {
  const [error, setError] = useState<ErrorType>();
  const [step4Data, setStep4Data] = useState<{
    description: string;
    customerFirstName: string | null;
    customerLastName: string | null;
    customerEmail: string | null;
    customerPhoneNumber: string;
  } | null>();

  const [showCustomer, setShowCustomer] = useState<boolean>(false);

  function getStep4Data(name: string, value: string) {
    return setStep4Data((current) => ({
      description: current?.description ?? "",
      customerPhoneNumber: current?.customerPhoneNumber ?? "",
      customerEmail: current?.customerEmail ?? "",
      customerFirstName: current?.customerFirstName ?? "",
      customerLastName: current?.customerLastName ?? "",
      [name]: value,
    }));
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      (async () => {
        try {
          await step4Schema.validate(step4Data, { abortEarly: false });

          setError({ message: "", field: "" });


          setCanContinue(true, step4Data);
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
  }, [step4Data]);


 

  return (
    <>
      {step === 4 && (
        <>
          <div className="mb-6">
            <h1 className="text-[22px] font-bold tracking-[-0.3px] text-[#001625]">
              Tell us what we should know
            </h1>

            <p className="mt-1 text-[15px] text-[#53657a]">
              Are you requesting for someone? let us know...
            </p>
          </div>
          <div className="field full">
            <label htmlFor="request-description" style={{ fontSize: "13px" }}>
              Special instructions
            </label>
            <textarea
              id="request-description"
              name="description"
              value={step4Data?.description}
              onChange={(event) => {
                getStep4Data("description", event?.target?.value);
              }}
              placeholder="Gate codes, pets, problem areas, anything we should know…"
              data-testid="textarea-request-description"
            />
            <div className="flex justify-between items-center">
              <div>
                {error && error?.field === "description" && (
                  <div
                    className="auth-error"
                    role="alert"
                    data-testid="text-signin-error"
                  >
                    {error?.message}
                  </div>
                )}
              </div>

              <div
                className={`text-[12px] font-bold ${(step4Data && step4Data?.description?.trim()?.length < 50) || (step4Data && step4Data?.description?.trim()?.length > 1000) ? "text-[#ff0000]" : ""}`}
                role="alert"
                data-testid="text-signin-error"
              >
                {step4Data && step4Data?.description?.trim()?.length <= 0
                  ? 0
                  : step4Data?.description?.trim()?.length}
                /1000
              </div>
            </div>
          </div>

          <div className="field full mt-7">
            <div className="flex items-center justify-between gap-3 rounded-xl border border-border bg-muted/20 p-3">
              <div className="flex items-center gap-2">
                {showCustomer ? (
                  <UserRoundCheck size={18} className="text-primary" />
                ) : (
                  <UserRoundPlus size={18} className="text-primary" />
                )}
                <div>
                  <p className="text-sm font-medium">
                    {showCustomer
                      ? "Never mind"
                      : "Requesting for someone? include customer details..."}
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    {showCustomer
                      ? "I am requesting for myself"
                      : "Add a requester’s name, email, and phone"}
                  </p>
                </div>
              </div>
              <Switch
                checked={showCustomer}
                onCheckedChange={(checked) => setShowCustomer(checked)}
                aria-label={
                  showCustomer
                    ? "Hide customer details"
                    : "Show customer details"
                }
              />
            </div>
          </div>

          {showCustomer && (
            <div className="grid grid-cols-2 gap-5">
              <div className="field mt-5">
                <label htmlFor="customerFirstName" style={{ fontSize: "13px" }}>
                  Customer first name
                </label>
                <input
                  style={{ height: "60px" }}
                  id="customer-first"
                  name="customerFirstName"
                  value={step4Data?.customerFirstName ?? ""}
                  onChange={(event) =>
                    getStep4Data("customerFirstName", event?.target?.value)
                  }
                  placeholder="John"
                  data-testid="input-customer-first"
                />
              </div>

              <div className="field mt-5">
                <label htmlFor="customerLastName" style={{ fontSize: "13px" }}>
                  Customer last name
                </label>
                <input
                  style={{ height: "60px" }}
                  id="customer-last"
                  name="customerLastName"
                  value={step4Data?.customerLastName ?? ""}
                  onChange={(event) =>
                    getStep4Data("customerLastName", event?.target?.value)
                  }
                  placeholder="Doe"
                  data-testid="input-customer-last"
                />
              </div>

              <div className="field mt-2">
                <label
                  htmlFor="customerPhoneNumber"
                  style={{ fontSize: "13px" }}
                >
                  Customer phone
                </label>
                <input
                  style={{ height: "60px" }}
                  id="customer-phone"
                  name="customerPhoneNumber"
                  value={step4Data?.customerPhoneNumber}
                  onChange={(event) =>
                    getStep4Data("customerPhoneNumber", event?.target?.value)
                  }
                  placeholder="(555) 014-0288"
                  data-testid="input-customer-phone"
                />
              </div>

              <div className="field mt-2">
                <label htmlFor="customerEmail" style={{ fontSize: "13px" }}>
                  Customer email
                </label>
                <input
                  style={{ height: "60px" }}
                  id="customer-email"
                  type="email"
                  name="customerEmail"
                  value={step4Data?.customerEmail ?? ""}
                  onChange={(event) =>
                    getStep4Data("customerEmail", event?.target?.value)
                  }
                  placeholder="you@example.com"
                  data-testid="input-customer-email"
                />
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
