export function getStatusColor(status: string) {
  const colors: Record<string, string> = {
    completed: "#25ad76",
    pending: "#d89435",
    cancelled: "#ff0000",
    new: "#178db4",
  };

  return colors[status] ?? "#7897a3";
}
