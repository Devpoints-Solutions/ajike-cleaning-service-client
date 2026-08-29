import { memo } from "react";
import { Check } from "lucide-react";

const AdminSuccessModal = ({
  isOpen,
  message,
  onViewService,
}: {
  isOpen: boolean;
  message: string;
  onViewService: () => void;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[3px]" />

      {/* Modal */}
      <div className="relative w-full max-w-[350px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.18)]">
        <div className="px-5 pb-7 pt-5">
          {/* Success Icon */}
          <div className="mb-4 flex justify-center">
            <div className="relative flex h-17 w-17 items-center justify-center rounded-full ">
              {/* Decorative ring */}
              <div className="absolute inset-2 rounded-full border border-[#1687b6]" />

              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1687b6] shadow-sm">
                <Check size={25} strokeWidth={2.8} className="text-white" />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#1687b6]">
              Success
            </p>

            <h2 className="text-[16px] font-bold tracking-tight text-[#122560]">
              {message}
            </h2>
          </div>

          {/* Actions */}
          <div className="mt-6  text-center">
            <button
              type="button"
              onClick={onViewService}
              className="h-11 flex-1 w-[120px] rounded-xl border border-[#122560] bg-[#122560] px-3 text-sm font-semibold text-[#ffffff] transition hover:bg-[#1687b6] hover:text-[#ffffff] hover:border-[#1687b6] active:scale-[0.98]"
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

export default memo(AdminSuccessModal);
