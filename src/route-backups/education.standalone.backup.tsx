import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { GraduationCap, Calendar, MapPin, BadgeCheck } from "lucide-react";
import { PageTransition } from "@/components/page-transition";
import { GradientBlobs } from "@/components/gradient-blobs";

export const Route = createFileRoute("/education")({
  head: () => ({
    meta: [
      { title: "Education — Sharvesh" },
      { name: "description", content: "Education details and academic focus." },
      { property: "og:title", content: "Education — Sharvesh" },
      { property: "og:description", content: "Bachelor of Engineering (B.E.) — Computer Science." },
    ],
  }),
  component: EducationPage,
});

function EducationPage() {
  return (
    <PageTransition variant="slide">
      <GradientBlobs />
      <section className="relative mx-auto max-w-5xl px-6">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm uppercase tracking-[0.3em] text-accent"
        >
          Education
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-3 text-4xl sm:text-6xl font-bold tracking-tight"
        >
          Bachelor of Engineering (B.E.) —{" "}
          <span className="text-gradient-neon">Computer Science</span>
        </motion.h1>

        <div className="mt-10 grid gap-4">
          <div className="glass rounded-3xl p-6 sm:p-8 shadow-card">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
              <div className="min-w-0">
                <div className="flex items-center gap-3">
                  <div className="size-11 rounded-2xl bg-primary/15 ring-1 ring-primary/25 flex items-center justify-center">
                    <GraduationCap className="text-accent" size={22} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-lg sm:text-xl font-semibold">Vel Tech MultiTech Engineering College</p>
                    <p className="text-sm text-muted-foreground">Chennai</p>
                  </div>
                </div>

                <div className="mt-5 grid sm:grid-cols-3 gap-3 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar size={16} className="text-accent" />
                    <span>Dec 2021 – May 2025</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin size={16} className="text-accent" />
                    <span>Chennai</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <BadgeCheck size={16} className="text-accent" />
                    <span>
                      CGPA: <span className="text-foreground/90 font-medium">7.87 / 10</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 text-muted-foreground leading-relaxed">
              Built a strong foundation in <span className="text-foreground/90 font-medium">Java</span>,{" "}
              <span className="text-foreground/90 font-medium">SQL</span>, and{" "}
              <span className="text-foreground/90 font-medium">Spring Boot</span> through academic coursework and
              self-learning.
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
