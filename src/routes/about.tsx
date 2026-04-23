import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Award, Code2, Rocket, Coffee, ArrowRight } from "lucide-react";
import { PageTransition } from "@/components/page-transition";
import { GradientBlobs } from "@/components/gradient-blobs";
import { GlowButton } from "@/components/glow-button";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Nova" },
      { name: "description", content: "Get to know Nova, a creative developer with a passion for motion design and 3D web." },
      { property: "og:title", content: "About — Nova" },
      { property: "og:description", content: "Creative developer & motion designer." },
    ],
  }),
  component: AboutPage,
});

const stats = [
  { Icon: Rocket, value: "50+", label: "Projects shipped" },
  { Icon: Award, value: "12", label: "Awards & features" },
  { Icon: Code2, value: "5y", label: "Years coding" },
  { Icon: Coffee, value: "∞", label: "Cups of coffee" },
];

function AboutPage() {
  return (
    <PageTransition variant="slide">
      <GradientBlobs />
      <section className="relative mx-auto max-w-6xl px-6">
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-sm uppercase tracking-[0.3em] text-accent"
        >
          About me
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.7 }}
          className="mt-3 text-4xl sm:text-6xl font-bold tracking-tight"
        >
          A developer who <span className="text-gradient-neon">designs</span>,
          <br /> a designer who <span className="text-gradient">codes</span>.
        </motion.h1>

        <div className="mt-12 grid lg:grid-cols-[1.4fr_1fr] gap-10 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.7 }}
            className="space-y-5 text-lg text-muted-foreground leading-relaxed"
          >
            <p>
              I'm <span className="text-foreground font-semibold">Nova</span>, a creative
              developer based in the cloud, building motion-driven interfaces for ambitious
              brands and product teams.
            </p>
            <p>
              My toolkit lives at the crossroads of <span className="text-foreground">React</span>,
              <span className="text-foreground"> Three.js</span>, and
              <span className="text-foreground"> WebGL</span> — but my craft is storytelling
              through interaction. Every pixel breathes, every click has weight.
            </p>
            <p>
              When I'm not shipping experiences, you'll find me sketching shaders, mentoring
              juniors, or chasing perfect typography.
            </p>

            <div className="pt-4">
              <Link to="/contact">
                <GlowButton>
                  Let's collaborate <ArrowRight size={18} />
                </GlowButton>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                whileHover={{ y: -6, scale: 1.03 }}
                className="glass rounded-2xl p-5 shadow-card"
              >
                <s.Icon className="text-accent mb-3" size={22} />
                <div className="text-3xl font-bold text-gradient">{s.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
}
