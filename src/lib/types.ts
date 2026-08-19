export type Service = {
  id: string;
  name: string;
  detail: string;
  type: "Residential" | "Commercial";
  icon: string;
  price: string;
};

export type IconProps = { size?: number; strokeWidth?: number };

export type AdminStatus = "New" | "Quoted" | "Scheduled" | "Complete";
