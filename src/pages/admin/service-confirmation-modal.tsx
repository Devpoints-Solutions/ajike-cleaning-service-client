import { XCircle, TriangleAlert } from "lucide-react";
import { Loader } from "@/components/common/loader";

export function ServiceConfirmationModal({
  onCloseModal,
  isLoading,
  onConfirm,
}: {
  onCloseModal: () => void;
  isLoading: boolean;
  onConfirm: () => void;
}) {
  return (
    <div className="modal-overlay" onClick={onCloseModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="flex items-center gap-2">
            <TriangleAlert size={15} />
            <h3>Confirm service update</h3>
          </div>
          <button
            className="icon-button"
            onClick={onCloseModal}
            data-testid="button-close-delete-modal"
          >
            <XCircle size={18} />
          </button>
        </div>
        <div className="modal-body">
          <p className="font-semibold mb-2 text-[15px]">
            Are you sure you want to update this service?
          </p>
          <p className="text-amber-600 font-semibold">
            This action cannot be undone.
          </p>
          <div className="modal-actions">
            <button
              onClick={onCloseModal}
              className="secondary-button"
              data-testid="button-cancel-delete"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="primary-button delete"
              data-testid="button-confirm-delete"
            >
              {isLoading && <Loader />}
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceConfirmationModal;
