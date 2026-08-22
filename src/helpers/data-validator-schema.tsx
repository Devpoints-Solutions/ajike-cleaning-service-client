import { object, string, ref } from "yup";

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

export const serviceSchema = object({
  title: string().required("Service title is required"),
  description: string().required("Service description is required"),
  propertyType: string().required("Property type is required"),

  budget: string().required("Budget is required"),
  preferredDate: string().required("Preferred date is required"),
  customerFirstName: string().optional(),
  customerLastName: string().optional(),
  customerEmail: string()
    .optional()
    .email("Enter a valid email address"),
  customerPhoneNumber: string()
    .optional()
    .matches(
      /^(?:\+1\s?)?(?:\(\d{3}\)|\d{3})[-.\s]?\d{3}[-.\s]?\d{4}$/,
      "Please enter a valid US phone number",
    ),
  address: string().required("Address is required"),
  serviceLocation: string().required("Please enter location"),
});
