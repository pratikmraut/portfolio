export function navigateToSection(id: string, updateHistory = true) {
  const target = document.getElementById(id);
  if (!target) return;

  const hash = `#${encodeURIComponent(id)}`;
  if (updateHistory && window.location.hash !== hash) {
    window.history.pushState(window.history.state, "", hash);
  }

  target.focus({ preventScroll: true });
  target.scrollIntoView({
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    block: "start",
  });
}
