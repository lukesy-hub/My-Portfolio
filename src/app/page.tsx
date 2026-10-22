import { Hero } from "@/components/Hero";
import { Nav } from "@/components/Nav";
import { SmoothScroll } from "@/components/SmoothScroll";

export default function Home() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <SmoothScroll />
      <Nav />
      <main id="main">
        <Hero />
      </main>
      <div className="grain" aria-hidden="true" />
    </>
  );
}
