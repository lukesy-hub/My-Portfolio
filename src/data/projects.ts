// Live websites from the "Website Development Portfolio" collection and the CV.
// Screenshots in /public/work were captured from each live site.
// To add a project: drop `<slug>.webp` (1440×900) and optionally
// `<slug>-mobile.webp` (390×844) and `<slug>-long.webp` (960 wide) into
// /public/work, then add an entry below.

export type ProjectCategory = "Automotive" | "Commerce" | "Services" | "Platforms";

export type Project = {
  slug: string;
  name: string;
  /** Primary live URL. */
  url: string;
  /** Additional live URLs, e.g. alternate concepts. */
  altLinks?: { label: string; url: string }[];
  category: ProjectCategory;
  /** Short business descriptor. */
  sector: string;
  location?: string;
  summary: string;
  /** Things worth noticing on the live site — taken from the site itself. */
  highlights: string[];
  /** Only technologies verified from the site's served code. */
  tech: string[];
  /** Where the work was delivered, when the CV says so. */
  context?: string;
  /** Brand tint used for chromatic accents behind the preview. */
  tint: string;
  /** Screenshot variants available in /public/work. */
  media: { mobile: boolean; long: boolean };
  /** Long screenshot height at 960px wide, for layout reservation. */
  longHeight?: number;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "dtv-mounting",
    name: "DTV Mounting",
    url: "http://kd2lko3sqhzeprz9bunzxv0s.148.230.86.143.sslip.io/",
    category: "Services",
    sector: "TV installation",
    location: "Atlanta, GA",
    summary:
      "A cinematic, editorial site for a metro-Atlanta TV mounting company — fireplace and brick installs, hidden wiring, soundbars and LED backlighting.",
    highlights: [
      "Serif-led “From wall to wow.” hero over full-bleed interior photography",
      "Six-step installation story and a “design yours” configurator section",
      "Same-day booking and free-quote calls to action throughout",
    ],
    tech: ["Vue.js"],
    tint: "#B9875A",
    media: { mobile: true, long: true },
    longHeight: 3200,
    featured: true,
  },
  {
    slug: "rodo",
    name: "RODO",
    url: "https://rodoperfumes.com/",
    category: "Commerce",
    sector: "Fragrance house",
    summary:
      "Storefront for an independent fragrance house — collections, gift sets, discovery sets and a moody, film-like product story.",
    highlights: [
      "Editorial collection pages such as “The Forest Collection”",
      "Shop by price, gifting, new arrivals and discovery set",
      "Search across fragrances and notes, with bag and account",
    ],
    tech: ["Vite", "Lenis"],
    tint: "#6F7B4E",
    media: { mobile: true, long: true },
    longHeight: 3200,
    featured: true,
  },
  {
    slug: "natural-languages-1",
    name: "Natural Languages",
    url: "https://demo.ingeniousc.com/natural-languages-1/",
    altLinks: [
      { label: "Concept II", url: "https://demo.ingeniousc.com/natural-languages-2/" },
    ],
    category: "Services",
    sector: "Interpreting & translation",
    location: "Jersey City, NJ",
    summary:
      "Two concepts for an interpreting, translation and transcription agency serving healthcare, education and government — one immersive, one led by sign language.",
    highlights: [
      "Concept I: loading intro, “calm mode” toggle and a fingerspelling interaction",
      "Concept II: sign-language video story with captioned, ASL-first messaging",
      "Accessibility treated as the subject of the design, not an afterthought",
    ],
    tech: ["React", "GSAP", "ScrollTrigger", "Lenis"],
    context: "Ingenious Concepts",
    tint: "#3E8C7E",
    media: { mobile: true, long: true },
    longHeight: 3200,
    featured: true,
  },
  {
    slug: "dopamine",
    name: "Dopamine Mobile Mechanic",
    url: "https://www.dopmm.com/",
    category: "Automotive",
    sector: "Mobile mechanic",
    location: "Tampa Bay, FL",
    summary:
      "A high-voltage site for a Tampa Bay mobile mechanic — on-site diagnostics, brakes, batteries and 24/7 roadside help, all funnelled into one call or booking.",
    highlights: [
      "“Faulted to prime.” headline system with a live opening-hours signal",
      "Three-step process, service finder and Tampa Bay service-area map",
      "Persistent call and booking actions for mobile visitors",
    ],
    tech: ["Next.js", "React"],
    tint: "#E0262B",
    media: { mobile: true, long: true },
    longHeight: 3200,
    featured: true,
  },
  {
    slug: "layaan",
    name: "LAYAAN Atelier",
    url: "https://layaan-six.vercel.app/",
    category: "Commerce",
    sector: "Womenswear",
    summary:
      "A lookbook-led storefront for contemporary Western womenswear — tailoring edits, coordinated sets and statement sleeves, in a pre-launch preview state.",
    highlights: [
      "Triptych hero with editorial serif typography",
      "Shop-by-category, “The Tailoring Edit” and in-the-round product views",
      "Clear preview-site messaging while ordering is closed",
    ],
    tech: ["React", "GSAP", "ScrollTrigger", "Lenis"],
    tint: "#1F6B5C",
    media: { mobile: true, long: true },
    longHeight: 3200,
    featured: true,
  },
  {
    slug: "sehat-makaan",
    name: "Sehat Makaan",
    url: "https://sehatmakaan.com/",
    category: "Platforms",
    sector: "Healthcare practice spaces",
    location: "Pakistan",
    summary:
      "Fully equipped, regulation-compliant clinical spaces for dentists, physicians and aesthetic practitioners — services, hourly pricing, onboarding and registration.",
    highlights: [
      "Live service and hourly-rate panel in the hero",
      "Onboarding steps and flexible packages for practitioners",
      "Registration flow and RESQ Skill Lab section",
    ],
    tech: ["WordPress"],
    context: "Ingenious Concepts",
    tint: "#1E7B74",
    media: { mobile: true, long: true },
    longHeight: 3200,
    featured: true,
  },
  {
    slug: "kariss-tax",
    name: "Kariss Tax Prep LLC",
    url: "https://karisstaxprepllc.com/",
    category: "Services",
    sector: "Tax & accounting",
    summary:
      "Tax preparation, accounting, bookkeeping and tax planning — a black-and-gold editorial site that makes a personal practice feel established.",
    highlights: [
      "Four numbered service lines set as a typographic index",
      "Consultation booking panel alongside the hero",
      "Reviews and FAQ to answer questions before the call",
    ],
    tech: ["Next.js"],
    tint: "#C9A227",
    media: { mobile: true, long: true },
    longHeight: 3200,
  },
  {
    slug: "interstate",
    name: "Interstate Truck & Trailer Repair",
    url: "https://www.interstatetrucktrialer.com/",
    category: "Automotive",
    sector: "Diesel & roadside repair",
    location: "West Memphis, AR",
    summary:
      "24/7 roadside dispatch and a full-service diesel shop — built for drivers who need the right phone number in seconds.",
    highlights: [
      "Dispatch number and live-hours status above the fold",
      "Roadside vs. shop split: “Come to us, or we come to you.”",
      "Service breakdown across every critical system",
    ],
    tech: ["Next.js"],
    tint: "#D7262E",
    media: { mobile: true, long: true },
    longHeight: 3200,
  },
  {
    slug: "kaps",
    name: "KAPS Mobile Mechanics",
    url: "https://kapsmobilemechanics.com/",
    category: "Automotive",
    sector: "Mobile auto repair",
    location: "Roswell, GA",
    summary:
      "Family-owned mobile auto repair across North Atlanta — services, pricing, service areas, financing and reviews in one quick funnel.",
    highlights: [
      "Trust strip: licensed, family-owned, mobile service",
      "Pricing, service areas and financing sections",
      "Floating call and chat actions",
    ],
    tech: ["React"],
    tint: "#E1352B",
    media: { mobile: false, long: true },
    longHeight: 3200,
  },
  {
    slug: "dumpster-chics",
    name: "Dumpster Chics",
    url: "https://dumpsterchics.com/",
    category: "Services",
    sector: "Dumpster rental & junk removal",
    location: "Bethel, OH",
    summary:
      "Dumpster rentals, junk removal, estate cleanouts and trailer rentals — a loud, friendly brand with a job-first service picker.",
    highlights: [
      "“Your junk. Our problem.” hero with a start-with-the-job selector",
      "Three-step process and local service area",
      "Quote and call actions on every screen",
    ],
    tech: ["Next.js"],
    tint: "#E2357A",
    media: { mobile: true, long: true },
    longHeight: 3200,
  },
  {
    slug: "thermoking",
    name: "Thermoking Repair LLC",
    url: "https://thermoking-repair.vercel.app/",
    category: "Automotive",
    sector: "Truck & trailer repair",
    summary:
      "Mobile truck and trailer repair within a 100-mile radius — a bright, technical interface with a direct line to the mechanic.",
    highlights: [
      "Field-service hero with isometric truck illustration",
      "Service-area radius and service gallery",
      "Light, blueprint-like visual language for a heavy-duty trade",
    ],
    tech: ["React", "Vite"],
    tint: "#2A7DE1",
    media: { mobile: true, long: true },
    longHeight: 3200,
  },
  {
    slug: "hb-detailing",
    name: "H&B Auto Detailing",
    url: "https://www.hbdetailingservices.com/",
    category: "Automotive",
    sector: "Mobile detailing",
    location: "Bryan, OH",
    summary:
      "Mobile detailing, ceramic coatings and paint correction, with pricing by vehicle size and a quote-first flow.",
    highlights: [
      "Ceramic coating and paint-correction service pages",
      "Pricing by vehicle size",
      "Gallery, FAQ and request-a-quote flow",
    ],
    tech: ["React", "Vite"],
    tint: "#2F6FE4",
    media: { mobile: true, long: true },
    longHeight: 3200,
  },
  {
    slug: "novious",
    name: "Novious Global",
    url: "https://novious-global.vercel.app/",
    category: "Services",
    sector: "Sourcing & procurement",
    location: "Shanghai, China",
    summary:
      "A sourcing partner connecting global buyers with verified Chinese manufacturers — services, process, strategy and packages.",
    highlights: [
      "Layered photo collage hero with a supplier-network motif",
      "Product services, project services and business strategy",
      "Step-by-step “How we work” and package tiers",
    ],
    tech: ["React", "Vite"],
    context: "Ingenious Concepts",
    tint: "#D8262F",
    media: { mobile: true, long: true },
    longHeight: 3200,
  },
  {
    slug: "pawfect",
    name: "Pawfect by FurFresh",
    url: "https://demo.ingeniousc.com/pawfect-furfresh-2/",
    category: "Commerce",
    sector: "Pet care",
    summary:
      "Canadian-made shampoos for sensitive-skin pets — product range, brand story and FAQ in a warm, playful storefront.",
    highlights: [
      "Bubble-motion hero and soft, golden palette",
      "“Meet your Pawfect match” product finder",
      "Ingredient-led storytelling for sensitive skin",
    ],
    tech: ["WordPress"],
    context: "Ingenious Concepts",
    tint: "#C08A2E",
    media: { mobile: true, long: true },
    longHeight: 3200,
  },
  {
    slug: "jgiles",
    name: "JGile’s Mobile Detailing+",
    url: "https://jgilesmobiledetailing.com/",
    category: "Automotive",
    sector: "Detailing & equipment cleaning",
    summary:
      "Online booking for a mobile detailing business that also cleans agricultural and heavy equipment.",
    highlights: [
      "Bookable service menu with call-out pricing",
      "Separate heavy-equipment deep-clean services",
    ],
    tech: ["Square Online"],
    tint: "#7A8794",
    media: { mobile: true, long: true },
    longHeight: 2213,
  },
  {
    slug: "ims",
    name: "Inventory Management System",
    url: "https://inventory-management-system-r2rz.vercel.app/",
    category: "Platforms",
    sector: "Web application",
    summary:
      "An inventory and sales dashboard — order states, weekly sales, sales by city and channel, and top-selling products.",
    highlights: [
      "Order pipeline: picked, shipped, delivered, invoiced",
      "Charts with SVG, PNG and CSV export",
      "Modules for inventory, orders, customers, invoices and reports",
    ],
    tech: ["React", "Vite"],
    tint: "#6C63E0",
    media: { mobile: true, long: false },
  },
];

