import {
  ClipboardList,
  ListTodo,
  ShieldOff,
  CircleCheckBig,
} from "lucide-react";
import { useServiceContext } from "@/features/contexts/service-context";
import { getIsoFullDate } from "@/helpers/time";

const activities = [
  {
    title: "General pest control",
    date: "Wednesday, August 26, 2026",
    status: "Service is booked and waiting approval",
  },
  {
    title: "General pest control",
    date: "Wednesday, August 26, 2026",
    status: "Service is booked and waiting approval",
  },
  {
    title: "General pest control",
    date: "Wednesday, August 26, 2026",
    status: "Service is booked and waiting approval",
  },
];

function RecentActivity() {
  const { services } = useServiceContext();
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_2px_10px_rgba(0,22,37,0.03)] sm:p-6">
      <div className="mb-5 flex items-start justify-between">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.13em] text-[#1687b6]">
            Recent activity
          </p>

          <h3 className="mt-1 text-lg font-bold">Monitor your services</h3>
        </div>

        <button className="text-xs font-semibold text-[#1687b6] hover:underline">
          View all
        </button>
      </div>

      <div className="space-y-1 overflow-y-auto h-[230px]">
        {services && services?.length > 0
          ? services?.map((service, index: number) => {
              return service?.status === "new" ? (
                <ActivityItem
                  key={service?._id}
                  activity={{
                    ...service,
                    status: "Service is booked and waiting approval",
                  }}
                  last={index === services?.length - 1}
                  Icon={ListTodo}
                />
              ) : service?.status === "cancelled" ? (
                <ActivityItem
                  key={service?._id}
                  activity={{ ...service, status: "Service is cancelled" }}
                  last={index === services?.length - 1}
                  Icon={ShieldOff}
                />
              ) : service?.status === "completed" ? (
                <ActivityItem
                  key={service?._id}
                  activity={{
                    ...service,
                    status: "Service is marked as completed",
                  }}
                  last={index === services?.length - 1}
                  Icon={CircleCheckBig}
                />
              ) : null;
            })
          : null}
      </div>
    </div>
  );
}

function ActivityItem({ activity, last, Icon }: any) {
  return (
    <div className="flex gap-3 py-3">
      <div className="relative">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#eaf7fb] text-[#1687b6]">
          <Icon size={17} />
        </div>

        {!last && (
          <div className="absolute left-1/2 top-10 h-6 w-px -translate-x-1/2 bg-slate-200" />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-col justify-between gap-1 sm:flex-row">
          <p className="text-sm font-semibold">{activity?.title}</p>

          <span className="text-[11px] text-slate-400">
            {getIsoFullDate(activity?.createdAt)}
          </span>
        </div>

        <div className="mt-1 flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />

          <p className="text-xs text-slate-500">{activity.status}</p>
        </div>
      </div>
    </div>
  );
}

export default RecentActivity;
