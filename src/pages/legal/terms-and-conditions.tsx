import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

const sections = [
  ["1", "Using Ajike"],
  ["2", "Services and bookings"],
  ["3", "Your responsibilities"],
  ["4", "Payments and cancellations"],
  ["5", "Records and communications"],
  ["6", "Limits of our service"],
  ["7", "Changes and contact"],
];

function TermsAndConditions() {
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
            Terms and Conditions
          </h1>
          <p className="mt-5 text-base leading-7 text-[#4d687a]">
            These terms explain how Ajike Pest Control and Cleaning Services
            provides services through this website and your Ajike account.
          </p>
          <p className="mt-3 text-sm font-semibold text-[#55738a]">
            Effective date: September 2, 2026
          </p>
        </header>

        <div className="mt-12 grid gap-8 lg:grid-cols-[220px_1fr]">
          <nav aria-label="Terms sections" className="hidden lg:block">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#55738a]">
              On this page
            </p>
            <ul className="mt-4 space-y-3 border-l border-[#c8dce8] pl-4 text-sm text-[#55738a]">
              {sections.map(([number, title]) => (
                <li key={number}>
                  <a className="transition hover:text-[#1687b6]" href={`#terms-${number}`}>
                    {title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <article className="space-y-8 rounded-3xl border border-[#d8e8f0] bg-white p-6 shadow-[0_20px_50px_rgba(8,52,80,0.07)] sm:p-10">
            <section id="terms-1">
              <h2>1. Using Ajike</h2>
              <p>
                By using this website, creating an account, or requesting a
                service, you agree to these terms. You must provide accurate
                information and be at least 18 years old, or use Ajike with the
                involvement of a parent or legal guardian.
              </p>
            </section>
            <section id="terms-2">
              <h2>2. Services and bookings</h2>
              <p>
                Ajike coordinates pest control and cleaning services for homes
                and businesses in the areas we serve. A request is not a
                confirmed appointment until Ajike confirms the scope, timing,
                and price with you. Conditions found on site may require a
                revised quote or a different approach, which we will discuss
                before proceeding.
              </p>
            </section>
            <section id="terms-3">
              <h2>3. Your responsibilities</h2>
              <p>
                Please give us safe access, accurate property details, and
                relevant information about pets, children, occupants, hazards,
                prior treatments, and areas that need attention. You are
                responsible for following preparation, re-entry, and
                aftercare instructions provided for a service.
              </p>
            </section>
            <section id="terms-4">
              <h2>4. Payments and cancellations</h2>
              <p>
                Prices, applicable taxes, and payment timing will be shown or
                confirmed before chargeable work begins. Please contact us as
                soon as possible if you need to reschedule or cancel. We may
                charge for late cancellations, missed appointments, or work
                already completed when those terms were included in your
                booking confirmation.
              </p>
            </section>
            <section id="terms-5">
              <h2>5. Records and communications</h2>
              <p>
                Ajike may send service confirmations, arrival updates, invoices,
                follow-up notes, and account notices by email, text, or through
                the website. Service records, including notes and photographs,
                are created to document the work and help us provide consistent
                care. Keep your login details private and tell us promptly if
                you suspect unauthorized access.
              </p>
            </section>
            <section id="terms-6">
              <h2>6. Limits of our service</h2>
              <p>
                We will provide services with reasonable care and skill, but
                pest activity, stains, damage, and other conditions cannot
                always be completely eliminated or prevented. To the extent
                permitted by law, Ajike is not responsible for indirect or
                unforeseeable loss arising from use of the website or a
                service. Nothing in these terms limits rights that cannot
                legally be limited.
              </p>
            </section>
            <section id="terms-7">
              <h2>7. Changes and contact</h2>
              <p>
                We may update these terms when our services or legal
                obligations change. The latest version will be posted here.
                Questions about these terms can be sent to{" "}
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

export default TermsAndConditions;
