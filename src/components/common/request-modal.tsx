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

  // Form state includes fields that map to IService properties (except user ObjectId)
  const [form, setForm] = useState({
    // existing/visible service selection (keeps compatibility with dummy data)
    service: initialService || SERVICES[0].name,

    // IService properties
    title: "",
    description: "",
    propertyType: "Home",
    budget: "",
    customerFirstName: "",
    customerLastName: "",
    customerPhoneNumber: "",
    customerEmail: "",
    address: "",
    plan: "one-time", // ServiceType: "re-occurrent" | "one-time"
    status: "new", // ServiceStatusType
    category: "Pest | Cleaning", // CategoryType (kept as provided: "Pest | Cleaning" | "Both")
    serviceLocation: "",
    preferredDate: "",
    notes: "",
  });

  if (!open) return null;

  const update = (key: string, value: string) =>
    setForm((current) => ({ ...current, [key]: value }));

  const submit = (event: React.FormEvent) => {
    event.preventDefault();

    // Build the payload that aligns with IService shape (excluding `user` and Mongoose Document fields)
    const payload = {
      title: form.title || form.service,
      description: form.description || form.notes,
      propertyType: form.propertyType,
      budget: form.budget,
      customer: {
        firstName: form.customerFirstName,
        lastName: form.customerLastName,
        phoneNumber: form.customerPhoneNumber,
        email: form.customerEmail,
      },
      address: form.address,
      plan: form.plan as "re-occurrent" | "one-time",
      status: "new",
      category: form.category as "Pest | Cleaning" | "Both",
      serviceLocation: form.serviceLocation,
      preferredDate: form.preferredDate,
    };

    // For now the form just shows a submitted state — wire up API call here as needed
    // Example: await api.post('/services', payload)

    // console.log('Submitting service request', payload);
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
                  <label htmlFor="request-service">Service (preset)</label>
                  <select
                    id="request-service"
                    value={form.service}
                    onChange={(e) => update("service", e.target.value)}
                    data-testid="select-request-service"
                  >
                    {SERVICES.map((service) => (
                      <option key={service.id}>{service.name}</option>
                    ))}
                  </select>
                </div>

                <div className="field full">
                  <label htmlFor="request-title">Title</label>
                  <input
                    id="request-title"
                    value={form.title}
                    onChange={(e) => update("title", e.target.value)}
                    placeholder="Short title for the service request"
                    data-testid="input-request-title"
                  />
                </div>

                <div className="field full">
                  <label htmlFor="request-description">Description</label>
                  <textarea
                    id="request-description"
                    value={form.description}
                    onChange={(e) => update("description", e.target.value)}
                    placeholder="Describe the issue or the work you want done"
                    data-testid="textarea-request-description"
                  />
                </div>

                <div className="field">
                  <label htmlFor="request-property">Property type</label>
                  <select
                    id="request-property"
                    value={form.propertyType}
                    onChange={(e) => update("propertyType", e.target.value)}
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
                  <label htmlFor="request-budget">Budget</label>
                  <input
                    id="request-budget"
                    value={form.budget}
                    onChange={(e) => update("budget", e.target.value)}
                    placeholder="e.g. 5000"
                    data-testid="input-request-budget"
                  />
                </div>

                <div className="field">
                  <label htmlFor="request-preferred-date">Preferred date</label>
                  <input
                    id="request-preferred-date"
                    type="date"
                    value={form.preferredDate}
                    onChange={(e) => update("preferredDate", e.target.value)}
                    data-testid="input-request-date"
                  />
                </div>

                <div className="field">
                  <label htmlFor="customer-first">Customer first name</label>
                  <input
                    id="customer-first"
                    required
                    value={form.customerFirstName}
                    onChange={(e) =>
                      update("customerFirstName", e.target.value)
                    }
                    placeholder="Amina"
                    data-testid="input-customer-first"
                  />
                </div>

                <div className="field">
                  <label htmlFor="customer-last">Customer last name</label>
                  <input
                    id="customer-last"
                    required
                    value={form.customerLastName}
                    onChange={(e) => update("customerLastName", e.target.value)}
                    placeholder="Johnson"
                    data-testid="input-customer-last"
                  />
                </div>

                <div className="field">
                  <label htmlFor="customer-phone">Customer phone</label>
                  <input
                    id="customer-phone"
                    required
                    value={form.customerPhoneNumber}
                    onChange={(e) =>
                      update("customerPhoneNumber", e.target.value)
                    }
                    placeholder="(555) 014-0288"
                    data-testid="input-customer-phone"
                  />
                </div>

                <div className="field full">
                  <label htmlFor="customer-email">Customer email</label>
                  <input
                    id="customer-email"
                    type="email"
                    required
                    value={form.customerEmail}
                    onChange={(e) => update("customerEmail", e.target.value)}
                    placeholder="you@example.com"
                    data-testid="input-customer-email"
                  />
                </div>

                <div className="field full">
                  <label htmlFor="request-address">Address</label>
                  <input
                    id="request-address"
                    value={form.address}
                    onChange={(e) => update("address", e.target.value)}
                    placeholder="Street address, city, state"
                    data-testid="input-request-address"
                  />
                </div>

                <div className="field">
                  <label>Plan</label>
                  <div className="radios">
                    <label>
                      <input
                        type="radio"
                        name="plan"
                        checked={form.plan === "one-time"}
                        onChange={() => update("plan", "one-time")}
                        data-testid="radio-plan-one-time"
                      />
                      One-time
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="plan"
                        checked={form.plan === "re-occurrent"}
                        onChange={() => update("plan", "re-occurrent")}
                        data-testid="radio-plan-re-occurrent"
                      />
                      Re-occurrent
                    </label>
                  </div>
                </div>

                <div className="field">
                  <label htmlFor="request-category">Category</label>
                  <select
                    id="request-category"
                    value={form.category}
                    onChange={(e) => update("category", e.target.value)}
                    data-testid="select-request-category"
                  >
                    <option value="Pest | Cleaning">Pest | Cleaning</option>
                    <option value="Both">Both</option>
                  </select>
                </div>

                <div className="field full">
                  <label htmlFor="request-service-location">
                    Service location
                  </label>
                  <input
                    id="request-service-location"
                    value={form.serviceLocation}
                    onChange={(e) => update("serviceLocation", e.target.value)}
                    placeholder="e.g. Kitchen, Bedroom, Yard"
                    data-testid="input-request-service-location"
                  />
                </div>

                <div className="field full">
                  <label htmlFor="request-notes">
                    Additional notes <span className="muted">(optional)</span>
                  </label>
                  <textarea
                    id="request-notes"
                    value={form.notes}
                    onChange={(e) => update("notes", e.target.value)}
                    placeholder="Any other context for the team"
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
