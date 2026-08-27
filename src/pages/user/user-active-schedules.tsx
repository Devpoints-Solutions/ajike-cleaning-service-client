import { Link } from "wouter";

import { Calendar } from "lucide-react";
import DashboardLayout from "./dashboard-layout";
import ServiceCard from "./service-card";
import { useServiceContext } from "@/features/contexts/service-context";

export function UserActiveSchedules() {
  const { services } = useServiceContext();

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

        {services.length === 0 ? (
          <div className="active-schedules-empty">
            <Calendar size={48} />
            <h3>No Active Schedules</h3>
            <p>You don't have any active schedules at the moment.</p>
            <Link href="/dashboard" className="primary-button">
              Request a Service
            </Link>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 2xl:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service._id} service={service} />
            ))}
          </div>
        )}
      </main>
    </DashboardLayout>
  );
}

export default UserActiveSchedules;
