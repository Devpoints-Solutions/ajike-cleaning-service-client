import { useState } from "react";
import type { AdminStatus } from "@/lib/types";
import { JOBS } from "@/lib/dummy-data";
import { AdminChat } from "@/components/common/admin-chat";
import {
  CheckCircle2,
  Activity,
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Bug,
  Camera,
  CheckCheck,
  ChevronRight,
  CircleDollarSign,
  ClipboardCheck,
  Clock3,
  Droplets,
  Filter,
  HandCoins,
  MoreHorizontal,
  RefreshCw,
  Search,
  SprayCan,
  TrendingUp,
  UserCheck,
  UserRound,
} from "lucide-react";

function AdminDashboard() {
  const [filter, setFilter] = useState<"All" | AdminStatus>("All");
  const [serviceFilter, setServiceFilter] = useState<
    "All" | "Pest" | "Cleaning"
  >("All");
  const [notice, setNotice] = useState("");
  const notify = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 3000);
  };

  const shownJobs = JOBS.filter(
    (job) =>
      (filter === "All" || job.status === filter) &&
      (serviceFilter === "All" || job.kind === serviceFilter),
  );
  const statusClass = (status: AdminStatus) => status.toLowerCase();

  const handleJobAction = (jobId: string, action: string) => {
    notify(`Job ${jobId} marked as ${action}`);
  };

  const handleRefresh = () => {
    notify("Operations board refreshed at " + new Date().toLocaleTimeString());
  };

  return (
    <div className="admin-page">
      <main className="container admin-wrap">
        {notice && (
          <div
            className="dashboard-banner admin-notice"
            role="status"
            data-testid="status-admin-action"
          >
            <span>
              <CheckCircle2 size={15} /> {notice}
            </span>
            <button
              onClick={() => setNotice("")}
              data-testid="button-dismiss-admin-status"
            >
              Dismiss
            </button>
          </div>
        )}
        <div className="admin-top">
          <div>
            <div className="eyebrow">Operations console / Tuesday 17 June</div>
            <h1>Keep the field moving.</h1>
            <p>
              Today\u2019s service board, coverage, and proof in one working view.
            </p>
          </div>
          <div className="admin-top-actions">
            <button
              className="secondary-button button-small"
              onClick={handleRefresh}
              data-testid="button-refresh-admin"
            >
              <RefreshCw size={14} /> Refresh board
            </button>
            <button
              className="primary-button button-small"
              onClick={() => notify("New request form opened")}
              data-testid="button-admin-new-request"
            >
              <ClipboardCheck size={14} /> New request
            </button>
          </div>
        </div>
        <section className="admin-kpi-grid">
          <article className="admin-kpi kpi-navy">
            <span>Today\u2019s visits</span>
            <strong>08</strong>
            <small>
              <TrendingUp size={12} /> 2 ahead of yesterday
            </small>
          </article>
          <article className="admin-kpi">
            <span>Open requests</span>
            <strong>17</strong>
            <small>
              <Activity size={12} /> 5 need a response
            </small>
          </article>
          <article className="admin-kpi">
            <span>Quote value</span>
            <strong>$4,860</strong>
            <small>
              <CircleDollarSign size={12} /> $1,240 awaiting reply
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
        <div className="admin-main-grid">
          <section className="admin-panel schedule-panel" id="overview">
            <div className="admin-panel-head">
              <div>
                <span className="panel-label">Live schedule</span>
                <h2>Today\u2019s route board</h2>
              </div>
              <button
                className="icon-button"
                onClick={() => notify("Filters are ready below.")}
                aria-label="Show route filters"
                data-testid="button-admin-filter-help"
              >
                <Filter size={16} />
              </button>
            </div>
            <div className="admin-filter-row">
              <div className="admin-filter-tabs">
                {([
                  "All",
                  "New",
                  "Quoted",
                  "Scheduled",
                  "Complete",
                ] as const).map((item) => (
                  <button
                    className={filter === item ? "active" : ""}
                    onClick={() => setFilter(item)}
                    key={item}
                    data-testid={`button-admin-status-${item.toLowerCase()}`}
                  >
                    {item}
                  </button>
                ))}
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
                  <button
                    className="icon-button row-more"
                    onClick={() =>
                      notify(
                        `${job.id} opened \u2014 ${job.client} is assigned to ${job.tech}.`,
                      )
                    }
                    aria-label={`Open ${job.id}`}
                    data-testid={`button-admin-job-${job.id}`}
                  >
                    <MoreHorizontal size={16} />
                  </button>
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
                onClick={() =>
                  notify("Coverage view shared with the field team.")
                }
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
                  onClick={() => notify("Follow-up queue opened.")}
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
                  onClick={() => notify("Supply reminder marked for review.")}
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
                  onClick={() => notify("Unassigned request queue opened.")}
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
        <div className="admin-lower-grid">
          <section className="admin-panel mix-panel">
            <div className="admin-panel-head">
              <div>
                <span className="panel-label">Service mix / month to date</span>
                <h2>Where the work is</h2>
              </div>
              <BarChart3 size={18} />
            </div>
            <div className="mix-bars">
              <div>
                <span>
                  <strong>Pest control</strong>
                  <em>58%</em>
                </span>
                <i style={{ width: "58%" }} />
              </div>
              <div>
                <span>
                  <strong>Home cleaning</strong>
                  <em>27%</em>
                </span>
                <i style={{ width: "27%" }} />
              </div>
              <div>
                <span>
                  <strong>Commercial</strong>
                  <em>15%</em>
                </span>
                <i style={{ width: "15%" }} />
              </div>
            </div>
            <div className="mix-foot">
              <span>42 completed jobs</span>
              <span>\u2191 8.4% vs May</span>
            </div>
          </section>
          <section className="admin-panel revenue-panel">
            <div className="admin-panel-head">
              <div>
                <span className="panel-label">Revenue / quote snapshot</span>
                <h2>Healthy pipeline</h2>
              </div>
              <HandCoins size={18} />
            </div>
            <div className="revenue-number">
              $12,640 <span>month to date</span>
            </div>
            <div className="revenue-line">
              <span>
                Booked <b>$9,880</b>
              </span>
              <span>
                Quoted <b>$2,760</b>
              </span>
            </div>
            <div className="revenue-progress">
              <span />
            </div>
            <button
              className="text-button"
              onClick={() => notify("Quote review list opened.")}
              data-testid="button-review-quotes"
            >
              Review quote queue <ArrowRight size={14} />
            </button>
          </section>
          <section className="admin-panel proof-panel" id="activity">
            <div className="admin-panel-head">
              <div>
                <span className="panel-label">Latest proof of work</span>
                <h2>Records worth sending</h2>
              </div>
              <Camera size={18} />
            </div>
            <div className="proof-record">
              <div className="proof-mini-image">
                <span>BEFORE</span>
                <span>AFTER</span>
              </div>
              <div>
                <strong>Kitchen perimeter</strong>
                <small>AJ-2041 \u00b7 Juniper Facilities</small>
                <span className="proof-approved">
                  <CheckCheck size={12} /> Client-ready record
                </span>
              </div>
            </div>
            <button
              className="text-button"
              onClick={() => notify("Proof record opened in review mode.")}
              data-testid="button-review-proof"
            >
              Review proof record <ArrowRight size={14} />
            </button>
          </section>
        </div>
      </main>
      <AdminChat />
    </div>
  );
}

export default AdminDashboard;
