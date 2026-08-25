import type { ReactNode } from "react";
import { Link } from "wouter";
import {
  ArrowRight,
  CalendarClock,
  ClockFading,
  RefreshCw,
} from "lucide-react";
import CtaButton from "@/components/common/cta-button";
import { useAuthContext } from "@/features/contexts/auth-context";
import { useServiceContext } from "@/features/contexts/service-context";
import { getGreeting } from "@/helpers/time";
import { useTime } from "@/features/hooks/use-time";

function DashboardWrapper({ children }: { children: ReactNode }) {
  const { isAuthenticated, currentUser } = useAuthContext();
  const { date, seconds, minute, hour, period } = useTime();

  const { serviceStats } = useServiceContext();

  return (
    <main className="container dashboard-wrap" id="overview">
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
              <p className="font-bold">{`${hour}:${minute}:${seconds}${period}`}</p>
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
            href="/dashboard/schedules"
            className="secondary-button"
            data-testid="button-view-active-schedules"
          >
            View Active Schedules
          </Link>

          <button
            className="secondary-button button-small"
            data-testid="button-refresh-admin"
          >
            <RefreshCw size={14} /> Refresh board
          </button>
        </div>
      </div>
      <div className="dashboard-grid">
        <section className="dashboard-card summary-card grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          <div>
            <div className="card-kicker">Your Ajike snapshot</div>
            <h2>Everything is on track.</h2>
          </div>
          <div className="summary-stat">
            <strong>
              {serviceStats?.new === 0
                ? serviceStats?.new
                : String(serviceStats?.new).padStart(2, "0")}
            </strong>
            <span>New requests</span>
          </div>
          <div className="summary-stat">
            <strong>
              {serviceStats?.completed === 0
                ? serviceStats?.completed
                : String(serviceStats?.completed).padStart(2, "0")}
            </strong>
            <span>Completed visits</span>
          </div>
          <div className="summary-stat">
            <strong>
              {serviceStats?.pending === 0
                ? serviceStats?.pending
                : String(serviceStats?.pending).padStart(2, "0")}
            </strong>
            <span>Active</span>
          </div>

          <div className="summary-stat">
            <strong>
              {serviceStats?.cancelled === 0
                ? serviceStats?.cancelled
                : String(serviceStats?.cancelled).padStart(2, "0")}
            </strong>
            <span>Cancelled Requests</span>
          </div>
        </section>

        {children}
      </div>
    </main>
  );
}

export default DashboardWrapper;
