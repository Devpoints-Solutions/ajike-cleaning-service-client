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
import { SERVICES, NY_CITIES, NJ_CITIES } from "@/lib/dummy-data";
import { useServiceContext } from "@/features/contexts/service-context";
import { useForm } from "@/features/hooks/use-form";
import { useToast } from "@/features/hooks/use-toast";
import { serviceSchema } from "@/helpers/data-validator-schema";
import { Switch } from "@/components/ui/switch";
import { useRequestNewServiceMutation } from "@/features/apis/service-apis";
import { formatError } from "@/helpers/format-error";

const normalizePriceString = (value?: string) =>
  (value ?? "").replace(/[^0-9]/g, "");

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

  const [selectedPrice, setSelectedPrice] = useState<string>("");

  useEffect(() => {
    const service = SERVICES.find((s) => s.name === formData?.title);
    if (service) {
      const normalized = normalizePriceString(service.price);
      setSelectedPrice(normalized);
      // when a preset title is selected, update the budget form field to match the service price
      getFormInput({
        target: {
          name: "budget",
          value: normalized,
        },
      } as React.ChangeEvent<HTMLInputElement>);
    } else {
      setSelectedPrice("");
      // clear budget when no preset title is selected
      getFormInput({
        target: {
          name: "budget",
          value: "",
        },
      } as React.ChangeEvent<HTMLInputElement>);
    }
  }, [formData?.title]);

  const handleBudgetSelection = (value: string) => {
    const normalized = normalizePriceString(value);
    setSelectedPrice(normalized);
    getFormInput({
      target: {
        name: "budget",
        value: normalized,
      },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  const [requestNewService, { isError, error, isSuccess, isLoading }] =
    useRequestNewServiceMutation();

  if (!isOpen) return null;

  const submit = (event: React.FormEvent) => {
    event.preventDefault();

    const budgetValue = normalizePriceString(formData?.budget || selectedPrice);
    const payload = {
      title: formData?.title,
      description: formData?.description,
      propertyType: formData?.propertyType,
      budget: budgetValue,
      price: budgetValue,
      customer: showCustomer
        ? {
            firstName: formData?.customerFirstName,
            lastName: formData?.customerLastName,
            phoneNumber: formData?.customerPhoneNumber,
            email: formData?.customerEmail,
          }
        : null,
      plan: formData?.plan as "re-occurrent" | "one-time",
      planInterval: formData?.planInterval || null,
      category: formData?.category as "Pest" | "Cleaning" | "Both",
      address: formData?.address,
      postcode: formData?.postcode,
      serviceState: formData?.serviceState || null,
      serviceCity: formData?.serviceCity || null,
      status: "new",
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
                      value={formData?.title || ""}
                      onChange={getFormInput}
                      data-testid="select-request-service"
                    >
                      <option value="">Select service</option>
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
                    value={formData?.propertyType || ""}
                    name="propertyType"
                    onChange={getFormInput}
                    data-testid="select-request-property"
                  >
                    <option value="">Select property type</option>
                    <option value="Home">Home</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Office">Office</option>
                    <option value="Restaurant">Restaurant</option>
                    <option value="Facility">Facility</option>
                    <option value="Others">Others</option>
                  </select>
                </div>

                {showTitle ? (
                  <div className="field">
                    <label htmlFor="price">Price</label>
                    {SERVICES.find((s) => s.name === formData?.title) ? (
                      <input
                        id="request-price-readonly"
                        name="budget"
                        value={formData?.budget || selectedPrice || ""}
                        readOnly
                        type="number"
                        data-testid="input-request-price-readonly"
                      />
                    ) : (
                      <select
                        id="request-price"
                        name="budget"
                        value={selectedPrice || ""}
                        onChange={(event) =>
                          handleBudgetSelection(event.target.value)
                        }
                        data-testid="select-request-price"
                      >
                        <option value="">Select price</option>
                        {SERVICES.map((service) => (
                          <option key={service.id} value={normalizePriceString(service.price)}>
                            {normalizePriceString(service.price)}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                ) : (
                  <div className="field">
                    <label htmlFor="budget">Budget($)</label>
                    <input
                      id="budget"
                      value={formData?.budget || ""}
                      name="budget"
                      type="number"
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

                <div className="field">
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

                <div className="field">
                  <label htmlFor="plan">Plan</label>

                  <select
                    id="request-plan"
                    value={formData?.plan || ""}
                    onChange={getFormInput}
                    name="plan"
                    data-testid="select-request-plan"
                  >
                    <option value="">Select plan</option>
                    <option value="one-time">One Time</option>
                    <option value="re-occurrent">Re-occurrent</option>
                  </select>
                </div>

                {formData?.plan === "re-occurrent" && (
                  <div className="field">
                    <label htmlFor="planInterval">Interval</label>
                    <select
                      id="request-plan-interval"
                      name="planInterval"
                      value={formData?.planInterval || ""}
                      onChange={getFormInput}
                      data-testid="select-request-plan-interval"
                    >
                      <option value="">Select interval</option>
                      <option value="Weekly">Weekly</option>
                      <option value="Monthly">Monthly</option>
                      <option value="Quarterly">Quarterly</option>
                      <option value="Yearly">Yearly</option>
                    </select>
                  </div>
                )}

                <div className="field">
                  <label htmlFor="category">Category</label>
                  <select
                    name="category"
                    id="request-category"
                    value={formData?.category || ""}
                    onChange={getFormInput}
                    data-testid="select-request-category"
                  >
                    <option value="">Select category</option>
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
                  <label htmlFor="address">Address</label>
                  <input
                    id="request-address"
                    name="address"
                    value={formData?.address}
                    onChange={getFormInput}
                    placeholder="Street address, unit (optional)"
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
                  <label htmlFor="postcode">Postcode</label>
                  <input
                    id="request-postcode"
                    name="postcode"
                    value={formData?.postcode || ""}
                    onChange={getFormInput}
                    placeholder="e.g. 10001"
                    inputMode="numeric"
                    maxLength={10}
                    data-testid="input-request-postcode"
                  />
                  {formError && formError.field === "postcode" && (
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
                  <label htmlFor="serviceState">State</label>
                  <select
                    id="request-service-state"
                    name="serviceState"
                    value={formData?.serviceState || ""}
                    onChange={getFormInput}
                    data-testid="select-request-service-state"
                  >
                    <option value="">Select state</option>
                    <option value="New Jersey">New Jersey</option>
                    <option value="New York">New York</option>
                  </select>
                  {formError && formError.field === "serviceState" && (
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
                  <label htmlFor="serviceCity">City</label>
                  <select
                    id="request-service-city"
                    name="serviceCity"
                    value={formData?.serviceCity || ""}
                    onChange={getFormInput}
                    data-testid="select-request-service-city"
                  >
                    <option value="">Select city</option>
                    {(formData?.serviceState === "New York"
                      ? NY_CITIES
                      : NJ_CITIES
                    ).map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                  {formError && formError.field === "serviceCity" && (
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
