import { ChevronLeft, ChevronRight } from "lucide-react";
import MobileHeader from "./mobile-header";
import NavUser from "./nav-user";
import NavContent from "./nav-content";
import DashboardBrand from "@/components/common/dashboard/dashboard-brand";
import { useDashboardContext } from "@/features/contexts/dashboard-context";

const DashboardNav = ({}: {}) => {
  const { mobileOpen, setCollapsed, collapsed } = useDashboardContext();

  // console.log(mobileOpen);

  return (
    <>
      <MobileHeader />

      <div className="h-[72px] lg:hidden" />

      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-black/20 lg:hidden">
          <aside className="absolute bottom-0 left-0 top-[72px] w-[280px] overflow-y-auto border-r border-slate-200 bg-white px-4 py-6">
            <NavContent />
          </aside>
        </div>
      )}

      <aside
        className={`
          fixed
          bottom-0
          left-0
          top-0
          z-40
          hidden
          flex-col
          border-r
          border-slate-200
          bg-white
          lg:flex
          transition-[width]
          duration-300
          ease-in-out
          ${collapsed ? "w-[76px]" : "w-[260px]"}
        `}
      >
        <DashboardBrand />

        <div className="relative flex flex-1 flex-col px-3 py-6">
          <NavContent />

          <button
            type="button"
            onClick={() => setCollapsed(!collapsed)}
            className="
              absolute
              -right-3
              top-[27px]
              z-50
              flex
              h-6
              w-6
              items-center
              justify-center
              rounded-full
              border
              border-slate-200
              bg-white
              text-slate-500
              shadow-sm
              transition
              hover:bg-slate-50
              hover:text-slate-800
            "
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </button>
        </div>

        <NavUser />
      </aside>
    </>
  );
};

export default DashboardNav;
