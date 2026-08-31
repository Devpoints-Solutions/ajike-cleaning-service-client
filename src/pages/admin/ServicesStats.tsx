import {
  Activity,
  CircleDollarSign,
  CircleCheckBig,
  BadgeDollarSign,
} from "lucide-react";
import { useAdminServiceContext } from "@/features/contexts/admin-service-context";

function ServicesStats() {
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
          {servicesStats?.totalServices === 0
            ? servicesStats?.totalServices
            : String(servicesStats?.totalServices).padStart(2, "0")}
        </strong>
        <div className="flex items-center gap-3">
          <small>
            <CircleCheckBig size={15} /> {servicesStats?.totalCompletedServices}{" "}
            completed
          </small>

          <small>
            <BadgeDollarSign size={15} /> $
            {servicesStats?.totalCompletedValue?.toLocaleString()}
          </small>
        </div>

        <div className="flex items-center gap-3">
          <small>
            <CircleCheckBig size={15} /> {servicesStats?.totalNewServices} New
          </small>

          <small>
            <BadgeDollarSign size={15} /> ${servicesStats?.totalNewValue}
          </small>
        </div>
      </article>
      <article className="admin-kpi">
        <span>Pending services</span>
        <strong>
          {" "}
          {servicesStats?.totalPendingServices === 0
            ? servicesStats?.totalPendingServices
            : String(servicesStats?.totalPendingServices).padStart(2, "0")}
        </strong>
        <small>
          <Activity size={15} /> {servicesStats?.totalNewServices} need a
          response
        </small>
      </article>
      <article className="admin-kpi">
        <span>Quote value</span>
        <strong>${servicesStats?.totalValue?.toLocaleString()}</strong>
        <small>
          <CircleDollarSign size={15} /> $
          {servicesStats?.totalPendingValue + servicesStats?.totalNewValue} yet
          to be claimed
        </small>
      </article>
      <article className="admin-kpi kpi-sky">
        <span>Overall coverage</span>
        <strong>
          {servicesStats?.totalServices
            ? (servicesStats.totalCompletedServices /
                servicesStats.totalServices) *
              100
            : 0}
          %
        </strong>
        <small>
          <CircleCheckBig size={15} /> {servicesStats?.totalCompletedServices}{" "}
          of {servicesStats?.totalServices} is completed
        </small>
      </article>
    </section>
  );
}

export default ServicesStats;
