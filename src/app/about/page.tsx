import type { Metadata } from "next";
import { About } from "@/components/About";
import { Lab } from "@/components/Lab";
import { SectionHead } from "@/components/SectionHead";

export const metadata: Metadata = {
  title: "About",
  description:
    "Muhammad Talha is a Lahore-based full stack developer and AI automation engineer — team lead at Syncognix, BS Computer Science at Riphah International University.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <div className="section page-top">
        <div className="container">
          <SectionHead level={1} index="02" label="About" id="about-title">
            The person behind <em>the pixels</em>.
          </SectionHead>
        </div>
        <About />
      </div>
      <Lab />
    </>
  );
}
