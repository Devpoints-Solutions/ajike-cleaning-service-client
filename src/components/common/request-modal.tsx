import { useState } from "react";
import {
  X,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  PenLine,
  UserRoundPlus,
  UserRoundCheck,
} from "lucide-react";
import { SERVICES } from "@/lib/dummy-data";
import { useServiceContext } from "@/features/contexts/service-context";
import { useForm } from "@/features/hooks/use-form";
import { useToast } from "@/features/hooks/use-toast";
import { serviceSchema } from "@/helpers/data-validator-schema";
import { Switch } from "@/components/ui/switch";

function RequestModal() {
  const [submitted, setSubmitted] = useState(false);
  const [showCustomer, setShowCustomer] = useState<boolean>(false);
  const [showTitle, setShowTitle] = useState<boolean>(true);
  const { isOpen, toggleModal } = useServiceContext();
  const { toast } = useToast();
  const {
    getFormInput,
    error: formError,
    isValid,
    data: formData,
  } = useForm(serviceSchema);

  if (!isOpen) return null;

  const submit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!isValid)
      return toast({
        title: `Invalid ${formError?.field} value`,
        description: formError?.message,
        variant: "default",
      });
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
              <p className="text-center">
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
                  <div className="flex items-center justify-between gap-3 rounded-xl border border-border bg-muted/20 p-3">
                    <div className="flex items-center gap-2">
                      {showTitle ? (
                        <Sparkles size={18} className="text-primary" />
                      ) : (
                        <PenLine size={18} className="text-primary" />
                      )}
                      <div>
                        <p className="text-sm font-medium">
                          {showTitle
                            ? "Use a suggested title"
                            : "Write your own title"}
                        </p>
                        <p className="text-[10px] text-muted-foreground">
                          {showTitle
                            ? "Choose from our common service titles"
                            : "Type a custom title for this request"}
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={showTitle}
                      onCheckedChange={(checked) => setShowTitle(checked)}
                      aria-label={
                        showTitle
                          ? "Switch to custom title"
                          : "Switch to preset title"
                      }
                    />
                  </div>
                </div>

                {showTitle ? (
                  <div className="field full">
                    <label htmlFor="request-service">Title (preset)</label>
                    <select
                      id="request-service"
                      name="title"
                      value={formData?.title || SERVICES[0]?.name}
                      onChange={getFormInput}
                      data-testid="select-request-service"
                    >
                      {SERVICES.map((service) => (
                        <option key={service.id} value={service.name}>
                          {service.name}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <div className="field full">
                    <label htmlFor="request-title">Title</label>
                    <input
                      id="request-title"
                      value={formData?.title}
                      name="title"
                      onChange={getFormInput}
                      placeholder="Enter a preferred title if the presets don't fit your need"
                      data-testid="input-request-title"
                    />
                  </div>
                )}

                <div className="field full">
                  <label htmlFor="request-description">Description</label>
                  <textarea
                    id="request-description"
                    name="description"
                    value={formData?.description}
                    onChange={getFormInput}
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

                <div className="field full">
                  <label htmlFor="address">Address</label>
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
                </div>

                <div className="field full">
                  <div className="flex items-center justify-between gap-3 rounded-xl border border-border bg-muted/20 p-3">
                    <div className="flex items-center gap-2">
                      {showCustomer ? (
                        <UserRoundCheck size={18} className="text-primary" />
                      ) : (
                        <UserRoundPlus size={18} className="text-primary" />
                      )}
                      <div>
                        <p className="text-sm font-medium">
                          {showCustomer
                            ? "Customer details included"
                            : "Include customer details"}
                        </p>
                        <p className="text-[10px] text-muted-foreground">
                          {showCustomer
                            ? "Optional contact info is visible below"
                            : "Add a requester’s name, email, and phone"}
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={showCustomer}
                      onCheckedChange={(checked) => setShowCustomer(checked)}
                      aria-label={
                        showCustomer
                          ? "Hide customer details"
                          : "Show customer details"
                      }
                    />
                  </div>
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
