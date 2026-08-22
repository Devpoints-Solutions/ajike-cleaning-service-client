import { useEffect, useState } from "react";
import moment from "moment";

export function getTime() {
  const now = moment();
  const date = moment().format("dddd, MMMM DD, YYYY");
  const period = moment().format("A");

  return {
    hour: now.hour(),
    minute: now.minute(),
    seconds: now.seconds(),
    date,
    period,
  };
}

export function useTime() {
  const [time, setTime] = useState<{
    date: string;
    minute: number;
    seconds: number;
    hour: number;
    period: string;
  }>(getTime);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(getTime());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return time;
}
