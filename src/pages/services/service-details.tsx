import { useParams } from "wouter";
import { SERVICES } from "@/lib/dummy-data";
import { SERVICE_IMAGES } from "@/lib/dummy-data";
import { SERVICE_DETAILS } from "@/lib/dummy-data";
import PageIntro from "@/components/common/page-intro";
import { ArrowRight } from "lucide-react";
import ServiceCoverage from "./service-coverage";
import RelatedServices from "./related-services";
import { Link } from "wouter";
import { useEffect, useState } from "react";

type ServiceDetails = {
  audience: string;
  included: string[];
  duration: string;
  prep: string;
  next: string;
};

function ServiceDetails() {
  const { title } = useParams();
  const [serviceDetails, setServiceDetails] = useState<
    ((typeof SERVICES)[number] & ServiceDetails) | undefined
  >();

  const service = SERVICES.find((service) => service?.slug === title);

  useEffect(() => {
    if (service) {
      const details = SERVICE_DETAILS[service.id];
      setServiceDetails({ ...service, ...details });
    }
  }, [service]);

  return (
    <>
      <PageIntro
        eyebrow={`Services/${service?.type}/${service?.name}`}
        title={
          <>
            {service?.name}
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

      {serviceDetails && <ServiceCoverage serviceDetails={serviceDetails} />}

      <RelatedServices />
    </>
  );
}

export default ServiceDetails;
