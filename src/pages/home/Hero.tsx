import { Link } from "wouter";

const Hero = () => {
  return (
    <section className="relative min-h-[710px] overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2400&q=85')",
        }}
      />

      {/* Brand-colored overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#061d31]/95 via-[#0b3554]/85 to-[#063f46]/85" />

      {/* Subtle navy tint */}
      <div className="absolute inset-0 bg-[#0b3554]/20" />

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.35) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.35) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      {/* Hero content */}
      <div className="relative z-10 flex min-h-[710px] items-center justify-center px-6 py-24">
        <div className="w-full max-w-5xl text-center text-white">
          {/* Location badge */}
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-md">
            <span className="flex h-5 w-5 items-center justify-center rounded-full border border-[#7cc8e8] text-[#7cc8e8]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
            </span>

            <span>Now serving New Jersey & New York</span>
          </div>

          {/* Heading */}
          <h1
            className="
    mx-auto
    max-w-5xl
    text-[42px]
    font-extrabold
    leading-[0.98]
    tracking-[-0.04em]
    sm:text-5xl
    md:text-6xl
    lg:text-[68px]
  "
          >
            Reliable pest control
            <br />
            and cleaning across
            <br />
            <span className="text-[#1687b6]">New Jersey & New York</span>
          </h1>

          {/* Description */}
          <p
            className="
              mx-auto
              mt-7
              max-w-2xl
              text-base
              font-medium
              leading-7
              text-white/80
              sm:text-lg
          "
          >
            One trusted company for homes and businesses. Request a service, and
            our operations team assigns verified, trained professionals — with
            photo proof on every job.
          </p>

          {/* CTA buttons */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            {/* Request service */}
            <Link
              href="/auth/sign-in"
              className="
                group
                inline-flex
                h-[52px]
                min-w-[220px]
                items-center
                justify-center
                gap-3
                rounded-full
                bg-[#1687b6]
                px-7
                font-bold
                text-[#082d46]
                transition-all
                duration-300
                hover:-translate-y-1
                hover:bg-[#001625]
                hover:shadow-xl
              "
            >
              <span>Request Service</span>

              <svg
                className="transition-transform duration-300 group-hover:translate-x-1"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14" />
                <path d="m13 6 6 6-6 6" />
              </svg>
            </Link>

            {/* Apply */}
            <a
              href="#careers"
              className="
            
                inline-flex
                h-[52px]
                min-w-[240px]
                items-center
                justify-center
                rounded-full
                border
                border-white
                px-7
                font-bold
                text-[#0b3554]
                transition-all
                duration-300
                hover:-translate-y-1
                hover:bg-[#001625]
                hover:shadow-xl
              "
            >
              Apply to Work With Us
            </a>
          </div>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#082d46]/50 to-transparent" />
    </section>
  );
};

export default Hero;