export const categories: ProjectCategory[] = ["Automotive", "Commerce", "Services", "Platforms"];

export const featuredProjects = projects.filter((p) => p.featured);

/** Other work from the CV that has no public link. */
export const otherWork: { name: string; detail: string; tech: string[] }[] = [
  {
    name: "Election Campaign System",
    detail: "Campaign management platform — members, voter records, lawyers and operations with role-based access control.",
    tech: ["React", "Node.js", "MySQL"],
  },
  {
    name: "SafarSync",
    detail: "AI-powered travel platform — bookings, Google Maps navigation, group location tracking, AI tour planning and SOS/ICE.",
    tech: ["AI planning", "Google Maps", "Realtime"],
  },
  {
    name: "AI Code Debugger",
    detail: "Automated error classification and debugging assistance, including OCR for screenshots of errors.",
    tech: ["Flask", "Scikit-learn", "Pandas", "Tesseract"],
  },
  {
    name: "Stocks Trading App, Accounting & Inventory Systems",
    detail: "Built from the ground up within a five-person engineering team at DirectFN.",
    tech: ["React", "Node.js", "SQLYog", "Docker"],
  },
  {
    name: "SMAC Mobile App & Website",
    detail: "Mobile application and companion web app for ZNZ Communications.",
    tech: ["Flutter", "MERN"],
  },
  {
    name: "PCG · Sygnifin · Ingenious Concepts",
    detail: "Client websites and platforms built and customised at Ingenious Concepts.",
    tech: ["React", "WordPress"],
  },
];

export function hostOf(url: string) {
  const host = new URL(url).hostname.replace(/^www\./, "");
  // The DTV Mounting preview is served from a raw IP host — show the brand instead.
  return host.endsWith("sslip.io") ? "dtv-mounting · preview host" : host;
}
