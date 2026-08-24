import { useLocation } from "wouter";
import AppRoutes from "./app-routes";
import Header from "./header";
import Footer from "@/components/layout/footer";
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

      {pathname === "/" ||
      pathname === "/services" ||
      pathname === "/pricing" ||
      pathname === "/about" ||
      pathname === "/contact" ||
      pathname === `/services/${pathname.split("/")[2]}` ? (
        <Footer />
      ) : null}

      <Toaster />
    </>
  );
}

export default Layout;
