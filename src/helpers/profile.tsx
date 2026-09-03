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

export function getCurrentPathForAdmin(path: string) {
  const splittedPath = path?.split("/");

  console.log(splittedPath);

  if (splittedPath?.includes("services") && splittedPath[3] === "services") {
    return "Services";
  }

  if (splittedPath?.includes("customers") && splittedPath[3] === "customers") {
    return "Customers";
  }

  if (splittedPath?.includes("reviews") && splittedPath[3] === "reviews") {
    return "Customers Reviews";
  }

  if (splittedPath?.includes("messages") && splittedPath[3] === "messages") {
    return "Messages";
  }

  return "Dashboard";
}

export function getCurrentPathForUser(path: string) {
  const splittedPath = path?.split("/");

  if (splittedPath?.includes("services") && splittedPath[2] === "services") {
    return "Services";
  }

  if (
    splittedPath?.includes("pending-reviews") &&
    splittedPath[2] === "pending-reviews"
  ) {
    return "Pending reviews";
  }

  return "Dashboard";
}
