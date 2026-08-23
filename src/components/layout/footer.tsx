import {
  // Facebook,
  // Instagram,
  // Linkedin,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full">
      {/* CTA SECTION */}
      <section className="bg-gradient-to-r from-[#00364e] to-[#001625] px-6 py-20 text-center text-white">
        <div className="mx-auto max-w-4xl">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-[#1687b6]">
            Ready when you are
          </p>

          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Get a protected, spotless space today
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-gray-200 sm:text-base">
            Join homes and businesses across New Jersey and New York that trust
            Helena for pest control and cleaning.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#request-service"
              className="rounded-full bg-[#1687b6] px-8 py-4 text-sm font-bold text-black transition-all duration-300 hover:-translate-y-1 hover:bg-[#1687b6] hover:shadow-lg"
            >
              Request Service
            </a>

            <a
              href="tel:+12015551234"
              className="flex items-center gap-3 rounded-full border border-[#1687b6] text-[#001625] px-8 py-4 text-sm font-bold transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <Phone size={18} strokeWidth={2.2} />
              <span> +1 (201) 486 0774</span>
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <section className="bg-[#001625] px-6 py-14 text-white">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
            {/* BRAND */}
            <div>
              <a href="/" className="inline-flex items-center gap-2">
                {/* Simple shield logo */}
                <div className="flex h-9 w-9 items-center justify-center rounded-b-xl rounded-t-md border-2 border-white/90 bg-[#1687b6]">
                  <span className="text-sm font-black text-[#ffffff]">A</span>
                </div>

                <div className="leading-none">
                  <h3 className="text-xl font-extrabold tracking-tight">
                    Ajike
                  </h3>
                  <p className="mt-1 text-[8px] font-semibold uppercase tracking-[0.18em] text-gray-200">
                    Pest Control
                  </p>
                </div>
              </a>

              <p className="mt-6 max-w-sm text-sm leading-6 text-blue-100/75">
                Verified pest control and cleaning for homes and businesses
                across New Jersey and New York. Company-assigned, trained
                professionals with photo proof on every job.
              </p>

              {/* SOCIAL LINKS */}
              <div className="mt-6 flex gap-3">
                <a
                  href="#facebook"
                  aria-label="Facebook"
                  className="flex h-9 w-9 items-center justify-center rounded-md bg-white/10 text-blue-100 transition hover:bg-[#1687b6] hover:text-[#ffffff]"
                >
                  {/* <Facebook size={16} /> */}
                </a>

                <a
                  href="#instagram"
                  aria-label="Instagram"
                  className="flex h-9 w-9 items-center justify-center rounded-md bg-white/10 text-blue-100 transition hover:bg-[#1687b6] hover:text-[#ffffff]"
                >
                  {/* <Instagram size={16} /> */}
                </a>

                <a
                  href="#linkedin"
                  aria-label="LinkedIn"
                  className="flex h-9 w-9 items-center justify-center rounded-md bg-white/10 text-blue-100 transition hover:bg-[#1687b6] hover:text-[#ffffff]"
                >
                  {/* <Linkedin size={16} /> */}
                </a>
              </div>
            </div>

            {/* SERVICES */}
            <div>
              <h4 className="mb-5 text-sm font-bold">Services</h4>

              <ul className="space-y-3 text-sm text-blue-100/70">
                <li>
                  <a
                    href="#pest-control"
                    className="transition hover:text-white"
                  >
                    Pest Control
                  </a>
                </li>
                <li>
                  <a href="#cleaning" className="transition hover:text-white">
                    Cleaning Services
                  </a>
                </li>
                <li>
                  <a
                    href="#residential-pest"
                    className="transition hover:text-white"
                  >
                    Residential Pest Control
                  </a>
                </li>
                <li>
                  <a
                    href="#commercial-cleaning"
                    className="transition hover:text-white"
                  >
                    Commercial Cleaning
                  </a>
                </li>
                <li>
                  <a href="#bed-bug" className="transition hover:text-white">
                    Bed Bug Treatment
                  </a>
                </li>
                <li>
                  <a
                    href="#deep-cleaning"
                    className="transition hover:text-white"
                  >
                    Deep Cleaning
                  </a>
                </li>
              </ul>
            </div>

            {/* COMPANY */}
            <div>
              <h4 className="mb-5 text-sm font-bold">Company</h4>

              <ul className="space-y-3 text-sm text-blue-100/70">
                <li>
                  <a href="#about" className="transition hover:text-white">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="transition hover:text-white">
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#service-areas"
                    className="transition hover:text-white"
                  >
                    Service Areas
                  </a>
                </li>
                <li>
                  <a href="#careers" className="transition hover:text-white">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#blog" className="transition hover:text-white">
                    Blog & Resources
                  </a>
                </li>
                <li>
                  <a href="#faq" className="transition hover:text-white">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            {/* CONTACT */}
            <div>
              <h4 className="mb-5 text-sm font-bold">Contact</h4>

              <ul className="space-y-4 text-sm">
                <li className="flex items-center gap-3">
                  <Phone size={16} className="shrink-0 text-[#1687b6]" />
                  <a
                    href="tel:+12015551234"
                    className="text-blue-100/90 transition hover:text-white"
                  >
                    +1 (201) 486 0774
                  </a>
                </li>

                <li className="flex items-center gap-3">
                  <Mail size={16} className="shrink-0 text-[#1687b6]" />
                  <a
                    href="mailto:support@helenapc.com"
                    className="text-blue-100/90 transition hover:text-white"
                  >
                    support@ajikepestcontrol.com
                  </a>
                </li>

                <li className="flex items-start gap-3">
                  <MapPin
                    size={16}
                    className="mt-0.5 shrink-0 text-[#1687b6]"
                  />
                  <span className="text-blue-100/90">
                    New Jersey & New York
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* DIVIDER */}
          <div className="my-10 h-px bg-white/10" />

          {/* BOTTOM FOOTER */}
          <div className="flex flex-col gap-5 text-xs text-blue-100/60 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © 2026 Ajike Pest Control and Cleaning Services. All rights
              reserved.
            </p>

            <div className="flex flex-wrap gap-5">
              <a href="#privacy" className="transition hover:text-white">
                Privacy
              </a>

              <a href="#terms" className="transition hover:text-white">
                Terms
              </a>

              <a href="#trust-safety" className="transition hover:text-white">
                Trust & Safety
              </a>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
