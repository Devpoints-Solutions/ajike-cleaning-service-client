import { Link } from "wouter";
import logo from "@/assets/logo.png";

function DashboardBrand({ collapsed }: { collapsed: boolean }) {
  return (
    <div
      className={`
            flex
            h-[88px]
            items-center
            border-b
            border-slate-100
            transition-all
            duration-300
            ${collapsed ? "justify-center px-3" : "px-7"}
          `}
    >
      <Link
        href="/"
        className="brand flex items-center gap-3"
        data-testid="link-brand-home"
      >
        <img
          src={logo}
          alt="logo_of_ajike_pest_control"
          className="w-10 h-10"
        />
        <div className="flex flex-col items-center">
          <h1
            className={`text-[1.6rem] brand-name  ${
              collapsed ? "w-0 overflow-hidden opacity-0" : "w-auto opacity-100"
            }`}
          >
            AJIKE
          </h1>
          <p
            className={`text-[10px] font-bold brand-tagline  ${
              collapsed ? "w-0 overflow-hidden opacity-0" : "w-auto opacity-100"
            }`}
          >
            Pest & Cleaning
          </p>
        </div>
      </Link>
    </div>
  );
}

export default DashboardBrand;
