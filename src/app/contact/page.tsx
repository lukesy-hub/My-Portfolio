import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { CopyEmail } from "@/components/contact/CopyEmail";
import styles from "@/components/contact/Contact.module.css";
import { SectionHead } from "@/components/SectionHead";
import { profile, socials } from "@/data/profile";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Muhammad Talha about websites, web applications, AI automation or mobile apps — email talhazahid710@gmail.com, WhatsApp, LinkedIn or GitHub.",
  alternates: { canonical: "/contact" },
};

const channels = [
  ...socials.filter((s) => s.label !== "Email"),
  { label: "CV", href: profile.cv.href, handle: "Download PDF", download: true },
];

export default function ContactPage() {
  return (
    <div className="section page-top">
      <div className="container">
        <SectionHead
          level={1}
          index="05"
          label="Contact"
          id="contact-title"
          aside="Websites, web apps, AI automations or a mobile build — tell me what you’re working on. Based in Lahore (PKT, UTC+5) and working with clients remotely."
        >
          Let’s build something <em>real</em>.
        </SectionHead>

        <div className={styles.layout}>
          <div className={styles.details}>
            <CopyEmail />
            <ul className={styles.channels}>
              {channels.map((c) => {
                const external = c.href.startsWith("http");
                return (
                  <li key={c.label}>
                    <a
                      href={c.href}
                      className={styles.channel}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                      download={"download" in c ? profile.cv.fileName : undefined}
                    >
                      <span className="mono">{c.label}</span>
                      <span className={styles.channelValue}>{c.handle}</span>
                      <span className={styles.channelArrow} aria-hidden="true">
                        {"download" in c ? "↓" : "↗"}
                      </span>
                      {external && <span className="sr-only"> (opens in a new tab)</span>}
                    </a>
                  </li>
                );
              })}
              <li>
                <div className={styles.channel}>
                  <span className="mono">Location</span>
                  <span className={styles.channelValue}>{profile.location}</span>
                  <span />
                </div>
              </li>
            </ul>
          </div>

          <div className={styles.formWrap}>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
