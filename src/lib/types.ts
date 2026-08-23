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
  status: ServiceStatus;
  category: CategoryType;
  serviceLocation: string;
  preferredDate: string;
  createdAt: string;
  updatedAt: string;
}

export type ServiceStatsType = {
  new: number;
  pending: number;
  completed: number;
  cancelled: number;
};

export type ServiceContextType = {
  isOpen: boolean;
  toggleModal: () => void;
  services: IService[];
  serviceStats: ServiceStatsType;
  nextVisit: IService | null;
  showChat: boolean;
  toggleChat: () => void;
};
