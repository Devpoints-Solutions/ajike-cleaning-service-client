import React, { useState } from "react";
import PageIntro from "@/components/common/page-intro";
import CtaButton from "@/components/common/cta-button";
import {
  PhoneCallIcon,
  MailCheck,
  ArrowRight,
  MapPinHouse,
  Timer,
  MessageCircleQuestionMark,
} from "lucide-react";
import { Link } from "wouter";
import xLogo from "@/assets/x.svg";
import facebookLogo from "@/assets/facebook.svg";
import instagramLogo from "@/assets/instagram.svg";
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

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Demo behavior: show sending state then clear the form.
    setStatus("sending");
    setTimeout(() => {
      setStatus("sent");
      // In a real app: send `form` to an API endpoint here.
      // For now, keep placeholders and clear the inputs.
      setForm({ fullName: "", email: "", phone: "", message: "" });
      // small UX cue - could be replaced with a toast notification in the real app
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 800);
  }

  return (
    <>
      <PageIntro
        eyebrow="Contact / clear path to start"
        title={
          <>
            Know the starting point.
            <br />
            <em>Choose the right rhythm.</em>
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
        Typical cleaning appointments last 2–4 hours depending on property size.
        We supply standard cleaning materials — note any special requests in
        your message.
      </PageIntro>
      <main className="container page-container">
        <header className="my-3 text-3xl font-semibold text-[#0b4168]">
          <h1>Contact Us</h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2">
          <section aria-labelledby="contact-form-heading">
            <h2
              id="contact-form-heading"
              className="my-5 font-semibold text-[#1687b6]"
            >
              Send a message
            </h2>

            <form onSubmit={handleSubmit} className="auth-form">
              <div className="auth-field">
                <label htmlFor="fullName" className="flex flex-col gap-2">
                  Full name
                  <input
                    name="fullName"
                    type="text"
                    data-testid="input-signin-email"
                    value={form.fullName}
                    onChange={handleChange}
                    placeholder="Jane Doe"
                  />
                </label>
              </div>

              <div className="auth-field">
                <label htmlFor="email" className="flex flex-col gap-2">
                  Email
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                  />
                </label>
              </div>

              <div className="auth-field">
                <label htmlFor="phoneNumber" className="flex flex-col gap-2">
                  Phone number
                  <input
                    name="phoneNumber"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 555-5555"
                  />
                </label>
              </div>

              <div className="auth-field field full">
                <label htmlFor="message" className="flex flex-col gap-2">
                  Message
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={6}
                    required
                    placeholder="Tell us about the cleaning service you need..."
                  />
                </label>
              </div>

              <button
                type="submit"
                className="primary-button"
                disabled={status === "sending"}
                style={{ padding: "10px 16px", cursor: "pointer" }}
              >
                {status === "sending" ? "Sending…" : "Send message"}
              </button>

              <p style={{ marginTop: 8, fontSize: 13, color: "#666" }}>
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
          </section>

          <aside aria-labelledby="company-details-heading" className="p-8">
            <h2
              id="company-details-heading"
              className="my-5 font-semibold text-[#1687b6]"
            >
              Company details
            </h2>

            <div className="dashboard-card plan-card">
              <div className="plan-name mb-3.5">Ajike Pest Control</div>

              <div className="activity-list">
                <div className="activity-row">
                  <div className="activity-icon">
                    <MailCheck size={15} />
                  </div>
                  <div>
                    <strong>Email:</strong>
                    <span>
                      <a href="mailto:info@example.com">info@example.com</a>
                    </span>
                  </div>
                </div>
                <div className="activity-row">
                  <div className="activity-icon">
                    <PhoneCallIcon size={15} />
                  </div>
                  <div>
                    <strong>Phone:</strong>
                    <span>
                      <a href="tel:+15555555555">+1 (555) 555-5555</a>
                    </span>
                  </div>
                </div>
                <div className="activity-row">
                  <div className="activity-icon">
                    <MapPinHouse size={15} />
                  </div>
                  <div>
                    <strong>Address:</strong>
                    <span>
                      123 Placeholder St, Suite 100, New Jersey, United States
                    </span>
                  </div>
                </div>

                <div className="activity-row">
                  <div className="activity-icon">
                    <Timer size={15} />
                  </div>
                  <div>
                    <strong>Hours:</strong>
                    <span>Mon–Fri, 8:00 — 17:00</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="dashboard-card plan-card my-4">
              <div className="plan-name mb-3.5">Other ways to connect</div>
              <div className="activity-list">
                <div className="activity-row">
                  <div className="activity-icon">
                    <MessageCircleQuestionMark size={15} />
                  </div>
                  <div>
                    <strong>Support:</strong>
                    <span>
                      <a href="mailto:info@example.com">support@example.com</a>
                    </span>
                  </div>
                </div>

                <a
                  href="https://x.com"
                  target="_blank"
                  className="activity-row"
                >
                  <div className="activity-icon">
                    <img src={xLogo} alt="x-logo" className="w-3.5" />
                  </div>
                  <div>
                    <strong>X:</strong>
                    <span>
                      <a href="mailto:info@example.com">connect on X</a>
                    </span>
                  </div>
                </a>

                <a
                  href="https://facebook.com"
                  target="_blank"
                  className="activity-row"
                >
                  <div className="activity-icon">
                    <img
                      src={facebookLogo}
                      alt="facebook-logo"
                      className="w-3.5"
                    />
                  </div>
                  <div>
                    <strong>Facebook:</strong>
                    <span>
                      <a href="mailto:info@example.com">connect on facebook</a>
                    </span>
                  </div>
                </a>

                <a
                  href="https://instagra,.com"
                  target="_blank"
                  className="activity-row"
                >
                  <div className="activity-icon">
                    <img
                      src={instagramLogo}
                      alt="instagram-logo"
                      className="w-3.5"
                    />
                  </div>
                  <div>
                    <strong>Instagram:</strong>
                    <span>
                      <a href="mailto:info@example.com">connect on instagram</a>
                    </span>
                  </div>
                </a>
              </div>
            </div>

            <div>
              <h3 className="my-5 font-semibold text-[#1687b6]">
                Find us on the map
              </h3>
              <div
                style={{
                  width: "100%",
                  height: 220,
                  borderRadius: 6,
                  overflow: "hidden",
                  boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
                }}
              >
                <iframe
                  title="Company location"
                  width="100%"
                  height="500"
                  frameBorder={0}
                  style={{ border: 0 }}
                  src="https://www.google.com/maps?q=40.6288,-74.4194&z=15&output=embed"
                  allowFullScreen
                />
              </div>
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}

export default ContactPage;
