import { createContext, useContext, useEffect, useState } from "react";
import type {
  ServiceContextType,
  IService,
  ServiceStatsType,
} from "@/lib/types";
import { useGetServicesByUserMutation } from "../apis/service-apis";
import { useAuthContext } from "./auth-context";

const ServiceContext = createContext<ServiceContextType>({
  isOpen: false,
  toggleModal: () => {},
  services: [],
  serviceStats: {
    new: 0,
    pending: 0,
    completed: 0,
    cancelled: 0,
  },
});

let tempServices: IService[] = [];

export function ServiceContextProvider({ children }: React.PropsWithChildren) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [services, setServices] = useState<IService[]>([]);
  const [serviceStats, setServiceStats] = useState<ServiceStatsType>({
    new: 0,
    pending: 0,
    completed: 0,
    cancelled: 0,
  });

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
      tempServices = data?.data?.services;
      setServices(data?.data?.services);
    }
  }, [data, isSuccess]);

  useEffect(() => {
    if (services && services?.length > 0) {
      const stats = services.reduce(
        (acc, service: IService) => {
          switch (service.status) {
            case "new":
              acc.new += 1;
              break;

            case "completed":
              acc.completed += 1;
              break;

            case "pending":
              acc.pending += 1;
              break;

            case "cancelled":
              acc.cancelled += 1;
              break;
          }

          return acc;
        },
        {
          new: 0,
          completed: 0,
          pending: 0,
          cancelled: 0,
        },
      );

      setServiceStats(stats);
    }
  }, [services]);

  function toggleModal() {
    return setIsOpen(!isOpen);
  }

  const value = {
    isOpen,
    toggleModal,
    services,
    serviceStats,
  };

  return (
    <ServiceContext.Provider value={value}>{children}</ServiceContext.Provider>
  );
}

export function useServiceContext() {
  return useContext(ServiceContext);
}
