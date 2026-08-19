import { useState } from "react";
import { X, CheckCircle2, ArrowRight } from "lucide-react";
import { SERVICES } from "@/lib/dummy-data";

function RequestModal({
  open,
  onClose,
  initialService,
}: {
  open: boolean;
  onClose: () => void;
  initialService?: string;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    service: initialService || SERVICES[0].name,
    property: "Home",
    name: "",
    email: "",
    phone: "",
    date: "",
    notes: "",
  });
  if (!open) return null;
  const update = (key: string, value: string) =>
    setForm((current) => ({ ...current, [key]: value }));
  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitted(true);
  };
  return (
    <div
      className="request-overlay"
      role="dialog"
      aria-modal="true"
      data-testid="modal-request-service"
    >
      <div className="request-modal">
        <div className="modal-head">
          <div>
            <div className="eyebrow">A clear next step</div>
            <h2>
              {submitted ? "Request received" : "Tell us what needs care"}
            </h2>
          </div>
          <button
            className="icon-button"
            onClick={onClose}
            aria-label="Close request form"
            data-testid="button-close-request"
          >
            <X size={18} />
          </button>
        </div>
        <div className="modal-body">
          {submitted ? (
            <div className="success-panel">
              <div className="success-icon">
                <CheckCircle2 size={25} />
              </div>
              <h3>We have your request.</h3>
              <p>
                A service coordinator will reach out during business hours to
                confirm the details and offer a visit window. No payment is
                needed to request an inspection.
              </p>
              <button
                className="primary-button"
                onClick={onClose}
                data-testid="button-close-request-success"
              >
                Back to Ajike <ArrowRight size={15} />
              </button>
            </div>
          ) : (
            <form onSubmit={submit}>
              <div className="form-grid">
                <div className="field full">
                  <label htmlFor="request-service">Service</label>
                  <select
                    id="request-service"
                    value={form.service}
                    onChange={(event) => update("service", event.target.value)}
                    data-testid="select-request-service"
                  >
                    {SERVICES.map((service) => (
                      <option key={service.id}>{service.name}</option>
                    ))}
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="request-property">Property type</label>
                  <select
                    id="request-property"
                    value={form.property}
                    onChange={(event) => update("property", event.target.value)}
                    data-testid="select-request-property"
                  >
                    <option>Home</option>
                    <option>Apartment</option>
                    <option>Office</option>
                    <option>Restaurant</option>
                    <option>Facility</option>
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="request-date">Preferred date</label>
                  <input
                    id="request-date"
                    type="date"
                    value={form.date}
                    onChange={(event) => update("date", event.target.value)}
                    data-testid="input-request-date"
                  />
                </div>
                <div className="field">
                  <label htmlFor="request-name">Your name</label>
                  <input
                    id="request-name"
                    required
                    value={form.name}
                    onChange={(event) => update("name", event.target.value)}
                    placeholder="Amina Johnson"
                    data-testid="input-request-name"
                  />
                </div>
                <div className="field">
                  <label htmlFor="request-phone">Phone</label>
                  <input
                    id="request-phone"
                    required
                    value={form.phone}
                    onChange={(event) => update("phone", event.target.value)}
                    placeholder="(555) 014-0288"
                    data-testid="input-request-phone"
                  />
                </div>
                <div className="field full">
                  <label htmlFor="request-email">Email</label>
                  <input
                    id="request-email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(event) => update("email", event.target.value)}
                    placeholder="you@example.com"
                    data-testid="input-request-email"
                  />
                </div>
                <div className="field full">
                  <label htmlFor="request-notes">
                    What should we know?{" "}
                    <span className="muted">(optional)</span>
                  </label>
                  <textarea
                    id="request-notes"
                    value={form.notes}
                    onChange={(event) => update("notes", event.target.value)}
                    placeholder="Tell us where you noticed the issue, or what you want cleaned."
                    data-testid="textarea-request-notes"
                  />
                </div>
              </div>
              <div className="modal-actions">
                <button
                  type="button"
                  className="secondary-button"
                  onClick={onClose}
                  data-testid="button-cancel-request"
                >
                  Not now
                </button>
                <button
                  type="submit"
                  className="primary-button"
                  data-testid="button-submit-request"
                >
                  Send request <ArrowRight size={15} />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default RequestModal;
