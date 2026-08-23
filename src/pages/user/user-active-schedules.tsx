import { Link } from "wouter";
import { useState } from "react";
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  User,
  MoreVertical,
  Eye,
  ChevronRight,
} from "lucide-react";
import { JOBS } from "@/lib/dummy-data";

export function UserActiveSchedules() {
  const [showActions, setShowActions] = useState<{ [key: string]: boolean }>(
    {},
  );
  const [notify, setNotify] = useState("");

  // Filter jobs for the current user (Amina Johnson)
  const userJobs = JOBS.filter((job) => job.client === "Amina Johnson");

  const toggleActions = (id: string) => {
    setShowActions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleViewDetails = (id: string) => {
    // Navigate to details - for now just show notification
    setNotify(`Viewing details for schedule ${id}`);
    setTimeout(() => setNotify(""), 3000);
  };

  return (
    <div>
      <main className="container dashboard-wrap">
        {notify && (
          <div
            className="dashboard-banner"
            role="status"
            data-testid="status-active-schedule"
          >
            <span>{notify}</span>
            <button
              onClick={() => setNotify("")}
              data-testid="button-dismiss-active-schedule-notify"
            >
              Dismiss
            </button>
          </div>
        )}

        <div className="active-schedules-header">
          <Link
            href="/dashboard"
            className="text-button"
            data-testid="button-back-to-dashboard"
          >
            <ArrowLeft size={18} /> Back to Dashboard
          </Link>
          <div>
            <div className="eyebrow">Your Schedules</div>
            <h1>Active Schedules</h1>
            <p>View and manage your active service schedules</p>
          </div>
        </div>

        {userJobs.length === 0 ? (
          <div className="active-schedules-empty">
            <Calendar size={48} />
            <h3>No Active Schedules</h3>
            <p>You don't have any active schedules at the moment.</p>
            <Link href="/dashboard" className="primary-button">
              Request a Service
            </Link>
          </div>
        ) : (
          <div className="active-schedules-list">
            {userJobs.map((job) => (
              <div
                className="active-schedule-card"
                key={job.id}
                data-testid={`card-active-schedule-${job.id}`}
              >
                <div className="active-schedule-header">
                  <div className="active-schedule-info">
                    <h3>{job.service}</h3>
                    <span className="active-schedule-id">#{job.id}</span>
                  </div>
                  <div className="active-schedule-actions">
                    <button
                      className="icon-button"
                      onClick={() => toggleActions(job.id)}
                      data-testid={`button-schedule-actions-${job.id}`}
                    >
                      <MoreVertical size={18} />
                    </button>
                    {showActions[job.id] && (
                      <div className="schedule-actions-dropdown">
                        <Link
                          href={`/dashboard/schedules/${job.id}`}
                          className="schedule-action-item"
                          data-testid={`button-admin-view-${job.id}`}
                        >
                          <Eye size={14} /> View Details
                        </Link>
                      </div>
                    )}
                  </div>
                </div>

                <div className="active-schedule-details">
                  <div className="active-schedule-detail">
                    <Calendar size={14} />
                    <span>
                      <strong>Date & Time:</strong> {job.time}
                    </span>
                  </div>
                  <div className="active-schedule-detail">
                    <MapPin size={14} />
                    <span>
                      <strong>Location:</strong> {job.address}
                    </span>
                  </div>
                  <div className="active-schedule-detail">
                    <User size={14} />
                    <span>
                      <strong>Technician:</strong> {job.tech}
                    </span>
                  </div>
                  <div className="active-schedule-detail">
                    <Clock size={14} />
                    <span>
                      <strong>Status:</strong>
                      <span
                        className={`active-schedule-status ${job.status.toLowerCase()}`}
                      >
                        {job.status}
                      </span>
                    </span>
                  </div>
                </div>

                <div className="active-schedule-footer">
                  <button
                    type="button"
                    className="text-button"
                    onClick={() => handleViewDetails(job.id)}
                    data-testid={`button-view-full-details-${job.id}`}
                  >
                    View Full Details <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default UserActiveSchedules;
