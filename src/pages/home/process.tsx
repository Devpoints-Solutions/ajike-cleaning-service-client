function Process() {
  const steps = [
    {
      number: "01",
      label: "ASK",
      title: "Share what you see",
      description:
        "Tell us about the space, the symptoms, and your timing. A request takes about two minutes.",
    },
    {
      number: "02",
      label: "PLAN",
      title: "Meet your service pro",
      description:
        "We confirm the scope, explain the recommendation, and give you transparent pricing before work starts.",
    },
    {
      number: "03",
      label: "PROVE",
      title: "Get your place back",
      description:
        "We do the work carefully, share the result, and make the next step clear if follow-up is useful.",
    },
  ];

  return (
    <section id="process" className="bg-[#001625] py-20 px-6 sm:px-8 lg:px-12">
      <div className="custom-container mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-14 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <span className="eyebrow">No mystery in the middle</span>

            <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              From “something is off” to handled.
            </h2>
          </div>

          <p className="max-w-md text-base leading-7 text-white/70">
            A simple service flow that keeps you informed without asking you to
            chase us.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {steps.map((step, _index) => (
            <div
              key={step.number}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.06] p-7 shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:border-white/20 hover:bg-white/[0.09] hover:shadow-2xl"
            >
              {/* Decorative number */}
              <div className="absolute -right-5 -top-8 text-8xl font-black text-white/[0.04] transition-transform duration-500 group-hover:scale-110">
                {step.number}
              </div>

              {/* Step number */}
              <div className="relative mb-8 flex items-center justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-sm font-bold text-[#071f2c] shadow-md">
                  {step.number}
                </span>

                <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/50">
                  {step.label}
                </span>
              </div>

              {/* Content */}
              <div className="relative">
                <h3 className="mb-4 text-2xl font-bold text-[#1687b6]">
                  {step.title}
                </h3>

                <p className="text-sm leading-7 text-white/65">
                  {step.description}
                </p>
              </div>

              {/* Bottom accent */}
              <div className="mt-8 h-1 w-12 rounded-full bg-white/30 transition-all duration-300 group-hover:w-full group-hover:bg-white" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Process;
