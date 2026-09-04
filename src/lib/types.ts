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

export type UserServiceStatus =
  | "New"
  | "Completed"
  | "Active"
  | "Cancelled"
  | "new"
  | "completed"
  | "pending"
  | "Pending"
  | "active"
  | "cancelled";

export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  role?: "user" | "admin";
  picture?: string;
  serviceCount?: number;
}

export type AuthContextType = {
  isAuthenticated: boolean;
  currentUser: IUser | null;
  updateIsAuthenticatedState: (user: IUser) => void;
  signout: () => void;
};

export type ServiceType = "re-occurrent" | "one-time";
export type CategoryType = "Pest" | "Cleaning";
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

export interface IService {
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
  planPeriod: string;
  periodCovered: string;
  status: ServiceStatus;
  category: CategoryType;
  preferredDate: string;
  createdAt: string;
  updatedAt: string;
  serviceState: StateType;
  serviceCity: CityType;
  postcode: string;
  visitCompleted: string;
}

export type ServiceStatsType = {
  new: number;
  pending: number;
  completed: number;
  cancelled: number;
};

export type ServiceContextType = {
  newModalIsOpen: boolean;
  toggleNewModal: () => void;
  services: IService[];
  serviceStats: ServiceStatsType;
  nextVisit: IService | null;
  reOccurrentPlan: IService | null;
  onGetNewServices: () => void;
  isLoadingFirstData: boolean;
  isLoadingNewData: boolean;
  hasMore: boolean;
};

export type AdminServiceContextType = {
  services: IService[];
  users: IUser[];
  recentServices: IService[];
  statistics: {
    totalAdmins: number;
    totalCustomers: number;
    totalRegisteredUsers: number;
    totalRequests: number;
  };

  onGetMoreUsers: () => void;
  hasMoreUsers: boolean;
  isLoadingNewUsers: boolean;
  onGetMoreServices: () => void;
  isLoadingNewServices: boolean;
  hasMoreServices: boolean;

  servicesStats: {
    totalCompletedServices: number;
    totalCompletedValue: number;
    totalNewServices: number;
    totalNewValue: number;
    totalPendingServices: number;
    totalPendingValue: number;
    totalServices: number;
    totalValue: number;
  };

  topUsers: IUser[] | null;
};

export type ErrorType = {
  field: string;
  message: string;
};

export interface ICustomerReview {
  _id: string;
  text: string;
  rating: number;
  service: IService;
  user: IUser;
  updatedAt: string;
}

export type ReviewStatsType = {
  averageRating: number;
  totalFeedbacks: number;
  totalFiveStars: number;
  totalFourStars: number;
  totalOneStar: number;
  totalThreeStars: number;
  totalTwoStars: number;
  completedServices: number;
};

export type ReviewContextType = {
  completedServices: IService[];
  customersReviews: ICustomerReview[];
  reviewStats: ReviewStatsType;
  onFetchMoreFeedback: () => void;
  feedbackIsLoading: boolean;
  hasMore: boolean;
};

export type ProfileField =
  | "firstName"
  | "lastName"
  | "email"
  | "phoneNumber"
  | "role";

export type ProfileValues = Pick<
  IUser,
  "firstName" | "lastName" | "email" | "phoneNumber" | "role"
>;
