import Brand from "../brand";
import { Menu, X } from "lucide-react";
import { useDashboardContext } from "@/features/contexts/dashboard-context";

function MobileHeader() {
  const { mobileOpen, setMobileOpen } = useDashboardContext();

  return (
    <header className="fixed left-0 right-0 top-0 z-50 flex h-[72px] items-center justify-between border-b border-slate-200 bg-white px-5 lg:hidden">
      {/* Logo */}

      <Brand />

      <div className="flex items-center gap-2">
        {/* Mobile menu */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700"
        >
          {mobileOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>
    </header>
  );
}

export default MobileHeader;
