// Single source of truth for identity and contact details (from the CV).
export const profile = {
  name: "Muhammad Talha",
  firstName: "Muhammad",
  lastName: "Talha",
  role: "Full Stack Developer & AI Automation Engineer",
  location: "Lahore, Pakistan",
  timeZone: "Asia/Karachi",
  email: "talhazahid710@gmail.com",
  phone: "+92 316 4247480",
  siteUrl: "https://talha-portfolio-mu-nine.vercel.app",
  summary:
    "Full stack developer and AI automation engineer shipping production websites, web apps, mobile apps and LLM-driven workflow automations — owning projects end to end, from server and database to interface, motion and deployment.",
  cv: {
    // Self-hosted copy of the CV for a reliable, direct download.
    href: "/Muhammad-Talha-CV.pdf",
    fileName: "Muhammad-Talha-CV.pdf",
    // Original Google Drive file, kept as the canonical online copy.
    driveUrl:
      "https://drive.google.com/file/d/1WdcGPFc-WDOK6sKIaMqtI9_wP6F9vglT/view?usp=sharing",
  },
} as const;

export type SocialLink = {
  label: string;
  href: string;
  handle: string;
};

export const socials: SocialLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/TalhaZahid13",
    handle: "TalhaZahid13",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/muhammad-talha-881265176/",
    handle: "muhammad-talha",
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/923164247480",
    handle: "+92 316 4247480",
  },
  {
    label: "Email",
    href: `mailto:${profile.email}`,
    handle: profile.email,
  },
];

export const navLinks = [
  { id: "top", label: "Home" },
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
] as const;
