import { Link } from "wouter";
import {
  ArrowRight,
  ListTodo,
  CircleCheckBig,
  ShieldOff,
  ChevronRight,
  ClipboardCheck,
  FileCheck2,
  MessageCircle,
  CalendarClock,
  ClockFading,
  RefreshCw,
  HeartCrack,
} from "lucide-react";
import CtaButton from "@/components/common/cta-button";
import { useAuthContext } from "@/features/contexts/auth-context";
import { useServiceContext } from "@/features/contexts/service-context";
import {
  getGreeting,
  getSpecificDate,
  getIsoFullDate,
  getNextVisit,
} from "@/helpers/time";
import { useTime } from "@/features/hooks/use-time";

function Dashboard() {
  const { isAuthenticated, currentUser } = useAuthContext();
  const { date, seconds, minute, hour, period } = useTime();

  const {
    services,
    showChat,
    toggleChat,
    serviceStats,
    nextVisit,
    toggleModal,
    reOccurrentPlan,
  } = useServiceContext();

  return (
    <div>
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

          <section className="dashboard-card visit-card">
            <div className="card-kicker">Next visit</div>

            {nextVisit ? (
              <>
                <h2>We will see you soon.</h2>
                <div className="visit-date">
                  <div className="date-block">
                    <strong>
                      {getSpecificDate(nextVisit?.preferredDate!).dayDate}
                    </strong>
                    <span>
                      {getSpecificDate(nextVisit?.preferredDate!).monthName}
                    </span>
                  </div>
                  <div>
                    <h3>{nextVisit?.title}</h3>

                    <p>{getSpecificDate(nextVisit?.preferredDate!).fullDate}</p>
                  </div>
                </div>
                <div className="status-line">
                  <span className="status-pill">Confirmed</span>
                  <Link
                    className="text-button"
                    href={`dashboard/schedules/${nextVisit?._id}`}
                    data-testid="button-visit-details"
                  >
                    View details <ChevronRight size={14} />
                  </Link>
                </div>
              </>
            ) : (
              <div className="flex gap-2 items-center justify-center">
                <HeartCrack />
                <h1 className="font-semibold">No approved service yet!</h1>
              </div>
            )}
          </section>

          <section className="dashboard-card plan-card">
            <div className="card-kicker">Active Plan</div>

            {reOccurrentPlan ? (
              <>
                <h2>
                  Every{" "}
                  {
                    getNextVisit(
                      reOccurrentPlan?.preferredDate,
                      reOccurrentPlan?.planInterval,
                    ).intervalDays
                  }{" "}
                  days.
                </h2>
                <div className="plan-name">{reOccurrentPlan?.title}</div>
                <p className="text-[20px]">at: {reOccurrentPlan?.address}</p>
                <div className="plan-progress">
                  <span />
                </div>
                <div className="plan-meta">
                  <span>
                    Next visit is{" "}
                    {
                      getNextVisit(
                        reOccurrentPlan?.preferredDate,
                        reOccurrentPlan?.planInterval,
                      ).nextVisit
                    }{" "}
                    after your intial chosen date
                  </span>
                </div>
                <p className="mt-10">Contact support if you have any concern</p>
              </>
            ) : (
              <div className="flex gap-2 items-center justify-center">
                <HeartCrack />
                <h1 className="font-semibold">
                  You do not have an active Re-occurent plan
                </h1>
              </div>
            )}
          </section>
          <section className="dashboard-card" id="account">
            <div className="card-kicker">Quick actions</div>
            <h2>What do you need today?</h2>
            <div className="quick-actions" style={{ marginTop: "1rem" }}>
              <button
                className="quick-action"
                onClick={toggleModal}
                data-testid="button-quick-new-request"
              >
                <ClipboardCheck size={16} /> Start a new request
                <ChevronRight size={14} />
              </button>
              <Link
                className="quick-action"
                href="/dashboard/schedules"
                data-testid="button-quick-history"
              >
                <FileCheck2 size={16} /> View service history
                <ChevronRight size={14} />
              </Link>
              <button
                className="quick-action"
                onClick={() => !showChat && toggleChat()}
                data-testid="button-quick-message"
              >
                <MessageCircle size={16} /> Message the care team
                <ChevronRight size={14} />
              </button>
            </div>
          </section>
          <section className="dashboard-card activity-card" id="activity">
            <div className="card-kicker">Recent activity</div>
            <h2>Monitor all activities in one place</h2>
            <div className="activity-list">
              {services && services?.length > 0
                ? services?.map((service) => {
                    return service?.status === "new" ? (
                      <div className="activity-row" key={service?._id}>
                        <div className="activity-icon">
                          <ListTodo size={15} />
                        </div>
                        <div>
                          <strong>
                            {service?.title}{" "}
                            <p className="text-[9px]">
                              {getIsoFullDate(service?.createdAt)}
                            </p>
                          </strong>
                          <span>Service is booked and waiting approval</span>
                        </div>
                      </div>
                    ) : service?.status === "cancelled" ? (
                      <div className="activity-row" key={service?._id}>
                        <div className="activity-icon">
                          <ShieldOff size={15} />
                        </div>
                        <div>
                          <strong>
                            {service?.title}{" "}
                            <p className="text-[9px]">
                              {getIsoFullDate(service?.updatedAt)}
                            </p>
                          </strong>
                          <span>Service is cancelled</span>
                        </div>
                      </div>
                    ) : service?.status === "completed" ? (
                      <div className="activity-row" key={service?._id}>
                        <div className="activity-icon">
                          <CircleCheckBig size={15} />
                        </div>
                        <div>
                          <strong>
                            {service?.title}{" "}
                            <p className="text-[9px]">
                              {getIsoFullDate(service?.updatedAt)}
                            </p>
                          </strong>
                          <span>Service is marked as completed</span>
                        </div>
                      </div>
                    ) : null;
                  })
                : null}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
