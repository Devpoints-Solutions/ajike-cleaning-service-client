import { useState } from "react";
import { ArrowRight, CheckCheck, ChevronDown } from "lucide-react";
import { Link } from "wouter";
import PageIntro from "@/components/common/page-intro";
import CtaButton from "@/components/common/cta-button";
import aboutImage from "@/assets/about.jpg";

function About() {
  const [standardOpen, setStandardOpen] = useState(0);
  const standards = [
    [
      "Arrive prepared",
      "The team reviews the property notes before arrival, brings the right equipment, and confirms the scope instead of guessing at the door.",
    ],
    [
      "Work with respect",
      "Shoes, pets, people, food, and active workspaces all get considered in the plan. Careful service is part of the result.",
    ],
    [
      "Leave a record",
      "You receive plain-language notes about what we found, what we did, and what is worth watching next.",
    ],
  ];

  const standardsImage =
    "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80";

  const people = [
    {
      name: "Amina",
      role: "Service coordination",
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=900&q=80",
    },
    {
      name: "Jalen",
      role: "Field technician",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80",
    },
    {
      name: "Tessa",
      role: "Cleaning lead",
      image:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=80",
    },
  ];

  const steps = [
    {
      number: "01",

      title: "Clear before clever",
      description:
        "We use plain language, transparent starting prices, and are commendation that matches the evidence.",
    },
    {
      number: "02",

      title: "Care is operational",
      description:
        " Respect shows up in arrival windows, safe prep notes, tidy exits, and records that do not disappear.",
    },
    {
      number: "03",

      title: "We are accountable",
      description:
        " The person coordinating the work is close enough to follow through before, during, and after the visit.",
    },
  ];

  return (
    <div>
      <PageIntro
        eyebrow="About Ajike / field note 01"
        title={
          <>
            The work is practical.
            <br />
            <em>The standard is personal.</em>
          </>
        }
        bgImage={aboutImage}
        action={
          <CtaButton
            props={{
              className: "primary-button",
              "data-testid": "button-about-request",
            }}
            text="Request a service"
            icon={<ArrowRight size={15} />}
          />
        }
      >
        Ajike exists for the moment when a space needs more than a quick fix. We
        bring pest control and cleaning together with a calm process,
        accountable records, and people who take your space seriously.
      </PageIntro>
      <main className="page-container">
        <section className="container about-manifesto">
          <div className="manifesto-copy">
            <div className="eyebrow">Our mission</div>
            <h2>Make care easier to trust.</h2>
            <p>
              When a home or workplace feels unsettled, the hardest part is
              often not the service itself — it is not knowing what will happen
              next. Our job is to make that next step clear. We inspect before
              we recommend, explain before we treat, and leave proof behind.
            </p>
            <p>
              That promise applies to a kitchen perimeter, a nursery bedroom, an
              office entrance, and every person who lets us through the door.
            </p>
          </div>
          <div
            className="manifesto-visual"
            aria-label="Professional cleaning and pest control care"
          >
            <img
              src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80"
              alt="Professional cleaner caring for a home environment"
            />
            <div className="manifesto-visual-badge">
              <span>Local care</span>
              <strong>Visible standards. Peace of mind.</strong>
            </div>
          </div>
        </section>

        <section
          id="process"
          className="bg-[#001625] py-20 px-6 sm:px-8 lg:px-12 mb-32"
        >
          <div className="custom-container container mx-auto max-w-7xl">
            {/* Heading */}
            <div className="mb-14 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <span className="eyebrow">The Ajike brief</span>

                <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
                  Values you can see in the visit.
                </h2>
              </div>

              <p className="max-w-md text-base leading-7 text-white/70">
                Not slogans on a wall. Small decisions in the field, repeated
                until they become a standard.
              </p>
            </div>

            {/* Steps */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {steps.map((step, _index) => (
                <div
                  key={step.number}
                  className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.06] p-7 shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:border-white/20 hover:bg-white/[0.09] hover:shadow-2xl"
                >
                  {/* Decorative number */}
                  <div className="absolute -right-5 -top-8 text-8xl font-black text-white/[0.04] transition-transform duration-500 group-hover:scale-110">
                    {step.number}
                  </div>

                  {/* Step number */}
                  <div className="relative mb-8 flex items-center justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-sm font-bold text-[#071f2c] shadow-md">
                      {step.number}
                    </span>

                    {/* <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/50">
                      {step.label}
                    </span> */}
                  </div>

                  {/* Content */}
                  <div className="relative">
                    <h3 className="mb-4 text-2xl font-bold text-[#1687b6]">
                      {step.title}
                    </h3>

                    <p className="text-sm leading-7 text-white/65">
                      {step.description}
                    </p>
                  </div>

                  {/* Bottom accent */}
                  <div className="mt-8 h-1 w-12 rounded-full bg-white/30 transition-all duration-300 group-hover:w-full group-hover:bg-white" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="container section standards-section">
          <div className="standards-art">
            <img
              src={standardsImage}
              alt="Ajike team member checking a home during a quality inspection"
            />
            <div className="blueprint-label">FIELD STANDARD / 03</div>
            <div className="standards-crosshair" />
            <div className="standards-line line-one" />
            <div className="standards-line line-two" />
            <span className="standards-coordinate">N 37° 46' · W 122° 25'</span>
            <div className="standards-check">
              <CheckCheck size={25} />
              <span>scope verified</span>
            </div>
          </div>
          <div className="standards-copy">
            <div className="eyebrow">How the team shows up</div>
            <h2>Reliable is a series of visible choices.</h2>
            {standards.map(([title, text], index) => (
              <div
                className={`standard-row ${standardOpen === index ? "selected" : ""}`}
                key={title}
              >
                <button
                  onClick={() =>
                    setStandardOpen(standardOpen === index ? -1 : index)
                  }
                  aria-expanded={standardOpen === index}
                  data-testid={`button-about-standard-${index}`}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{title}</strong>
                  <ChevronDown size={15} />
                </button>
                {standardOpen === index && (
                  <p data-testid={`text-about-standard-${index}`}>{text}</p>
                )}
              </div>
            ))}
          </div>
        </section>
        <section className="section container people-section">
          <div>
            <div className="eyebrow">The people behind the work</div>
            <h2>Good fieldwork has a human face.</h2>
            <p>
              Ajike is a small, growing team of service coordinators, licensed
              technicians, and cleaning leads. We train for the details that
              make a visit feel easy: how to ask before moving something, how to
              explain a finding, and how to close the loop.
            </p>
            <Link
              href="/services"
              className="text-button"
              data-testid="link-about-services"
            >
              See the full service menu <ArrowRight size={15} />
            </Link>
          </div>
          <div className="people-roster">
            {people.map((person) => (
              <div className="person-card" key={person.name}>
                <img src={person.image} alt={person.name} />
                <strong>{person.name}</strong>
                <span>{person.role}</span>
              </div>
            ))}
          </div>
        </section>
        <section className="final-cta container">
          <div>
            <div className="eyebrow">A clear next step</div>
            <h2>Tell us what your space needs.</h2>
          </div>

          <CtaButton
            text="Start a request"
            icon={<ArrowRight size={15} />}
            props={{
              "data-testid": "button-about-final-request",
              className: "primary-button",
            }}
          />
        </section>
      </main>
    </div>
  );
}

export default About;
