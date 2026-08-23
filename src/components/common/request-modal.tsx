import { useEffect, useState } from "react";
import {
  X,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  PenLine,
  UserRoundPlus,
  UserRoundCheck,
} from "lucide-react";
import { Loader } from "./loader";
import { SERVICES } from "@/lib/dummy-data";
import { useServiceContext } from "@/features/contexts/service-context";
import { useForm } from "@/features/hooks/use-form";
import { useToast } from "@/features/hooks/use-toast";
import { serviceSchema } from "@/helpers/data-validator-schema";
import { Switch } from "@/components/ui/switch";
import { useRequestNewServiceMutation } from "@/features/apis/service-apis";
import { formatError } from "@/helpers/format-error";

function RequestModal() {
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

  // selectedPrice tracks the current price string for the chosen preset service
  const [selectedPrice, setSelectedPrice] = useState<string>(
    SERVICES.find((s) => s.name === (formData?.title || SERVICES[0]?.name))
      ?.price ||
      SERVICES[0]?.price ||
      "",
  );

  // Keep selectedPrice in sync when the preset title changes
  useEffect(() => {
    const service = SERVICES.find((s) => s.name === formData?.title);
    if (service) {
      setSelectedPrice(service.price);
    } else if (!formData?.title && SERVICES[0]) {
      setSelectedPrice(SERVICES[0].price);
    }
  }, [formData?.title]);

  const [requestNewService, { isError, error, isSuccess, isLoading }] =
    useRequestNewServiceMutation();

  if (!isOpen) return null;

  const submit = (event: React.FormEvent) => {
    event.preventDefault();

    const payload = {
      title: formData?.title,
      description: formData?.description,
      propertyType: formData?.propertyType,
      // keep budget (used when user provides a custom title), and expose price when a preset title is used
      budget: formData?.budget,
      price: showTitle ? selectedPrice : undefined,
      customer: showCustomer
        ? {
            firstName: formData?.customerFirstName,
            lastName: formData?.customerLastName,
            phoneNumber: formData?.customerPhoneNumber,
            email: formData?.customerEmail,
          }
        : null,
      address: formData?.address,
      plan: formData?.plan as "re-occurrent" | "one-time",
      status: "new",
      category: formData?.category as "Pest | Cleaning" | "Both",
      serviceLocation: formData?.serviceLocation,
      preferredDate: formData?.preferredDate,
    };

    if (!isValid)
      return toast({
        title: `Invalid ${formError?.field} value`,
        description: formError?.message,
        variant: "default",
      });
    requestNewService({
      ...payload,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    });
  };

  useEffect(() => {
    if (isError && error) {
      toast({
        title: "Service request failed!",
        description: formatError(error),
        variant: "default",
      });
    }
  }, [isError, error]);

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
              {isSuccess ? "Request received" : "Tell us what needs care"}
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
          {isSuccess ? (
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

                    {formError && formError.field === "title" && (
                      <div
                        className="auth-error"
                        role="alert"
                        data-testid="text-signin-error"
                      >
                        {formError.message}
                      </div>
                    )}
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

                    <div className="flex justify-between items-center">
                      <div>
                        {formError && formError.field === "title" && (
                          <div
                            className="auth-error"
                            role="alert"
                            data-testid="text-signin-error"
                          >
                            {formError.message}
                          </div>
                        )}
                      </div>

                      <div
                        className={`text-[12px] font-bold ${formData?.title?.trim()?.length < 3 || formData?.title?.trim()?.length > 50 ? "text-[#ff0000]" : ""}`}
                        role="alert"
                        data-testid="text-signin-error"
                      >
                        {formData?.title?.trim()?.length}/50
                      </div>
                    </div>
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
                  <div className="flex justify-between items-center">
                    <div>
                      {formError && formError.field === "description" && (
                        <div
                          className="auth-error"
                          role="alert"
                          data-testid="text-signin-error"
                        >
                          {formError.message}
                        </div>
                      )}
                    </div>

                    <div
                      className={`text-[12px] font-bold ${formData?.description?.trim()?.length < 50 || formData?.description?.trim()?.length > 1000 ? "text-[#ff0000]" : ""}`}
                      role="alert"
                      data-testid="text-signin-error"
                    >
                      {formData?.description?.trim()?.length}/1000
                    </div>
                  </div>
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
                    <option>Others</option>
                  </select>
                </div>

                {showTitle ? (
                  <div className="field">
                    <label htmlFor="price">Price</label>
                    <select
                      id="request-price"
                      name="price"
                      value={selectedPrice}
                      onChange={(e) => setSelectedPrice(e.target.value)}
                      data-testid="select-request-price"
                    >
                      {SERVICES.map((service) => (
                        <option key={service.id} value={service.price}>
                          {service.price}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <div className="field">
                    <label htmlFor="budget">Budget($)</label>
                    <input
                      id="budget"
                      value={formData?.budget}
                      name="budget"
                      type="string"
                      onChange={getFormInput}
                      placeholder="e.g. 200"
                      data-testid="input-request-budget"
                    />
                  </div>
                )}

                <div className="grid field full grid-cols-2 justify-between items-center">
                  <div>
                    {formError && formError.field === "propertyType" && (
                      <div
                        className="auth-error"
                        role="alert"
                        data-testid="text-signin-error"
                      >
                        {formError.message}
                      </div>
                    )}
                  </div>
                  <div>
                    {formError && formError.field === "budget" && (
                      <div
                        className="auth-error"
                        role="alert"
                        data-testid="text-signin-error"
                      >
                        {formError.message}
                      </div>
                    )}
                  </div>
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
                  {formError && formError.field === "preferredDate" && (
                    <div
                      className="auth-error"
                      role="alert"
                      data-testid="text-signin-error"
                    >
                      {formError.message}
                    </div>
                  )}
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
                  {formError && formError.field === "address" && (
                    <div
                      className="auth-error"
                      role="alert"
                      data-testid="text-signin-error"
                    >
                      {formError.message}
                    </div>
                  )}
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
                  </select>
                </div>
                <div className="grid field full grid-cols-2 justify-between items-center">
                  <div>
                    {formError && formError.field === "plan" && (
                      <div
                        className="auth-error"
                        role="alert"
                        data-testid="text-signin-error"
                      >
                        {formError.message}
                      </div>
                    )}
                  </div>
                  <div>
                    {formError && formError.field === "category" && (
                      <div
                        className="auth-error"
                        role="alert"
                        data-testid="text-signin-error"
                      >
                        {formError.message}
                      </div>
                    )}
                  </div>
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
                  {formError && formError.field === "serviceLocation" && (
                    <div
                      className="auth-error"
                      role="alert"
                      data-testid="text-signin-error"
                    >
                      {formError.message}
                    </div>
                  )}
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
                    <div className="grid field full grid-cols-2 justify-between items-center">
                      <div>
                        {formError &&
                          formError.field === "customerFirstName" && (
                            <div
                              className="auth-error"
                              role="alert"
                              data-testid="text-signin-error"
                            >
                              {formError.message}
                            </div>
                          )}
                      </div>
                      <div>
                        {formError &&
                          formError.field === "customerLastName" && (
                            <div
                              className="auth-error"
                              role="alert"
                              data-testid="text-signin-error"
                            >
                              {formError.message}
                            </div>
                          )}
                      </div>
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

                    <div className="grid field full grid-cols-2 justify-between items-center">
                      <div>
                        {formError &&
                          formError.field === "customerPhoneNumber" && (
                            <div
                              className="auth-error"
                              role="alert"
                              data-testid="text-signin-error"
                            >
                              {formError.message}
                            </div>
                          )}
                      </div>
                      <div>
                        {formError && formError.field === "customerEmail" && (
                          <div
                            className="auth-error"
                            role="alert"
                            data-testid="text-signin-error"
                          >
                            {formError.message}
                          </div>
                        )}
                      </div>
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
                  {isLoading && <Loader />} Send request{" "}
                  <ArrowRight size={15} />
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
