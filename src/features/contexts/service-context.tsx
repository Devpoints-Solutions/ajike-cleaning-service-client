import { createContext, useContext, useState } from "react";

type ServiceContextType = {
  isOpen: boolean;
  toggleModal: () => void;
};

const ServiceContext = createContext<ServiceContextType>({
  isOpen: false,
  toggleModal: () => {},
});

export function ServiceContextProvider({ children }: React.PropsWithChildren) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  function toggleModal() {
    return setIsOpen(!isOpen);
  }

  const value = {
    isOpen,
    toggleModal,
  };

  return (
    <ServiceContext.Provider value={value}>{children}</ServiceContext.Provider>
  );
}

export function useServiceContext() {
  return useContext(ServiceContext);
}
