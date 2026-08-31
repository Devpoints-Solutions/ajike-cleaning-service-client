import { useMemo } from "react";
import { ArrowRight, BarChart3, CheckCheck, HandCoins } from "lucide-react";
import { useAdminServiceContext } from "@/features/contexts/admin-service-context";
import { useDashboardContext } from "@/features/contexts/dashboard-context";
import { Link } from "wouter";

function Visualizer() {
  const { services, servicesStats } = useAdminServiceContext();
  const { handleNavigation } = useDashboardContext();

  const serviceMix = useMemo(() => {
    const totals = new Map<string, number>();

    services.forEach((service) => {
      const key =
        service?.category === "Pest"
          ? "Pest control"
          : service?.category === "Cleaning"
            ? "Home cleaning"
            : service?.propertyType === "Commercial"
              ? "Commercial"
              : "Service visit";

      totals.set(key, (totals.get(key) ?? 0) + 1);
    });

    const total =
      [...totals.values()].reduce((sum, value) => sum + value, 0) || 1;

    return [...totals.entries()]
      .map(([label, count]) => ({
        label,
        count,
        value: Math.max(8, Math.round((count / total) * 100)),
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 3);
  }, [services]);

  const fallbackMix = [
    { label: "Pest control", count: 2, value: 58 },
    { label: "Home cleaning", count: 1, value: 27 },
    { label: "Commercial", count: 1, value: 15 },
  ];

  const mixData = serviceMix.length > 0 ? serviceMix : fallbackMix;
  const completedCount =
    services.filter((job) => job?.status?.toLowerCase() === "completed")
      .length ||
    servicesStats?.totalCompletedServices ||
    42;

  const baselineCompleted =
    servicesStats?.totalWeeklyCompletedServices ||
    Math.max(completedCount - 4, 1);
  const monthDelta = Math.round(
    ((completedCount - baselineCompleted) / Math.max(baselineCompleted, 1)) *
      100,
  );

  const latestProof = useMemo(() => {
    const sortedServices = [...services].sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    );

    return (
      sortedServices.find(
        (job) => job?.status?.toLowerCase() === "completed",
      ) ??
      sortedServices[0] ??
      null
    );
  }, [services]);

  const customerName = latestProof
    ? [latestProof?.customer?.firstName, latestProof?.customer?.lastName]
        .filter(Boolean)
        .join(" ") ||
      [latestProof?.user?.firstName, latestProof?.user?.lastName]
        .filter(Boolean)
        .join(" ") ||
      "Customer record"
    : "Juniper Facilities";

  const proofTitle = latestProof?.title || "Kitchen perimeter";
  const proofCode = latestProof?._id?.slice(-5)?.toUpperCase() || "AJ-2041";
  const proofStatus =
    latestProof?.status?.toLowerCase() === "completed"
      ? "Client-ready record"
      : "Awaiting approval";

  return (
    <div className="admin-lower-grid">
      <section className="admin-panel mix-panel">
        <div className="admin-panel-head">
          <div>
            <h2>Where the work is</h2>
          </div>
          <BarChart3 size={18} />
        </div>
        <div className="mix-bars">
          {mixData.map((item, index) => (
            <div key={index} className="mb-2">
              <span>
                <strong>{item.label}</strong>
                <em>{item.value}%</em>
              </span>
              <i style={{ width: `${item.value}%` }} />
            </div>
          ))}
        </div>
        <div className="mix-foot">
          <span>{completedCount} completed jobs</span>
          <span>
            {monthDelta >= 0 ? "↑" : "↓"} {Math.abs(monthDelta)}% vs last month
          </span>
        </div>
      </section>
      <section className="admin-panel revenue-panel">
        <div className="admin-panel-head">
          <div>
            <h2>Revenue / quote snapshot</h2>
          </div>
          <HandCoins size={18} />
        </div>
        <div className="revenue-number">
          ${servicesStats?.totalCompletedValue?.toLocaleString() || "0"}
          <span>earned till date</span>
        </div>
        <div className="revenue-line">
          <span>
            Expected Earning{" "}
            <b>${servicesStats?.totalValue?.toLocaleString() || "0"}</b>
          </span>
          <span>
            Unclaimed{" "}
            <b>
              $
              {(servicesStats?.totalPendingValue ?? 0) +
                (servicesStats?.totalNewValue ?? 0)}
            </b>
          </span>
        </div>
        <div className="revenue-progress">
          <span />
        </div>
        <Link
          href="/admin/dashboard/services"
          onClick={() => handleNavigation("Services")}
          className="text-button"
          data-testid="button-review-quotes"
        >
          Review service to increase earning <ArrowRight size={14} />
        </Link>
      </section>
      <section className="admin-panel proof-panel" id="activity">
        <div className="admin-panel-head">
          <div>
            <h2>Recent service</h2>
          </div>
        </div>
        <div className="proof-record">
          <div className="proof-mini-image">
            <span>BEFORE</span>
            <span>AFTER</span>
          </div>
          <div>
            <strong>{proofTitle}</strong>
            <small>
              {proofCode} · {customerName}
            </small>
            <span className="proof-approved">
              <CheckCheck size={12} /> {proofStatus}
            </span>
          </div>
        </div>
        <Link
          href="/admin/dashboard/services"
          className="text-button"
          data-testid="button-review-proof"
        >
          View service <ArrowRight size={14} />
        </Link>
      </section>
    </div>
  );
}

export default Visualizer;
