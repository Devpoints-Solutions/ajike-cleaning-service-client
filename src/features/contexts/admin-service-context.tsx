import {
  createContext,
  type ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";
import type { AdminServiceContextType, IService, IUser } from "@/lib/types";
import { useAuthContext } from "./auth-context";
import { useGetAllRegisteredUsersMutation } from "../apis/user-apis";
import { useGetAllServicesMutation } from "../apis/service-apis";

const AdminServiceContext = createContext<AdminServiceContextType>({
  services: [],
  users: [],
});

export function AdminContextProvider({ children }: { children: ReactNode }) {
  const [services, setServices] = useState<IService[]>([]);
  const [users, setUsers] = useState<IUser[]>([]);

  const { currentUser, isAuthenticated } = useAuthContext();

  const [getAllRegisteredUsers, { data: usersData, isSuccess: userSuccess }] =
    useGetAllRegisteredUsersMutation();
  const [
    getAllServices,
    { data: serviceData, isSuccess: serviceSuccess, error },
  ] = useGetAllServicesMutation();

  useEffect(() => {
    if (isAuthenticated && currentUser && currentUser?.role === "admin") {
      getAllRegisteredUsers(null);
      getAllServices(null);
    }
  }, [currentUser, isAuthenticated]);

  useEffect(() => {
    if (userSuccess && usersData) {
      setUsers((prev) => [...prev, ...usersData?.data?.users]);
    }
  }, [usersData, userSuccess]);

  useEffect(() => {
    if (serviceSuccess && serviceData) {
      setServices((prev) => [...prev, ...serviceData?.data?.services]);
    }

    if (error) {
      console.log(error);
    }
  }, [serviceSuccess, serviceData, error]);

  const value = {
    services,
    users,
  };

  return (
    <AdminServiceContext.Provider value={value}>
      {children}
    </AdminServiceContext.Provider>
  );
}

export function useAdminServiceContext() {
  return useContext(AdminServiceContext);
}
