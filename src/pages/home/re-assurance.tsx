import { useState } from "react";
import { Star, ChevronDown } from "lucide-react";

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

function ReAssurance() {
  const [faqOpen, setFaqOpen] = useState(0);
  return (
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
          “They explained everything, protected our cat, and sent photos before
          I even asked.”
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
  );
}

export default ReAssurance;
