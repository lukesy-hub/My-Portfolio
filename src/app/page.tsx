import { Link } from "@/components/IntentLink";
import { ContactCta } from "@/components/contact/ContactCta";
import { Hero } from "@/components/Hero";
import { HomeBackdrop } from "@/components/home/HomeBackdrop";
import { Intro } from "@/components/home/Intro";
import { StackOverview } from "@/components/home/StackOverview";
import { SectionHead } from "@/components/SectionHead";
import { FeaturedReel } from "@/components/work/FeaturedReel";
import { projects } from "@/data/projects";
import styles from "./page.module.css";

export default function Home() {
  return (
    <HomeBackdrop>
      <Hero />

      <section id="home-work" className={`section ${styles.work}`} aria-labelledby="home-work-title">
        <div className="container">
          <SectionHead
            index="01"
            label="Selected work"
            id="home-work-title"
            aside="A handful of recent builds, shown as they appear today — captured from each live site."
          >
            Websites that <em>work</em> for real businesses.
          </SectionHead>
        </div>
        <FeaturedReel />
        <div className={`container ${styles.workFoot}`}>
          <Link href="/projects" className="btn">
            All {projects.length} projects <span className="btn__arrow" aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <Intro />
      <StackOverview />
      <ContactCta />
    </HomeBackdrop>
  );
}
