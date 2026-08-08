import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const sampleProjects = [
  {
    slug: "taskflow",
    name: "TaskFlow — Team Task Manager",
    image: "/images/project-1.svg",
    summary: "A Kanban-style task manager with real-time collaboration.",
    description:
      "TaskFlow lets small teams organize work across boards, lists, and cards, with real-time updates so everyone sees changes instantly. It includes role-based permissions, activity logs, and email notifications for due dates.",
    stack: ["Next.js", "TypeScript", "MongoDB", "Socket.IO", "Tailwind CSS"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/yourusername/taskflow",
    challenges:
      "Keeping the board state in sync across multiple connected clients without race conditions was the hardest part — I ended up building a small operational-transform-style queue to serialize card-move events before broadcasting them.",
    improvements:
      "Planned improvements include offline support with local caching, drag-and-drop file attachments, and a mobile app built with React Native sharing the same API.",
    order: 0,
  },
  {
    slug: "marketpulse",
    name: "MarketPulse — Analytics Dashboard",
    image: "/images/project-2.svg",
    summary: "A dashboard that visualizes e-commerce sales data in real time.",
    description:
      "MarketPulse pulls order data from a store's API and renders it as interactive charts — revenue trends, top products, and customer segments — so store owners can make decisions at a glance.",
    stack: ["React", "Node.js", "Express", "PostgreSQL", "Chart.js"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/yourusername/marketpulse",
    challenges:
      "The raw sales data had a lot of inconsistent date formats and duplicate entries from a legacy import script. I wrote a normalization layer that runs on ingest so the dashboard never has to guess.",
    improvements:
      "Next up: predictive stock alerts using a simple moving-average model, and exportable PDF reports for weekly summaries.",
    order: 1,
  },
  {
    slug: "recipebox",
    name: "RecipeBox — Recipe Sharing App",
    image: "/images/project-3.svg",
    summary: "A community app for saving, scaling, and sharing recipes.",
    description:
      "RecipeBox lets users publish recipes with step-by-step instructions, scale ingredient quantities to any serving size, and save favorites into personal collections.",
    stack: ["Next.js", "TypeScript", "Prisma", "SQLite", "Tailwind CSS"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/yourusername/recipebox",
    challenges:
      "Scaling ingredient quantities cleanly across mixed units (grams, cups, pinches) needed a small unit-conversion utility rather than naive multiplication, since not everything scales linearly in practice.",
    improvements:
      "Future plans include a shopping-list generator that merges ingredients across multiple selected recipes, and user-submitted photos per step.",
    order: 2,
  },
];

async function main() {
  for (const project of sampleProjects) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: project,
      create: project,
    });
  }
  console.log(`Seeded ${sampleProjects.length} sample projects.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
