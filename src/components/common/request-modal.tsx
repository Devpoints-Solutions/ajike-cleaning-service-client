import { useState } from "react";
import {
  X,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  PencilLine,
  UserRoundPlus,
  User,
  Mail,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { SERVICES } from "@/lib/dummy-data";
import { useServiceContext } from "@/features/contexts/service-context";

function RequestModal() {
  const [submitted, setSubmitted] = useState(false);
  const { toggleModal } = useServiceContext();

  const [titleMode, setTitleMode] = useState<"preset" | "custom">("preset");
  const [customerFields, setCustomerFields] = useState({
    firstName: true,
    lastName: true,
    email: true,
    phone: true,
  });

  const [form, setForm] = useState({
    service: SERVICES[0].name,
    title: "",
    description: "",
    propertyType: "Home",
    budget: "",
    customerFirstName: "",
    customerLastName: "",
    customerPhoneNumber: "",
    customerEmail: "",
    address: "",
    plan: "one-time",
    status: "new",
    category: "Pest | Cleaning",
    serviceLocation: "",
    preferredDate: "",
    notes: "",
  });

  const update = (key: string, value: string) =>
    setForm((current) => ({ ...current, [key]: value }));

  const toggleCustomerField = (key: keyof typeof customerFields) => {
    setCustomerFields((current) => ({ ...current, [key]: !current[key] }));
  };

  const submit = (event: React.FormEvent) => {
    event.preventDefault();

    const payload = {
      title: titleMode === "custom" ? form.title || form.service : form.service,
      description: form.description || form.notes,
      propertyType: form.propertyType,
      budget: form.budget,
      customer: {
        firstName: customerFields.firstName ? form.customerFirstName : "",
        lastName: customerFields.lastName ? form.customerLastName : "",
        phoneNumber: customerFields.phone ? form.customerPhoneNumber : "",
        email: customerFields.email ? form.customerEmail : "",
      },
      address: form.address,
      plan: form.plan as "re-occurrent" | "one-time",
      status: "new",
      category: form.category as "Pest | Cleaning" | "Both",
      serviceLocation: form.serviceLocation,
      preferredDate: form.preferredDate,
    };

    setSubmitted(true);
    console.log("Submitting service request", payload);
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
            onClick={toggleModal}
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
                Your request is in the queue. Our service team will reach out to
                confirm the details, suggest the best visit window, and keep the
                process simple from here.
              </p>
              <button
                className="primary-button"
                onClick={toggleModal}
                data-testid="button-close-request-success"
              >
                Back to Ajike <ArrowRight size={15} />
              </button>
            </div>
          ) : (
            <form onSubmit={submit}>
              <div className="form-grid">
                <div className="field full">
                  <div className="field-header stack-header">
                    <label htmlFor="request-service">Title</label>
                    <div
                      className="toggle-pills"
                      role="tablist"
                      aria-label="Request title mode"
                    >
                      <button
                        type="button"
                        className={
                          titleMode === "preset" ? "toggle-pill active" : "toggle-pill"
                        }
                        onClick={() => setTitleMode("preset")}
                        aria-pressed={titleMode === "preset"}
                      >
                        <Sparkles size={13} />
                        Use preset
                      </button>
                      <button
                        type="button"
                        className={
                          titleMode === "custom" ? "toggle-pill active" : "toggle-pill"
                        }
                        onClick={() => setTitleMode("custom")}
                        aria-pressed={titleMode === "custom"}
                      >
                        <PencilLine size={13} />
                        Custom title
                      </button>
                    </div>
                  </div>

                  {titleMode === "preset" ? (
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
                  ) : (
                    <input
                      id="request-title"
                      value={form.title}
                      onChange={(e) => update("title", e.target.value)}
                      placeholder="Example: Deep kitchen clean and appliance polish"
                      data-testid="input-request-title"
                    />
                  )}
                </div>

                <div className="field full">
                  <label htmlFor="request-description">Description</label>
                  <textarea
                    id="request-description"
                    value={form.description}
                    onChange={(e) => update("description", e.target.value)}
                    placeholder="Tell us a little more about the space, the issue, and what you’d like done"
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
                  <div className="field-header">
                    <label htmlFor="customer-first">First name</label>
                    <button
                      type="button"
                      className={
                        customerFields.firstName ? "mini-toggle on" : "mini-toggle"
                      }
                      onClick={() => toggleCustomerField("firstName")}
                      aria-pressed={customerFields.firstName}
                    >
                      <User size={12} />
                      {customerFields.firstName ? "Included" : "Optional"}
                    </button>
                  </div>
                  {customerFields.firstName && (
                    <input
                      id="customer-first"
                      value={form.customerFirstName}
                      onChange={(e) => update("customerFirstName", e.target.value)}
                      placeholder="Amina"
                      data-testid="input-customer-first"
                    />
                  )}
                </div>

                <div className="field">
                  <div className="field-header">
                    <label htmlFor="customer-last">Last name</label>
                    <button
                      type="button"
                      className={
                        customerFields.lastName ? "mini-toggle on" : "mini-toggle"
                      }
                      onClick={() => toggleCustomerField("lastName")}
                      aria-pressed={customerFields.lastName}
                    >
                      <UserRoundPlus size={12} />
                      {customerFields.lastName ? "Included" : "Optional"}
                    </button>
                  </div>
                  {customerFields.lastName && (
                    <input
                      id="customer-last"
                      value={form.customerLastName}
                      onChange={(e) => update("customerLastName", e.target.value)}
                      placeholder="Johnson"
                      data-testid="input-customer-last"
                    />
                  )}
                </div>

                <div className="field">
                  <div className="field-header">
                    <label htmlFor="customer-phone">Phone number</label>
                    <button
                      type="button"
                      className={
                        customerFields.phone ? "mini-toggle on" : "mini-toggle"
                      }
                      onClick={() => toggleCustomerField("phone")}
                      aria-pressed={customerFields.phone}
                    >
                      <Phone size={12} />
                      {customerFields.phone ? "Included" : "Optional"}
                    </button>
                  </div>
                  {customerFields.phone && (
                    <input
                      id="customer-phone"
                      value={form.customerPhoneNumber}
                      onChange={(e) =>
                        update("customerPhoneNumber", e.target.value)
                      }
                      placeholder="(555) 014-0288"
                      data-testid="input-customer-phone"
                    />
                  )}
                </div>

                <div className="field full">
                  <div className="field-header">
                    <label htmlFor="customer-email">Email</label>
                    <button
                      type="button"
                      className={
                        customerFields.email ? "mini-toggle on" : "mini-toggle"
                      }
                      onClick={() => toggleCustomerField("email")}
                      aria-pressed={customerFields.email}
                    >
                      <Mail size={12} />
                      {customerFields.email ? "Included" : "Optional"}
                    </button>
                  </div>
                  {customerFields.email && (
                    <input
                      id="customer-email"
                      type="email"
                      value={form.customerEmail}
                      onChange={(e) => update("customerEmail", e.target.value)}
                      placeholder="you@example.com"
                      data-testid="input-customer-email"
                    />
                  )}
                </div>

                <div className="field full">
                  <div className="inline-assist">
                    <ShieldCheck size={15} />
                    <span>Need to skip any contact details? You can leave them off and we’ll still help.</span>
                  </div>
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
                  onClick={toggleModal}
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
