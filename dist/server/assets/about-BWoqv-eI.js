import { T as jsxRuntimeExports } from "./worker-entry-CxUBeMkh.js";
import { c as createLucideIcon, m as motion, L as Link } from "./router-5KyY9Blm.js";
import { P as PageTransition } from "./page-transition-BrVbvEKD.js";
import { G as GradientBlobs } from "./gradient-blobs-RJGyOQaR.js";
import { G as GlowButton } from "./glow-button-Bp-BVY-u.js";
import { A as ArrowRight, R as Rocket, C as CodeXml } from "./rocket-CzwYaXZy.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const __iconNode$1 = [
  [
    "path",
    {
      d: "m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",
      key: "1yiouv"
    }
  ],
  ["circle", { cx: "12", cy: "8", r: "6", key: "1vp47v" }]
];
const Award = createLucideIcon("award", __iconNode$1);
const __iconNode = [
  ["path", { d: "M10 2v2", key: "7u0qdc" }],
  ["path", { d: "M14 2v2", key: "6buw04" }],
  [
    "path",
    {
      d: "M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1",
      key: "pwadti"
    }
  ],
  ["path", { d: "M6 2v2", key: "colzsn" }]
];
const Coffee = createLucideIcon("coffee", __iconNode);
const stats = [{
  Icon: Rocket,
  value: "50+",
  label: "Projects shipped"
}, {
  Icon: Award,
  value: "12",
  label: "Awards & features"
}, {
  Icon: CodeXml,
  value: "5y",
  label: "Years coding"
}, {
  Icon: Coffee,
  value: "∞",
  label: "Cups of coffee"
}];
function AboutPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PageTransition, { variant: "slide", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(GradientBlobs, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative mx-auto max-w-6xl px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(motion.p, { initial: {
        opacity: 0,
        x: -20
      }, animate: {
        opacity: 1,
        x: 0
      }, className: "text-sm uppercase tracking-[0.3em] text-accent", children: "About me" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.h1, { initial: {
        opacity: 0,
        y: 30
      }, animate: {
        opacity: 1,
        y: 0
      }, transition: {
        delay: 0.1,
        duration: 0.7
      }, className: "mt-3 text-4xl sm:text-6xl font-bold tracking-tight", children: [
        "A developer who ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient-neon", children: "designs" }),
        ",",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        " a designer who ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient", children: "codes" }),
        "."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12 grid lg:grid-cols-[1.4fr_1fr] gap-10 items-start", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
          opacity: 0,
          y: 20
        }, animate: {
          opacity: 1,
          y: 0
        }, transition: {
          delay: 0.25,
          duration: 0.7
        }, className: "space-y-5 text-lg text-muted-foreground leading-relaxed", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            "I'm ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-semibold", children: "Nova" }),
            ", a creative developer based in the cloud, building motion-driven interfaces for ambitious brands and product teams."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            "My toolkit lives at the crossroads of ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: "React" }),
            ",",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: " Three.js" }),
            ", and",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: " WebGL" }),
            " — but my craft is storytelling through interaction. Every pixel breathes, every click has weight."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "When I'm not shipping experiences, you'll find me sketching shaders, mentoring juniors, or chasing perfect typography." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contact", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlowButton, { children: [
            "Let's collaborate ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 18 })
          ] }) }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
          opacity: 0,
          scale: 0.9
        }, animate: {
          opacity: 1,
          scale: 1
        }, transition: {
          delay: 0.4,
          duration: 0.7
        }, className: "grid grid-cols-2 gap-4", children: stats.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
          opacity: 0,
          y: 20
        }, animate: {
          opacity: 1,
          y: 0
        }, transition: {
          delay: 0.5 + i * 0.1
        }, whileHover: {
          y: -6,
          scale: 1.03
        }, className: "glass rounded-2xl p-5 shadow-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(s.Icon, { className: "text-accent mb-3", size: 22 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl font-bold text-gradient", children: s.value }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mt-1", children: s.label })
        ] }, s.label)) })
      ] })
    ] })
  ] });
}
export {
  AboutPage as component
};
