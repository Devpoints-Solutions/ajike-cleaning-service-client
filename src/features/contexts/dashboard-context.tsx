import { createContext, useContext, useState } from "react";

const DashboardContext = createContext<{
  mobileOpen: boolean;
  handleNavigation: (label: string) => void;
  activeItem: string;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  setMobileOpen: (mobileOpen: boolean) => void;
}>({
  mobileOpen: false,
  handleNavigation: () => {},
  activeItem: "Dashboard",
  collapsed: false,
  setCollapsed: () => {},
  setMobileOpen: () => {},
});

export function DashboardContextProvider({
  children,
}: React.PropsWithChildren) {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [activeItem, setActiveItem] = useState<string>("Dashboard");
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const handleNavigation = (label: string) => {
    setActiveItem(label);
    setMobileOpen(false);
  };

  const value = {
    mobileOpen,
    handleNavigation,
    activeItem,
    collapsed,
    setCollapsed: (collapsed: boolean) => setCollapsed(collapsed),
    setMobileOpen: (mobileOpen: boolean) => setMobileOpen(mobileOpen),
  };
  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboardContext() {
  return useContext(DashboardContext);
}
