import { useParams } from "wouter";
import { SERVICES } from "@/lib/dummy-data";
import { SERVICE_IMAGES } from "@/lib/dummy-data";
import { SERVICE_DETAILS } from "@/lib/dummy-data";
import ServiceIcon from "@/components/common/service-icon";
import PageIntro from "@/components/common/page-intro";
import { ArrowRight, Check, Clock, MapPin, ShieldCheck } from "lucide-react";
import CtaButton from "@/components/common/cta-button";
import { Link } from "wouter";

function ServiceDetails() {
  const { title } = useParams();

  const service = SERVICES.find((service) => service?.name === title);
  const details = service ? SERVICE_DETAILS[service.id] : undefined;

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

      <div className="page-container container">
        {/* What's included + pricing card */}
        <section className="mt-10 contact-main-grid">
          <div>
            <div className="section-heading">
              <div className="eyebrow" style={{ color: "#11824C", fontWeight: 700 }}>
                WHAT'S INCLUDED
              </div>
              <h2 style={{ marginTop: "0.5rem" }}>
                {service?.name} covers
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-6 mt-6">
              {(details?.included || []).map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 bg-white border rounded-xl px-6 py-4 shadow-sm">
                  <div className="rounded-full bg-[#0b8b4d] p-2 text-white flex items-center justify-center">
                    <Check size={16} strokeWidth={3} />
                  </div>
                  <div className="text-sm text-[#274049]">{item}</div>
                </div>
              ))}
            </div>
          </div>

          <aside className="contact-visual-card p-6 flex flex-col justify-between" style={{ borderRadius: "1.25rem" }}>
            <div>
              <div className="inline-block bg-[#fff3e6] text-[#b35a11] px-3 py-1 rounded-full text-sm font-semibold">Most booked</div>

              <div className="mt-6">
                <div className="text-sm text-[#556b73]">Starting from</div>
                <div className="text-[2.2rem] font-bold mt-1">{service?.price}</div>

                <ul className="mt-4 space-y-3 text-[#415a63]">
                  <li className="flex items-center gap-3"><Clock size={16} /> <span>{details?.duration || "—"}</span></li>
                  <li className="flex items-center gap-3"><MapPin size={16} /> <span>New Jersey & New York</span></li>
                  <li className="flex items-center gap-3"><ShieldCheck size={16} /> <span>Verified, vetted professionals</span></li>
                </ul>
              </div>
            </div>

            <div className="mt-6">
              <CtaButton
                text="Request This Service"
                props={{ className: "w-full rounded-full py-4 bg-[#0b8b4d] hover:opacity-95 text-white font-semibold" }}
                icon={null}
              />

              <div className="text-center text-sm text-[#6b7d86] mt-3">Final quote depends on size &amp; condition.</div>
            </div>
          </aside>
        </section>

        {/* How it works */}
        <section className="mt-14">
          <div className="section-heading">
            <div className="eyebrow" style={{ color: "#11824C", fontWeight: 700 }}>HOW IT WORKS</div>
            <h2 className="mt-2">Simple, documented process</h2>
          </div>

          <div className="grid grid-cols-3 gap-6 mt-6">
            <div className="bg-white border rounded-xl p-6 shadow-sm flex flex-col gap-3">
              <div className="text-[#0b8b4d]"><ServiceIcon kind={service?.icon || "clipboard"} size={22} /></div>
              <div className="font-semibold">Request</div>
              <div className="text-sm text-[#5c6e74]">Tell us the details and schedule.</div>
            </div>
n            <div className="bg-white border rounded-xl p-6 shadow-sm flex flex-col gap-3">
              <div className="text-[#0b8b4d]"><ServiceIcon kind="shield" size={22} /></div>
              <div className="font-semibold">We assign</div>
              <div className="text-sm text-[#5c6e74]">A verified pro is dispatched to you.</div>
            </div>
n            <div className="bg-white border rounded-xl p-6 shadow-sm flex flex-col gap-3">
              <div className="text-[#0b8b4d]"><ServiceIcon kind="clipboard" size={22} /></div>
              <div className="font-semibold">Proof</div>
              <div className="text-sm text-[#5c6e74]">Photos & checklist on completion.</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ServiceDetails;
