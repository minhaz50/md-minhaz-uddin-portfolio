export const profile = {
  name: "Md Minhaz Uddin",
  designation: "Full Stack Developer",
  roles: [
    "Full Stack Developer",
    "TypeScript Enthusiast",
    "React & Next.js Engineer",
    "API Builder",
    "UI Perfectionist",
  ],
  tagline:
    "A passionate fresher building full stack web apps with the PERN stack. Eager to learn,ready to contribute, and looking for my first opportunity to grow as a developer.",
  location: "Mymensingh, Bangladesh",
  avatar: "/images/profileImage.png",
  resumeUrl: "../public/minhaz-resume.pdf", // drop your resume.pdf into the /public folder with this exact name
  email: "md.minhazuddin.swe@gmail.com",
  phone: "+880 1614861737",
  whatsapp: "+8801614861737",
  socials: {
    github: "https://github.com/minhaz50",
    linkedin: "https://www.linkedin.com/in/md-minhaz-uddin",
    twitter: "https://x.com/minhazalam754",
    facebook: "https://www.facebook.com/minhaz2597",
  },
};

export const about = {
  paragraphs: [
    "I got into web development with a strong passion for solving logical problems, building robust backend systems, and architecting efficient APIs. As a Full-Stack Developer with a strong focus on Backend Engineering, I specialize in designing scalable server-side applications using Node.js, Express, PostgreSQL, and Prisma.",
    "I enjoy turning complex business logic into clean, maintainable backend services—focusing on database schema design, RESTful API integrations, authentication, and query optimization. At the same time, my solid experience with React, Next.js, and TypeScript allows me to seamlessly build full-stack web applications and collaborate effectively across the entire stack.",

    "I’m actively looking for Backend or Full-Stack developer opportunities where I can engineer scalable systems, solve practical engineering problems, and continue growing alongside a collaborative team.",

    "Let’s connect!",
  ],
  highlights: [
    { label: "Technologies Learned", value: "6+" },
    { label: "Projects built", value: "10+" },
    { label: "Cups of coffee", value: "∞" },
  ],
};

export type SkillCategory = {
  category: string;
  items: string[];
};

export const skills: SkillCategory[] = [
  {
    category: "Frontend",
    items: [
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Tailwind CSS",
      "HTML5 / CSS3",
    ],
  },
  {
    category: "Backend",
    items: [
      "Node.js",
      "Express",
      "REST APIs",
      "GraphQL",
      "MongoDB",
      "PostgreSQL",
    ],
  },
  {
    category: "Tools & Workflow",
    items: ["Git / GitHub", "Docker", "Figma", "Vercel", "CI / CD", "Postman"],
  },
];

export type Education = {
  degree: string;
  institution: string;
  duration: string;
  details?: string;
};

export const education: Education[] = [
  {
    degree: "B.Tech in Computer Science & Engineering",
    institution:
      "National Institute Of Technology,Tiruchirappalli, Tamil Nadu, India",
    duration: "2017 — 2021",
    details:
      "Coursework in data structures, algorithms, databases, and software engineering.Final year project on AN INVESTIGATION OF GREEDY STRATEGY IN THE DE SUM OF N AND ANALYSIS OF ALGORITHMS.",
  },
  {
    degree: "Higher Secondary",
    institution:
      "Birshreshtha Munshi Abdur Rouf Public College Peelkhana, Dhaka-1205",
    duration: "2014 — 2016",
    details: "Scince",
  },
];

export type Experience = {
  role: string;
  company: string;
  duration: string;
  points: string[];
};

export const experience: Experience[] = [
  {
    role: "IT Executive",
    company: "Save The Life Women Co-operative Society Ltd.",
    duration: "April 2024 – July 2024",
    points: [
      "Maintained and optimized the internal digital record system.",
      "Assisted in technical troubleshooting and system maintenance.",
    ],
  },
];
