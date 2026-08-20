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

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  role: "user" | "admin";
  picture: string;
}

export type AuthContextType = {
  isAuthenticated: boolean;
  currentUser: IUser | null;
  updateIsAuthenticatedState: (user: IUser) => void;
  signout: () => void;
};
