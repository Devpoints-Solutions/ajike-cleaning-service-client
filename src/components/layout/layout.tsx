import { useLocation } from "wouter";
import AppRoutes from "./app-routes";
import Header from "./header";
import PublicFooter from "./public-footer";
import { Toaster } from "@/components/ui/toaster";

function Layout() {
  const [pathname] = useLocation();

  return (
    <>
      {!pathname.startsWith("/auth") && (
        <Header
          dashboard={
            pathname === "/dashboard" || pathname === "/admin/dashboard"
          }
          onRequest={() => {}}
        />
      )}

      <AppRoutes />

      {pathname === "/services" ||
      pathname === "/pricing" ||
      pathname === "/about" ||
      pathname === "/contact" ? (
        <PublicFooter />
      ) : null}

      <Toaster />
    </>
  );
}

export default Layout;
