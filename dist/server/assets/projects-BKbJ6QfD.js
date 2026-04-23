import { T as jsxRuntimeExports, r as reactExports } from "./worker-entry-CxUBeMkh.js";
import { P as PageTransition } from "./page-transition-BrVbvEKD.js";
import { G as GradientBlobs } from "./gradient-blobs-RJGyOQaR.js";
import { m as motion, G as Github } from "./router-5KyY9Blm.js";
import { u as useMotionValue, a as useSpring, b as useTransform, E as ExternalLink } from "./external-link-C7pFRlEm.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const projects = [{
  title: "Web-Based Marketplace for Farmers to Connect with Consumers",
  bullets: ["Built a secure platform enabling farmers to sell products directly to consumers with Face ID authentication and AES encryption, eliminating middlemen and ensuring fair trade.", "Designed an intuitive user interface and streamlined ordering process to enhance usability for both farmers and consumers."],
  tags: ["HTML", "CSS", "JavaScript", "Spring Boot", "MySQL", "OpenCV (Haar Cascade)", "AES", "Face ID"],
  gradient: "linear-gradient(135deg, #c084fc, #67e8f9)",
  liveUrl: void 0,
  codeUrl: "https://github.com/Sharvesh11"
}, {
  title: "Secure Todos Application",
  bullets: ["Designed and deployed RESTful APIs with secure token-based authentication, enabling protected CRUD operations for todos.", "Integrated frontend (HTML, CSS, JavaScript) with backend services, ensuring seamless communication and secure data handling."],
  tags: ["Spring Boot", "MySQL", "JWT", "HTML", "CSS", "JavaScript", "REST APIs"],
  gradient: "linear-gradient(135deg, #34d399, #67e8f9)",
  liveUrl: void 0,
  codeUrl: "https://github.com/Sharvesh11"
}];
function ProjectCard({
  project,
  i
}) {
  const ref = reactExports.useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, {
    stiffness: 250,
    damping: 20
  });
  const sy = useSpring(y, {
    stiffness: 250,
    damping: 20
  });
  const rx = useTransform(sy, [-50, 50], [10, -10]);
  const ry = useTransform(sx, [-50, 50], [-10, 10]);
  const onMove = (e) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set(e.clientX - r.left - r.width / 2);
    y.set(e.clientY - r.top - r.height / 2);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { ref, onMouseMove: onMove, onMouseLeave: onLeave, style: {
    rotateX: rx,
    rotateY: ry,
    transformStyle: "preserve-3d"
  }, initial: {
    opacity: 0,
    y: 40
  }, whileInView: {
    opacity: 1,
    y: 0
  }, viewport: {
    once: true,
    margin: "-80px"
  }, transition: {
    delay: i * 0.08,
    duration: 0.6
  }, className: "group relative glass rounded-3xl overflow-hidden shadow-card cursor-pointer", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "aspect-[4/3] w-full relative overflow-hidden", style: {
      background: project.gradient
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { className: "absolute inset-0 flex items-center justify-center text-7xl font-bold text-white/10", style: {
        translateZ: 30
      }, children: project.title.charAt(0) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 relative", style: {
      transform: "translateZ(30px)"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold", children: project.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-3 space-y-2 text-sm text-muted-foreground list-disc pl-5", children: project.bullets.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: b }, b)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 flex flex-wrap gap-2", children: project.tags.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs px-2.5 py-1 rounded-full bg-primary/15 text-primary border border-primary/30", children: t }, t)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity", children: [
        project.liveUrl ? /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { className: "text-accent flex items-center gap-1 text-sm", href: project.liveUrl, target: "_blank", rel: "noreferrer", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { size: 14 }),
          " Live"
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground flex items-center gap-1 text-sm cursor-not-allowed select-none", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { size: 14 }),
          " Live (soon)"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { className: "text-accent flex items-center gap-1 text-sm", href: project.codeUrl, target: "_blank", rel: "noreferrer", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Github, { size: 14 }),
          " Code"
        ] })
      ] })
    ] })
  ] });
}
function ProjectsPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PageTransition, { variant: "fade", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(GradientBlobs, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative mx-auto max-w-7xl px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(motion.p, { initial: {
        opacity: 0
      }, animate: {
        opacity: 1
      }, className: "text-sm uppercase tracking-[0.3em] text-accent", children: "Selected work" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.h1, { initial: {
        opacity: 0,
        y: 20
      }, animate: {
        opacity: 1,
        y: 0
      }, transition: {
        delay: 0.1
      }, className: "mt-3 text-4xl sm:text-6xl font-bold tracking-tight", children: [
        "Projects in ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient-neon", children: "motion" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6", style: {
        perspective: 1200
      }, children: projects.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(ProjectCard, { project: p, i }, p.title)) })
    ] })
  ] });
}
export {
  ProjectsPage as component
};
