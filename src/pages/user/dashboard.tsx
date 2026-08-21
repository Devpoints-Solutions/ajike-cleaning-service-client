import { Link } from "wouter";
import { useState } from "react";
import {
  ArrowRight,
  Bell,
  Camera,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  FileCheck2,
  MessageCircle,
  TicketCheck,
  CalendarClock,
  ClockFading,
} from "lucide-react";
import CtaButton from "@/components/common/cta-button";
import { useAuthContext } from "@/features/contexts/auth-context";
import { getGreeting } from "@/helpers/time";
import { useTime } from "@/features/hooks/use-time";

function Dashboard() {
  const [banner, setBanner] = useState("");

  const { isAuthenticated, currentUser } = useAuthContext();
  const { date, seconds, minute, hour } = useTime();

  const notify = (message: string) => {
    setBanner(message);
    window.setTimeout(() => setBanner(""), 3200);
  };

  const handleViewServiceHistory = () => {
    notify("Your service history is ready to review.");
  };

  const handleMessageCareTeam = () => {
    notify("A care coordinator will reply here shortly.");
  };

  const handleViewDetails = () => {
    notify("Your visit window is saved. We will text you the day before.");
  };

  const handleOpenProof = () => {
    notify("Opening your May 02 service record.");
  };

  return (
    <div>
      <main className="container dashboard-wrap" id="overview">
        {banner && (
          <div
            className="dashboard-banner"
            role="status"
            data-testid="status-dashboard"
          >
            <span>
              <CheckCircle2 size={15} /> {banner}
            </span>
            <button
              onClick={() => setBanner("")}
              aria-label="Dismiss notification"
              data-testid="button-dismiss-dashboard-status"
            >
              Dismiss
            </button>
          </div>
        )}
        <div className="dashboard-top">
          <div>
            <div className="eyebrow">Customer dashboard</div>
            {isAuthenticated && currentUser && (
              <h1>
                {getGreeting()}, {currentUser?.firstName}
              </h1>
            )}
            <p>Your home care, in one calm place.</p>

            <div className="quick-actions grid-cols-2 mt-5">
              <button className="quick-action">
                <CalendarClock size={16} />
                <p className="font-bold">{date}</p>
              </button>

              <button className="quick-action">
                <ClockFading size={16} />{" "}
                <p className="font-bold">{`${hour}:${minute}:${seconds}`}</p>
              </button>
            </div>
          </div>
          <div className="dashboard-top-actions">
            <CtaButton
              text="Request a service"
              icon={<ArrowRight size={15} />}
              props={{
                className: "primary-button",
                "data-testid": "button-dashboard-request",
              }}
            />

            <Link
              href="/active-schedules"
              className="secondary-button"
              data-testid="button-view-active-schedules"
            >
              View Active Schedules
            </Link>
          </div>
        </div>
        <div className="dashboard-grid">
          <section className="dashboard-card summary-card">
            <div>
              <div className="card-kicker">Your Ajike snapshot</div>
              <h2>Everything is on track.</h2>
            </div>
            <div className="summary-stat">
              <strong>01</strong>
              <span>active plan</span>
            </div>
            <div className="summary-stat">
              <strong>04</strong>
              <span>completed visits</span>
            </div>
            <div className="summary-stat">
              <strong>4.9</strong>
              <span>care rating</span>
            </div>
          </section>
          <section className="dashboard-card visit-card">
            <div className="card-kicker">Next visit</div>
            <h2>We will see you soon.</h2>
            <div className="visit-date">
              <div className="date-block">
                <strong>18</strong>
                <span>Jun</span>
              </div>
              <div>
                <h3>Home protection visit</h3>
                <p>Wednesday \u00b7 10:00 \u2013 11:30 AM</p>
              </div>
            </div>
            <div className="status-line">
              <span className="status-pill">Confirmed</span>
              <button
                className="text-button"
                onClick={handleViewDetails}
                data-testid="button-visit-details"
              >
                View details <ChevronRight size={14} />
              </button>
            </div>
          </section>
          <section className="dashboard-card plan-card">
            <div className="card-kicker">Active plan</div>
            <h2>Home care, every 60 days.</h2>
            <div className="plan-name">Steady Home</div>
            <p>
              Pest prevention with a check-in after every visit. Next review in
              August.
            </p>
            <div className="plan-progress">
              <span />
            </div>
            <div className="plan-meta">
              <span>2 of 3 visits this cycle</span>
              <span>67%</span>
            </div>
          </section>
          <section className="dashboard-card" id="account">
            <div className="card-kicker">Quick actions</div>
            <h2>What do you need today?</h2>
            <div className="quick-actions" style={{ marginTop: "1rem" }}>
              <button
                className="quick-action"
                // onClick={handleRequestService}
                data-testid="button-quick-new-request"
              >
                <ClipboardCheck size={16} /> Start a new request
                <ChevronRight size={14} />
              </button>
              <button
                className="quick-action"
                onClick={handleViewServiceHistory}
                data-testid="button-quick-history"
              >
                <FileCheck2 size={16} /> View service history
                <ChevronRight size={14} />
              </button>
              <button
                className="quick-action"
                onClick={handleMessageCareTeam}
                data-testid="button-quick-message"
              >
                <MessageCircle size={16} /> Message the care team
                <ChevronRight size={14} />
              </button>
            </div>
          </section>
          <section className="dashboard-card activity-card" id="activity">
            <div className="card-kicker">Recent activity</div>
            <h2>Proof that stays with you.</h2>
            <div className="activity-list">
              <div className="activity-row">
                <div className="activity-icon">
                  <Camera size={15} />
                </div>
                <div>
                  <strong>Before / after photos added</strong>
                  <span>Kitchen perimeter \u00b7 May 02, 2025</span>
                </div>
              </div>
              <div className="activity-row">
                <div className="activity-icon">
                  <TicketCheck size={15} />
                </div>
                <div>
                  <strong>Visit marked complete</strong>
                  <span>Home protection \u00b7 May 02, 2025</span>
                </div>
              </div>
              <div className="activity-row">
                <div className="activity-icon">
                  <Bell size={15} />
                </div>
                <div>
                  <strong>Next visit confirmed</strong>
                  <span>Reminder set for June 17, 2025</span>
                </div>
              </div>
            </div>
          </section>
          <section className="dashboard-card">
            <div className="card-kicker">Latest job proof</div>
            <h2>Kitchen perimeter</h2>
            <div className="proof-thumb" data-testid="img-dashboard-proof" />
            <button
              className="text-button"
              onClick={handleOpenProof}
              style={{ marginTop: ".75rem" }}
              data-testid="button-open-proof"
            >
              Open service record <ArrowRight size={14} />
            </button>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
