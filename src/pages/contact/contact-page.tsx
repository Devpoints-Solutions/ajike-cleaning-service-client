import React, { useState } from "react";
import PageIntro from "@/components/common/page-intro";
import CtaButton from "@/components/common/cta-button";
import {
  PhoneCallIcon,
  MailCheck,
  ArrowRight,
  MapPinHouse,
  Timer,
} from "lucide-react";
import { Link } from "wouter";
import contactImage from "@/assets/support.jpg";

type FormState = {
  fullName: string;
  email: string;
  phone: string;
  message: string;
};

function ContactPage() {
  const [form, setForm] = useState<FormState>({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const contactCards = [
    {
      icon: <MailCheck size={15} />,
      label: "Email",
      value: "hello@ajikepestcontrol.com",
      href: "mailto:hello@ajikepestcontrol.com",
    },
    {
      icon: <PhoneCallIcon size={15} />,
      label: "Phone",
      value: "+1 (555) 555-5555",
      href: "tel:+15555555555",
    },
    {
      icon: <MapPinHouse size={15} />,
      label: "Address",
      value: "123 Placeholder St, Suite 100, New Jersey, United States",
      href: "#map",
    },
    {
      icon: <Timer size={15} />,
      label: "Hours",
      value: "Mon–Fri · 8:00 AM — 5:00 PM",
      href: "#hours",
    },
  ];

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setTimeout(() => {
      setStatus("sent");
      setForm({ fullName: "", email: "", phone: "", message: "" });
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 800);
  }

  return (
    <>
      <PageIntro
        eyebrow="Contact / direct support"
        title={
          <>
            Let’s talk through the right fix.
            <br />
            <em>Clear next steps, fast answers.</em>
          </>
        }
        bgImage={contactImage}
        action={
          <CtaButton
            text="Request a service"
            props={{
              className: "primary-button",
              "data-testid": "button-pricing-request",
            }}
            icon={<ArrowRight size={15} />}
          />
        }
      >
        Tell us what you need and we’ll guide you toward the right treatment,
        inspection window, and follow-up plan. No pressure, just helpful next
        steps.
      </PageIntro>

      <main className="container page-container">
        <section className="contact-hero">
          <div className="contact-intro">
            <span className="eyebrow">Need help today?</span>
            <h1>Get in touch with the Ajike team.</h1>
            <p>
              Share a few details and we’ll respond with a clear recommendation,
              timeline, and practical advice for your space.
            </p>
            <div className="contact-highlights">
              <div>
                <strong>1 business day</strong>
                <span>Typical reply</span>
              </div>
              <div>
                <strong>7 days</strong>
                <span>Flexible scheduling</span>
              </div>
              <div>
                <strong>24/7</strong>
                <span>Support guidance</span>
              </div>
            </div>
          </div>

          <div className="contact-visual-card">
            <img src={contactImage} alt="Customer support conversation" />
            <div className="contact-visual-badge">
              <strong>Fast scheduling</strong>
              <span>Mon–Sat · 8:00 AM – 5:00 PM</span>
            </div>
          </div>
        </section>

        <section className="contact-main-grid">
          <div
            className="contact-form-panel"
            aria-labelledby="contact-form-heading"
          >
            <div className="section-heading">
              <h2 id="contact-form-heading">Tell us about your property.</h2>
            </div>

            <form onSubmit={handleSubmit} className="auth-form contact-form">
              <div className="auth-field">
                <label htmlFor="fullName" className="field-label">
                  Full name
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  data-testid="input-signin-email"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="Jane Doe"
                />
              </div>

              <div className="auth-field">
                <label htmlFor="email" className="field-label">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                />
              </div>

              <div className="auth-field">
                <label htmlFor="phone" className="field-label">
                  Phone number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 555-5555"
                />
              </div>

              <div className="auth-field field full">
                <label htmlFor="message" className="field-label">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={6}
                  required
                  placeholder="Tell us about the issue, space, or service you need..."
                />
              </div>

              <button
                type="submit"
                className="primary-button contact-submit"
                disabled={status === "sending"}
              >
                {status === "sending" ? "Sending…" : "Send message"}
              </button>

              <p className="contact-legal">
                By sending a message you agree to our{" "}
                <Link className="text-button" href="/terms">
                  Terms
                </Link>{" "}
                and{" "}
                <Link className="text-button" href="/privacy-policy">
                  Privacy Policy
                </Link>
              </p>
            </form>
          </div>

          <aside
            aria-labelledby="company-details-heading"
            className="contact-details-panel"
          >
            <div className="section-heading">
              <h2 id="company-details-heading">Let’s keep it simple.</h2>
            </div>

            <div className="dashboard-card plan-card contact-card">
              <div className="plan-name mb-3.5">Ajike Pest Control</div>

              <div className="activity-list">
                {contactCards.map(({ icon, label, value, href }) => (
                  <div className="activity-row" key={label}>
                    <div className="activity-icon">{icon}</div>
                    <div>
                      <strong>{label}:</strong>
                      <span>
                        {href.startsWith("#") ? (
                          value
                        ) : (
                          <a href={href}>{value}</a>
                        )}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div id="map" className="contact-map-wrap">
              <h3 className="map-heading">Find us on the map</h3>
              <div className="map-frame">
                <iframe
                  title="Company location"
                  width="100%"
                  height="240"
                  frameBorder={0}
                  style={{ border: 0 }}
                  src="https://www.google.com/maps?q=40.6288,-74.4194&z=15&output=embed"
                  allowFullScreen
                />
              </div>
            </div>
          </aside>
        </section>
      </main>
    </>
  );
}

export default ContactPage;
