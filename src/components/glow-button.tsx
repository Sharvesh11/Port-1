import { motion, type HTMLMotionProps } from "framer-motion";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface GlowButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "ghost";
}

export const GlowButton = forwardRef<HTMLButtonElement, GlowButtonProps>(
  ({ className, variant = "primary", children, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.04, filter: "blur(0px)" }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 18 }}
        className={cn(
          "relative inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-semibold tracking-tight overflow-hidden group",
          variant === "primary" &&
            "bg-neon text-primary-foreground animate-pulse-glow",
          variant === "ghost" &&
            "glass text-foreground hover:bg-primary/10",
          className,
        )}
        {...props}
      >
        <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer" />
        <span className="relative flex items-center gap-2">{children as React.ReactNode}</span>
      </motion.button>
    );
  },
);
GlowButton.displayName = "GlowButton";
