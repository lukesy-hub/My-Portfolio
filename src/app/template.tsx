/**
 * Re-mounts on every navigation, giving each page a short enter transition.
 * CSS-only, transform-only, and settles on `transform: none` — a lingering
 * transform or filter would break `position: fixed` pinning inside the page.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
