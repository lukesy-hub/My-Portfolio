import type Lenis from "lenis";

// Module-level handle so any component can scroll through Lenis when it is
// running, and fall back to native scrolling when it is not (reduced motion).
let instance: Lenis | null = null;

export function setLenis(lenis: Lenis | null) {
  instance = lenis;
}

export function getLenis() {
  return instance;
}

function navOffset() {
  const value = getComputedStyle(document.documentElement).getPropertyValue("--nav-h");
  return (parseFloat(value) || 64) + 24;
}

/** Scroll to a section by id, keep the URL hash in sync and move focus for keyboard users. */
export function scrollToId(id: string) {
  const target = id === "top" ? document.body : document.getElementById(id);
  if (!target) return;

  if (instance) {
    instance.scrollTo(id === "top" ? 0 : target, { offset: -navOffset(), duration: 1.2 });
  } else {
    const top = id === "top" ? 0 : target.getBoundingClientRect().top + window.scrollY - navOffset();
    window.scrollTo({ top, behavior: "smooth" });
  }

  history.replaceState(null, "", id === "top" ? location.pathname : `#${id}`);

  if (id !== "top") {
    if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });
  }
}
