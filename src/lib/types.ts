export type Service = {
  id: string;
  name: string;
  detail: string;
  type: "Residential" | "Commercial";
  icon: string;
  price: string;
};

export type IconProps = { size?: number; strokeWidth?: number };

export type ServiceStatus =
  | "New"
  | "Completed"
  | "Pending"
  | "Canceled"
  | "new"
  | "completed"
  | "pending"
  | "canceled";

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

export interface IService extends Document {
  title: string;
  description: string;
  propertyType: string;
  budget: string;
  user: IUser;
  customer: IUser;
  address: string;
  plan: ServiceType;
  status: ServiceStatus;
  category: CategoryType;
  serviceLocation: string;
  preferredDate: string;
}
