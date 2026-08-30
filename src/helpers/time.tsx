import moment from "moment";
import type { PlanIntervalType } from "@/lib/types";

export function getGreeting() {
  const hour = moment().hour();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export function getSpecificDate(date: string) {
  const day = moment(date);

  const newday = moment(date?.split("-").reverse().join("-"), "DD-MM-YY");

  const fullDate = day.format("dddd, MMMM DD, YYYY");

  return {
    fullDate,
    monthName: newday.format("MMMM"),
    dayDate: newday.format("DD"),
  };
}

export function getIsoFullDate(isoDate: string) {
  const date = moment(isoDate);

  return date.format("dddd, MMMM DD, YYYY");
}

export function getNextVisit(date: string, plan: PlanIntervalType) {
  const currentDate = moment(date, ["YYYY-MM-DD", moment.ISO_8601], true);

  const newPlan = plan?.toLowerCase();

  if (!currentDate.isValid()) {
    throw new Error("Invalid date. Expected YYYY-MM-DD or a valid ISO date");
  }

  let nextVisit = currentDate.clone();

  switch (newPlan) {
    case "weekly":
      nextVisit.add(7, "days");
      break;

    case "monthly":
      nextVisit.add(1, "month");
      break;

    case "quarterly":
      nextVisit.add(3, "months");
      break;

    case "yearly":
      nextVisit.add(1, "year");
      break;
  }

  // Don't allow Sunday as a visit day
  while (nextVisit.day() === 0) {
    nextVisit.add(1, "day");
  }

  return {
    intervalDays: nextVisit.diff(currentDate, "days"),
    nextVisit: nextVisit.format("dddd, MMMM DD, YYYY"),
  };
}

export function extractPrice(budget: string, planPeriod: string) {
  return (
    Number(
      budget
        ?.split(" ")[1]
        ?.split("")
        ?.filter((s: string) => s !== "$")
        ?.join(""),
    ) * Number(planPeriod)
  );
}

export function getTime(isoDate: string) {
  return moment(isoDate).format("HH:mm");
}
