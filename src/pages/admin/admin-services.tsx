import { useState } from "react";
import { Calendar } from "lucide-react";
import AdminDashboardLayout from "./admin-dashboard-layout";
import AdminServiceCard from "./admin-service-card";
import type { UserServiceStatus } from "@/lib/types";
import { useAdminServiceContext } from "@/features/contexts/admin-service-context";

export function AdminServices() {
  const { services } = useAdminServiceContext();

  const [filter, setFilter] = useState<"All" | UserServiceStatus>("All");
  const [serviceFilter, setServiceFilter] = useState<
    "All" | "Pest" | "Cleaning"
  >("All");

  const shownServices = services.filter(
    (job) =>
      (filter === "All" || job.status.toLowerCase() === filter.toLowerCase()) &&
      (serviceFilter === "All" ||
        job.category.toLowerCase() === serviceFilter.toLowerCase()),
  );

  return (
    <AdminDashboardLayout>
      <main className="dashboard-wrap">
        <div className="active-schedules-header">
          <div>
            <div className="eyebrow">Customers Services</div>
            <p className="font-semibold text-[#122560]">
              View and manage your active services here
            </p>
          </div>
        </div>

        <div className="admin-filter-row">
          <div className="admin-filter-tabs">
            {(["All", "New", "Pending", "Completed", "Cancelled"] as const).map(
              (item) => (
                <button
                  className={filter === item ? "active" : ""}
                  onClick={() => setFilter(item)}
                  key={item}
                  data-testid={`button-admin-status-${item.toLowerCase()}`}
                >
                  {item}
                </button>
              ),
            )}
          </div>
          <select
            value={serviceFilter}
            onChange={(event) =>
              setServiceFilter(event.target.value as typeof serviceFilter)
            }
            data-testid="select-admin-service-filter"
          >
            <option>All</option>
            <option>Pest</option>
            <option>Cleaning</option>
          </select>
        </div>

        {shownServices.length === 0 ? (
          <div className="active-schedules-empty">
            <Calendar size={48} />
            <h3>No Active Schedules</h3>
            <p>
              All customers services will appear here once they make a request
            </p>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 2xl:grid-cols-3">
            {shownServices.map((service) => (
              <AdminServiceCard key={service._id} service={service} />
            ))}
          </div>
        )}
      </main>
    </AdminDashboardLayout>
  );
}

export default AdminServices;
