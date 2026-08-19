import { useState } from "react";
import { SERVICES } from "@/lib/dummy-data";
import ServiceIcon from "./service-icon";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Camera,
  ChevronDown,
  MapPin,
  ShieldCheck,
  Star,
} from "lucide-react";
import { Link } from "wouter";
import Brand from "@/components/common/brand";

function HomePage() {
  const [faqOpen, setFaqOpen] = useState(0);

  const faqs = [
    [
      "Do I need to know exactly what the pest is?",
      "Not at all. Tell us what you noticed and where. Our trained team can identify the issue during an inspection and recommend the right treatment.",
    ],
    [
      "Are Ajike technicians licensed and insured?",
      "Yes. Ajike service professionals are licensed, insured, background-checked, and trained to work carefully around people, pets, and active spaces.",
    ],
    [
      "What happens after I submit a request?",
      "A service coordinator reviews your details, confirms the property and scope, then shares a visit window and straightforward pricing before work begins.",
    ],
    [
      "Can I set up recurring service?",
      "Yes. Homes and businesses can choose a recurring plan after the first visit, with a simple schedule and reminders before each service.",
    ],
  ];
  return (
    <div>
      <main>
        <div className="container">
          <section className="hero">
            <div className="hero-copy reveal">
              <div className="eyebrow">The accountable care team</div>
              <h1>
                A cleaner, safer place to <em>come home to.</em>
              </h1>
              <p>
                Ajike brings pest control and cleaning together under one
                dependable team — with licensed professionals, clear pricing,
                and proof of the work when we are done.
              </p>
              <div className="hero-actions">
                <button
                  className="primary-button"
                  // onClick={() => request()}
                  data-testid="button-hero-request"
                >
                  Request a service <ArrowRight size={16} />
                </button>
                <a
                  className="secondary-button"
                  href="#services"
                  data-testid="link-hero-services"
                >
                  Explore services <ChevronDown size={15} />
                </a>
              </div>
              <div className="hero-note">
                <ShieldCheck size={15} /> Licensed, insured, and careful in the
                details.
              </div>
            </div>
            <div
              className="hero-visual reveal delay-2"
              data-testid="img-hero-property"
            >
              <div className="visual-orbit" />
              <div className="visual-card float">
                <strong>4.9 / 5</strong>
                <span>from 286 local visits</span>
              </div>
              <div className="visual-house">
                <span className="roof" />
                <span className="body" />
                <span className="window" />
                <span className="door" />
              </div>
              <div className="visual-caption">
                One team / every room <ArrowUpRight size={13} />
              </div>
            </div>
          </section>
          <section
            className="trust-strip"
            aria-label="Ajike trust promises"
            data-testid="section-trust"
          >
            <div className="trust-item">
              <BadgeCheck size={17} /> Verified professionals
            </div>
            <div className="trust-item">
              <ShieldCheck size={17} /> Licensed & insured
            </div>
            <div className="trust-item">
              <Camera size={17} /> Before / after proof
            </div>
            <div className="trust-item">
              <MapPin size={17} /> Local service team
            </div>
          </section>
          <section className="section" id="services">
            <div className="section-heading">
              <div>
                <div className="eyebrow">Pest + clean, under one roof</div>
                <h2>Care that meets the moment.</h2>
              </div>
              <p>
                Start with a one-time visit or ask us to build a recurring plan
                around your property.
              </p>
            </div>
            <div className="services-grid">
              {SERVICES.map((service, index) => (
                <article
                  className={`service-card reveal delay-${(index % 3) + 1}`}
                  key={service.id}
                  data-testid={`card-service-${service.id}`}
                >
                  <div>
                    <div className="service-icon">
                      <ServiceIcon kind={service.icon} />
                    </div>
                    <h3>{service.name}</h3>
                    <p>{service.detail}</p>
                  </div>
                  <div className="service-foot">
                    <span className="service-tag">
                      {service.type} · {service.price}
                    </span>
                    <button
                      className="icon-button mini-arrow"
                      // onClick={() => request(service.name)}
                      aria-label={`Request ${service.name}`}
                      data-testid={`button-request-${service.id}`}
                    >
                      <ArrowUpRight size={16} />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>
          <section className="section coverage-section" id="coverage">
            <div className="coverage-intro">
              <div className="eyebrow">Where we show up</div>
              <h2>One standard of care, wherever you work and live.</h2>
              <p>
                From a nursery bedroom to a busy kitchen, Ajike brings the same
                calm process, careful communication, and respect for your space.
              </p>
              <button
                className="secondary-button button-small"
                // onClick={() => request()}
                data-testid="button-coverage-request"
              >
                Tell us about your space <ArrowRight size={14} />
              </button>
            </div>
            <div className="coverage-list">
              <div className="coverage-card">
                <span className="coverage-num">01</span>
                <h3>Homes & apartments</h3>
                <p>
                  Protect the spaces that hold your routines, pets, people, and
                  weekends.
                </p>
              </div>
              <div className="coverage-card">
                <span className="coverage-num">02</span>
                <h3>Offices & studios</h3>
                <p>
                  Keep shared spaces ready for teams, clients, and focused work.
                </p>
              </div>
              <div className="coverage-card">
                <span className="coverage-num">03</span>
                <h3>Restaurants & retail</h3>
                <p>
                  Practical service plans designed around operating hours and
                  inspections.
                </p>
              </div>
              <div className="coverage-card">
                <span className="coverage-num">04</span>
                <h3>Facilities & property teams</h3>
                <p>
                  Consistent documentation and a partner who understands
                  multiple sites.
                </p>
              </div>
            </div>
          </section>
          <section className="section">
            <div className="featured-panel">
              <div className="featured-copy">
                <div className="eyebrow">The Ajike difference</div>
                <h2>Every visit leaves a record.</h2>
                <p>
                  You deserve more than a quick knock and a vague goodbye. We
                  share what we found, what we did, and what to watch next —
                  with before and after photo proof when it helps.
                </p>
                <button
                  className="text-button"
                  // onClick={() => request()}
                  data-testid="button-proof-request"
                >
                  Book an accountable visit <ArrowRight size={15} />
                </button>
              </div>
              <div className="proof-art" data-testid="img-before-after">
                <div className="proof-frame" />
                <div className="proof-dot" />
              </div>
            </div>
          </section>
          <section className="section" id="process">
            <div className="section-heading">
              <div>
                <div className="eyebrow">No mystery in the middle</div>
                <h2>From “something is off” to handled.</h2>
              </div>
              <p>
                A simple service flow that keeps you informed without asking you
                to chase us.
              </p>
            </div>
            <div className="steps">
              <div className="step">
                <span className="step-number">01 / ASK</span>
                <h3>Share what you see</h3>
                <p>
                  Tell us about the space, the symptoms, and your timing. A
                  request takes about two minutes.
                </p>
              </div>
              <div className="step">
                <span className="step-number">02 / PLAN</span>
                <h3>Meet your service pro</h3>
                <p>
                  We confirm the scope, explain the recommendation, and give you
                  transparent pricing before work starts.
                </p>
              </div>
              <div className="step">
                <span className="step-number">03 / PROVE</span>
                <h3>Get your place back</h3>
                <p>
                  We do the work carefully, share the result, and make the next
                  step clear if follow-up is useful.
                </p>
              </div>
            </div>
          </section>
          <section className="section reassurance" id="reassurance">
            <div className="testimonial">
              <div className="quote-stars">
                <Star size={13} fill="currentColor" />
                <Star size={13} fill="currentColor" />
                <Star size={13} fill="currentColor" />
                <Star size={13} fill="currentColor" />
                <Star size={13} fill="currentColor" />
              </div>
              <blockquote>
                “They explained everything, protected our cat, and sent photos
                before I even asked.”
              </blockquote>
              <cite>— Jordan M. · recurring home care member</cite>
            </div>
            <div className="faq-list">
              {faqs.map(([question, answer], index) => (
                <div
                  className={`faq-item ${faqOpen === index ? "open" : ""}`}
                  key={question}
                >
                  <button
                    className="faq-question"
                    onClick={() => setFaqOpen(faqOpen === index ? -1 : index)}
                    aria-expanded={faqOpen === index}
                    data-testid={`button-faq-${index}`}
                  >
                    {question}
                    <ChevronDown size={16} />
                  </button>
                  {faqOpen === index && (
                    <div
                      className="faq-answer"
                      data-testid={`text-faq-answer-${index}`}
                    >
                      {answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
          <section className="final-cta">
            <div>
              <div className="eyebrow">
                Good spaces start with a conversation
              </div>
              <h2>Ready to feel on top of it?</h2>
            </div>
            <button
              className="primary-button"
              // onClick={() => request()}
              data-testid="button-final-request"
            >
              Request your service <ArrowRight size={16} />
            </button>
          </section>
          <footer className="site-footer">
            <div>
              <Brand />
              <p className="footer-note">
                Dependable pest control and cleaning for homes, businesses, and
                the people inside them.
              </p>
            </div>
            <div className="footer-links">
              <a href="#services" data-testid="link-footer-services">
                Services
              </a>
              <a href="#process" data-testid="link-footer-process">
                How it works
              </a>
              <Link href="/dashboard" data-testid="link-footer-dashboard">
                Customer dashboard
              </Link>
              <Link href="/auth/sign-in" data-testid="link-footer-sign-in">
                Sign in
              </Link>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}

export default HomePage;
