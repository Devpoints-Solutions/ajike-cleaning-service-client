import moment from "moment";

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
