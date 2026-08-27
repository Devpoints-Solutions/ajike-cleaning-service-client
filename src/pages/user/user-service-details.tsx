import { useState } from "react";
import {
  ArrowRight,
  Bug,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Globe2,
  MapPin,
  Repeat2,
  User,
  Building2,
  Wallet,
  CircleX,
  XCircle,
  TriangleAlert,
} from "lucide-react";
import { useParams } from "wouter";
import DashboardLayout from "./dashboard-layout";
import { useServiceContext } from "@/features/contexts/service-context";
import { getIsoFullDate, getSpecificDate } from "@/helpers/time";
import { useToast } from "@/features/hooks/use-toast";
import { getStatusColor } from "@/helpers/profile";

const InfoItem = ({ icon: Icon, label, children }: any) => {
  return (
    <div className="flex gap-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
        <Icon size={20} strokeWidth={1.8} />
      </div>

      <div className="min-w-0">
        <p className="mb-1 text-xs font-medium uppercase tracking-wider text-slate-400">
          {label}
        </p>

        <div className="text-sm font-medium leading-6 text-slate-700">
          {children}
        </div>
      </div>
    </div>
  );
};

const StatCard = ({
  icon: Icon,
  label,
  value,
  iconClass = "bg-blue-50 text-blue-600",
}: any) => {
  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-sm">
      <div className="flex items-center gap-3">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${iconClass}`}
        >
          <Icon size={19} strokeWidth={1.8} />
        </div>

        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            {label}
          </p>

          <p className="mt-1 truncate text-sm font-semibold text-slate-800">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
};

export default function UserServiceDetails() {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const { services } = useServiceContext();
  const { toast } = useToast();

  const { id } = useParams<{ id: string }>();

  const service = services?.find((service) => service?._id === id);

  return (
    <DashboardLayout>
      <article className="w-full overflow-hidden  mt-5 rounded-[28px] border border-slate-200 bg-white shadow-[0_12px_40px_rgba(15,23,42,0.06)]">
        {/* Header */}
        <div className="relative overflow-hidden border-b border-slate-100 bg-gradient-to-br from-slate-50 via-white to-blue-50/40 px-6 py-7 sm:px-8 sm:py-8">
          {/* Decorative background */}
          <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-blue-100/50 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 right-32 h-40 w-40 rounded-full bg-indigo-100/40 blur-3xl" />

          <div className="relative">
            {/* Top row */}
            <div className="flex flex-wrap items-start justify-between gap-4">
              {/* Status */}
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-2 text-xs font-semibold text-emerald-700">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                New request
              </div>

              {/* Category */}
              <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-3.5 py-2 text-xs font-semibold text-violet-700">
                <Bug size={15} />
                {service?.category}
              </div>
            </div>

            {/* Title */}
            <div className="mt-7 max-w-3xl">
              <h2 className="text-2xl font-bold tracking-tight text-[#122560] sm:text-3xl">
                {service?.title}
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#1687b6] sm:text-[15px]">
                {service?.description}
              </p>
            </div>

            {/* Quick stats */}
            <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard
                icon={Building2}
                label="Property type"
                value={service?.propertyType}
                iconClass="bg-blue-50 text-[#1687b6]"
              />

              <StatCard
                icon={Wallet}
                label="Budget"
                value={`$${service?.budget}`}
                iconClass="bg-emerald-50 text-[#122560]"
              />

              <StatCard
                icon={Repeat2}
                label="Plan"
                value={service?.plan}
                iconClass="bg-violet-50 text-violet-600"
              />

              <StatCard
                icon={CalendarDays}
                label="Interval"
                value={service?.planInterval}
                iconClass="bg-amber-50 text-amber-600"
              />
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="px-6 py-7 sm:px-8">
          <div className="grid grid-cols-1 gap-x-10 gap-y-8 lg:grid-cols-2">
            {/* Address */}
            <InfoItem icon={MapPin} label="Service address">
              <span className="block max-w-lg">{service?.address}</span>
            </InfoItem>

            {/* Requested by */}
            <InfoItem icon={User} label="Requested by">
              <span className="break-all">User ID: {service?._id}</span>
            </InfoItem>

            {/* Service location */}
            <InfoItem icon={Globe2} label="Service location">
              {service?.serviceCity}, {service?.serviceState},{" "}
              {service?.postcode}
            </InfoItem>

            {/* Status */}
            <InfoItem icon={CheckCircle2} label="Status">
              <span
                className={`inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold capitalize text-[${getStatusColor(service?.status!?.toLowerCase())}]`}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                {service?.status}
              </span>
            </InfoItem>

            {/* Preferred date */}
            <InfoItem icon={CalendarDays} label="Preferred date">
              {getSpecificDate(service?.preferredDate!).fullDate}
            </InfoItem>

            {/* Created */}
            <InfoItem icon={Clock3} label="Created">
              {getIsoFullDate(service?.createdAt!)}
            </InfoItem>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-100 bg-slate-50/70 px-6 py-5 sm:px-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            {/* Next visit */}
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <CalendarDays size={20} />
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                  Preferred visit
                </p>

                <p className="mt-0.5 text-sm font-semibold text-slate-800">
                  {getSpecificDate(service?.preferredDate!)?.fullDate}
                </p>
              </div>
            </div>

            {/* Updated */}
            <div className="hidden sm:block">
              <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                Last updated
              </p>

              <p className="mt-1 text-sm font-medium text-slate-600">
                {getIsoFullDate(service?.updatedAt!)}
              </p>
            </div>

            {/* Button */}

            <div className="flex items-center gap-3">
              <button
                type="button"
                className="group inline-flex h-11 items-center justify-center font-bold gap-2 rounded-xl border border-slate-300 bg-[#122560] px-5 text-sm  text-[#ffffff] shadow-sm transition-all hover:border-slate-400 hover:bg-[#1687b6] hover:text-white"
              >
                Update service
                <ArrowRight
                  size={17}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </button>

              <button
                onClick={() => {
                  if (
                    service?.status?.toLowerCase() === "new" ||
                    service?.plan?.toLowerCase() === "re-occurrent"
                  ) {
                    setShowDeleteConfirm(true);
                  } else {
                    toast({
                      title: "Warning",
                      description: `
                        Only new and un-approved services can be cancelled!
                        
                        If you think this is a mistake, kindly contact support
                        `,
                    });
                  }
                }}
                type="button"
                className="group inline-flex h-11 items-center justify-center font-bold gap-2 rounded-xl border border-slate-300 bg-[#b54e4e] px-5 text-sm text-[#ffffff] shadow-sm transition-all hover:border-slate-400 hover:bg-[#ff6060] hover:text-white"
              >
                Cancel this service
                <CircleX
                  size={17}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </button>
            </div>
          </div>
        </div>
      </article>

      {showDeleteConfirm && (
        <div
          className="modal-overlay"
          onClick={() => setShowDeleteConfirm(false)}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="flex items-center gap-2">
                <TriangleAlert size={15} />
                <h3>Confirm service cancellation</h3>
              </div>
              <button
                className="icon-button"
                onClick={() => setShowDeleteConfirm(false)}
                data-testid="button-close-delete-modal"
              >
                <XCircle size={18} />
              </button>
            </div>
            <div className="modal-body">
              <p className="font-semibold mb-2 text-[15px]">
                Are you sure you want to cancel this service?
              </p>
              <p className="text-amber-600 font-semibold">
                This action cannot be undone.
              </p>
              <div className="modal-actions">
                <button
                  className="secondary-button"
                  onClick={() => setShowDeleteConfirm(false)}
                  data-testid="button-cancel-delete"
                >
                  Cancel
                </button>
                <button
                  className="primary-button delete"
                  data-testid="button-confirm-delete"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
