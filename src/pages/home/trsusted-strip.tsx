import { BadgeCheck, ShieldCheck, Camera, MapPin } from "lucide-react";

function TrustedStrip() {
  return (
    <section
      className="trust-strip"
      aria-label="Ajike trust promises"
      data-testid="section-trust"
    >
      <div className="trust-item">
        <BadgeCheck size={17} /> Verified professionals
      </div>
      <div className="trust-item">
        <ShieldCheck size={17} /> Licensed & insured
      </div>
      <div className="trust-item">
        <Camera size={17} /> Before / after proof
      </div>
      <div className="trust-item">
        <MapPin size={17} /> Local service team
      </div>
    </section>
  );
}

export default TrustedStrip;
