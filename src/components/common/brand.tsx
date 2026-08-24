import { Link } from "wouter";
import logo from "@/assets/logo.png";

function Brand() {
  return (
    <Link
      href="/"
      className="brand flex items-center"
      data-testid="link-brand-home"
    >
      <img src={logo} alt="logo_of_ajike_pest_control" className="w-10 h-10" />
      <div className="flex flex-col items-start justify-center">
        <h1 className="text-[1.8rem] font-black tracking-[-0.08em] leading-none text-[#001625] drop-shadow-[0_1px_0_rgba(0,0,0,0.12)]">
          AJIKE
        </h1>
        <p className="mt-0.5 text-[10px] font-extrabold uppercase tracking-[0.18em] text-sky-700">
          Pest &amp; Cleaning
        </p>
      </div>
    </Link>
  );
}

export default Brand;
