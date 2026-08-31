import { Link } from "wouter";
import { useState } from "react";
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
          {shownJobs.map((job) => (
            <div
              className="schedule-row"
              key={job._id}
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
              topUsers.map((user) => (
                <div>
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
            <span className="alert-count">03</span>
          </div>
          <div className="alert-list">
            <button
              //   onClick={() => notify("Follow-up queue opened.")}
              data-testid="button-alert-followup"
            >
              <Clock3 size={15} />
              <span>
                <strong>2 follow-ups due</strong>
                <small>Northline + Harbor Studio</small>
              </span>
              <ChevronRight size={14} />
            </button>
            <button
              //   onClick={() => notify("Supply reminder marked for review.")}
              data-testid="button-alert-supply"
            >
              <Droplets size={15} />
              <span>
                <strong>Low supply note</strong>
                <small>Blue-safe cleaner \u00b7 van 03</small>
              </span>
              <ChevronRight size={14} />
            </button>
            <button
              //   onClick={() => notify("Unassigned request queue opened.")}
              data-testid="button-alert-unassigned"
            >
              <UserRound size={15} />
              <span>
                <strong>1 request unassigned</strong>
                <small>Move-out clean \u00b7 due today</small>
              </span>
              <ChevronRight size={14} />
            </button>
          </div>
        </section>
      </aside>
    </div>
  );
}

export default AdminRecentServices;
