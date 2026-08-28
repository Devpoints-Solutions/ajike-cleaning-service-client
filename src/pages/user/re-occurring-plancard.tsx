import {
  ArrowRight,
  Heart,
  ShieldCheck,
  Wrench,
  Repeat2,
  ChevronRight,
} from "lucide-react";
import { Link } from "wouter";
import { useServiceContext } from "@/features/contexts/service-context";
import type { IService } from "@/lib/types";
import { getNextVisit } from "@/helpers/time";

function ActiveRecurringPlan({ service }: { service: IService }) {
  const intervalDays = getNextVisit(
    service?.preferredDate,
    service?.planInterval,
  ).intervalDays;

  const nextVisit = getNextVisit(
    service?.preferredDate,
    service?.planInterval,
  ).nextVisit;

  const percentageProgress =
    (Number(service?.visitCompleted || 0) / Number(service?.planPeriod)) * 100;

  console.log(percentageProgress);

  return (
    <div className="mt-6 rounded-2xl border border-white/70 bg-white/70 p-4 sm:p-5">
      {/* Plan header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#1687b6] text-white">
            <Wrench size={19} />
          </div>

          <div>
            <p className="text-sm font-bold">{service?.title}</p>

            <p className="mt-0.5 text-xs text-slate-500">
              Recurring maintenance
            </p>
          </div>
        </div>

        <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-emerald-700">
          {service?.status?.toLowerCase() === "pending"
            ? "Active"
            : service?.status}
        </span>
      </div>

      {/* Plan details */}
      <div className="mt-5 grid grid-cols-2 gap-3">
        <PlanDetail label="Frequency" value={`Every ${intervalDays} days`} />

        <PlanDetail label="Next service" value={nextVisit} />
      </div>

      {/* Progress */}
      <div className="mt-5">
        <div className="mb-2 flex items-center justify-between text-xs">
          <span className="font-medium text-slate-500">Current cycle</span>

          <span className="font-semibold text-[#001625]">
            {percentageProgress}% complete
          </span>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-slate-200">
          {percentageProgress > 0 ? (
            <div
              className={`h-full w-[${percentageProgress}%] rounded-full bg-[#1687b6]`}
            />
          ) : (
            <div className={`h-full w-[0%] rounded-full bg-[#1687b6]`} />
          )}
        </div>
      </div>

      {/* Action */}
      <Link
        href={`/dashboard/services/${service?._id}`}
        className="mt-5 flex w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold transition hover:border-[#1687b6]/30 hover:bg-[#f8fcfd]"
      >
        Manage recurring plan
        <ChevronRight size={17} className="text-[#1687b6]" />
      </Link>
    </div>
  );
}

function EmptyRecurringPlan() {
  const { toggleNewModal } = useServiceContext();

  return (
    <div className="mt-6 flex flex-1 flex-col items-center justify-center rounded-2xl border border-dashed border-[#1687b6]/25 bg-white/40 px-5 py-8 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#1687b6] shadow-sm">
        <Heart size={25} />
      </div>

      <h4 className="text-base font-bold">No active recurring plan</h4>

      <p className="mt-1 max-w-sm text-sm leading-6 text-slate-600">
        Set up recurring services and we'll help keep your property maintained
        automatically.
      </p>

      <button
        onClick={toggleNewModal}
        className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#001625] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#06283a]"
      >
        Explore recurring plans
        <ArrowRight size={16} />
      </button>
    </div>
  );
}

function PlanDetail({ label, value }: any) {
  return (
    <div className="rounded-xl bg-slate-50 p-3">
      <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-xs font-bold">{value}</p>
    </div>
  );
}

function RecurringPlanCard() {
  const { reOccurrentPlan } = useServiceContext();
  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#b7e0ef] bg-[#e5f6fb] p-5 sm:p-6">
      <div className="absolute -right-16 -top-20 h-48 w-48 rounded-full bg-white/30" />

      <div className="relative z-10 flex h-full flex-col">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.13em] text-[#1687b6]">
              Recurring plan
            </p>

            <h3 className="mt-1 text-lg font-bold">
              {reOccurrentPlan
                ? "Your recurring service plan"
                : "Keep your services on schedule"}
            </h3>
          </div>

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#1687b6] shadow-sm">
            {reOccurrentPlan ? (
              <Repeat2 size={19} />
            ) : (
              <ShieldCheck size={19} />
            )}
          </div>
        </div>

        {reOccurrentPlan ? (
          <ActiveRecurringPlan service={reOccurrentPlan} />
        ) : (
          <EmptyRecurringPlan />
        )}
      </div>
    </div>
  );
}

export default RecurringPlanCard;
