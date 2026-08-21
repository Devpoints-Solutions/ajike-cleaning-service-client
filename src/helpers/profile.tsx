export function getStatusColor(status: string) {
  switch (status) {
    case "Completed":
      return "#25ad76";
    case "Pending":
      return "#d89435";
    case "Canceled":
      return "#ff0000";
    case "New":
      return "#178db4";
    default:
      return "#7897a3";
  }
}
