import { Link } from "wouter";
import {
  ListTodo,
  CircleCheckBig,
  ShieldOff,
  ChevronRight,
  HeartCrack,
  MapPinCheckIcon,
  ArrowRight,
  MessageCircle,
  ClipboardCheck,
  FileCheck2,
} from "lucide-react";
import CtaButton from "@/components/common/cta-button";

import { useServiceContext } from "@/features/contexts/service-context";
import { getSpecificDate, getIsoFullDate, getNextVisit } from "@/helpers/time";

import DashboardLayout from "./dashboard-layout";

function Dashboard() {
  const { services, nextVisit, reOccurrentPlan, toggleChat, showChat } =
    useServiceContext();

  return (
    <DashboardLayout>
      <div className="mt-10  gap-5 grid grid-cols-1 md:grid-cols-2 relative overflow-hidden border-b border-slate-100 bg-gradient-to-br from-slate-50 via-white to-blue-50/40 px-6 py-7 sm:px-8 sm:py-8">
        <section className="dashboard-card mb-8 h-[300px]" id="account">
          <div className="card-kicker">Quick actions</div>
          <h2>What do you need today?</h2>
          <div className="quick-actions" style={{ marginTop: "1rem" }}>
            <CtaButton
              icon={<ChevronRight className="font-bold" size={14} />}
              props={{
                className: "quick-action",
                "data-testid": "button-quick-new-request",
              }}
              // @ts-ignore
              text={
                <>
                  <ClipboardCheck size={16} /> Start a new request
                </>
              }
            />
            <Link
              className="quick-action"
              href="/dashboard/services"
              data-testid="button-quick-history"
            >
              <FileCheck2 className="font-bold" size={16} /> View service
              history
              <ChevronRight className="font-bold" size={14} />
            </Link>
            <button
              className="quick-action"
              onClick={() => !showChat && toggleChat()}
              data-testid="button-quick-message"
            >
              <MessageCircle className="font-bold" size={16} /> Message the care
              team
              <ChevronRight className="font-bold" size={14} />
            </button>
          </div>
        </section>

        {reOccurrentPlan ? (
          <section className="dashboard-card mb-8 plan-card">
            <div className="card-kicker">Active Plan</div>

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
            <p className="text-[20px] flex items-center gap-2">
              <MapPinCheckIcon size={15} /> {reOccurrentPlan?.address}
            </p>
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
          </section>
        ) : (
          <section className="dashboard-card mb-8 plan-card">
            <div className="card-kicker">Active re-occurent plan</div>
            <div className="flex gap-2 h-[200px] items-center justify-center">
              <HeartCrack />
              <h1 className="font-semibold text-[#122560]">
                You do not have an active Re-occurent plan
              </h1>
            </div>
          </section>
        )}

        {nextVisit ? (
          <section className="dashboard-card mb-5 h-[250px] visit-card">
            <div className="card-kicker">Next visit</div>

            <h1 className="font-semibold text-[#122560]">
              We will see you soon.
            </h1>
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
                href={`/dashboard/services/${nextVisit?._id}`}
                data-testid="button-visit-details"
              >
                View details <ChevronRight size={14} />
              </Link>
            </div>
          </section>
        ) : (
          <section className="dashboard-card">
            <div className="card-kicker">Next visit</div>
            <div className="flex gap-2 items-center h-[230px] justify-center flex-col">
              <div className="flex gap-2  items-center mb-5">
                <HeartCrack color="#122560" />
                <h1 className="font-semibold text-[#122560]">
                  No approved service yet!
                </h1>
              </div>
              <CtaButton
                icon={<ArrowRight size={17} />}
                props={{
                  className: "secondary-button flex items-center",
                }}
                text="Request service"
              />
            </div>
          </section>
        )}

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
                        <span className="font-semibold">
                          Service is booked and waiting approval
                        </span>
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
                        <span className="font-semibold">
                          Service is cancelled
                        </span>
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
                        <span className="font-semibold">
                          Service is marked as completed
                        </span>
                      </div>
                    </div>
                  ) : null;
                })
              : null}
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;
