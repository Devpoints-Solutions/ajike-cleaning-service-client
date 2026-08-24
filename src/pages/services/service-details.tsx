import { useParams } from "wouter";
import { SERVICES } from "@/lib/dummy-data";
import { SERVICE_IMAGES } from "@/lib/dummy-data";
import { SERVICE_DETAILS } from "@/lib/dummy-data";
import ServiceIcon from "@/components/common/service-icon";
import PageIntro from "@/components/common/page-intro";
import { ArrowRight } from "lucide-react";
import CtaButton from "@/components/common/cta-button";
import { Link } from "wouter";

function ServiceDetails() {
  const { title } = useParams();

  const service = SERVICES.find((service) => service?.name === title);

  return (
    <div>
      <PageIntro
        eyebrow={`Services/${service?.name}`}
        title={
          <>
            Know the starting point.
            <br />
            <em>Choose the right rhythm.</em>
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
    </div>
  );
}

export default ServiceDetails;
