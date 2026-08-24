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
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-4"
                    aria-hidden="true"
                  >
                    <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z"></path>
                  </svg>
                </a>

                <a
                  href="#instagram"
                  aria-label="Instagram"
                  className="flex h-9 w-9 items-center justify-center rounded-md bg-white/10 text-blue-100 transition hover:bg-[#1687b6] hover:text-[#ffffff]"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    className="size-4"
                    aria-hidden="true"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="5"></rect>
                    <circle cx="12" cy="12" r="4"></circle>
                    <circle
                      cx="17.5"
                      cy="6.5"
                      r="1"
                      fill="currentColor"
                      stroke="none"
                    ></circle>
                  </svg>
                </a>

                <a
                  href="#linkedin"
                  aria-label="LinkedIn"
                  className="flex h-9 w-9 items-center justify-center rounded-md bg-white/10 text-blue-100 transition hover:bg-[#1687b6] hover:text-[#ffffff]"
                >
                  <svg
                    fill="currentColor"
                    className="size-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 640"
                  >
                    <path d="M544.5 273.9C500.5 274 457.5 260.3 421.7 234.7L421.7 413.4C421.7 446.5 411.6 478.8 392.7 506C373.8 533.2 347.1 554 316.1 565.6C285.1 577.2 251.3 579.1 219.2 570.9C187.1 562.7 158.3 545 136.5 520.1C114.7 495.2 101.2 464.1 97.5 431.2C93.8 398.3 100.4 365.1 116.1 336C131.8 306.9 156.1 283.3 185.7 268.3C215.3 253.3 248.6 247.8 281.4 252.3L281.4 342.2C266.4 337.5 250.3 337.6 235.4 342.6C220.5 347.6 207.5 357.2 198.4 369.9C189.3 382.6 184.4 398 184.5 413.8C184.6 429.6 189.7 444.8 199 457.5C208.3 470.2 221.4 479.6 236.4 484.4C251.4 489.2 267.5 489.2 282.4 484.3C297.3 479.4 310.4 469.9 319.6 457.2C328.8 444.5 333.8 429.1 333.8 413.4L333.8 64L421.8 64C421.7 71.4 422.4 78.9 423.7 86.2C426.8 102.5 433.1 118.1 442.4 131.9C451.7 145.7 463.7 157.5 477.6 166.5C497.5 179.6 520.8 186.6 544.6 186.6L544.6 274z" />
                  </svg>
                </a>

                <a
                  href="#linkedin"
                  aria-label="LinkedIn"
                  className="flex h-9 w-9 items-center justify-center rounded-md bg-white/10 text-blue-100 transition hover:bg-[#1687b6] hover:text-[#ffffff]"
                >
                  <svg
                    fill="currentColor"
                    className="size-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 640"
                  >
                    <path d="M453.2 112L523.8 112L369.6 288.2L551 528L409 528L297.7 382.6L170.5 528L99.8 528L264.7 339.5L90.8 112L236.4 112L336.9 244.9L453.2 112zM428.4 485.8L467.5 485.8L215.1 152L173.1 152L428.4 485.8z" />
                  </svg>
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
