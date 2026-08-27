import { ArrowRight, CalendarDays, Clock3, MapPin } from "lucide-react";
import { useServiceContext } from "@/features/contexts/service-context";
import { getSpecificDate } from "@/helpers/time";
import type { IService } from "@/lib/types";
import { Link } from "wouter";

function NextVisitCard() {
  const { nextVisit } = useServiceContext();

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_2px_10px_rgba(0,22,37,0.03)] sm:p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.13em] text-[#1687b6]">
            Next visit
          </p>

          <h3 className="mt-1 text-lg font-bold">
            {nextVisit ? "Your upcoming service" : "Schedule your next service"}
          </h3>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
          <CalendarDays size={18} />
        </div>
      </div>

      {nextVisit ? (
        <UpcomingService service={nextVisit} />
      ) : (
        <EmptyUpcomingService />
      )}
    </div>
  );
}

function UpcomingService({ service }: { service: IService }) {
  return (
    <div className="mt-6">
      {/* Date */}
      <div className="flex items-center gap-4 rounded-2xl bg-[#eaf7fb] p-4">
        <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-xl bg-white shadow-sm">
          <span className="text-[10px] font-bold uppercase text-[#1687b6]">
            {getSpecificDate(service?.preferredDate!).monthName}
          </span>

          <span className="text-xl font-bold leading-none">
            {" "}
            {getSpecificDate(service?.preferredDate!).dayDate}
          </span>
        </div>

        <div>
          <p className="text-sm font-bold">{service?.title}</p>

          <p className="mt-1 text-xs text-slate-500">
            {getSpecificDate(service?.preferredDate!)?.fullDate}
          </p>

          <div className="mt-1.5 flex items-center gap-1.5 text-xs text-slate-500">
            <Clock3 size={13} />
            10:00 AM – 11:30 AM
          </div>
        </div>
      </div>

      {/* Location */}
      <div className="mt-4 flex items-center gap-3 rounded-xl border border-slate-200 p-3.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100">
          <MapPin size={16} className="text-[#1687b6]" />
        </div>

        <div>
          <p className="text-xs font-semibold">Service location</p>

          <p className="mt-0.5 text-xs text-slate-500">
            {service?.serviceState} {service?.serviceCity}
          </p>
        </div>
      </div>

      {/* Status */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />

          <span className="text-xs font-medium text-slate-600">
            Service confirmed
          </span>
        </div>

        <Link
          href={`/dashboard/services/${service?._id}`}
          className="text-xs font-semibold text-[#1687b6] hover:underline"
        >
          View details
        </Link>
      </div>
    </div>
  );
}

function EmptyUpcomingService() {
  const { toggleNewModal } = useServiceContext();

  return (
    <div className="mt-6 flex min-h-[250px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-5 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#1687b6] shadow-sm">
        <CalendarDays size={25} />
      </div>

      <h4 className="font-bold">No approved service yet</h4>

      <p className="mt-1 max-w-sm text-sm text-slate-500">
        Once a service is approved, your upcoming visit will appear here.
      </p>

      <button
        onClick={toggleNewModal}
        className="mt-5 inline-flex items-center gap-2 rounded-xl border border-[#1687b6]/30 bg-[#eaf7fb] px-5 py-2.5 text-sm font-semibold text-[#001625] transition hover:bg-[#d9f1f8]"
      >
        Request a service
        <ArrowRight size={16} className="text-[#1687b6]" />
      </button>
    </div>
  );
}

export default NextVisitCard;
