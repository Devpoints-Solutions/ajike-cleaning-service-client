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
      <main className="container page-container">
        <section className="about-manifesto">
          <div className="manifesto-stamp">
            <span>AJK</span>
            <small>
              EST. 2018
              <br />
              LOCAL CARE
            </small>
          </div>
          <div>
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
        </section>
        <section className="section about-values">
          <div className="section-heading">
            <div>
              <div className="eyebrow">The Ajike brief</div>
              <h2>Values you can see in the visit.</h2>
            </div>
            <p>
              Not slogans on a wall. Small decisions in the field, repeated
              until they become a standard.
            </p>
          </div>
          <div className="values-grid">
            <article>
              <span className="value-number">01</span>
              <h3>Clear before clever</h3>
              <p>
                We use plain language, transparent starting prices, and a
                recommendation that matches the evidence.
              </p>
            </article>
            <article>
              <span className="value-number">02</span>
              <h3>Care is operational</h3>
              <p>
                Respect shows up in arrival windows, safe prep notes, tidy
                exits, and records that do not disappear.
              </p>
            </article>
            <article>
              <span className="value-number">03</span>
              <h3>Local means accountable</h3>
              <p>
                The person coordinating the work is close enough to follow
                through — before, during, and after the visit.
              </p>
            </article>
          </div>
        </section>
        <section className="section standards-section">
          <div className="standards-art">
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
        <section className="section people-section">
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
            <div className="person-card">
              <div className="person-initial">AM</div>
              <strong>Amina</strong>
              <span>Service coordination</span>
            </div>
            <div className="person-card">
              <div className="person-initial sky">JR</div>
              <strong>Jalen</strong>
              <span>Field technician</span>
            </div>
            <div className="person-card">
              <div className="person-initial pale">TN</div>
              <strong>Tessa</strong>
              <span>Cleaning lead</span>
            </div>
          </div>
        </section>
        <section className="final-cta">
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
