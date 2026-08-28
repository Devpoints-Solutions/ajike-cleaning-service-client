import { getSpecificDate, extractPrice } from "@/helpers/time";

export function Step5({ step, data }: { step: number; data: any }) {

  
  return (
    <>
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
                <div className="flex items-start justify-between gap-4 mb-4">
                  <span className="text-slate-500">Requested Service</span>
                  <span className="font-semibold text-slate-800 text-right">
                    {data?.title}
                  </span>
                </div>

                {/* Property */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <span className="text-slate-500">Property</span>
                  <span className="font-semibold text-slate-800 text-right">
                    {data?.propertyType}
                  </span>
                </div>

                {/* Main service */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <span className="text-slate-500">Category</span>
                  <span className="font-semibold text-slate-800 text-right">
                    {data?.category}
                  </span>
                </div>

                {/* Add-ons */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <span className="text-slate-500">Service plan</span>
                  <span className="font-semibold text-slate-800 text-right">
                    {data?.plan}
                  </span>
                </div>

                {/* When */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <span className="text-slate-500">When</span>
                  <span className="font-semibold text-slate-800 text-right">
                    {getSpecificDate(data?.preferredDate).fullDate}
                  </span>
                </div>

                {/* Location */}
                <div className="flex items-start justify-between gap-4">
                  <span className="text-slate-500 shrink-0">Location</span>

                  <span className="max-w-[280px] text-right font-semibold leading-[2] text-slate-800">
                    {data?.address}
                  </span>
                </div>

                {data?.plan && data?.plan?.toLowerCase() === "re-occurrent" && (
                  <div className="flex text-[13px] font-bold items-start justify-start gap-4 my-4">
                    <span className="text-slate-500">
                      Your re-occurrent plan will run {data?.planInterval} and
                      for a perid of{" "}
                      <span className="font-semibold text-slate-800 text-right">
                        {data?.planPeriod}
                      </span>{" "}
                    </span>
                  </div>
                )}
              </div>

              {/* Estimated price */}
              <div className="border-t border-slate-200 px-3 py-2.5 flex items-center justify-between">
                <span className="font-medium text-slate-500">
                  Estimated from
                </span>

                {data?.plan && data?.plan?.toLowerCase() === "re-occurrent" && (
                  <span className="text-[13px] font-bold text-emerald-600">
                    ${extractPrice(data?.budget, data?.planPeriod)}
                  </span>
                )}
                {data?.plan && data?.plan?.toLowerCase() !== "re-occurrent" && (
                  <span className="text-[13px] font-bold text-emerald-600">
                    {data?.budget}
                  </span>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
