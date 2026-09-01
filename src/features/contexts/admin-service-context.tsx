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
  onGetMoreServices: () => {},
  isLoadingNewServices: false,
  hasMoreServices: true,
  servicesStats: {
    totalCompletedServices: 0,
    totalCompletedValue: 0,
    totalNewServices: 0,
    totalNewValue: 0,
    totalPendingServices: 0,
    totalPendingValue: 0,
    totalServices: 0,
    totalValue: 0,
    totalWeeklyCompletedServices: 0,
    totalWeeklyCompletedValue: 0,
    totalWeeklyNewServices: 0,
    totalWeeklyNewValue: 0,
    totalWeeklyPendingServices: 0,
    totalWeeklyPendingValue: 0,
    totalWeeklyServices: 0,
    totalWeeklyValue: 0,
  },
  topUsers: null,
});

export function AdminContextProvider({ children }: { children: ReactNode }) {
  const [services, setServices] = useState<IService[]>([]);
  const [recentServices, setRecentServices] = useState<IService[]>([]);
  const [users, setUsers] = useState<IUser[]>([]);
  const [totalUserPage, setTotalUserPage] = useState<number>(1);
  const [totalServicesPage, setTotalServicesPage] = useState<number>(1);
  const [hasMoreUsers, setHasMoreUsers] = useState<boolean>(true);
  const [hasMoreServices, setHasMoreServices] = useState<boolean>(true);
  const [userPage, setUserPage] = useState<number>(2);
  const [servicesPage, setServicesPage] = useState<number>(2);
  const [firstRequest, setFirstRequest] = useState<boolean>(true);
  const [firstServiceRequest, setFirstServicesRequest] =
    useState<boolean>(true);
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
  const [topUsers, setTopUsers] = useState<IUser[] | null>(null);

  const [servicesStats, setServicesStats] = useState<{
    totalCompletedServices: number;
    totalCompletedValue: number;
    totalNewServices: number;
    totalNewValue: number;
    totalPendingServices: number;
    totalPendingValue: number;
    totalServices: number;
    totalValue: number;
    totalWeeklyCompletedServices: number;
    totalWeeklyCompletedValue: number;
    totalWeeklyNewServices: number;
    totalWeeklyNewValue: number;
    totalWeeklyPendingServices: number;
    totalWeeklyPendingValue: number;
    totalWeeklyServices: number;
    totalWeeklyValue: number;
  }>({
    totalCompletedServices: 0,
    totalCompletedValue: 0,
    totalNewServices: 0,
    totalNewValue: 0,
    totalPendingServices: 0,
    totalPendingValue: 0,
    totalServices: 0,
    totalValue: 0,
    totalWeeklyCompletedServices: 0,
    totalWeeklyCompletedValue: 0,
    totalWeeklyNewServices: 0,
    totalWeeklyNewValue: 0,
    totalWeeklyPendingServices: 0,
    totalWeeklyPendingValue: 0,
    totalWeeklyServices: 0,
    totalWeeklyValue: 0,
  });
  const { currentUser, isAuthenticated } = useAuthContext();

  const [
    getAllRegisteredUsers,
    { data: usersData, isSuccess: userSuccess, isLoading: usersLoading },
  ] = useGetAllRegisteredUsersMutation();

  const [
    getAllServices,
    {
      data: serviceData,
      isSuccess: serviceSuccess,
      error,
      isLoading: servicesLoading,
    },
  ] = useGetAllServicesMutation();

  useEffect(() => {
    if (isAuthenticated && currentUser && currentUser?.role === "admin") {
      getAllRegisteredUsers(1);
      getAllServices(1);
    }
  }, [currentUser, isAuthenticated]);

  useEffect(() => {
    if (userSuccess && usersData && firstRequest) {
      setTopUsers(usersData?.data?.topUsers);
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
    if (serviceSuccess && serviceData && firstServiceRequest) {
      if (recentServices?.length === 0) {
        setRecentServices(serviceData?.data?.services);
      }

      setServices(serviceData?.data?.services);
      setTotalServicesPage(serviceData?.data?.pagination?.totalPages);
      setServicesStats(serviceData?.data?.statistics);
      setFirstServicesRequest(false);
    }

    if (serviceSuccess && serviceData && !firstServiceRequest) {
      setServices((prev) => [...prev, ...serviceData?.data]);
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

  function onGetMoreServices() {
    if (servicesPage > totalServicesPage) return setHasMoreServices(false);

    getAllServices(servicesPage);
    setServicesPage((prev) => prev + 1);
  }

  const value = {
    services,
    users,
    recentServices,
    statistics,
    onGetMoreUsers,
    hasMoreUsers,
    isLoadingNewUsers: usersLoading,
    isLoadingNewServices: servicesLoading,
    onGetMoreServices,
    hasMoreServices,
    servicesStats,
    topUsers,
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
