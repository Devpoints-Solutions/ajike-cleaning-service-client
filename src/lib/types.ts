export type Service = {
  id: string;
  name: string;
  detail: string;
  type: "Residential" | "Commercial";
  icon: string;
  price: string;
  slug: string;
  category?: "Pest" | "Cleaning";
};

export type IconProps = { size?: number; strokeWidth?: number };

export type ServiceStatus =
  | "New"
  | "Completed"
  | "Pending"
  | "Cancelled"
  | "new"
  | "completed"
  | "pending"
  | "cancelled";

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  role?: "user" | "admin";
  picture?: string;
}

export type AuthContextType = {
  isAuthenticated: boolean;
  currentUser: IUser | null;
  updateIsAuthenticatedState: (user: IUser) => void;
  signout: () => void;
};

export type ServiceType = "re-occurrent" | "one-time";
export type CategoryType = "Pest | Cleaning" | "Both";
export type PlanIntervalType = "weekly" | "monthly" | "quarterly" | "yearly";
export type StateType = "New York" | "New Jersey";
export type CityType =
  | "New York"
  | "Buffalo"
  | "Rochester"
  | "Yonkers"
  | "Syracuse"
  | "Albany"
  | "New Rochelle"
  | "Mount Vernon"
  | "Schenectady"
  | "Utica"
  | "Newark"
  | "Jersey City"
  | "Paterson"
  | "Elizabeth"
  | "Edison"
  | "Woodbridge"
  | "Lakewood"
  | "Toms River"
  | "Clifton"
  | "Camden";

export interface IService extends Document {
  _id: string;
  title: string;
  description: string;
  propertyType: string;
  budget: string;
  user: IUser;
  customer: IUser;
  address: string;
  plan: ServiceType;
  planInterval: PlanIntervalType;
  status: ServiceStatus;
  category: CategoryType;
  preferredDate: string;
  createdAt: string;
  updatedAt: string;
  serviceState: StateType;
  serviceCity: CityType;
  postcode: string;
}

export type ServiceStatsType = {
  new: number;
  pending: number;
  completed: number;
  cancelled: number;
};

export type ServiceContextType = {
  isOpen: boolean;
  newModalIsOpen: boolean;
  toggleNewModal: () => void;
  toggleModal: () => void;
  services: IService[];
  serviceStats: ServiceStatsType;
  nextVisit: IService | null;
  reOccurrentPlan: IService | null;
  showChat: boolean;
  toggleChat: () => void;
};

export type ErrorType = {
  field: string;
  message: string;
};
