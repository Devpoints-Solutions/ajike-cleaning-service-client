import { useState } from "react";
import { Calendar } from "lucide-react";
import DashboardLayout from "./dashboard-layout";
import ServiceCard from "./service-card";
import { Loader } from "@/components/common/loader";
import type { UserServiceStatus } from "@/lib/types";
import { useServiceContext } from "@/features/contexts/service-context";

export function UserServices() {
  const {
    services,
    toggleNewModal,
    onGetNewServices,
    isLoadingNewData,
    hasMore,
  } = useServiceContext();

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
    <DashboardLayout>
      <main className="dashboard-wrap">
        <div className="active-schedules-header">
          <div>
            <div className="eyebrow">Your Services</div>
            <p className="font-semibold text-[#122560]">
              View and manage your active service schedules
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
            <p>You don't have any active schedules at the moment.</p>
            <button
              className="primary-button"
              style={{ backgroundColor: "#122560" }}
              onClick={toggleNewModal}
            >
              Request a Service
            </button>
          </div>
        ) : (
          <>
            <div className="grid gap-5 md:grid-cols-2 2xl:grid-cols-3">
              {shownServices.map((service) => (
                <ServiceCard key={service._id} service={service} />
              ))}
            </div>

            {hasMore && (
              <div
                className="flex mt-10 items-center justify-center"
                onClick={onGetNewServices}
              >
                <button type="button" className="secondary-button button-small">
                  {isLoadingNewData && <Loader />}
                  Load more
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </DashboardLayout>
  );
}

export default UserServices;
