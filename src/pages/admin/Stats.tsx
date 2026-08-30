import {
  Activity,
  CircleDollarSign,
  UserCheck,
  CircleCheckBig,
  FilePlusCorner,
  BadgeDollarSign,
} from "lucide-react";
import { useAdminServiceContext } from "@/features/contexts/admin-service-context";

function Stats() {
  const { servicesStats } = useAdminServiceContext();

  console.log(servicesStats);

  return (
    <section
      className="admin-kpi-grid w-full self-start lg:sticky lg:top-[0] lg:self-start bg-[#ffffff] z-50 py-5 px-5 rounded-2xl"
      style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
    >
      <article className="admin-kpi kpi-navy">
        <span>This week's services</span>
        <strong>
          {servicesStats?.totalWeeklyServices === 0
            ? servicesStats?.totalWeeklyNewServices
            : String(servicesStats?.totalWeeklyServices).padStart(2, "0")}
        </strong>
        <div className="flex items-center gap-3">
          <small>
            <CircleCheckBig size={12} />{" "}
            {servicesStats?.totalWeeklyCompletedServices} completed
          </small>

          <small>
            <BadgeDollarSign size={12} /> $
            {servicesStats?.totalWeeklyCompletedValue}
          </small>
        </div>

        <div className="flex items-center gap-3">
          <small>
            <CircleCheckBig size={12} /> {servicesStats?.totalWeeklyNewServices}{" "}
            New
          </small>

          <small>
            <BadgeDollarSign size={12} /> ${servicesStats?.totalWeeklyNewValue}
          </small>
        </div>
      </article>
      <article className="admin-kpi">
        <span>Pending services</span>
        <strong>
          {" "}
          {servicesStats?.totalWeeklyPendingServices === 0
            ? servicesStats?.totalWeeklyPendingServices
            : String(servicesStats?.totalWeeklyPendingServices).padStart(
                2,
                "0",
              )}
        </strong>
        <small>
          <Activity size={12} /> {servicesStats?.totalWeeklyNewServices} need a
          response
        </small>
      </article>
      <article className="admin-kpi">
        <span>Quote value</span>
        <strong>${servicesStats?.totalWeeklyValue}</strong>
        <small>
          <CircleDollarSign size={12} /> $
          {servicesStats?.totalWeeklyPendingValue +
            servicesStats?.totalWeeklyNewValue}{" "}
          yet to be claimed
        </small>
      </article>
      <article className="admin-kpi kpi-sky">
        <span>Coverage today</span>
        <strong>92%</strong>
        <small>
          <UserCheck size={12} /> 11 of 12 routes staffed
        </small>
      </article>
    </section>
  );
}

export default Stats;
