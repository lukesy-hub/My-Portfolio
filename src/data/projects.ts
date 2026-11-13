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
    altLinks: [{ label: "3D edition", url: "https://thermoking.syncognix.tech/" }],
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
    url: "https://noviousglobal.com/",
    altLinks: [{ label: "Preview build", url: "https://novious-global.vercel.app/" }],
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
    url: "https://www.pawfect-furfresh.com/",
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
    slug: "ingenious-concepts",
    name: "Ingenious Concepts",
    url: "https://ingeniousc.com/",
    category: "Services",
    sector: "AI-powered digital agency",
    location: "Lahore · Dallas · Sydney",
    summary:
      "The agency’s own site — AI-first marketing, automation, development and design, told through an illustrated “every big brand starts as one idea” story.",
    highlights: [
      "Hand-illustrated hero scene with an Idea → Web → Apps → Ads → Launch journey",
      "Looping service marquee across marketing, automation, e-commerce, XR and security",
      "Case studies, careers, blog and a free-proposal funnel",
    ],
    tech: ["Vite", "Lenis"],
    context: "Ingenious Concepts",
    tint: "#F2B21B",
    media: { mobile: true, long: true },
    longHeight: 3200,
  },
  {
    slug: "teleclaris",
    name: "TeleClaris",
    url: "https://teleclaris.syncognix.tech/",
    category: "Services",
    sector: "Medical billing & healthcare IT",
    summary:
      "Medical billing and revenue-cycle management, HIPAA-compliant healthcare IT, medical recruitment and practice real estate — one partner for the business side of a practice.",
    highlights: [
      "“Revenue clarity that powers your practice.” hero with a tracked claim-lifecycle panel",
      "Verify → Code → Submit → Follow up: one accountable process, intake to payment",
      "Four disciplines and a free billing-audit call to action",
    ],
    tech: ["React", "Vite", "GSAP", "Lenis"],
    tint: "#19B39A",
    media: { mobile: true, long: true },
    longHeight: 3200,
  },
  {
    slug: "covelynt",
    name: "Covelynt",
    url: "https://covelynt.syncognix.tech/",
    category: "Services",
    sector: "Sales development",
    summary:
      "Sales-development programs that connect research, outreach, qualification and sales operations into one pipeline — “From market to meeting.”",
    highlights: [
      "Six-stage pipeline told on scroll: define, research, engage, qualify, hand off, improve",
      "Target → Engage → Optimize capability layers as an interactive index",
      "Editorial type over a cinematic city backdrop",
    ],
    tech: ["React", "Vite", "Three.js", "Lenis"],
    tint: "#23A6B5",
    media: { mobile: true, long: true },
    longHeight: 3200,
  },
  {
    slug: "truckify",
    name: "Truckify",
    url: "https://truckify.syncognix.tech/",
    category: "Automotive",
    sector: "Truck dispatching",
    summary:
      "A dispatch partner for owner-operators and small fleets — load sourcing, rate negotiation, broker communication and back-office paperwork, handled.",
    highlights: [
      "“You run the road. We run the board.” hero with a live dispatch-desk clock",
      "Sample load card moving from sourced to delivered",
      "Equipment, lanes and a five-step path from first call to a full schedule",
    ],
    tech: ["React", "Vite", "Three.js", "Lenis"],
    tint: "#F26A1B",
    media: { mobile: true, long: true },
    longHeight: 3200,
  },
  {
    slug: "safa",
    name: "Saffa Online Quran Academy",
    url: "https://safa.syncognix.tech/",
    category: "Services",
    sector: "Online Quran education",
    summary:
      "A calm, welcoming academy site for online Quran reading, Qaida, Tajweed and Islamic Studies — personal, one-to-one learning paths for children and adults.",
    highlights: [
      "Serif “Let the words of the Quran find their way home.” hero with arched imagery",
      "Learning-path cards from Noorani Qaida to Tajweed practice",
      "Step-by-step visual journey and free-trial booking",
    ],
    tech: ["React", "Vite", "GSAP", "Lenis"],
    tint: "#2E6B4A",
    media: { mobile: true, long: true },
    longHeight: 3200,
  },
  {
    slug: "vellumor",
    name: "VELLUMOR",
    url: "https://vellumor.ayiin.com/",
    category: "Commerce",
    sector: "Leather goods",
    summary:
      "Storefront for handcrafted leather bags, wallets, belts and jackets — “Leather that remembers.” — built around a launch edit and six collections.",
    highlights: [
      "Dark, tactile hero with italic serif typography",
      "Launch edit with SKU-coded product cards and add-to-bag",
      "Six collections, from everyday essentials to specialist and bespoke work",
    ],
    tech: ["React", "Vite"],
    tint: "#8A4B2A",
    media: { mobile: true, long: false },
  },
  {
    slug: "london-cd",
    name: "London Construction & Development",
    url: "https://www.londonsconstructions.co.uk/",
    category: "Services",
    sector: "Construction & refurbishment",
    location: "Ashford, UK",
    summary:
      "Residential and commercial construction, refurbishment, extensions and conversions — a confident, architectural site for a full-service builder.",
    highlights: [
      "“Building spaces that endure.” hero over full-bleed architectural photography",
      "Build / Transform / Maintain model and four principal project types",
      "Filterable services index with a light and dark theme",
    ],
    tech: ["Astro"],
    tint: "#B8925A",
    media: { mobile: true, long: false },
  },
  {
    slug: "marson-maynor",
    name: "Marson Maynor",
    url: "https://marson-maynor.vercel.app/",
    category: "Services",
    sector: "Mortgage advisory",
    summary:
      "A mortgage advisor’s site for homebuyers, homeowners and investors — home equity and HELOCs, investor financing and purchase financing in plain language.",
    highlights: [
      "Three financing pathways: start with the decision in front of you",
      "Dedicated home-equity, investor and home-purchase stories",
      "Strategy sessions and direct call actions throughout",
    ],
    tech: ["React", "Vite"],
    tint: "#A3202F",
    media: { mobile: true, long: false },
  },
  {
    slug: "mra-global",
    name: "MRA Global Services",
    url: "https://mraglobalservices.com/",
    category: "Services",
    sector: "Outbound sales & lead generation",
    summary:
      "Research, cold calling, qualification, appointment setting and quality operations in one connected sales engine for B2B and B2C teams.",
    highlights: [
      "“Turn targeted outreach into qualified conversations.” hero with a live campaign-workflow panel",
      "Market → Meeting pipeline: research, engage, qualify, meet",
      "Channel mix, QA monitoring and CRM-ready handoffs",
    ],
    tech: [],
    tint: "#D9512C",
    media: { mobile: true, long: false },
  },
  {
    slug: "georgia-tire",
    name: "TireXpress",
    url: "https://www.georgiatirexpress.com/",
    category: "Automotive",
    sector: "Mobile truck & RV tire service",
    location: "North Georgia & Metro Atlanta",
    summary:
      "24/7 mobile tire repair and replacement for semi trucks, commercial fleets, trailers and RVs — built to get a stranded driver on the phone fast.",
    highlights: [
      "“Georgia’s roadside tire experts. Ready 24/7.” hero with live availability status",
      "Call and text actions above the fold",
      "Truck, roadside and semi/RV service breakdown with tire sizes",
    ],
    tech: ["React", "Vite", "GSAP"],
    tint: "#F05A1A",
    media: { mobile: false, long: false },
  },
  {
    slug: "corpus-christi-handyman",
    name: "Corpus Christi Handyman Services",
    url: "https://www.corpuschristihandymanservices.com/",
    category: "Services",
    sector: "Handyman & home repair",
    location: "Corpus Christi, TX",
    summary:
      "Repairs, installs and finishing work for homes, rentals and small businesses — send the list once and get one clear plan for the work.",
    highlights: [
      "“Your home to-do list. Handled right.” video-backed hero",
      "Start-with-the-problem service picker and recent-work gallery",
      "Before/after comparison and bundled small-jobs messaging",
    ],
    tech: [],
    tint: "#C49A5A",
    media: { mobile: true, long: false },
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

// Home page reel — curated order.
const featuredSlugs = ["kariss-tax", "dtv-mounting", "rodo", "dopamine", "layaan", "dumpster-chics"];
export const featuredProjects = featuredSlugs.map((slug) => projects.find((p) => p.slug === slug)!);

/** Other work from the CV that has no public link. */
export const otherWork: { name: string; detail: string; tech: string[] }[] = [
  {
    name: "SxB People",
    detail: "A complete HRM system — daily attendance, days-off management, task management and IP-based attendance.",
    tech: ["HRM", "IP-based attendance", "Task management"],
  },
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
