export function formatError(error: any) {
  return error && "data" in error
    ? (error.data as any)?.message || "Something went wrong"
    : "Something went wrong";
}
