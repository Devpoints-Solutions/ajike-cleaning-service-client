import { Link } from "wouter";
import { useMemo, useState } from "react";
import type { ServiceStatus } from "@/lib/types";
import {
  CheckCircle2,
  ArrowRight,
  Bug,
  ChevronRight,
  Clock3,
  Droplets,
  Eye,
  Filter,
  MoreVertical,
  Search,
  SprayCan,
  // Trash2,
  UserRound,
} from "lucide-react";
import { getStatusColor } from "@/helpers/profile";
import { useAdminServiceContext } from "@/features/contexts/admin-service-context";
import { CircularProgress } from "./circular-progress";
import { getTime } from "@/helpers/time";

function AdminRecentServices() {
  const [filter, setFilter] = useState<"All" | ServiceStatus>("All");
  const [serviceFilter, setServiceFilter] = useState<
    "All" | "Pest" | "Cleaning"
  >("All");

  const [showActions, setShowActions] = useState<{ [key: string]: boolean }>(
    {},
  );

  const { recentServices, topUsers, statistics } = useAdminServiceContext();

  const shownJobs = recentServices.filter(
    (job) =>
      (filter === "All" ||
        job?.status?.toLowerCase() === filter?.toLowerCase()) &&
      (serviceFilter === "All" ||
        job?.category?.toLowerCase() === serviceFilter?.toLowerCase()),
  );
  const statusClass = (status: ServiceStatus) => status.toLowerCase();

  const alertItems = useMemo(() => {
    const pendingJobs = recentServices.filter(
      (job) => job?.status?.toLowerCase() === "pending",
    );
    const newJobs = recentServices.filter(
      (job) => job?.status?.toLowerCase() === "new",
    );
    const cleaningJobs = recentServices.filter(
      (job) => job?.category?.toLowerCase() === "cleaning",
    );
    const followUpJob =
      pendingJobs[0] ?? newJobs[0] ?? recentServices[0] ?? null;

    const fullName = followUpJob
      ? [followUpJob?.customer?.firstName, followUpJob?.customer?.lastName]
          .filter(Boolean)
          .join(" ") ||
        [followUpJob?.user?.firstName, followUpJob?.user?.lastName]
          .filter(Boolean)
          .join(" ")
      : "Northline + Harbor Studio";

    const address = followUpJob?.address?.split(",")[0] || "property visit";

    return [
      {
        key: "follow-up",
        icon: Clock3,
        label: `${pendingJobs.length || 2} follow-ups due`,
        detail: fullName || "Northline + Harbor Studio",
        meta: address,
      },
      {
        key: "supply",
        icon: Droplets,
        label: `${cleaningJobs.length ? "Supply watch" : "Low supply note"}`,
        detail: cleaningJobs.length
          ? `${cleaningJobs.length} cleaning jobs need product check`
          : "Blue-safe cleaner · van 03",
        meta: "field stock",
      },
      {
        key: "unassigned",
        icon: UserRound,
        label: `${newJobs.length || 1} request${newJobs.length === 1 ? "" : "s"} unassigned`,
        detail: newJobs.length
          ? `${newJobs[0]?.title || "New service"}`
          : "Move-out clean · due today",
        meta: "pending assignment",
      },
    ];
  }, [recentServices]);

  const toggleActions = (id: string) => {
    setShowActions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="admin-main-grid">
      <section className="admin-panel schedule-panel" id="overview">
        <div className="admin-panel-head">
          <div>
            <span className="panel-label">Live schedule</span>
            <h2>Recent services</h2>
          </div>
          <button
            className="icon-button"
            aria-label="Show route filters"
            data-testid="button-admin-filter-help"
          >
            <Filter size={16} />
          </button>
        </div>
        <div className="admin-filter-row">
          <div className="admin-filter-tabs">
            {(["All", "New", "Pending", "Completed", "Cancelled"] as const).map(
              (item) => (
                <button
                  className={filter === item ? "active" : ""}
                  onClick={() => setFilter(item)}
                  key={item}
                  data-testid={`button-admin-status-${item.toLowerCase()}`}
                >
                  {item}
                </button>
              ),
            )}
          </div>
          <select
            value={serviceFilter}
            onChange={(event) =>
              setServiceFilter(event.target.value as typeof serviceFilter)
            }
            data-testid="select-admin-service-filter"
          >
            <option>All</option>
            <option>Pest</option>
            <option>Cleaning</option>
          </select>
        </div>
        <div className="schedule-list overflow-y-auto max-h-[500px]">
          {shownJobs.map((job, index) => (
            <div
              className="schedule-row"
              key={index}
              data-testid={`row-admin-job-${job._id}`}
            >
              <div className="schedule-time">
                <strong>{getTime(job?.createdAt)}</strong>
                <span>{job?.serviceState}</span>
              </div>
              <div className="schedule-job-icon">
                {job?.category === "Pest" ? (
                  <Bug size={16} />
                ) : (
                  <SprayCan size={16} />
                )}
              </div>
              <div className="schedule-job">
                <strong>{job?.title}</strong>
                <span>{job?.address}</span>
              </div>
              {/* <div className="tech-badge" title={`Assigned to`}>
                Hello
              </div> */}
              <span
                className={`admin-status ${statusClass(job?.status)}`}
                style={{ color: getStatusColor(job?.status?.toLowerCase()) }}
              >
                {job.status}
              </span>
              <div className="schedule-row-actions">
                <button
                  className="icon-button"
                  onClick={() => toggleActions(job._id)}
                  aria-label={`Actions for ${job._id}`}
                  data-testid={`button-schedule-actions-${job._id}`}
                >
                  <MoreVertical size={16} />
                </button>
                {showActions[job._id] && (
                  <div className="schedule-actions-dropdown">
                    <Link
                      href={`/admin/dashboard/services/${job._id}`}
                      className="schedule-action-item"
                      data-testid={`button-view-details-${job._id}`}
                    >
                      <Eye size={14} /> View Details
                    </Link>
                    {/* <Link
                      href={`/admin/dashbaord/schedules/${job._id}`}
                      className="schedule-action-item"
                      data-testid={`button-update-status-${job._id}`}
                    >
                      <Clock3 size={14} /> Update Status
                    </Link>
                    <button
                      className="schedule-action-item delete"
                      //   onClick={() => handleDelete(job.id)}
                      data-testid={`button-delete-schedule-${job._id}`}
                    >
                      <Trash2 size={14} /> Delete
                    </button> */}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        {shownJobs.length === 0 && (
          <div className="admin-empty">
            <Search size={19} />
            <strong>No service match those filters.</strong>
            <span>Try another status or service mix.</span>
          </div>
        )}
      </section>
      <aside className="admin-side-stack">
        <section className="admin-panel coverage-panel">
          <div className="admin-panel-head">
            <div>
              <span className="panel-label">Customers in focus</span>
              <h2>Top customers</h2>
            </div>
            <span className="live-dot">Active</span>
          </div>
          <div className="coverage-meter">
            <div>
              <strong>
                {topUsers && topUsers?.length} / {statistics?.totalCustomers}
              </strong>
            </div>

            {topUsers && topUsers?.length > 0 && (
              <CircularProgress
                value={(topUsers?.length / statistics?.totalCustomers) * 100}
                size={65}
                strokeWidth={7}
              />
            )}
          </div>
          <div className="crew-list">
            {topUsers &&
              topUsers?.length > 0 &&
              topUsers.map((user, index) => (
                <div key={index}>
                  <span className="crew-avatar navy">
                    {user?.firstName[0]} {user?.lastName[0]}
                  </span>
                  <span>
                    <strong>
                      {user?.firstName} {user?.lastName[0]?.toUpperCase()}
                    </strong>
                    <small>{user?.serviceCount} services</small>
                  </span>
                  <CheckCircle2 size={14} />
                </div>
              ))}
          </div>
          <Link
            href="/admin/dashboard/customers"
            className="text-button"
            // onClick={() =>
            //   notify("Coverage view shared with the field team.")
            // }
            data-testid="button-share-coverage"
          >
            Explore customers <ArrowRight size={14} />
          </Link>
        </section>
        <section className="admin-panel alert-panel">
          <div className="admin-panel-head">
            <div>
              <span className="panel-label">Needs a look</span>
              <h2>Alerts</h2>
            </div>
            <span className="alert-count">
              {String(alertItems.length).padStart(2, "0")}
            </span>
          </div>
          <div className="alert-list">
            {alertItems.map((alert) => (
              <button key={alert.key} data-testid={`button-alert-${alert.key}`}>
                <alert.icon size={15} />
                <span>
                  <strong>{alert.label}</strong>
                  <small>
                    {alert.detail} {alert.meta ? `· ${alert.meta}` : ""}
                  </small>
                </span>
                <ChevronRight size={14} />
              </button>
            ))}
          </div>
        </section>
      </aside>
    </div>
  );
}

export default AdminRecentServices;
