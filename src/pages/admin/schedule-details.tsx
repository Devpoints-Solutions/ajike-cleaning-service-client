import { Link, useParams } from "wouter";
import { useState } from "react";
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  User,
  MoreVertical,
  Eye,
  Edit2,
  Trash2,
  XCircle,
  AlertTriangle,
} from "lucide-react";
import { JOBS } from "@/lib/dummy-data";

export function ScheduleDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [showActions, setShowActions] = useState(false);
  const [status, setStatus] = useState<string>("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [notify, setNotify] = useState("");

  const job = JOBS.find((j) => j.id === id);

  const handleStatusUpdate = (newStatus: string) => {
    setStatus(newStatus);
    setShowStatusModal(false);
    setNotify(`Status updated to ${newStatus}`);
    setTimeout(() => setNotify(""), 3000);
  };

  const handleDelete = () => {
    setShowDeleteConfirm(false);
    setNotify(`Schedule ${id} has been deleted`);
    setTimeout(() => setNotify(""), 3000);
  };

  if (!job) {
    return (
      <div className="admin-page">
        <main className="container admin-wrap">
          <div className="not-found">
            <h1>Schedule Not Found</h1>
            <p>The schedule with ID {id} does not exist.</p>
            <Link href="/admin/dashboard" className="primary-button">
              Back to Dashboard
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const getStatusColor = () => {
    switch (status || job.status) {
      case "Complete":
        return "#25ad76";
      case "Scheduled":
        return "#178db4";
      case "Quoted":
        return "#71bed7";
      case "New":
        return "#d89435";
      default:
        return "#7897a3";
    }
  };

  return (
    <div className="admin-page">
      <main className="container admin-wrap">
        {notify && (
          <div
            className="dashboard-banner admin-notice"
            role="status"
            data-testid="status-schedule-update"
          >
            <span>{notify}</span>
            <button
              onClick={() => setNotify("")}
              data-testid="button-dismiss-schedule-notify"
            >
              Dismiss
            </button>
          </div>
        )}

        <div className="schedule-details-header">
          <Link
            href="/admin/dashboard"
            className="text-button"
            data-testid="button-back-to-dashboard"
          >
            <ArrowLeft size={18} /> Back to Dashboard
          </Link>
          <div>
            <div className="eyebrow">Schedule Management</div>
            <h1>Schedule Details</h1>
            <p>View and manage schedule for {job.client}</p>
          </div>
        </div>

        <div className="schedule-details-layout">
          <section className="schedule-details-card">
            <div className="schedule-details-header-card">
              <div className="schedule-details-title">
                <h2>{job.client}</h2>
                <span className="schedule-details-id">#{job.id}</span>
              </div>
              <div className="schedule-details-actions">
                <button
                  className="icon-button"
                  onClick={() => setShowActions(!showActions)}
                  data-testid="button-schedule-actions"
                >
                  <MoreVertical size={18} />
                </button>
                {showActions && (
                  <div className="schedule-actions-dropdown">
                    <button
                      className="schedule-action-item"
                      onClick={() => setShowStatusModal(true)}
                      data-testid="button-update-status"
                    >
                      <Edit2 size={14} /> Update Status
                    </button>
                    <button
                      className="schedule-action-item delete"
                      onClick={() => setShowDeleteConfirm(true)}
                      data-testid="button-delete-schedule"
                    >
                      <Trash2 size={14} /> Delete Schedule
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="schedule-details-grid">
              <div className="schedule-detail-item">
                <div className="schedule-detail-icon">
                  <Calendar size={18} />
                </div>
                <div className="schedule-detail-content">
                  <span className="schedule-detail-label">Date & Time</span>
                  <strong>{job.time}</strong>
                </div>
              </div>

              <div className="schedule-detail-item">
                <div className="schedule-detail-icon">
                  <Clock size={18} />
                </div>
                <div className="schedule-detail-content">
                  <span className="schedule-detail-label">Service Type</span>
                  <strong>{job.service}</strong>
                </div>
              </div>

              <div className="schedule-detail-item">
                <div className="schedule-detail-icon">
                  <MapPin size={18} />
                </div>
                <div className="schedule-detail-content">
                  <span className="schedule-detail-label">Location</span>
                  <strong>{job.address}</strong>
                </div>
              </div>

              <div className="schedule-detail-item">
                <div className="schedule-detail-icon">
                  <User size={18} />
                </div>
                <div className="schedule-detail-content">
                  <span className="schedule-detail-label">Assigned To</span>
                  <strong>{job.tech}</strong>
                </div>
              </div>

              <div className="schedule-detail-item full-width">
                <div className="schedule-detail-icon">
                  <Eye size={18} />
                </div>
                <div className="schedule-detail-content">
                  <span className="schedule-detail-label">Status</span>
                  <span
                    className="schedule-status-badge"
                    style={{ backgroundColor: getStatusColor() }}
                  >
                    {status || job.status}
                  </span>
                </div>
              </div>

              <div className="schedule-detail-item full-width">
                <div className="schedule-detail-icon">
                  <AlertTriangle size={18} />
                </div>
                <div className="schedule-detail-content">
                  <span className="schedule-detail-label">Job Type</span>
                  <strong>{job.kind}</strong>
                </div>
              </div>
            </div>

            <div className="schedule-details-description">
              <h3>Additional Information</h3>
              <p>
                This schedule is for {job.service} service at {job.address}.
                Assigned to technician {job.tech}.
              </p>
            </div>

            <div className="schedule-details-actions-bottom">
              <Link
                href="/admin/dashboard"
                className="secondary-button"
                data-testid="button-cancel"
              >
                Cancel
              </Link>
              <button
                className="primary-button"
                onClick={() => setShowStatusModal(true)}
                data-testid="button-update-status-bottom"
              >
                Update Status
              </button>
            </div>
          </section>
        </div>

        {/* Status Update Modal */}
        {showStatusModal && (
          <div
            className="modal-overlay"
            onClick={() => setShowStatusModal(false)}
          >
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3>Update Schedule Status</h3>
                <button
                  className="icon-button"
                  onClick={() => setShowStatusModal(false)}
                  data-testid="button-close-status-modal"
                >
                  <XCircle size={18} />
                </button>
              </div>
              <div className="modal-body">
                <p>Select a new status for schedule #{job.id}</p>
                <div className="status-options">
                  {["New", "Quoted", "Scheduled", "Complete"].map((s) => (
                    <button
                      key={s}
                      className="status-option"
                      onClick={() => handleStatusUpdate(s)}
                      data-testid={`button-status-${s.toLowerCase()}`}
                    >
                      <span
                        className="status-option-dot"
                        style={{
                          backgroundColor:
                            s === "Complete"
                              ? "#25ad76"
                              : s === "Scheduled"
                                ? "#178db4"
                                : s === "Quoted"
                                  ? "#71bed7"
                                  : "#d89435",
                        }}
                      />
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div
            className="modal-overlay"
            onClick={() => setShowDeleteConfirm(false)}
          >
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3>Confirm Delete</h3>
                <button
                  className="icon-button"
                  onClick={() => setShowDeleteConfirm(false)}
                  data-testid="button-close-delete-modal"
                >
                  <XCircle size={18} />
                </button>
              </div>
              <div className="modal-body">
                <p>
                  Are you sure you want to delete schedule #{job.id} for
                  {job.client}? This action cannot be undone.
                </p>
                <div className="modal-actions">
                  <button
                    className="secondary-button"
                    onClick={() => setShowDeleteConfirm(false)}
                    data-testid="button-cancel-delete"
                  >
                    Cancel
                  </button>
                  <button
                    className="primary-button delete"
                    onClick={handleDelete}
                    data-testid="button-confirm-delete"
                  >
                    Delete Schedule
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default ScheduleDetailsPage;
