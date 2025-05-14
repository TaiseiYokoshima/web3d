export function getTopLevelRoute(path: string): string {
  const toplevel = path.split("/").filter(Boolean)[0] || "";

  console.log("before returning");
  return "/" + toplevel;
}
