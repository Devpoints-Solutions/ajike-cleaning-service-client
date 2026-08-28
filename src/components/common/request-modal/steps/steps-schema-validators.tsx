import { object, string, ref } from "yup";
import { SERVICES } from "@/lib/dummy-data";

// compute minimum numeric price from SERVICES array (prices are like "From $89")
const parsedPrices = SERVICES.map((s) => (s.price || "").replace(/[^0-9]/g, ""))
  .map((p) => Number(p || 0))
  .filter((n) => !Number.isNaN(n) && n > 0);

const MIN_SERVICE_PRICE = parsedPrices.length ? Math.min(...parsedPrices) : 100;

const sanitizeNumericValue = (value: unknown) =>
  String(value ?? "").replace(/[^0-9]/g, "");



export const step1Schema = object({
  category: string().required("Service category is required"),
  title: string()
    .required("Service title is required")
    .min(3, "Servie title must be at least 3 characters")
    .max(50, "Service title must not exceed 50 characters"),
    budget: string()
    .required("Budget is required")
    .test("budget-format", "Budget must be a valid number", (value) => {
      if (!value) return false;
      return /^\d+$/.test(sanitizeNumericValue(value));
    })
    .test(
      "budget-min",
      `The minimum allowed budget is $${MIN_SERVICE_PRICE}`,
      (value) => {
        if (!value) return false;
        return Number(sanitizeNumericValue(value)) >= MIN_SERVICE_PRICE;
      },
    ),

});


export const step2Schema = object({
    propertyType: string().required("Service property type is required"),
    plan: string().required("Service plan is required"),
    planInterval: string().optional(),
    planPeriod: string().optional(),
})


export const step3Schema = object({

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

  postcode: string()
    .required("Postcode is required")
    .matches(/^\d{5}(-\d{4})?$/, "Enter a valid US ZIP code"),

  serviceState: string().required("Select a state"),
  serviceCity: string().required("Select a city"),
  address: string().required("Address is required"),

});



export const step4Schema = object({
 
  description: string()
    .required("Service description is required")
    .min(50, "Servie description must be at least 50 characters")
    .max(1000, "Service description must not exceed 1000 characters"),
  customerFirstName: string()
    .optional(),
  customerLastName: string()
    .optional(),
  customerEmail: string().optional().email("Enter a valid email address"),
  customerPhoneNumber: string()
    .optional()
   
});