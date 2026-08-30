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
  recentServices: [],
  statistics: {
    totalAdmins: 0,
    totalCustomers: 0,
    totalRegisteredUsers: 0,
    totalRequests: 0,
  },
  onGetMoreUsers: () => {},
  hasMoreUsers: true,
  isLoadingNewUsers: false,
});

export function AdminContextProvider({ children }: { children: ReactNode }) {
  const [services, setServices] = useState<IService[]>([]);
  const [recentServices, setRecentServices] = useState<IService[]>([]);
  const [users, setUsers] = useState<IUser[]>([]);
  const [totalUserPage, setTotalUserPage] = useState<number>(1);
  const [hasMoreUsers, setHasMoreUsers] = useState<boolean>(true);
  const [userPage, setUserPage] = useState<number>(2);
  const [firstRequest, setFirstRequest] = useState<boolean>(true);
  const [statistics, setStatistics] = useState<{
    totalAdmins: number;
    totalCustomers: number;
    totalRegisteredUsers: number;
    totalRequests: number;
  }>({
    totalAdmins: 0,
    totalCustomers: 0,
    totalRegisteredUsers: 0,
    totalRequests: 0,
  });

  const { currentUser, isAuthenticated } = useAuthContext();

  const [
    getAllRegisteredUsers,
    { data: usersData, isSuccess: userSuccess, isLoading: usersLoading },
  ] = useGetAllRegisteredUsersMutation();

  const [
    getAllServices,
    { data: serviceData, isSuccess: serviceSuccess, error },
  ] = useGetAllServicesMutation();

  useEffect(() => {
    if (isAuthenticated && currentUser && currentUser?.role === "admin") {
      getAllRegisteredUsers(1);
      getAllServices(null);
    }
  }, [currentUser, isAuthenticated]);

  useEffect(() => {
    if (userSuccess && usersData && firstRequest) {
      setUsers(usersData?.data?.users);
      setStatistics(usersData?.data?.statistics);
      setTotalUserPage(usersData?.data?.pagination?.totalPages);
      setFirstRequest(false);
    }

    if (userSuccess && usersData && !firstRequest) {
      setUsers((prev) => [...prev, ...usersData?.data]);
    }
  }, [usersData, userSuccess]);

  useEffect(() => {
    if (serviceSuccess && serviceData) {
      if (recentServices?.length === 0) {
        setRecentServices(serviceData?.data?.services);
      }

      setServices((prev) => [...prev, ...serviceData?.data?.services]);
    }

    if (error) {
      console.log(error);
    }
  }, [serviceSuccess, serviceData, error]);

  function onGetMoreUsers() {
    if (userPage > totalUserPage) return setHasMoreUsers(false);
    getAllRegisteredUsers(userPage);
    setUserPage((prev) => prev + 1);
  }

  const value = {
    services,
    users,
    recentServices,
    statistics,
    onGetMoreUsers,
    hasMoreUsers,
    isLoadingNewUsers: usersLoading,
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
