export function getStatusColor(status: string) {
  const colors: Record<string, string> = {
    completed: "#25ad76",
    pending: "#d89435",
    cancelled: "#ff0000",
    new: "#178db4",
  };

  return colors[status] ?? "#7897a3";
}

export function getModalMessage(action: string) {
  const serviceUpdateOptions: Record<string, string> = {
    approve: "Service is approved",
    "update-progress": "Service progress is updated",
    cancelled: "Service is cancelled",
    "mark-as-completed": "Service is marked as completed",
  };

  return serviceUpdateOptions[action];
}
