import React, { useState } from 'react';

type FormState = {
  fullName: string;
  email: string;
  phone: string;
  message: string;
};

function ContactPage(): JSX.Element {
  const [form, setForm] = useState<FormState>({ fullName: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Demo behavior: show sending state then clear the form.
    setStatus('sending');
    setTimeout(() => {
      setStatus('sent');
      // In a real app: send `form` to an API endpoint here.
      // For now, keep placeholders and clear the inputs.
      setForm({ fullName: '', email: '', phone: '', message: '' });
      // small UX cue - could be replaced with a toast notification in the real app
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 800);
  }

  return (
    <main style={{ maxWidth: 1100, margin: '0 auto', padding: '2rem' }}>
      <header>
        <h1 style={{ margin: 0 }}>Contact Us</h1>
        <p style={{ marginTop: 8, color: '#555' }}>
          Have a question or want to request a quote? Fill the form or use the details on the right to reach our team.
        </p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '2rem', marginTop: '1.5rem', alignItems: 'start' }}>
        <section aria-labelledby="contact-form-heading">
          <h2 id="contact-form-heading">Send a message</h2>

          <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 12, marginTop: 8 }}>
            <label style={{ display: 'flex', flexDirection: 'column' }}>
              Full name
              <input
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                required
                placeholder="Jane Doe"
                style={{ padding: '8px 10px', marginTop: 6 }}
              />
            </label>

            <label style={{ display: 'flex', flexDirection: 'column' }}>
              Email
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
                style={{ padding: '8px 10px', marginTop: 6 }}
              />
            </label>

            <label style={{ display: 'flex', flexDirection: 'column' }}>
              Phone number
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+1 (555) 555-5555"
                style={{ padding: '8px 10px', marginTop: 6 }}
              />
            </label>

            <label style={{ display: 'flex', flexDirection: 'column' }}>
              Message
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={6}
                required
                placeholder="Tell us about the cleaning service you need..."
                style={{ padding: '8px 10px', marginTop: 6, resize: 'vertical' }}
              />
            </label>

            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <button type="submit" disabled={status === 'sending'} style={{ padding: '10px 16px', cursor: 'pointer' }}>
                {status === 'sending' ? 'Sending…' : 'Send message'}
              </button>
              {status === 'sent' && <span style={{ color: 'green' }}>Thanks — message received (demo).</span>}
            </div>

            <p style={{ marginTop: 8, fontSize: 13, color: '#666' }}>
              By sending a message you agree to our <a href="/privacy">privacy policy</a>. This form is a demo — messages are not sent to a server yet.
            </p>
          </form>
        </section>

        <aside aria-labelledby="company-details-heading" style={{ borderLeft: '1px solid #eee', paddingLeft: 16 }}>
          <h2 id="company-details-heading">Company details</h2>

          <div style={{ marginTop: 8 }}>
            <strong>Ajike Cleaning Services</strong>
            <p style={{ margin: '6px 0' }}>
              Phone: <a href="tel:+15555555555">+1 (555) 555-5555</a>
            </p>
            <p style={{ margin: '6px 0' }}>
              Email: <a href="mailto:info@example.com">info@example.com</a>
            </p>
            <p style={{ margin: '6px 0' }}>
              Address: 123 Placeholder St, Suite 100, Lagos, Nigeria
            </p>
            <p style={{ margin: '6px 0' }}>Hours: Mon–Fri, 8:00 — 17:00</p>
          </div>

          <div style={{ marginTop: 12 }}>
            <h3 style={{ margin: '6px 0' }}>Find us on the map</h3>
            <div style={{ width: '100%', height: 220, borderRadius: 6, overflow: 'hidden', boxShadow: '0 1px 6px rgba(0,0,0,0.06)' }}>
              {/* Placeholder map embed centered on Lagos coordinates. Replace with company's real embed when available. */}
              <iframe
                title="Company location"
                width="100%"
                height="220"
                frameBorder={0}
                style={{ border: 0 }}
                src="https://www.google.com/maps?q=6.5244,3.3792&z=15&output=embed"
                allowFullScreen
              />
            </div>
          </div>

          <div style={{ marginTop: 12 }}>
            <h3 style={{ margin: '6px 0' }}>Other ways to connect</h3>
            <ul style={{ paddingLeft: 18, margin: '6px 0' }}>
              <li>
                Support: <a href="mailto:support@example.com">support@example.com</a>
              </li>
              <li>
                Follow us: <a href="https://twitter.com" target="_blank" rel="noreferrer">Twitter</a> • <a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a>
              </li>
            </ul>
          </div>
        </aside>
      </div>

      <section style={{ marginTop: 28, color: '#444' }}>
        <h2 style={{ marginBottom: 8 }}>Quick answers</h2>
        <ul>
          <li>Typical cleaning appointments last 2–4 hours depending on property size.</li>
          <li>We supply standard cleaning materials — note any special requests in your message.</li>
        </ul>
      </section>
    </main>
  );
}

export default ContactPage;
