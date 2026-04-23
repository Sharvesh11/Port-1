import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function PageTransition({
  children,
  variant = "cinematic",
}: {
  children: ReactNode;
  variant?: "cinematic" | "fade" | "slide" | "scale" | "blur";
}) {
  const variants = {
    cinematic: {
      initial: {
        opacity: 0,
        scale: 1.15,
        filter: "blur(24px) brightness(1.4)",
        clipPath: "circle(0% at 50% 50%)",
      },
      animate: {
        opacity: 1,
        scale: 1,
        filter: "blur(0px) brightness(1)",
        clipPath: "circle(150% at 50% 50%)",
      },
      exit: {
        opacity: 0,
        scale: 0.92,
        filter: "blur(20px) brightness(0.6)",
        clipPath: "circle(0% at 50% 50%)",
      },
    },
    fade: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 },
    },
    slide: {
      initial: { opacity: 0, x: 60 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -60 },
    },
    scale: {
      initial: { opacity: 0, scale: 0.94 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 1.04 },
    },
    blur: {
      initial: { opacity: 0, filter: "blur(16px)" },
      animate: { opacity: 1, filter: "blur(0px)" },
      exit: { opacity: 0, filter: "blur(16px)" },
    },
  } as const;

  const v = variants[variant];

  return (
    <motion.div
      // Avoid blank screens if motion init runs but animate is delayed/skipped.
      // We still animate on route changes (AnimatePresence handles exits/enters),
      // but the first paint should never be fully invisible.
      initial={false}
      animate={v.animate}
      exit={v.exit}
      transition={{
        duration: 1.1,
        ease: [0.16, 1, 0.3, 1],
        clipPath: { duration: 1.2, ease: [0.83, 0, 0.17, 1] },
        filter: { duration: 0.9, ease: "easeOut" },
        scale: { duration: 1.1, ease: [0.22, 1, 0.36, 1] },
      }}
      className="min-h-screen pt-28 pb-16 relative will-change-transform"
    >
      {children}
    </motion.div>
  );
}
