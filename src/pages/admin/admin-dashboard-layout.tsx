import React, { useEffect } from "react";
import DashboardNav from "@/components/common/dashboard/dashboard-nav";
import { useLocation } from "wouter";
import { CalendarClock, ClockFading, RefreshCw } from "lucide-react";
import { useAuthContext } from "@/features/contexts/auth-context";
import { getGreeting } from "@/helpers/time";
import { useTime } from "@/features/hooks/use-time";
import { useDashboardContext } from "@/features/contexts/dashboard-context";
import { getCurrentPathForAdmin } from "@/helpers/profile";
import Stats from "./Stats";
import ServicesStats from "./ServicesStats";

const AdminDashboardLayout = ({ children }: React.PropsWithChildren) => {
  const { isAuthenticated, currentUser } = useAuthContext();
  const { date, seconds, minute, hour, period } = useTime();

  const [pathname] = useLocation();
  const { collapsed, handleNavigation } = useDashboardContext();

  useEffect(() => {
    handleNavigation(getCurrentPathForAdmin(pathname));
  }, [pathname]);

  return (
    <div className="min-h-screen bg-[#f7f9fa]">
      <DashboardNav />

      <main
        className={`min-h-screen transition-all duration-300 ${
          collapsed ? "lg:ml-[76px]" : "lg:ml-[260px]"
        }`}
      >
        <div
          className={`mx-auto max-w-[1600px] ${!pathname?.split("/")?.includes("messages") && "px-5 py-6 sm:px-8 lg:px-10 lg:py-8"}`}
        >
          {!pathname?.split("/")?.includes("messages") && (
            <div className="dashboard-top">
              <div>
                <div className="eyebrow">Admin dashboard</div>
                {isAuthenticated && currentUser && (
                  <h1>
                    {getGreeting()}, {currentUser?.firstName}
                  </h1>
                )}
                <p>Manage all activities in one place</p>

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
              {!pathname?.split("/")?.includes("messages") && (
                <div className="dashboard-top-actions">
                  <button
                    onClick={() => (window.location.href = pathname)}
                    className="secondary-button button-small"
                    data-testid="button-refresh-admin"
                  >
                    <RefreshCw size={14} /> Refresh board
                  </button>
                </div>
              )}
            </div>
          )}
          {pathname == "/admin/dashboard" && <Stats />}
          {pathname == "/admin/dashboard/services" && <ServicesStats />}
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboardLayout;
