import { useLocation } from "wouter";
import AppRoutes from "./app-routes";
import Header from "./header";
import Footer from "@/components/layout/footer";
import { Toaster } from "@/components/ui/toaster";
import { PageMetadata } from "../common/page-meta-data";

function Layout() {
  const [pathname] = useLocation();

  return (
    <>
      <PageMetadata />
      {!["auth", "dashboard", "admin"].includes(pathname.split("/")[1]) && (
        <Header onRequest={() => {}} />
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
