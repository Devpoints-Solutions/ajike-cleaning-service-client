import { useParams } from "wouter";
import { SERVICES } from "@/lib/dummy-data";
import { SERVICE_IMAGES } from "@/lib/dummy-data";
import { SERVICE_DETAILS } from "@/lib/dummy-data";
import ServiceIcon from "@/components/common/service-icon";
import PageIntro from "@/components/common/page-intro";
import { ArrowRight, Check, Clock, MapPin, ShieldCheck } from "lucide-react";
import CtaButton from "@/components/common/cta-button";
import ServiceCoverage from "./service-coverage";
import { Link } from "wouter";

function ServiceDetails() {
  const { title } = useParams();

  const service = SERVICES.find((service) => service?.name === title);
  const details = service ? SERVICE_DETAILS[service.id] : undefined;

  console.log(details);

  return (
    <div>
      <PageIntro
        eyebrow={`Services/${service?.type}/${service?.name}`}
        title={
          <>
            {service?.name}
            <br />
            <br />
          </>
        }
        bgImage={SERVICE_IMAGES[service?.id!]}
        action={
          <Link
            className="primary-button"
            data-testid="button-pricing-request"
            href="/contact"
          >
            Get a specific quote <ArrowRight size={15} />
          </Link>
        }
      >
        {service?.detail}
      </PageIntro>

      <ServiceCoverage serviceDetails={{ ...service, ...details }} />
    </div>
  );
}

export default ServiceDetails;
