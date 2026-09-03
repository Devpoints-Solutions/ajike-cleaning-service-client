import { Check } from "lucide-react";

const SuccessModal = ({
  isOpen,
  onViewService,
}: {
  isOpen: boolean;
  onViewService: () => void;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[3px]" />

      {/* Modal */}
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.18)]">
        <div className="px-7 pb-7 pt-8">
          {/* Success Icon */}
          <div className="mb-6 flex justify-center">
            <div className="relative flex h-20 w-20 items-center justify-center rounded-full ">
              {/* Decorative ring */}
              <div className="absolute inset-2 rounded-full border border-[#1687b6]" />

              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1687b6] shadow-sm">
                <Check size={25} strokeWidth={2.8} className="text-white" />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#1687b6]">
              Success
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-[#122560]">
              Your cancellation request is successful!
            </h2>

            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-500">
              Your service cancellation request is successfully. An email will
              be sent to you shortly
            </p>
          </div>

          {/* Actions */}
          <div className="mt-6  text-center">
            <button
              type="button"
              onClick={onViewService}
              className="h-11 flex-1 w-[150px] rounded-xl border border-[#122560] bg-[#122560] px-5 text-sm font-semibold text-[#ffffff] transition hover:bg-[#1687b6] hover:text-[#ffffff] hover:border-[#1687b6] active:scale-[0.98]"
            >
              Done
            </button>
          </div>
        </div>

        {/* Bottom accent */}
        <div className="h-1 w-full bg-[#1687b6]" />
      </div>
    </div>
  );
};

export default SuccessModal;
