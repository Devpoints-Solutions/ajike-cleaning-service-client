import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

const sections = [
  ["1", "What we collect"],
  ["2", "How we use information"],
  ["3", "Sharing information"],
  ["4", "Cookies and analytics"],
  ["5", "Your choices"],
  ["6", "Security and retention"],
  ["7", "Children and updates"],
];

function PrivacyPolicy() {
  return (
    <main className="bg-[#f4faff] px-5 py-12 sm:px-8 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[#1687b6] transition hover:text-[#00364e]"
        >
          <ArrowLeft size={16} /> Back to Ajike
        </Link>

        <header className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#1687b6]">
            Ajike / legal
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-[#122560] sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-5 text-base leading-7 text-[#4d687a]">
            We keep information tied to your care simple, purposeful, and
            transparent. This policy describes what Ajike collects and how we
            use it.
          </p>
          <p className="mt-3 text-sm font-semibold text-[#55738a]">
            Effective date: September 2, 2026
          </p>
        </header>

        <div className="mt-12 grid gap-8 lg:grid-cols-[220px_1fr]">
          <nav aria-label="Privacy policy sections" className="hidden lg:block">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#55738a]">
              On this page
            </p>
            <ul className="mt-4 space-y-3 border-l border-[#c8dce8] pl-4 text-sm text-[#55738a]">
              {sections.map(([number, title]) => (
                <li key={number}>
                  <a className="transition hover:text-[#1687b6]" href={`#privacy-${number}`}>
                    {title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <article className="space-y-8 rounded-3xl border border-[#d8e8f0] bg-white p-6 shadow-[0_20px_50px_rgba(8,52,80,0.07)] sm:p-10">
            <section id="privacy-1">
              <h2>1. What we collect</h2>
              <p>
                We collect information you provide, such as your name, email
                address, phone number, property details, service preferences,
                messages, and payment or booking details. We also collect
                service notes and photographs needed to document work. When you
                use the website, we may receive basic device, browser, and
                usage information.
              </p>
            </section>
            <section id="privacy-2">
              <h2>2. How we use information</h2>
              <p>
                We use information to create and secure your account, schedule
                and deliver services, communicate with you, process payments,
                maintain service records, improve our website, prevent fraud,
                and meet legal obligations. We only request information that
                helps us provide or improve Ajike.
              </p>
            </section>
            <section id="privacy-3">
              <h2>3. Sharing information</h2>
              <p>
                We may share relevant information with trusted providers that
                help us host the application, process payments, send
                communications, or deliver a requested service. We may also
                disclose information when required by law or needed to protect
                people, property, or the security of Ajike. We do not sell your
                personal information.
              </p>
            </section>
            <section id="privacy-4">
              <h2>4. Cookies and analytics</h2>
              <p>
                Ajike may use cookies or similar technologies to keep you
                signed in, remember preferences, understand website traffic,
                and improve performance. You can adjust cookie controls in your
                browser, though some account features may not work as intended
                when essential cookies are disabled.
              </p>
            </section>
            <section id="privacy-5">
              <h2>5. Your choices</h2>
              <p>
                You can review or update account details, unsubscribe from
                non-essential marketing messages, or ask us about the personal
                information we hold about you. Service and security messages
                may still be sent when necessary. Contact{" "}
                <a href="mailto:support@ajikepestcontrol.com">
                  support@ajikepestcontrol.com
                </a>{" "}
                to make a privacy request.
              </p>
            </section>
            <section id="privacy-6">
              <h2>6. Security and retention</h2>
              <p>
                We use reasonable administrative, technical, and organizational
                safeguards to protect information. No online service can
                guarantee absolute security. We retain information for as long
                as needed to provide services, keep accurate records, resolve
                disputes, and meet legal or accounting requirements.
              </p>
            </section>
            <section id="privacy-7">
              <h2>7. Children and updates</h2>
              <p>
                Ajike is intended for adults and is not directed to children
                under 13. We may update this policy as the application or our
                practices change. We will post the revised policy here with a
                new effective date. For questions, contact{" "}
                <a href="mailto:support@ajikepestcontrol.com">
                  support@ajikepestcontrol.com
                </a>
                .
              </p>
            </section>
          </article>
        </div>
      </div>
    </main>
  );
}

export default PrivacyPolicy;
