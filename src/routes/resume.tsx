import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Download, FileText, Eye } from "lucide-react";
import { PageTransition } from "@/components/page-transition";
import { GradientBlobs } from "@/components/gradient-blobs";
import { GlowButton } from "@/components/glow-button";

export const Route = createFileRoute("/resume")({
  head: () => ({
    meta: [
      { title: "Resume — Nova" },
      { name: "description", content: "Download Sharvesh's CV / resume in PDF format." },
      { property: "og:title", content: "Resume — Sharvesh" },
      { property: "og:description", content: "Download my resume." },
    ],
  }),
  component: ResumePage,
});

function ResumePage() {
  return (
    <PageTransition variant="scale">
      <GradientBlobs />
      <section className="relative mx-auto max-w-4xl px-6 text-center">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm uppercase tracking-[0.3em] text-accent">
          Curriculum
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-3 text-4xl sm:text-6xl font-bold tracking-tight"
        >
          Grab my <span className="text-gradient-neon">resume</span>
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 40, rotateX: -30 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          whileHover={{ rotateX: 6, rotateY: -6, scale: 1.02 }}
          style={{ transformStyle: "preserve-3d", perspective: 1000 }}
          className="mt-14 mx-auto max-w-md aspect-[3/4] glass rounded-3xl p-8 shadow-card relative overflow-hidden group"
        >
          <div className="absolute inset-0 opacity-20 bg-neon" />
          <div className="absolute inset-0 animate-shimmer" />
          <div className="relative h-full flex flex-col items-center justify-center gap-6">
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="size-24 rounded-2xl bg-neon shadow-glow flex items-center justify-center"
            >
              <FileText size={42} className="text-primary-foreground" />
            </motion.div>
            <div>
              <p className="font-bold text-xl">Sharvesh_Resume_jan_2026.pdf</p>
              <p className="text-sm text-muted-foreground mt-1">~ 507 KB · 1 page</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <a href="/Sharvesh_Resume_jan_2026.pdf" download>
            <GlowButton><Download size={18} /> Download PDF</GlowButton>
          </a>
          <a href="/Sharvesh_Resume_jan_2026.pdf" target="_blank" rel="noreferrer">
            <GlowButton variant="ghost"><Eye size={18} /> Preview</GlowButton>
          </a>
        </motion.div>
      </section>
    </PageTransition>
  );
}
