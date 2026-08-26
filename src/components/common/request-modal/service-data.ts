import {
  House,
  Building2,
  CalendarCheck2,
  CalendarSync,
  CalendarDays,
} from "lucide-react";

export const categories = [
  {
    id: "pest",
    name: "Pest",
    detail: "Home, apartment, offices or facility",
    icon: House,
  },
  {
    id: "cleaning",
    name: "Cleaning",
    detail: "Home, office, restaurant, retail, or facility",
    icon: Building2,
  },
];

export const plans = [
  {
    name: "One Time",
    icon: CalendarCheck2,
  },

  {
    name: "Re-occurrent",
    icon: CalendarSync,
  },
];

export const reOccurrentOptions = [
  {
    name: "Weekly",
    icon: CalendarDays,
  },

  {
    name: "Monthly",
    icon: CalendarDays,
  },
  {
    name: "Quarterly",
    icon: CalendarDays,
  },
  {
    name: "Yearly",
    icon: CalendarDays,
  },
];

export const propertyTypes = [
  { name: "Apartment", icon: "" },
  { name: "Office", icon: "" },
  { name: "Restaurant", icon: "" },
  { name: "Facility", icon: "" },
  { name: "Others", icon: " " },
];

export const steps = [1, 2, 3, 4, 5, 6];
