import { useState, useEffect } from "react";
import { FORM_NJ_CITIES, FORM_NY_CITIES } from "../service-data";
import moment from "moment";
import DatePicker from "react-datepicker";
import { step3Schema } from "./steps-schema-validators";
import type { ErrorType } from "@/lib/types";
import { CalendarDays } from "lucide-react";
import ServiceSelector from "../service-selector";

export function Step3({
  step,
  setCanContinue,
}: {
  step: number;
  setCanContinue: (canContinue: boolean, data: any) => void;
}) {
  const [error, setError] = useState<ErrorType>();

  const [step3Data, setStep3Data] = useState<{
    preferredDate: string;
    postcode: string;
    serviceState: string;
    serviceCity: string;
    address: string;
  } | null>();

  const [selectedDate, setSelectedDate] = useState<Date>();

  function getStep3Data(name: string, value: string) {
    return setStep3Data((current) => ({
      preferredDate: current?.preferredDate ?? "",
      postcode: current?.postcode ?? "",
      serviceState: current?.serviceState ?? "",
      serviceCity: current?.serviceCity ?? "",
      address: current?.address ?? "",

      [name]: value,
    }));
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      (async () => {
        try {
          await step3Schema.validate(step3Data, { abortEarly: false });

          setError({ message: "", field: "" });

          setCanContinue(true, step3Data);
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
  }, [step3Data]);

  return (
    <>
      {step === 3 && (
        <>
          <div className="mb-6">
            <h1 className="text-[22px] font-bold tracking-[-0.3px] text-[#001625]">
              Where do you need our service
            </h1>

            <p className="mt-1 text-[15px] text-[#53657a]">
              Tell us where you are, and a landmark close to you
            </p>
          </div>
          <section className="mt-3 gap-5 flex items-ce">
            <div>
              <h2 className="text-[14px] mb-1 font-semibold text-[#001625]">
                Choose a preferred date
              </h2>

              <div className="space-y-3 w-full">
                <div className="relative w-full max-w-sm">
                  <CalendarDays
                    size={20}
                    className="absolute left-4 top-1/2 z-10 -translate-y-1/2 text-slate-400"
                  />

                  <div className="relative">
                    <CalendarDays
                      className="absolute left-4 top-1/2 z-20 -translate-y-1/2 text-gray-400"
                      size={18}
                    />

                    <DatePicker
                      selected={selectedDate}
                      onChange={(date: any) => {
                        if (date) {
                          setSelectedDate(date);
                          const formattedDate =
                            moment(date).format("YYYY-MM-DD");

                          getStep3Data("preferredDate", formattedDate);
                        }
                      }}
                      filterDate={(date) => moment(date).day() !== 0}
                      minDate={new Date()}
                      dateFormat="yy-MM-dd"
                      placeholderText="Choose date"
                      calendarClassName="custom-calendar"
                      className="
                                h-12 w-full rounded-xl
                                border border-gray-200
                                bg-white
                                pl-11 pr-4
                                text-sm font-medium text-gray-700
                                shadow-sm
                                transition-all
                                placeholder:text-gray-400
                                hover:border-gray-300
                                focus:border-indigo-500
                                focus:outline-none
                                focus:ring-4
                                focus:ring-indigo-500/10
                                "
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="field" style={{ height: "72px" }}>
              <label htmlFor="address" style={{ fontSize: "13px" }}>
                Postcode
              </label>
              <input
                id="request-address"
                name="postcode"
                value={step3Data?.postcode}
                onChange={(event) => {
                  getStep3Data("postcode", event?.target?.value);
                }}
                placeholder="10001 (optional)"
                data-testid="input-request-address"
                style={{ borderRadius: "15px" }}
              />
            </div>

            <div className="field">
              <label htmlFor="serviceState" style={{ fontSize: "13px" }}>
                State
              </label>
              <select
                id="request-service-state"
                name="serviceState"
                onChange={(event) => {
                  getStep3Data("serviceState", event?.target?.value);
                }}
                data-testid="select-request-service-state"
              >
                <option value="">Select state</option>
                <option value="New Jersey">New Jersey</option>
                <option value="New York">New York</option>
              </select>
            </div>
          </section>

          <section className="mt-2 flex items-center justify-between">
            <div>
              {error && error?.field === "preferredDate" && (
                <div
                  className="auth-error"
                  role="alert"
                  data-testid="text-signin-error"
                >
                  {error?.message}
                </div>
              )}
            </div>

            <div>
              {error && error?.field === "postcode" && (
                <div
                  className="auth-error"
                  role="alert"
                  data-testid="text-signin-error"
                >
                  {error?.message}
                </div>
              )}
            </div>

            <div>
              {error && error?.field === "serviceState" && (
                <div
                  className="auth-error"
                  role="alert"
                  data-testid="text-signin-error"
                >
                  {error?.message}
                </div>
              )}
            </div>
          </section>

          <section className="mt-3">
            <h2 className="mb-3 text-[14px] font-semibold text-[#001625]">
              Select your city
            </h2>

            {step3Data?.serviceState === "New York" ? (
              <div className="space-y-3 overflow-y-auto h-[400px]">
                {FORM_NY_CITIES.map((item) => (
                  <ServiceSelector
                    key={item.name}
                    item={item}
                    selected={step3Data?.serviceCity === item.name}
                    onClick={() => {
                      getStep3Data("serviceCity", item.name);
                    }}
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-3 overflow-y-auto h-[400px]">
                {FORM_NJ_CITIES.map((item) => (
                  <ServiceSelector
                    key={item.name}
                    item={item}
                    selected={step3Data?.serviceCity === item.name}
                    onClick={() => {
                      getStep3Data("serviceCity", item.name);
                    }}
                  />
                ))}
              </div>
            )}
          </section>

          <div className="field full mt-5" style={{ height: "72px" }}>
            <label htmlFor="address" style={{ fontSize: "13px" }}>
              Address
            </label>
            <input
              id="request-address"
              name="address"
              value={step3Data?.address}
              onChange={(event) => {
                getStep3Data("address", event?.target?.value);
              }}
              placeholder="Street address"
              data-testid="input-request-address"
              style={{ borderRadius: "12px" }}
            />

            {error && error?.field === "address" && (
              <div
                className="auth-error"
                role="alert"
                data-testid="text-signin-error"
              >
                {error?.message}
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}
