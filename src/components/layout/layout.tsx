import { useLocation } from "wouter";
import AppRoutes from "./app-routes";
import Header from "./header";
import PublicFooter from "./public-footer";

function Layout() {
  const [pathname] = useLocation();

  return (
    <>
      <Header
        dashboard={pathname === "/dashboard" || pathname === "/admin/dashboard"}
        onRequest={() => {}}
      />

      <AppRoutes />

      {pathname === "/services" ||
      pathname === "/pricing" ||
      pathname === "/about" ? (
        <PublicFooter />
      ) : null}
    </>
  );
}

export default Layout;
