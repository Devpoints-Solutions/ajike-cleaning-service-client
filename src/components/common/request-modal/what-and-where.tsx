import React, { useEffect, useState } from "react";
import { Loader } from "../loader";
import { SERVICES, FORM_NJ_CITIES, FORM_NY_CITIES } from "@/lib/dummy-data";
import { useForm } from "@/features/hooks/use-form";
import { useToast } from "@/features/hooks/use-toast";
import moment from "moment";
import { serviceSchema } from "@/helpers/data-validator-schema";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Switch } from "@/components/ui/switch";
import "./calandar.css";
import {
  categories,
  propertyTypes,
  plans,
  reOccurrentOptions,
} from "./service-data";

import {
  ChevronRight,
  CheckCircle2,
  ArrowRight,
  UserRoundPlus,
  UserRoundCheck,
  CalendarDays,
  ChevronLeft,
} from "lucide-react";
import ServiceSelector from "./service-selector";
import ProgressStepper from "./progress-stepper";
import { getSpecificDate } from "@/helpers/time";

function WhatAndWhere({
  isLoading,
  isSuccess,
  onSubmitRequest,
}: {
  isLoading: boolean;
  isSuccess: boolean;
  onSubmitRequest: (data: any) => void;
}) {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [step, setStep] = useState<number>(1);
  const [canContinue, setCanContinue] = useState<boolean>(false);
  const [showCustomer, setShowCustomer] = useState<boolean>(false);
  const { toast } = useToast();

  const { getFormInput, data, error, isValid } = useForm(serviceSchema);

  const handleContinue = () => {
    if (!canContinue) return;

    if (step === 6) return;
    setStep((prev) => prev + 1);

    if (isValid) return setCanContinue(true);
    setCanContinue(false);
  };

  const submit = (event: React.FormEvent) => {
    event.preventDefault();

    const payload = {
      title: data?.title,
      description: data?.description,
      propertyType: data?.propertyType,
      budget: data?.budget,
      customer: showCustomer
        ? {
            firstName: data?.customerFirstName,
            lastName: data?.customerLastName,
            phoneNumber: data?.customerPhoneNumber,
            email: data?.customerEmail,
          }
        : null,
      plan: data?.plan as "re-occurrent" | "one-time",
      planInterval: data?.planInterval || null,
      category: data?.category as "Pest" | "Cleaning" | "Both",
      address: data?.address,
      postcode: data?.postcode,
      serviceState: data?.serviceState || null,
      serviceCity: data?.serviceCity || null,
      status: "new",
      preferredDate: data?.preferredDate,
    };

    if (!isValid)
      return toast({
        title: `Invalid ${error?.field} value`,
        description: error?.message,
        variant: "default",
      });

    onSubmitRequest({
      ...payload,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      handleContinue();
    }
  }, [isSuccess]);

  return (
    <div className="min-h-screen bg-[#fafbfc] text-[#001625]">
      <div className="mx-auto flex min-h-screen w-full max-w-[720px] flex-col">
        {/* Top border */}
        <div className="h-px w-full bg-[#dce5ed]" />

        {/* Main content */}
        <main className="flex-1 px-6 pb-28 pt-4 sm:px-7">
          <ProgressStepper currentStep={step} />

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
                      selected={data?.category === item.name}
                      onClick={() => {
                        getFormInput(undefined, "category", item.name);
                        if (data?.title) setCanContinue(true);
                      }}
                    />
                  ))}
                </div>
              </section>

              {/* Service */}

              <section>
                <h2 className="mt-6 text-[14px] font-semibold text-[#001625]">
                  Service
                </h2>

                <div className="space-y-3">
                  {SERVICES.map((item) => (
                    <ServiceSelector
                      key={item.id}
                      item={item}
                      selected={data?.title === item.name}
                      onClick={() => {
                        getFormInput(undefined, "title", item?.name);

                        if (data?.category) {
                          setCanContinue(true);
                        }
                      }}
                    />
                  ))}
                </div>
              </section>
            </>
          )}

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
                      selected={data?.propertyType === item.name}
                      onClick={() => {
                        getFormInput(undefined, "propertyType", item.name);
                        if (data?.plan && data?.planInterval)
                          setCanContinue(true);
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
                      selected={data?.plan === item.name}
                      onClick={() => {
                        getFormInput(undefined, "plan", item.name);

                        if (item?.name === "One Time" && data?.propertyType) {
                          setCanContinue(true);
                        }
                        if (
                          item?.name === "Re-occurrent" &&
                          !data?.planInterval &&
                          canContinue
                        ) {
                          setCanContinue(false);
                        }
                        if (
                          item?.name === "Re-occurrent" &&
                          data?.propertyType &&
                          data?.planInterval
                        ) {
                          setCanContinue(true);
                        }
                      }}
                    />
                  ))}
                </div>
              </section>

              {/* Service */}
              {data?.plan === "Re-occurrent" && (
                <section>
                  <h2 className="mt-6 text-[14px] font-semibold text-[#001625]">
                    Plan Schedule
                  </h2>

                  <div className="space-y-3">
                    {reOccurrentOptions.map((item) => (
                      <ServiceSelector
                        key={item.name}
                        item={item}
                        selected={data?.planInterval === item.name}
                        onClick={() => {
                          getFormInput(undefined, "planInterval", item?.name);

                          if (data?.plan && data?.propertyType) {
                            setCanContinue(true);
                          }
                        }}
                      />
                    ))}
                  </div>
                </section>
              )}
            </>
          )}

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

                              getFormInput(
                                undefined,
                                "preferredDate",
                                formattedDate,
                              );

                              if (
                                data?.postcode &&
                                data?.serviceState &&
                                data?.serviceCity &&
                                data?.address
                              ) {
                                return setCanContinue(true);
                              } else {
                                setCanContinue(false);
                              }
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
                    value={data?.postcode}
                    onChange={(event) => {
                      getFormInput(event);

                      if (
                        data?.preferredDate &&
                        data?.serviceState &&
                        data?.serviceCity &&
                        data?.address &&
                        data?.postcode
                      ) {
                        return setCanContinue(true);
                      } else {
                        setCanContinue(false);
                      }
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
                      getFormInput(event);
                      if (
                        data?.preferredDate &&
                        data?.postcode &&
                        data?.serviceCity &&
                        data?.address
                      ) {
                        return setCanContinue(true);
                      } else {
                        setCanContinue(false);
                      }
                    }}
                    data-testid="select-request-service-state"
                  >
                    <option value="">Select state</option>
                    <option value="New Jersey">New Jersey</option>
                    <option value="New York">New York</option>
                  </select>
                </div>
              </section>

              <section className="mt-3">
                <h2 className="mb-3 text-[14px] font-semibold text-[#001625]">
                  Select your city
                </h2>

                {data?.serviceState === "New York" ? (
                  <div className="space-y-3 overflow-y-auto h-[400px]">
                    {FORM_NY_CITIES.map((item) => (
                      <ServiceSelector
                        key={item.name}
                        item={item}
                        selected={data?.serviceCity === item.name}
                        onClick={() => {
                          getFormInput(undefined, "serviceCity", item.name);
                          if (
                            data?.preferredDate &&
                            data?.postcode &&
                            data?.serviceState &&
                            data?.address
                          ) {
                            return setCanContinue(true);
                          } else {
                            setCanContinue(false);
                          }
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
                        selected={data?.serviceCity === item.name}
                        onClick={() => {
                          getFormInput(undefined, "serviceCity", item.name);
                          if (
                            data?.preferredDate &&
                            data?.postcode &&
                            data?.serviceState &&
                            data?.address
                          ) {
                            return setCanContinue(true);
                          } else {
                            setCanContinue(false);
                          }
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
                  value={data?.address}
                  onChange={(event) => {
                    getFormInput(event);
                    if (
                      data?.preferredDate &&
                      data?.postcode &&
                      data?.serviceState &&
                      data?.serviceCity &&
                      data?.address
                    ) {
                      return setCanContinue(true);
                    } else {
                      setCanContinue(false);
                    }
                  }}
                  placeholder="Street address"
                  data-testid="input-request-address"
                  style={{ borderRadius: "12px" }}
                />
              </div>
            </>
          )}

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
                <label
                  htmlFor="request-description"
                  style={{ fontSize: "13px" }}
                >
                  Special instructions
                </label>
                <textarea
                  id="request-description"
                  name="description"
                  value={data?.description}
                  onChange={(event) => {
                    getFormInput(event);

                    if (error?.field !== "description") {
                      setCanContinue(true);
                    } else {
                      setCanContinue(false);
                    }
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
                    className={`text-[12px] font-bold ${data?.description?.trim()?.length < 50 || data?.description?.trim()?.length > 1000 ? "text-[#ff0000]" : ""}`}
                    role="alert"
                    data-testid="text-signin-error"
                  >
                    {data?.description?.trim()?.length <= 0
                      ? 0
                      : data?.description?.trim()?.length}
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
                    <label
                      htmlFor="customerFirstName"
                      style={{ fontSize: "13px" }}
                    >
                      Customer first name
                    </label>
                    <input
                      style={{ height: "60px" }}
                      id="customer-first"
                      name="customerFirstName"
                      value={data?.customerFirstName}
                      onChange={(event) => getFormInput(event)}
                      placeholder="John"
                      data-testid="input-customer-first"
                    />
                  </div>

                  <div className="field mt-5">
                    <label
                      htmlFor="customerLastName"
                      style={{ fontSize: "13px" }}
                    >
                      Customer last name
                    </label>
                    <input
                      style={{ height: "60px" }}
                      id="customer-last"
                      name="customerLastName"
                      value={data?.customerLastName}
                      onChange={(event) => getFormInput(event)}
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
                      value={data?.customerPhoneNumber}
                      onChange={(event) => getFormInput(event)}
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
                      value={data?.customerEmail}
                      onChange={(event) => getFormInput(event)}
                      placeholder="you@example.com"
                      data-testid="input-customer-email"
                    />
                  </div>
                </div>
              )}
            </>
          )}

          {step === 5 && (
            <>
              <div className="mb-6">
                <h1 className="text-[22px] font-bold tracking-[-0.3px] text-[#001625]">
                  Review your request
                </h1>

                <p className="mt-1 text-[15px] text-[#53657a]">
                  Confirm the details below before you submit
                </p>
              </div>

              <div className="w-full max-w-[450px] line-clamp-5 lg:max-w-none  mx-auto bg-[#f8f9fb] p-4 text-[15px] text-slate-700">
                {/* Service Summary Card */}
                <div className="rounded-xl border border-slate-200 bg-white shadow-[0_3px_10px_rgba(15,23,42,0.08)] overflow-hidden">
                  <div className="px-3 py-3.5">
                    {/* Service type */}
                    <div className="flex items-start justify-between gap-4 mb-1.5">
                      <span className="text-slate-500">Requested Service</span>
                      <span className="font-semibold text-slate-800 text-right">
                        {data?.title}
                      </span>
                    </div>

                    {/* Property */}
                    <div className="flex items-start justify-between gap-4 mb-1.5">
                      <span className="text-slate-500">Property</span>
                      <span className="font-semibold text-slate-800 text-right">
                        {data?.propertyType}
                      </span>
                    </div>

                    {/* Main service */}
                    <div className="flex items-start justify-between gap-4 mb-1.5">
                      <span className="text-slate-500">Category</span>
                      <span className="font-semibold text-slate-800 text-right">
                        {data?.category}
                      </span>
                    </div>

                    {/* Add-ons */}
                    <div className="flex items-start justify-between gap-4 mb-1.5">
                      <span className="text-slate-500">Add-ons</span>
                      <span className="font-semibold text-slate-800 text-right">
                        None
                      </span>
                    </div>

                    {/* When */}
                    <div className="flex items-start justify-between gap-4 mb-1.5">
                      <span className="text-slate-500">When</span>
                      <span className="font-semibold text-slate-800 text-right">
                        {getSpecificDate(data?.preferredDate).fullDate}
                      </span>
                    </div>

                    {/* Location */}
                    <div className="flex items-start justify-between gap-4">
                      <span className="text-slate-500 shrink-0">Location</span>

                      <span className="max-w-[280px] text-right font-semibold leading-[1.15] text-slate-800">
                        {data?.address}
                      </span>
                    </div>
                  </div>

                  {/* Estimated price */}
                  <div className="border-t border-slate-200 px-3 py-2.5 flex items-center justify-between">
                    <span className="font-medium text-slate-500">
                      Estimated from
                    </span>

                    <span className="text-[13px] font-bold text-emerald-600">
                      {data?.budget?.split(" ")[1]}
                    </span>
                  </div>
                </div>
              </div>
            </>
          )}

          {step === 6 && (
            <>
              <div className="success-panel">
                <div className="success-icon">
                  <CheckCircle2 size={25} />
                </div>
                <h3>We have your request.</h3>
                <p className="text-center">
                  A service coordinator will reach out during business hours to
                  confirm the details and offer a visit window. No payment is
                  needed to request an inspection.
                </p>
                <button
                  className="primary-button"
                  data-testid="button-close-request-success"
                >
                  Back to dashboard <ArrowRight size={15} />
                </button>
              </div>
            </>
          )}
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
                getFormInput(
                  undefined,
                  "budget",
                  SERVICES?.find((service) => service?.name === data?.title)
                    ?.price,
                );
              }}
              disabled={!canContinue || isLoading || isSuccess}
              className={`flex button-small h-[52px] min-w-[158px] items-center justify-center gap-2 rounded-full px-7 text-[15px] font-semibold transition-all duration-200 ${
                canContinue || isLoading || isSuccess
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
