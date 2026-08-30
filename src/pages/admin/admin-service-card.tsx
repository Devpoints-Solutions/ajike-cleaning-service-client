import { useState } from "react";
import {
  Building2,
  CalendarDays,
  Repeat2,
  Wallet,
  Eye,
  MoreVertical,
} from "lucide-react";
import { Link } from "wouter";
import { getSpecificDate } from "@/helpers/time";

const AdminServiceCard = ({ service }: any) => {
  const [showActions, setShowActions] = useState<{ [key: string]: boolean }>(
    {},
  );

  const toggleActions = (_id: string) => {
    setShowActions((prev) => ({
      ...prev,
      [_id]: !prev[_id],
    }));
  };

  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md">
      {/* Top */}
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          {/* Status */}
          <div className="mb-3 flex items-center gap-2">
            <span
              className={`h-2 w-2 rounded-full ${
                service?.status === "new"
                  ? "bg-blue-500"
                  : service?.status === "pending"
                    ? "bg-amber-500"
                    : service?.status === "completed"
                      ? "bg-emerald-500"
                      : "bg-slate-400"
              }`}
            />

            <span className="text-xs font-semibold capitalize text-slate-500">
              {service?.status}
            </span>

            <span className="text-slate-300">•</span>

            <span className="text-xs font-medium text-slate-400">
              {service?.category}
            </span>
          </div>

          {/* Title */}
          <h3 className="truncate text-lg font-bold text-slate-900">
            {service?.title}
          </h3>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Building2 size={14} />

            <span>
              {service?.serviceCity}, {service?.serviceState}
            </span>
          </div>
        </div>

        {/* Category badge */}
        <div className="flex items-center">
          <span className="hidden shrink-0 rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600 sm:block">
            {service?.propertyType}
          </span>

          <div className="schedule-row-actions">
            <button
              className="icon-button"
              onClick={() => toggleActions(service?._id)}
              aria-label={`Actions for ${service?._id}`}
              data-testid={`button-schedule-actions-${service?._id}`}
            >
              <MoreVertical size={16} />
            </button>
            {showActions[service?._id] && (
              <div className="schedule-actions-dropdown">
                <Link
                  href={`/admin/dashboard/services/${service?._id}`}
                  className="schedule-action-item"
                  data-testid={`button-view-details-${service?._id}`}
                >
                  <Eye size={14} /> View Details
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick information */}
      <div className="mt-5 flex items-center gap-2 border-t border-slate-100 pt-4">
        {/* Budget */}
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
            <Wallet size={15} />
          </div>

          <div className="min-w-0">
            <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
              Budget
            </p>

            <p className="truncate text-xs font-semibold text-slate-700">
              ${service?.budget}
            </p>
          </div>
        </div>

        {/* Preferred date */}
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
            <CalendarDays size={15} />
          </div>

          <div className="min-w-0">
            <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
              Visit date
            </p>

            <p className="truncate text-xs font-semibold text-slate-700">
              {getSpecificDate(service?.preferredDate).fullDate}
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between gap-11 border-t border-slate-100 pt-4">
        {/* Plan */}
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
            <Repeat2 size={15} />
          </div>

          <div className="min-w-0">
            <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
              Plan
            </p>

            <p className="truncate text-xs font-semibold text-slate-700">
              {service?.plan}
            </p>
          </div>
        </div>

        {/* Interval */}
        {service?.plan && service?.plan?.toLowerCase() === "re-occurrent" && (
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <CalendarDays size={15} />
            </div>

            <div className="min-w-0">
              <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
                Interval
              </p>

              <p className="truncate text-xs font-semibold text-slate-700">
                {service?.planInterval}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminServiceCard;
