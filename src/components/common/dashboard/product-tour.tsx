import { useEffect, useMemo, useState } from "react";
import { X } from "lucide-react";

type TourRole = "admin" | "user";

type TourStep = {
  selector: string;
  title: string;
  description: string;
};

const tourSteps: Record<TourRole, TourStep[]> = {
  admin: [
    {
      selector: '[data-tour="sidebar"]',
      title: "Your admin workspace",
      description:
        "Use the sidebar to move between every area of the admin dashboard.",
    },
    {
      selector: '[data-tour="admin-overview"]',
      title: "Overview at a glance",
      description:
        "See recent service activity and the operational metrics that need your attention.",
    },
    {
      selector: '[data-tour="services-nav"]',
      title: "Manage services",
      description:
        "Review incoming requests, update service statuses, and keep work moving.",
    },
    {
      selector: '[data-tour="customers-nav"]',
      title: "Know your customers",
      description:
        "Open the customer list to view accounts and keep customer information up to date.",
    },
    {
      selector: '[data-tour="messages-nav"]',
      title: "Stay in touch",
      description:
        "Use Messages to respond to customers and coordinate support conversations.",
    },
    {
      selector: '[data-tour="settings-nav"]',
      title: "Your settings",
      description:
        "Update your profile and account details whenever you need to.",
    },
  ],
  user: [
    {
      selector: '[data-tour="sidebar"]',
      title: "Find your way around",
      description:
        "Use the sidebar to visit your dashboard, services, reviews, and profile.",
    },
    {
      selector: '[data-tour="quick-actions"]',
      title: "Quick actions",
      description:
        "Start a new service request, view your history, or message the care team from here.",
    },
    {
      selector: '[data-tour="services-nav"]',
      title: "Your services",
      description:
        "View current and past requests, along with the latest status for each service.",
    },
    {
      selector: '[data-tour="reviews-nav"]',
      title: "Share your feedback",
      description:
        "Pending reviews shows the services waiting for your feedback.",
    },
    {
      selector: '[data-tour="settings-nav"]',
      title: "Your profile",
      description:
        "Manage your personal details and account settings from this area.",
    },
  ],
};

const completionKey = (role: TourRole) => `product-tour-completed-${role}`;

function getVisibleTarget(selector: string): HTMLElement | null {
  const targets = document.querySelectorAll<HTMLElement>(selector);
  return Array.from(targets).find((target) => {
    const rect = target.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0;
  }) ?? null;
}

function ProductTour({ role }: { role: TourRole }) {
  const steps = useMemo(() => tourSteps[role], [role]);
  const [stepIndex, setStepIndex] = useState(0);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const [visible, setVisible] = useState(
    () => !localStorage.getItem(completionKey(role)),
  );

  const finish = () => {
    localStorage.setItem(completionKey(role), "true");
    setVisible(false);
  };

  useEffect(() => {
    if (!visible) return;

    const updateTarget = () => {
      const target = getVisibleTarget(steps[stepIndex].selector);
      setTargetRect(target?.getBoundingClientRect() ?? null);
    };

    updateTarget();
    window.addEventListener("resize", updateTarget);
    window.addEventListener("scroll", updateTarget, true);

    return () => {
      window.removeEventListener("resize", updateTarget);
      window.removeEventListener("scroll", updateTarget, true);
    };
  }, [stepIndex, steps, visible]);

  if (!visible) return null;

  const isLastStep = stepIndex === steps.length - 1;
  const tooltipStyle = targetRect
    ? {
        top: Math.min(targetRect.bottom + 16, window.innerHeight - 230),
        left: Math.min(Math.max(targetRect.left, 16), window.innerWidth - 356),
      }
    : undefined;

  return (
    <div className="fixed inset-0 z-[100]">
      <div className="absolute inset-0 bg-slate-950/45" />

      {targetRect && (
        <div
          className="pointer-events-none absolute rounded-xl border-2 border-[#55c7ed] shadow-[0_0_0_9999px_rgba(15,23,42,0.45),0_0_0_4px_rgba(85,199,237,0.2)] transition-all duration-200"
          style={{
            top: targetRect.top - 5,
            left: targetRect.left - 5,
            width: targetRect.width + 10,
            height: targetRect.height + 10,
          }}
        />
      )}

      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-tour-title"
        className="absolute left-4 top-1/2 w-[calc(100%-2rem)] max-w-[340px] -translate-y-1/2 rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl sm:left-auto sm:top-auto sm:translate-y-0"
        style={tooltipStyle}
      >
        <button
          type="button"
          onClick={finish}
          aria-label="Close product tour"
          className="absolute right-3 top-3 rounded-lg p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
        >
          <X size={18} />
        </button>
        <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.13em] text-[#1687b6]">
          {role === "admin" ? "Admin tour" : "Getting started"} ·{" "}
          {stepIndex + 1} of {steps.length}
        </p>
        <h2 id="product-tour-title" className="pr-6 text-lg font-bold text-[#122560]">
          {steps[stepIndex].title}
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          {steps[stepIndex].description}
        </p>
        <div className="mt-5 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={finish}
            className="text-sm font-semibold text-slate-500 transition hover:text-slate-800"
          >
            Skip tour
          </button>
          <button
            type="button"
            onClick={() => (isLastStep ? finish() : setStepIndex((index) => index + 1))}
            className="rounded-xl bg-[#122560] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#1687b6]"
          >
            {isLastStep ? "Done" : "Next"}
          </button>
        </div>
      </section>
    </div>
  );
}

export default ProductTour;
