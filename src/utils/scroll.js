export function scrollToId(id) {
  if (id === "home") return window.scrollTo({ top: 0, behavior: "smooth" });
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}
export const isExternal = (url) => typeof url === "string" && /^https?:\/\//i.test(url);
