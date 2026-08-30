import { createContext, useContext, useEffect, useState } from "react";
import type {
  ServiceContextType,
  IService,
  ServiceStatsType,
} from "@/lib/types";
import { useGetServicesByUserMutation } from "../apis/service-apis";
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
  const [reOccurrentPlan, setReoccurentPlan] = useState<IService | null>(null);
  const { isAuthenticated, currentUser } = useAuthContext();

  const [getServicesByUser, { data, isSuccess }] =
    useGetServicesByUserMutation();

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
    }
  }, [data, isSuccess]);

  function toggleChat() {
    return setShowChat(!showChat);
  }

  function toggleNewModal() {
    return setNewModalIsOpen(!newModalIsOpen);
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
  };

  return (
    <ServiceContext.Provider value={value}>{children}</ServiceContext.Provider>
  );
}

export function useServiceContext() {
  return useContext(ServiceContext);
}
