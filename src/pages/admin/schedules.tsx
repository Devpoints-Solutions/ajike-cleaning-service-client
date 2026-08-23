import { Link } from "wouter";
import { useState } from "react";
import type { ServiceStatus } from "@/lib/types";

import {
  CheckCircle2,
  AlertTriangle,
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
  Trash2,
  UserRound,
} from "lucide-react";
import { getStatusColor } from "@/helpers/profile";
import { JOBS } from "@/lib/dummy-data";

function Schedules() {
  const [filter, setFilter] = useState<"All" | ServiceStatus>("All");
  const [serviceFilter, setServiceFilter] = useState<
    "All" | "Pest" | "Cleaning"
  >("All");

  const [showActions, setShowActions] = useState<{ [key: string]: boolean }>(
    {},
  );

  const shownJobs = JOBS.filter(
    (job) =>
      (filter === "All" || job.status === filter) &&
      (serviceFilter === "All" || job.kind === serviceFilter),
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
            <h2>Today\u2019s route board</h2>
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
            {(["All", "New", "Pending", "Completed", "Canceled"] as const).map(
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
        <div className="schedule-list">
          {shownJobs.map((job) => (
            <div
              className="schedule-row"
              key={job.id}
              data-testid={`row-admin-job-${job.id}`}
            >
              <div className="schedule-time">
                <strong>{job.time}</strong>
                <span>{job.id}</span>
              </div>
              <div className="schedule-job-icon">
                {job.kind === "Pest" ? (
                  <Bug size={16} />
                ) : (
                  <SprayCan size={16} />
                )}
              </div>
              <div className="schedule-job">
                <strong>{job.client}</strong>
                <span>
                  {job.service} \u00b7 {job.address}
                </span>
              </div>
              <div className="tech-badge" title={`Assigned to ${job.tech}`}>
                {job.tech}
              </div>
              <span className={`admin-status ${statusClass(job.status)}`}>
                {job.status}
              </span>
              <div className="schedule-row-actions">
                <button
                  className="icon-button"
                  onClick={() => toggleActions(job.id)}
                  aria-label={`Actions for ${job.id}`}
                  data-testid={`button-schedule-actions-${job.id}`}
                >
                  <MoreVertical size={16} />
                </button>
                {showActions[job.id] && (
                  <div className="schedule-actions-dropdown">
                    <Link
                      href={`/admin/dashboard/schedules/${job.id}`}
                      className="schedule-action-item"
                      data-testid={`button-view-details-${job.id}`}
                    >
                      <Eye size={14} /> View Details
                    </Link>
                    <Link
                      href={`/admin/dashbaord/schedules/${job.id}`}
                      className="schedule-action-item"
                      data-testid={`button-update-status-${job.id}`}
                    >
                      <Clock3 size={14} /> Update Status
                    </Link>
                    <button
                      className="schedule-action-item delete"
                      //   onClick={() => handleDelete(job.id)}
                      data-testid={`button-delete-schedule-${job.id}`}
                    >
                      <Trash2 size={14} /> Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        {shownJobs.length === 0 && (
          <div className="admin-empty">
            <Search size={19} />
            <strong>No jobs match those filters.</strong>
            <span>Try another status or service mix.</span>
          </div>
        )}
      </section>
      <aside className="admin-side-stack">
        <section className="admin-panel coverage-panel">
          <div className="admin-panel-head">
            <div>
              <span className="panel-label">People on route</span>
              <h2>Coverage check</h2>
            </div>
            <span className="live-dot">LIVE</span>
          </div>
          <div className="coverage-meter">
            <div>
              <strong>11 / 12</strong>
              <span>routes staffed</span>
            </div>
            <div className="meter-ring">
              <span>92%</span>
            </div>
          </div>
          <div className="crew-list">
            <div>
              <span className="crew-avatar navy">JR</span>
              <span>
                <strong>Jalen R.</strong>
                <small>North + central \u00b7 3 jobs</small>
              </span>
              <CheckCircle2 size={14} />
            </div>
            <div>
              <span className="crew-avatar sky">TN</span>
              <span>
                <strong>Tessa N.</strong>
                <small>Cleaning route \u00b7 2 jobs</small>
              </span>
              <CheckCircle2 size={14} />
            </div>
            <div>
              <span className="crew-avatar pale">SK</span>
              <span>
                <strong>Sofia K.</strong>
                <small>South route \u00b7 2 jobs</small>
              </span>
              <AlertTriangle size={14} />
            </div>
          </div>
          <button
            className="text-button"
            // onClick={() =>
            //   notify("Coverage view shared with the field team.")
            // }
            data-testid="button-share-coverage"
          >
            Share coverage note <ArrowRight size={14} />
          </button>
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

export default Schedules;
