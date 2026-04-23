import { T as jsxRuntimeExports } from "./worker-entry-CxUBeMkh.js";
import { P as PageTransition } from "./page-transition-BrVbvEKD.js";
import { G as GradientBlobs } from "./gradient-blobs-RJGyOQaR.js";
import { G as GlowButton } from "./glow-button-Bp-BVY-u.js";
import { m as motion } from "./router-5KyY9Blm.js";
import { F as FileText, D as Download, E as Eye } from "./file-text-Bl9j9cv3.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
function ResumePage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PageTransition, { variant: "scale", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(GradientBlobs, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative mx-auto max-w-4xl px-6 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(motion.p, { initial: {
        opacity: 0
      }, animate: {
        opacity: 1
      }, className: "text-sm uppercase tracking-[0.3em] text-accent", children: "Curriculum" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.h1, { initial: {
        opacity: 0,
        y: 20
      }, animate: {
        opacity: 1,
        y: 0
      }, transition: {
        delay: 0.1
      }, className: "mt-3 text-4xl sm:text-6xl font-bold tracking-tight", children: [
        "Grab my ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient-neon", children: "resume" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
        opacity: 0,
        y: 40,
        rotateX: -30
      }, animate: {
        opacity: 1,
        y: 0,
        rotateX: 0
      }, transition: {
        delay: 0.3,
        duration: 0.8
      }, whileHover: {
        rotateX: 6,
        rotateY: -6,
        scale: 1.02
      }, style: {
        transformStyle: "preserve-3d",
        perspective: 1e3
      }, className: "mt-14 mx-auto max-w-md aspect-[3/4] glass rounded-3xl p-8 shadow-card relative overflow-hidden group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 opacity-20 bg-neon" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 animate-shimmer" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-full flex flex-col items-center justify-center gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { animate: {
            y: [0, -8, 0]
          }, transition: {
            duration: 3,
            repeat: Infinity
          }, className: "size-24 rounded-2xl bg-neon shadow-glow flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { size: 42, className: "text-primary-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-xl", children: "Sharvesh_Resume_jan_2026.pdf" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "~ 507 KB · 1 page" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
        opacity: 0,
        y: 20
      }, animate: {
        opacity: 1,
        y: 0
      }, transition: {
        delay: 0.6
      }, className: "mt-10 flex flex-wrap items-center justify-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/Sharvesh_Resume_jan_2026.pdf", download: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlowButton, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { size: 18 }),
          " Download PDF"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/Sharvesh_Resume_jan_2026.pdf", target: "_blank", rel: "noreferrer", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlowButton, { variant: "ghost", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { size: 18 }),
          " Preview"
        ] }) })
      ] })
    ] })
  ] });
}
export {
  ResumePage as component
};
