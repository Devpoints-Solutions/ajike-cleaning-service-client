import React, { useEffect } from "react";
import { useLocation } from "wouter";
import DashboardNav from "@/components/common/dashboard/dashboard-nav";
import {
  CalendarClock,
  ClockFading,
  RefreshCw,
  ClipboardList,
  CalendarDays,
  Clock3,
  CheckCircle2,
} from "lucide-react";
import { useAuthContext } from "@/features/contexts/auth-context";
import { useServiceContext } from "@/features/contexts/service-context";
import { getGreeting } from "@/helpers/time";
import { useTime } from "@/features/hooks/use-time";
import { getCurrentPathForUser } from "@/helpers/profile";
import { useDashboardContext } from "@/features/contexts/dashboard-context";
import StatCard from "./stat-card";
import ProductTour from "@/components/common/dashboard/product-tour";

const DashboardLayout = ({ children }: React.PropsWithChildren) => {
  const [pathname] = useLocation();
  const { isAuthenticated, currentUser } = useAuthContext();
  const { date, seconds, minute, hour, period } = useTime();

  const { collapsed, handleNavigation } = useDashboardContext();

  const { serviceStats } = useServiceContext();

  useEffect(() => {
    handleNavigation(getCurrentPathForUser(pathname));
  }, [pathname]);

  return (
    <div className="min-h-screen bg-[#f7f9fa]">
      <DashboardNav />

      <main
        className={`min-h-screen transition-all duration-300 ${
          collapsed ? "lg:ml-[76px]" : "lg:ml-[260px]"
        }`}
      >
        <div className="mx-auto max-w-[1600px] px-5 py-6 sm:px-8 lg:px-10 lg:py-8">
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
              <button
                onClick={() => (window.location.href = pathname)}
                className="secondary-button button-small"
                data-testid="button-refresh-admin"
              >
                <RefreshCw size={14} /> Refresh board
              </button>
            </div>
          </div>

          <section
            className="mb-6 grid grid-cols-1 w-full self-start lg:sticky lg:top-[0] lg:self-start gap-4 sm:grid-cols-2 xl:grid-cols-4 admin-kpi-grid  bg-[#ffffff] z-50 py-5 px-5 rounded-2xl"
            style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
          >
            <StatCard
              icon={CalendarDays}
              label="New request"
              value={
                serviceStats?.new === 0
                  ? serviceStats?.new
                  : String(serviceStats?.new).padStart(2, "0")
              }
              description="Yet to be approved"
            />

            <StatCard
              icon={CheckCircle2}
              label="Completed"
              value={
                serviceStats?.completed === 0
                  ? serviceStats?.completed
                  : String(serviceStats?.completed).padStart(2, "0")
              }
              description="Services completed"
            />

            <StatCard
              icon={ClipboardList}
              label="Active requests"
              value={
                serviceStats?.pending === 0
                  ? serviceStats?.pending
                  : String(serviceStats?.pending).padStart(2, "0")
              }
              description="Currently being processed"
            />

            <StatCard
              icon={Clock3}
              label="Cancelled requests"
              value={
                serviceStats?.cancelled === 0
                  ? serviceStats?.cancelled
                  : String(serviceStats?.cancelled).padStart(2, "0")
              }
              description="Services cancelled"
            />
          </section>
          {children}
        </div>
      </main>
      {pathname === "/dashboard" && currentUser?.role === "user" && (
        <ProductTour role="user" />
      )}
    </div>
  );
};

export default DashboardLayout;
