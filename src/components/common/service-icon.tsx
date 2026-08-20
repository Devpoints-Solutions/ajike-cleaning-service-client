import {
  Bug,
  Building2,
  ClipboardList,
  Droplets,
  House,
  ShieldCheck,
  Sparkles,
  SprayCan,
} from "lucide-react";
import type { IconProps } from "@/lib/types";

function ServiceIcon({ kind, size = 18 }: { kind: string } & IconProps) {
  const props = { size, strokeWidth: 1.8 };
  if (kind === "bug") return <Bug {...props} />;
  if (kind === "shield") return <ShieldCheck {...props} />;
  if (kind === "house") return <House {...props} />;
  if (kind === "sparkle") return <Sparkles {...props} />;
  if (kind === "spray") return <SprayCan {...props} />;
  if (kind === "droplets") return <Droplets {...props} />;
  if (kind === "building") return <Building2 {...props} />;
  return <ClipboardList {...props} />;
}

export default ServiceIcon;
