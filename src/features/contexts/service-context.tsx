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
  newModalIsOpen: false,
  toggleNewModal: () => {},
});

let tempServices: IService[] = [];

export function ServiceContextProvider({ children }: React.PropsWithChildren) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
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
    }
  }, [data, isSuccess]);

  useEffect(() => {
    const initialStats = {
      new: 0,
      completed: 0,
      pending: 0,
      cancelled: 0,
    };

    if (!services?.length) {
      setServiceStats(initialStats);
      setNextVisit(null);
      setReoccurentPlan(null);
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const result = services.reduce(
      (acc, service: IService) => {
        const status = service.status?.toLowerCase();
        const plan = service.plan?.toLowerCase();

        // ---------------------------
        // Calculate status statistics
        // ---------------------------
        switch (status) {
          case "new":
            acc.stats.new++;
            break;

          case "completed":
            acc.stats.completed++;
            break;

          case "pending":
            acc.stats.pending++;
            break;

          case "cancelled":
            acc.stats.cancelled++;
            break;
        }

        // Only pending services with a preferred date
        if (status !== "pending" || !service.preferredDate) {
          return acc;
        }

        const visitDate = new Date(service.preferredDate);
        visitDate.setHours(0, 0, 0, 0);

        // Ignore dates that have already passed
        if (visitDate < today) {
          return acc;
        }

        const diff = visitDate.getTime() - today.getTime();

        // ---------------------------
        // Find closest pending visit
        // ---------------------------
        if (!acc.closest || diff < acc.closestDiff) {
          acc.closest = service;
          acc.closestDiff = diff;
        }

        // ---------------------------
        // Find closest recurring visit
        // ---------------------------
        if (plan === "re-occurrent") {
          if (!acc.reClosest || diff < acc.reClosestDiff) {
            acc.reClosest = service;
            acc.reClosestDiff = diff;
          }
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
        closestDiff: Infinity,

        reClosest: null as IService | null,
        reClosestDiff: Infinity,
      },
    );

    setServiceStats(result.stats);
    setNextVisit(result.closest);
    setReoccurentPlan(result.reClosest);
  }, [services]);

  function toggleModal() {
    return setIsOpen(!isOpen);
  }

  function toggleChat() {
    return setShowChat(!showChat);
  }

  function toggleNewModal() {
    return setNewModalIsOpen(!newModalIsOpen);
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
