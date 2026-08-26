import { Link } from "wouter";
import {
  ListTodo,
  CircleCheckBig,
  ShieldOff,
  ChevronRight,
  HeartCrack,
  MapPinCheckIcon,
  ArrowRight,
} from "lucide-react";
import CtaButton from "@/components/common/cta-button";

import { useServiceContext } from "@/features/contexts/service-context";
import { getSpecificDate, getIsoFullDate, getNextVisit } from "@/helpers/time";

import DashboardLayout from "./dashboard-layout";

function Dashboard() {
  const { services, nextVisit, reOccurrentPlan } = useServiceContext();

  return (
    <DashboardLayout>
      <>
        <div>
          {nextVisit ? (
            <section className="dashboard-card mb-10 visit-card">
              <div className="card-kicker">Next visit</div>

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
            </section>
          ) : (
            <section className="dashboard-card mb-10 h-full">
              <div className="card-kicker">Next visit</div>
              <div className="flex gap-2 items-center h-full justify-start mt-20 flex-col">
                <div className="flex gap-2 items-center mb-5">
                  <HeartCrack />
                  <h1 className="font-semibold">No approved service yet!</h1>
                </div>
                <CtaButton
                  icon={<ArrowRight size={17} />}
                  props={{
                    className: "primary-button flex items-center",
                  }}
                  text="Request service"
                />
              </div>
            </section>
          )}
        </div>

        <div>
          {reOccurrentPlan ? (
            <section className="dashboard-card mb-10 plan-card">
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
            <section className="dashboard-card mb-10 plan-card">
              <div className="card-kicker">Active re-occurent plan</div>
              <div className="flex gap-2  items-center justify-center">
                <HeartCrack />
                <h1 className="font-semibold">
                  You do not have an active Re-occurent plan
                </h1>
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
      </>
    </DashboardLayout>
  );
}

export default Dashboard;
