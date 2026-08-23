import { object, string, ref } from "yup";
import { SERVICES } from "@/lib/dummy-data";

// compute minimum numeric price from SERVICES array (prices are like "From $89")
const parsedPrices = SERVICES.map((s) => (s.price || "").replace(/[^0-9]/g, ""))
  .map((p) => Number(p || 0))
  .filter((n) => !Number.isNaN(n) && n > 0);
const MIN_SERVICE_PRICE = parsedPrices.length ? Math.min(...parsedPrices) : 100;

export const signupSchema = object({
  firstName: string().required("First name is required"),
  lastName: string().required("Last name is required"),
  email: string()
    .email("Enter a valid email address")
    .required("Email is required"),
  phoneNumber: string()
    .required("Phone number is required")
    .matches(
      /^(?:\+1\s?)?(?:\(\d{3}\)|\d{3})[-.\s]?\d{3}[-.\s]?\d{4}$/,
      "Please enter a valid US phone number",
    ),
  password: string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-z]/, "Password must contain a lowercase letter")
    .matches(/[A-Z]/, "Password must contain an uppercase letter")
    .matches(/\d/, "Password must contain a number")
    .matches(/[@$!%*#?&]/, "Password must contain a special character"),
});

export const accountVerificationSchema = object({
  otp: string()
    .required("Verification code is required")
    .min(6, "Verification code must be 6 characters")
    .max(6, "Verification code must be 6 characters")
    .matches(/^\d+$/, "Verification code must be a number"),
});

export const loginSchema = object({
  email: string().required("Email is required"),
  password: string().required("Password is required"),
});

export const passwordResetSchema = object({
  email: string()
    .email("Enter a valid email address")
    .required("Email is required"),
});

export const updatePasswordResetSchema = object({
  password: string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-z]/, "Password must contain a lowercase letter")
    .matches(/[A-Z]/, "Password must contain an uppercase letter")
    .matches(/\d/, "Password must contain a number")
    .matches(/[@$!%*#?&]/, "Password must contain a special character"),
  confirmPassword: string()
    .oneOf([ref("password")], "Passwords must match")
    .required("Confirm password is required"),
  otp: string()
    .required("Verification code is required")
    .min(6, "Verification code must be 6 characters")
    .max(6, "Verification code must be 6 characters")
    .matches(/^\d+$/, "Verification code must be a number"),
});

const normalizeNumericValue = (value: unknown) => {
  const stringValue = typeof value === "string" ? value : String(value ?? "");
  return stringValue.replace(/[^0-9]/g, "");
};

export const serviceSchema = object({
  title: string()
    .trim()
    .required("Service title is required")
    .min(3, "Service title must be at least 3 characters")
    .max(50, "Service title must not exceed 50 characters"),
  description: string()
    .trim()
    .required("Service description is required")
    .min(50, "Service description must be at least 50 characters")
    .max(1000, "Service description must not exceed 1000 characters"),
  propertyType: string().trim().required("Property type is required"),
  budget: string()
    .required("Budget is required")
    .transform((value) => normalizeNumericValue(value))
    .test("budget-is-number", "Budget must be a valid number", (value) => {
      const numericValue = Number(normalizeNumericValue(value));
      return Number.isFinite(numericValue) && numericValue > 0;
    })
    .test(
      "budget-minimum",
      `The minimum allowed budget is $${MIN_SERVICE_PRICE}`,
      (value) => {
        const numericValue = Number(normalizeNumericValue(value));
        return Number.isFinite(numericValue) && numericValue >= MIN_SERVICE_PRICE;
      },
    ),
  preferredDate: string()
    .required("Preferred date is required")
    .test("not-past", "Date cannot be in the past", (value) => {
      if (!value) return false;

      const selected = new Date(`${value}T00:00:00`);

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      return selected >= today;
    })
    .test(
      "within-one-week",
      "Date must be more than 7 days from today",
      (value) => {
        if (!value) return false;

        const selected = new Date(`${value}T00:00:00`);

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const maxDate = new Date(today);
        maxDate.setDate(today.getDate() + 7);

        return selected >= maxDate;
      },
    )
    .test("not-sunday", "Sundays are not available", (value) => {
      if (!value) return false;

      const selected = new Date(`${value}T00:00:00`);

      return selected.getDay() !== 0;
    }),
  address: string().trim().required("Address is required"),
  serviceState: string().trim().required("State is required"),
  serviceCity: string().trim().required("City is required"),
  postcode: string()
    .trim()
    .required("Postcode is required")
    .matches(/^\d{5}(-\d{4})?$/, "Enter a valid US ZIP code"),
  plan: string().trim().required("Service plan is required"),
  planInterval: string()
    .trim()
    .when("plan", {
      is: "re-occurrent",
      then: (schema) => schema.required("Interval is required"),
      otherwise: (schema) => schema.optional(),
    }),
  category: string().trim().required("Service category is required"),
  customerFirstName: string()
    .trim()
    .optional()
    .min(3, "Customer firstname is required and must be at least 3 characters")
    .max(50, "Customer firstname must not exceed 50 characters"),
  customerLastName: string()
    .trim()
    .optional()
    .min(3, "Customer lastname is required and must be at least 3 characters")
    .max(50, "Customer lastname must not exceed 50 characters"),
  customerEmail: string().trim().optional().email("Enter a valid email address"),
  customerPhoneNumber: string()
    .trim()
    .optional()
    .matches(
      /^(?:\+1\s?)?(?:\(\d{3}\)|\d{3})[-.\s]?\d{3}[-.\s]?\d{4}$/,
      "Please enter a valid US phone number",
    ),

  serviceLocation: string().trim().optional(),
});
