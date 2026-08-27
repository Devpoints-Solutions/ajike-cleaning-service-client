import { ArrowRight, Wrench } from "lucide-react";
import { useServiceContext } from "@/features/contexts/service-context";

function SupportCta() {
  const { toggleChat, showChat } = useServiceContext();

  return (
    <section className="mt-5 overflow-hidden rounded-2xl bg-[#122560] px-6 py-7 text-white sm:px-8">
      <div className="flex flex-col items-start justify-between gap-5 md:flex-row md:items-center">
        <div>
          <div className="mb-2 flex items-center gap-2 text-[#72c9e8]">
            <Wrench size={17} />

            <span className="text-xs font-bold uppercase tracking-[0.13em]">
              Need assistance?
            </span>
          </div>

          <h3 className="text-xl font-bold">
            We're here whenever you need us.
          </h3>

          <p className="mt-1 max-w-xl text-sm text-slate-300">
            Have a question about an existing service or need help requesting
            something new?
          </p>
        </div>

        <button
          onClick={() => !showChat && toggleChat()}
          className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-[#001625] transition hover:bg-[#eaf7fb]"
        >
          Message the care team
          <ArrowRight size={16} />
        </button>
      </div>
    </section>
  );
}

export default SupportCta;
