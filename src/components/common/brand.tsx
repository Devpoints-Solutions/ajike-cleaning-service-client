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
      <div className="flex flex-col items-center">
        <h1 className="text-[1.6rem] brand-name">AJIKE</h1>
        <p className="text-[10px] font-bold brand-tagline">Pest & Cleaning</p>
      </div>
    </Link>
  );
}

export default Brand;
