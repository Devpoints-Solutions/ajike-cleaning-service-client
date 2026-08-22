import { useState } from "react";
import { X, CheckCircle2, ArrowRight } from "lucide-react";
import { SERVICES } from "@/lib/dummy-data";
import { useServiceContext } from "@/features/contexts/service-context";
import { useForm } from "@/features/hooks/use-form";
import { useToast } from "@/features/hooks/use-toast";
import { serviceSchema } from "@/helpers/data-validator-schema";

function RequestModal() {
  const [submitted, setSubmitted] = useState(false);
  const [showCustomer, setShowCustomer] = useState<boolean>(false);
  const [showTitle, setShowTitle] = useState<boolean>(false);
  const { toggleModal } = useServiceContext();

  // Form state includes fields that map to IService properties (except user ObjectId)
  const [form, setForm] = useState({
    // existing/visible service selection (keeps compatibility with dummy data)
    service: SERVICES[0].name,

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
      address: formData?.address,
      plan: formData?.plan as "re-occurrent" | "one-time",
      status: "new",
      category: formData?.category as "Pest | Cleaning" | "Both",
      serviceLocation: formData?.serviceLocation,
      preferredDate: formData?.preferredDate,
    };

    // For now the form just shows a submitted state — wire up API call here as needed
    // Example: await api.post('/services', payload)

    // console.log('Submitting service request', payload);
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
                A service coordinator will reach out during business hours to
                confirm the details and offer a visit window. No payment is
                needed to request an inspection.
              </p>
              <button
                className="primary-button"
                onClick={toggleModal}
                data-testid="button-close-request-success"
              >
                Back to dashboard <ArrowRight size={15} />
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
                    value={formData.propertyType}
                    name="propertyType"
                    onChange={getFormInput}
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
                  <label htmlFor="budget">Budget</label>
                  <input
                    id="budget"
                    value={formData?.budget}
                    name="budget"
                    onChange={getFormInput}
                    placeholder="e.g. 5000"
                    data-testid="input-request-budget"
                  />
                </div>

                <div className="field full">
                  <label htmlFor="preferredDate">Preferred date</label>
                  <input
                    id="request-preferred-date"
                    name="preferredDate"
                    type="date"
                    value={formData?.preferredDate}
                    onChange={getFormInput}
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
                    name="address"
                    value={formData?.address}
                    onChange={getFormInput}
                    placeholder="Street address, city, state"
                    data-testid="input-request-address"
                  />
                </div>

                <div className="field">
                  <label htmlFor="plan">Plan</label>

                  <select
                    id="request-plan"
                    value={formData?.plan}
                    onChange={getFormInput}
                    name="plan"
                    data-testid="select-request-plan"
                  >
                    <option value="on-time">One Time</option>
                    <option value="re-occurrent">Re-occurrent</option>
                  </select>
                </div>

                <div className="field">
                  <label htmlFor="category">Category</label>
                  <select
                    name="category"
                    id="request-category"
                    value={formData?.category}
                    onChange={getFormInput}
                    data-testid="select-request-category"
                  >
                    <option value="Pest">Pest</option>
                    <option value="Cleaning">Cleaning</option>
                    <option value="Both">Both</option>
                  </select>
                </div>

                <div className="field full">
                  <label htmlFor="serviceLocation">Service location</label>
                  <input
                    name="serviceLocation"
                    id="request-service-location"
                    value={formData?.serviceLocation}
                    onChange={getFormInput}
                    placeholder="e.g. Mahattan, Time Square"
                    data-testid="input-request-service-location"
                  />

                  {!showCustomer && (
                    <div
                      className="text-[10px] flex items-center gap-3"
                      role="alert"
                      data-testid="text-signin-error"
                    >
                      Third party request?{" "}
                      <a
                        href="#"
                        className="font-bold"
                        onClick={() => setShowCustomer(!showCustomer)}
                      >
                        <CirclePlus size={16} />
                      </a>
                    </div>
                  )}

                  {showCustomer && (
                    <div
                      className="text-[10px] flex items-center gap-3"
                      role="alert"
                      data-testid="text-signin-error"
                    >
                      Service is mine{" "}
                      <a
                        href="#"
                        className="font-bold"
                        onClick={() => setShowCustomer(!showCustomer)}
                      >
                        <CircleMinus size={16} />
                      </a>
                    </div>
                  )}
                </div>

                {showCustomer && (
                  <>
                    <div className="field">
                      <label htmlFor="customerFirstName">
                        Customer first name
                      </label>
                      <input
                        id="customer-first"
                        name="customerFirstName"
                        value={formData?.customerFirstName}
                        onChange={getFormInput}
                        placeholder="John"
                        data-testid="input-customer-first"
                      />
                    </div>

                    <div className="field">
                      <label htmlFor="customerLastName">
                        Customer last name
                      </label>
                      <input
                        id="customer-last"
                        name="customerLastName"
                        value={formData?.customerLastName}
                        onChange={getFormInput}
                        placeholder="Doe"
                        data-testid="input-customer-last"
                      />
                    </div>

                    <div className="field">
                      <label htmlFor="customerPhoneNumber">
                        Customer phone
                      </label>
                      <input
                        id="customer-phone"
                        name="customerPhoneNumber"
                        value={formData?.customerPhoneNumber}
                        onChange={getFormInput}
                        placeholder="(555) 014-0288"
                        data-testid="input-customer-phone"
                      />
                    </div>

                    <div className="field">
                      <label htmlFor="customerEmail">Customer email</label>
                      <input
                        id="customer-email"
                        type="email"
                        name="customerEmail"
                        value={formData?.customerEmail}
                        onChange={getFormInput}
                        placeholder="you@example.com"
                        data-testid="input-customer-email"
                      />
                    </div>
                  </>
                )}
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
