import {
  ArrowRight,
  BarChart3,
  Camera,
  CheckCheck,
  HandCoins,
} from "lucide-react";
import { useAdminServiceContext } from "@/features/contexts/admin-service-context";
import { useDashboardContext } from "@/features/contexts/dashboard-context";
import { Link } from "wouter";

function Visualizer() {
  const { servicesStats } = useAdminServiceContext();
  const { handleNavigation } = useDashboardContext();

  return (
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
          {/* {String(servicesStats?.totalValue).padStart(2, "0")} */}$
          {servicesStats?.totalCompletedValue?.toLocaleString()}{" "}
          <span>earned till date</span>
        </div>
        <div className="revenue-line">
          <span>
            Expected Earning{" "}
            <b>${servicesStats?.totalValue?.toLocaleString()}</b>
          </span>
          <span>
            Unclaimed{" "}
            <b>
              ${servicesStats?.totalPendingValue + servicesStats?.totalNewValue}
            </b>
          </span>
        </div>
        <div className="revenue-progress">
          <span />
        </div>
        <Link
          href="/admin/dashboard/services"
          onClick={() => handleNavigation("Services")}
          className="text-button"
          data-testid="button-review-quotes"
        >
          Review service to increase earning <ArrowRight size={14} />
        </Link>
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
        <button className="text-button" data-testid="button-review-proof">
          Review proof record <ArrowRight size={14} />
        </button>
      </section>
    </div>
  );
}

export default Visualizer;
