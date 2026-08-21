import { useEffect, useState } from "react";
import moment from "moment";

export function getTime() {
  const now = moment();
  const date = moment().format("dddd, MMMM DD, YYYY");

  return {
    hour: now.hour(),
    minute: now.minute(),
    seconds: now.seconds(),
    date,
  };
}

export function useTime() {
  const [time, setTime] = useState<{
    date: string;
    minute: number;
    seconds: number;
    hour: number;
  }>(getTime);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(getTime());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return time;
}
