import {
  Check,
  Clock3,
  MapPin,
  ShieldCheck,
  ClipboardCheck,
  Camera,
  ArrowRight,
} from "lucide-react";

import CtaButton from "@/components/common/cta-button";

const processSteps = [
  {
    icon: ClipboardCheck,
    title: "Request",
    description: "Tell us the details and schedule.",
  },
  {
    icon: ShieldCheck,
    title: "We assign",
    description: "A verified pro is dispatched to you.",
  },
  {
    icon: Camera,
    title: "Proof",
    description: "Photos & checklist on completion.",
  },
];

const ServiceCoverage = ({ serviceDetails }: { serviceDetails: any }) => {
  console.log(serviceDetails);

  return (
    <section className="w-full bg-white text-[#001625]">
      <div className="mx-auto w-full max-w-[1240px] px-5 py-12 sm:px-6 md:py-16 lg:px-8 lg:py-20">
        <div
          className="
            grid
            grid-cols-1
            items-start
            gap-10
            lg:grid-cols-[minmax(0,1fr)_475px]
            lg:gap-12
          "
        >
          {/* LEFT CONTENT */}
          <div className="min-w-0">
            {/* What's Included */}
            <div>
              <p className="eyebrow mb-3">What's included</p>

              <h2 className="max-w-[700px] text-4xl font-bold leading-[1.08] tracking-[-0.035em] text-[#001625] sm:text-5xl lg:text-[50px]">
                {serviceDetails?.name} covers
              </h2>

              <div className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {serviceDetails?.included?.map(
                  (item: string, index: number) => (
                    <div
                      key={index}
                      className="
                        flex min-h-[68px] items-center gap-4
                        rounded-[20px]
                        border border-slate-200
                        bg-white
                        px-5 py-4
                        shadow-[0_6px_20px_rgba(0,22,37,0.06)]
                        transition-all duration-200
                        hover:-translate-y-0.5
                        hover:border-[#1687b6]/30
                        hover:shadow-[0_10px_28px_rgba(0,22,37,0.09)]
                      "
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#001625] text-white">
                        <Check size={15} strokeWidth={3} />
                      </span>

                      <span className="text-[15px] font-medium font-semibold leading-6 text-[#001625] sm:text-base">
                        {item}
                      </span>
                    </div>
                  ),
                )}
              </div>
            </div>

            {/* How it works */}
            <div className="mt-16 sm:mt-20 lg:mt-24">
              <p className="eyebrow mb-3">How it works</p>

              <h2 className="text-4xl font-bold leading-[1.08] tracking-[-0.035em] text-[#001625] sm:text-5xl lg:text-[50px]">
                Simple, documented process
              </h2>

              <div className="mt-9 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {processSteps.map((step, index) => {
                  const Icon = step.icon;

                  return (
                    <div
                      key={index}
                      className="
                        rounded-[22px]
                        border border-slate-200
                        bg-white
                        p-6
                        shadow-[0_6px_20px_rgba(0,22,37,0.06)]
                        transition-all duration-200
                        hover:-translate-y-1
                        hover:border-[#1687b6]/30
                        hover:shadow-[0_12px_28px_rgba(0,22,37,0.09)]
                        sm:min-h-[180px]
                      "
                    >
                      <div className="mb-5">
                        <Icon
                          size={28}
                          strokeWidth={2}
                          className="text-[#1687b6]"
                        />
                      </div>

                      <h3 className="text-xl font-bold tracking-[-0.02em] text-[#001625]">
                        {step.title}
                      </h3>

                      <p className="mt-2 max-w-[250px] text-base font-semibold leading-6 text-slate-600">
                        {step.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* STICKY SIDEBAR */}
          <aside
            className="
              w-full
              self-start
              lg:sticky
              lg:top-20
              lg:self-start
            "
          >
            <div
              className="
                w-full
                rounded-[28px]
                border border-slate-200
                bg-white
                p-7
                shadow-[0_15px_40px_rgba(0,22,37,0.09)]
                sm:p-8
                lg:p-9
              "
            >
              {/* Badge */}
              <div className="mb-5 inline-flex items-center rounded-full border border-[#1687b6]/30 bg-[#1687b6]/5 px-3.5 py-1.5">
                <span className="text-sm font-semibold text-[#1687b6]">
                  Most booked
                </span>
              </div>

              {/* Starting Price */}
              <p className="text-base font-medium text-slate-600">
                Starting from
              </p>

              <div className="mt-0.5">
                <span className="text-5xl font-bold tracking-[-0.04em] text-[#001625] sm:text-[52px]">
                  {serviceDetails?.price?.split(" ")[1]}
                </span>
              </div>

              {/* Service Information */}
              <div className="mt-6 space-y-4">
                <div className="flex items-center gap-3 text-[#001625]">
                  <Clock3
                    size={20}
                    strokeWidth={2}
                    className="shrink-0 text-[#1687b6]"
                  />
                  <span className="text-base font-semibold sm:text-[17px]">
                    2–4 hrs
                  </span>
                </div>

                <div className="flex items-center gap-3 text-[#001625]">
                  <MapPin
                    size={20}
                    strokeWidth={2}
                    className="shrink-0 text-[#1687b6]"
                  />
                  <span className="text-base font-semibold sm:text-[17px]">
                    New Jersey & New York
                  </span>
                </div>

                <div className="flex items-center gap-3 text-[#001625]">
                  <ShieldCheck
                    size={20}
                    strokeWidth={2}
                    className="shrink-0 text-[#1687b6]"
                  />
                  <span className="text-base font-semibold sm:text-[17px]">
                    Verified, vetted professionals
                  </span>
                </div>
              </div>

              <CtaButton
                icon={<ArrowRight size={25} />}
                text="Request This Service"
                props={{
                  className: `
                    mt-8
                    flex
                    w-full
                    items-center
                    justify-center
                    rounded-full
                    bg-[#001625]
                    px-6
                    py-4
                    text-base
                    font-bold
                    text-white
                    shadow-[0_8px_20px_rgba(22,135,182,0.2)]
                    transition-all
                    duration-200
                    hover:-translate-y-0.5
                    hover:bg-[#1687b6]
                    hover:shadow-[0_12px_25px_rgba(22,135,182,0.3)]
                    active:translate-y-0
                    sm:py-[18px]
                  `,
                }}
              />

              <p className="mt-4 text-center font-semibold text-sm leading-5 text-slate-500">
                Final quote depends on size & condition.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default ServiceCoverage;
