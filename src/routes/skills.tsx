import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { PageTransition } from "@/components/page-transition";
import { GradientBlobs } from "@/components/gradient-blobs";

export const Route = createFileRoute("/skills")({
  head: () => ({
    meta: [
      { title: "Skills — Sharvesh" },
      { name: "description", content: "Skills, tools, and concepts used in my projects." },
      { property: "og:title", content: "Skills — Sharvesh" },
      { property: "og:description", content: "My technical skills and toolkit." },
    ],
  }),
  component: SkillsPage,
});

const skillCategories = [
  {
    title: "Programming Languages",
    items: ["Java", "JavaScript"],
  },
  {
    title: "Web & Mobile Development",
    items: ["HTML5", "CSS3", "Spring Boot"],
  },
  {
    title: "Databases & Query Languages",
    items: ["MySQL", "SQL"],
  },
  {
    title: "Development Tools & Platforms",
    items: ["Git", "GitHub", "Visual Studio Code", "Jupyter Notebook"],
  },
  {
    title: "Concepts & Methodologies",
    items: ["Object-Oriented Programming (OOP)", "RESTful APIs", "Software Development Life Cycle (SDLC)"],
  },
  {
    title: "Microsoft Office Suite",
    items: ["MS Office", "Word", "Excel", "PowerPoint", "Outlook", "Teams"],
  },
] as const;

function SkillCategoryCard({
  title,
  items,
  i,
}: {
  title: string;
  items: readonly string[];
  i: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ amount: 0.25 }}
      transition={{ delay: i * 0.06, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="glass rounded-2xl p-6 shadow-card"
    >
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-base sm:text-lg font-semibold tracking-tight">{title}</h3>
        <span className="text-xs font-mono text-accent">{items.length} items</span>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className="text-xs sm:text-sm px-3 py-1 rounded-full bg-primary/10 text-foreground/90 border border-primary/20"
          >
            {item}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

function SkillsPage() {
  return (
    <PageTransition variant="scale">
      <GradientBlobs />
      <section className="relative mx-auto max-w-5xl px-6">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm uppercase tracking-[0.3em] text-accent"
        >
          My toolkit
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-3 text-4xl sm:text-6xl font-bold tracking-tight"
        >
          Skills & <span className="text-gradient-neon">tools</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-muted-foreground max-w-xl"
        >
          A structured overview of the technologies, tools, and concepts I use to build real-world applications.
        </motion.p>

        <div className="mt-12 grid sm:grid-cols-2 gap-4">
          {skillCategories.map((c, i) => (
            <SkillCategoryCard key={c.title} title={c.title} items={c.items} i={i} />
          ))}
        </div>
      </section>
    </PageTransition>
  );
}
