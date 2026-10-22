// Employment history, transcribed from the CV.
export type Role = {
  company: string;
  title: string;
  type?: string;
  location?: string;
  start: string;
  end: string;
  /** Year span used on the timeline rail. */
  years: string;
  points: string[];
  stack: string[];
};

export const roles: Role[] = [
  {
    company: "Syncognix",
    title: "Team Lead & Full Stack Developer",
    start: "Sep 2026",
    end: "Present",
    years: "2026 —",
    points: [
      "Lead and mentor the development team — sprint planning, task assignment and code reviews to keep client delivery on time and at a high standard.",
      "Architect and build full-stack web applications, owning technical decisions from requirement analysis through deployment.",
      "Translate client and stakeholder requirements into technical solutions while keeping Git-based workflows and best practices consistent across the team.",
    ],
    stack: ["React.js", "TypeScript", "Node.js", "SQL & NoSQL", "Git"],
  },
  {
    company: "Ingenious Concepts",
    title: "Full Stack Developer",
    type: "Full-time · On-site",
    location: "Lahore, Pakistan",
    start: "Jan 2026",
    end: "Aug 2026",
    years: "2026",
    points: [
      "Delivered full-stack web applications — responsive interfaces plus back-end logic, APIs, database integration, authentication and CRUD to client requirements.",
      "Built, deployed and maintained sites on cPanel hosting, integrating Firebase and Supabase for auth, real-time data and backend services.",
      "Customised WordPress themes and plugins with on-page SEO and performance best practices.",
      "Shipped Pawfect, Natural Languages, Election Campaign System, Novious Global, Sehat Makaan, PCG and Sygnifin.",
    ],
    stack: ["React.js", "TypeScript", "MySQL", "Firebase", "Supabase", "WordPress", "cPanel"],
  },
  {
    company: "Ingenious Concepts",
    title: "AI Automation & Web Development Intern",
    type: "Internship",
    start: "Oct 2025",
    end: "Jan 2026",
    years: "2025",
    points: [
      "Built backend applications and REST APIs in Python (Flask) and Node.js with authentication, validation and error handling.",
      "Designed and managed PostgreSQL and MySQL databases; containerised services with Docker.",
      "Built AI automation workflows with OpenAI APIs, n8n and Make.com, delivered across ECS, Novious Global, Sehat Makaan, PCG and Sygnifin.",
      "Developed an AI-powered code debugger with Flask, Scikit-learn, Pandas, NumPy and Tesseract OCR for automated error classification.",
    ],
    stack: ["Python", "Flask", "Node.js", "PostgreSQL", "Docker", "n8n", "Make.com", "OpenAI"],
  },
  {
    company: "DirectFN",
    title: "Full Stack Developer (Intern)",
    start: "Apr 2025",
    end: "Sep 2025",
    years: "2025",
    points: [
      "Worked in a five-person engineering team building a stocks trading app, an accounting system and an inventory system from the ground up.",
      "Developed full-stack features with React and Node.js, with SQLYog for database design and management.",
      "Containerised services with Docker for consistent development and deployment environments.",
    ],
    stack: ["React", "Node.js", "SQLYog", "Docker"],
  },
  {
    company: "Lemon Studios",
    title: "Web Developer (Intern)",
    start: "Apr 2023",
    end: "Dec 2023",
    years: "2023",
    points: [
      "Built full-stack features on the MERN stack under senior developer supervision.",
      "Developed cross-platform mobile functionality with Flutter and React Native.",
    ],
    stack: ["MongoDB", "Express", "React", "Node.js", "Flutter", "React Native"],
  },
];

export const education = {
  degree: "BS Computer Science",
  school: "Riphah International University, Lahore",
  start: "Oct 2022",
  end: "Jul 2026",
};
