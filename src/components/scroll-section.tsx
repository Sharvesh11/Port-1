import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef, type ReactNode } from "react";

type Variant = "rise" | "zoom" | "tilt" | "blur" | "slide";

export function ScrollSection({
  id,
  children,
  variant = "rise",
  className = "",
}: {
  id: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Cinematic transforms — driven by scroll progress (0 → 0.5 → 1)
  // Never start fully invisible (prevents "empty scroll" when scroll progress
  // doesn't advance as expected in some local environments).
  const opacity = useTransform(scrollYProgress, [0, 0.18, 0.82, 1], [1, 1, 1, 0]);
  // Start "neutral" at progress=0 so sections don't appear tilted/blurred on load.
  // Keep motion subtle and mainly on exit.
  const y = useTransform(scrollYProgress, [0, 0.18, 0.82, 1], [0, 0, 0, -48]);
  const scale = useTransform(scrollYProgress, [0, 0.18, 0.82, 1], [1, 1, 1, 0.98]);
  const x = useTransform(scrollYProgress, [0, 0.18, 0.82, 1], [0, 0, 0, 40]);

  const styleByVariant = {
    rise: reduce ? {} : { opacity, y },
    zoom: reduce ? {} : { opacity, scale },
    tilt: reduce ? {} : { opacity, y, scale },
    blur: reduce ? {} : { opacity, scale },
    slide: reduce ? {} : { opacity, x },
  } as const;

  return (
    <section
      ref={ref}
      id={id}
      className={`relative min-h-screen flex items-center py-24 ${className}`}
      style={{ perspective: 1400 }}
    >
      <motion.div
        // Default-visible baseline so if scroll is blocked (e.g. overflow hidden),
        // sections still render instead of staying at opacity: 0.
        style={{
          opacity: 1,
          ...styleByVariant[variant],
          transformStyle: "preserve-3d",
          willChange: "transform, opacity",
        }}
        className="w-full"
      >
        {children}
      </motion.div>
    </section>
  );
}

/** Sticky scroll progress bar at the top of the viewport */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return (
    <motion.div
      style={{ scaleX, transformOrigin: "0% 50%" }}
      className="fixed top-0 inset-x-0 z-[60] h-[3px] bg-neon shadow-glow pointer-events-none"
    />
  );
}
