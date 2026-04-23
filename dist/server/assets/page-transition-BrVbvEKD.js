import { T as jsxRuntimeExports } from "./worker-entry-CxUBeMkh.js";
import { m as motion } from "./router-5KyY9Blm.js";
function PageTransition({
  children,
  variant = "cinematic"
}) {
  const variants = {
    cinematic: {
      initial: {
        opacity: 0,
        scale: 1.15,
        filter: "blur(24px) brightness(1.4)",
        clipPath: "circle(0% at 50% 50%)"
      },
      animate: {
        opacity: 1,
        scale: 1,
        filter: "blur(0px) brightness(1)",
        clipPath: "circle(150% at 50% 50%)"
      },
      exit: {
        opacity: 0,
        scale: 0.92,
        filter: "blur(20px) brightness(0.6)",
        clipPath: "circle(0% at 50% 50%)"
      }
    },
    fade: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 }
    },
    slide: {
      initial: { opacity: 0, x: 60 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -60 }
    },
    scale: {
      initial: { opacity: 0, scale: 0.94 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 1.04 }
    },
    blur: {
      initial: { opacity: 0, filter: "blur(16px)" },
      animate: { opacity: 1, filter: "blur(0px)" },
      exit: { opacity: 0, filter: "blur(16px)" }
    }
  };
  const v = variants[variant];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: false,
      animate: v.animate,
      exit: v.exit,
      transition: {
        duration: 1.1,
        ease: [0.16, 1, 0.3, 1],
        clipPath: { duration: 1.2, ease: [0.83, 0, 0.17, 1] },
        filter: { duration: 0.9, ease: "easeOut" },
        scale: { duration: 1.1, ease: [0.22, 1, 0.36, 1] }
      },
      className: "min-h-screen pt-28 pb-16 relative will-change-transform",
      children
    }
  );
}
export {
  PageTransition as P
};
