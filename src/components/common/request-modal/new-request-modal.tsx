import { useEffect } from "react";
import { useServiceContext } from "@/features/contexts/service-context";
import { useToast } from "@/features/hooks/use-toast";
import "react-datepicker/dist/react-datepicker.css";
import { useRequestNewServiceMutation } from "@/features/apis/service-apis";
import "./calandar.css";
import WhatAndWhere from "./what-and-where";
import { X } from "lucide-react";
import styles from "./request-modal.module.css";
import { formatError } from "@/helpers/format-error";

function NewRequestModal() {
  const { newModalIsOpen, toggleNewModal } = useServiceContext();

  const [
    requestNewService,
    { isError, error: requestError, isSuccess, isLoading },
  ] = useRequestNewServiceMutation();

  const { toast } = useToast();

  useEffect(() => {
    if (isError && requestError) {
      toast({
        title: "Service request failed!",
        description: formatError(requestError),
        variant: "default",
      });
    }
  }, [isError, requestError]);

  if (!newModalIsOpen) return null;

  return (
    <div
      className={styles.request_overlay}
      role="dialog"
      aria-modal="true"
      data-testid="modal-request-service"
    >
      <div className={styles.request_modal}>
        <div className={styles.modal_head}>
          <div>
            <div className="eyebrow">A clear next step</div>
            <h2>Tell us what needs care</h2>
          </div>
          <button
            className="icon-button"
            onClick={toggleNewModal}
            aria-label="Close request form"
            data-testid="button-close-request"
          >
            <X size={18} />
          </button>
        </div>

        <WhatAndWhere
          onSubmitRequest={(data: any) => requestNewService(data)}
          isSuccess={isSuccess}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}

export default NewRequestModal;
