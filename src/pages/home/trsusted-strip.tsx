import { BadgeCheck, ShieldCheck, Camera, MapPin } from "lucide-react";

function TrustedStrip() {
  return (
    <section
      className="trust-strip container"
      aria-label="Ajike trust promises"
      data-testid="section-trust"
    >
      <div className="trust-item">
        <BadgeCheck size={30} /> Verified professionals
      </div>
      <div className="trust-item">
        <ShieldCheck size={30} /> Trusted & Reliable
      </div>
      <div className="trust-item">
        <Camera size={30} /> Before / after proof
      </div>
      <div className="trust-item">
        <MapPin size={30} /> Local service team
      </div>
    </section>
  );
}

export default TrustedStrip;
