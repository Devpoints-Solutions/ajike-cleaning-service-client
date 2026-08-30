import { createContext, useContext, useEffect, useState } from "react";
import type {
  ServiceContextType,
  IService,
  ServiceStatsType,
} from "@/lib/types";
import {
  useGetNewServicesByUserMutation,
  useGetServicesByUserMutation,
} from "../apis/service-apis";
import { useAuthContext } from "./auth-context";

const ServiceContext = createContext<ServiceContextType>({
  services: [],
  serviceStats: {
    new: 0,
    pending: 0,
    completed: 0,
    cancelled: 0,
  },
  nextVisit: null,
  showChat: false,
  toggleChat: () => {},
  reOccurrentPlan: null,
  newModalIsOpen: false,
  toggleNewModal: () => {},
  onGetNewServices: () => {},
  isLoadingFirstData: false,
  isLoadingNewData: false,
  hasMore: true,
});

let tempServices: IService[] = [];

export function ServiceContextProvider({ children }: React.PropsWithChildren) {
  const [newModalIsOpen, setNewModalIsOpen] = useState<boolean>(false);
  const [services, setServices] = useState<IService[]>([]);
  const [showChat, setShowChat] = useState<boolean>(false);
  const [serviceStats, setServiceStats] = useState<ServiceStatsType>({
    new: 0,
    pending: 0,
    completed: 0,
    cancelled: 0,
  });
  const [nextVisit, setNextVisit] = useState<IService | null>(null);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [page, setPage] = useState(2);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [reOccurrentPlan, setReoccurentPlan] = useState<IService | null>(null);
  const { isAuthenticated, currentUser } = useAuthContext();

  const [getServicesByUser, { data, isSuccess, isLoading }] =
    useGetServicesByUserMutation();

  const [
    getNewServicesByUser,
    {
      data: newServiceData,
      isSuccess: newServiceSuccess,
      isLoading: isLoadingNewServicesData,
    },
  ] = useGetNewServicesByUserMutation();

  useEffect(() => {
    if (
      isAuthenticated &&
      currentUser &&
      currentUser?.role === "user" &&
      tempServices?.length === 0
    ) {
      getServicesByUser(null);
    }

    if (
      isAuthenticated &&
      currentUser &&
      currentUser?.role === "user" &&
      tempServices?.length > 0
    ) {
      setServices(tempServices);
    }
  }, [isAuthenticated, currentUser]);

  useEffect(() => {
    if (isSuccess && data) {
      const srv = [...data?.data?.services]?.sort(
        (a: IService, b: IService) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
      tempServices = srv;
      setServices(srv);
      setServiceStats(data?.data?.serviceStats);
      setNextVisit(data?.data?.nextVisit);
      setReoccurentPlan(data?.data?.recurringService);
      setTotalPage(data?.data?.pagination?.totalPages);
    }
  }, [data, isSuccess]);

  useEffect(() => {
    if (newServiceSuccess && newServiceData) {
      const srv = [...newServiceData?.data]?.sort(
        (a: IService, b: IService) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
      tempServices = [...tempServices, ...srv];
      setServices((prev) => [...prev, ...srv]);
    }
  }, [newServiceData, newServiceSuccess]);

  function toggleChat() {
    return setShowChat(!showChat);
  }

  function toggleNewModal() {
    return setNewModalIsOpen(!newModalIsOpen);
  }

  function onGetNewServices() {
    if (page > totalPage) return setHasMore(false);
    getNewServicesByUser({ page });
    setPage((prev) => prev + 1);
  }

  const value = {
    services,
    serviceStats,
    nextVisit,
    showChat,
    toggleChat,
    reOccurrentPlan,
    toggleNewModal,
    newModalIsOpen,
    onGetNewServices,
    isLoadingFirstData: isLoading,
    isLoadingNewData: isLoadingNewServicesData,
    hasMore,
  };

  return (
    <ServiceContext.Provider value={value}>{children}</ServiceContext.Provider>
  );
}

export function useServiceContext() {
  return useContext(ServiceContext);
}
