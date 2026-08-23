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
  nextVisit: null,
  showChat: false,
  toggleChat: () => {},
  reOccurrentPlan: null,
});

let tempServices: IService[] = [];

export function ServiceContextProvider({ children }: React.PropsWithChildren) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
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
    }
  }, [data, isSuccess]);

  useEffect(() => {
    if (!services?.length) {
      setServiceStats({
        new: 0,
        completed: 0,
        pending: 0,
        cancelled: 0,
      });
      setNextVisit(null);
      return;
    }

    const today = new Date().getTime();

    const result = services.reduce(
      (acc, service: IService) => {
        // Calculate status statistics
        switch (service.status) {
          case "new":
            acc.stats.new++;
            break;

          case "completed":
            acc.stats.completed++;
            break;

          case "pending":
            acc.stats.pending++;

            // Find closest pending visit
            if (service.preferredDate) {
              const date = new Date(service.preferredDate).getTime();
              const diff = Math.abs(date - today);

              if (!acc.closest || diff < acc.closestDiff) {
                acc.closest = service;
                acc.closestDiff = diff;
              }
            }

            if (service?.plan === "re-occurrent" && service?.preferredDate) {
              const date = new Date(service.preferredDate).getTime();
              const diff = Math.abs(date - today);

              if (!acc.reClosest || diff < acc.reClosestDiff) {
                acc.reClosest = service;
                acc.reClosestDiff = diff;
              }
            }

            break;

          case "cancelled":
            acc.stats.cancelled++;
            break;
        }

        return acc;
      },
      {
        stats: {
          new: 0,
          completed: 0,
          pending: 0,
          cancelled: 0,
        },
        closest: null as IService | null,
        reClosest: null as IService | null,
        reClosestDiff: Infinity,
        closestDiff: Infinity,
      },
    );

    setServiceStats(result.stats);
    setNextVisit(result.closest);
    setReoccurentPlan(result?.reClosest);
  }, [services]);

  function toggleModal() {
    return setIsOpen(!isOpen);
  }

  function toggleChat() {
    return setShowChat(!showChat);
  }

  const value = {
    isOpen,
    toggleModal,
    services,
    serviceStats,
    nextVisit,
    showChat,
    toggleChat,
    reOccurrentPlan,
  };

  return (
    <ServiceContext.Provider value={value}>{children}</ServiceContext.Provider>
  );
}

export function useServiceContext() {
  return useContext(ServiceContext);
}
