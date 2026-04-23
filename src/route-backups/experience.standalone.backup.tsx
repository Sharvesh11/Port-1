import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Briefcase, BadgeCheck, Code2, ListChecks } from "lucide-react";
import { PageTransition } from "@/components/page-transition";
import { GradientBlobs } from "@/components/gradient-blobs";

export const Route = createFileRoute("/experience")({
  head: () => ({
    meta: [
      { title: "Experience — Sharvesh" },
      { name: "description", content: "Experience and roles." },
      { property: "og:title", content: "Experience — Sharvesh" },
      { property: "og:description", content: "Full Stack Trainee — Revature." },
    ],
  }),
  component: ExperiencePage,
});

function ExperiencePage() {
  return (
    <PageTransition variant="slide">
      <GradientBlobs />
      <section className="relative mx-auto max-w-5xl px-6">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm uppercase tracking-[0.3em] text-accent"
        >
          Experience & Roles
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-3 text-4xl sm:text-6xl font-bold tracking-tight"
        >
          Full Stack Trainee — <span className="text-gradient-neon">Revature</span>
        </motion.h1>

        <div className="mt-10 glass rounded-3xl p-6 sm:p-8 shadow-card">
          <div className="flex items-start gap-4">
            <div className="size-11 rounded-2xl bg-primary/15 ring-1 ring-primary/25 flex items-center justify-center shrink-0">
              <Briefcase className="text-accent" size={22} />
            </div>
            <div className="min-w-0">
              <p className="text-lg sm:text-xl font-semibold">Revature</p>
              <p className="text-sm text-muted-foreground mt-1">
                Completed an intensive training program focused on Java full-stack development.
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-3">
            <div className="flex items-start gap-3 text-muted-foreground">
              <Code2 size={18} className="text-accent mt-0.5" />
              <p>Solved coding labs to strengthen problem-solving skills</p>
            </div>
            <div className="flex items-start gap-3 text-muted-foreground">
              <ListChecks size={18} className="text-accent mt-0.5" />
              <p>Worked on Java, SQL, and backend concepts</p>
            </div>
            <div className="flex items-start gap-3 text-muted-foreground">
              <BadgeCheck size={18} className="text-accent mt-0.5" />
              <p>Cleared 4 internal technical evaluation rounds during the program</p>
            </div>
            <div className="flex items-start gap-3 text-muted-foreground">
              <BadgeCheck size={18} className="text-accent mt-0.5" />
              <p>Successfully completed the training and received certification</p>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
