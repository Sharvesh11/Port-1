import { r as reactExports, T as jsxRuntimeExports } from "./worker-entry-CxUBeMkh.js";
import { u as useForm, a, M as Mail, b as MapPin, C as Check, S as Send } from "./zod-C9zROrQi.js";
import { P as PageTransition } from "./page-transition-BrVbvEKD.js";
import { G as GradientBlobs } from "./gradient-blobs-RJGyOQaR.js";
import { G as GlowButton } from "./glow-button-Bp-BVY-u.js";
import { m as motion, o as object, s as string } from "./router-5KyY9Blm.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const schema = object({
  name: string().trim().min(2, "Name is too short").max(80),
  email: string().trim().email("Invalid email").max(160),
  message: string().trim().min(10, "Tell me a bit more").max(1e3)
});
function ContactPage() {
  const [sent, setSent] = reactExports.useState(false);
  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting
    },
    reset
  } = useForm({
    resolver: a(schema)
  });
  const onSubmit = async (data) => {
    await new Promise((r) => setTimeout(r, 900));
    console.log("Contact submission:", data);
    setSent(true);
    reset();
    setTimeout(() => setSent(false), 4e3);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PageTransition, { variant: "slide", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(GradientBlobs, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative mx-auto max-w-5xl px-6 grid lg:grid-cols-[1fr_1.2fr] gap-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(motion.p, { initial: {
          opacity: 0
        }, animate: {
          opacity: 1
        }, className: "text-sm uppercase tracking-[0.3em] text-accent", children: "Contact" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.h1, { initial: {
          opacity: 0,
          y: 20
        }, animate: {
          opacity: 1,
          y: 0
        }, transition: {
          delay: 0.1
        }, className: "mt-3 text-4xl sm:text-5xl font-bold tracking-tight", children: [
          "Let's make something ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient-neon", children: "stellar" }),
          "."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(motion.p, { initial: {
          opacity: 0
        }, animate: {
          opacity: 1
        }, transition: {
          delay: 0.2
        }, className: "mt-4 text-muted-foreground", children: "Drop a line — I usually reply within 24 hours." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { size: 18, className: "text-accent" }),
            " sharvesh4646@gmail.com"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 18, className: "text-accent" }),
            " Chennai"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.form, { onSubmit: handleSubmit(onSubmit), initial: {
        opacity: 0,
        y: 30
      }, animate: {
        opacity: 1,
        y: 0
      }, transition: {
        delay: 0.3
      }, className: "glass rounded-3xl p-6 sm:p-8 space-y-5 shadow-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Your name", error: errors.name?.message, children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { ...register("name"), className: "w-full bg-input/60 border border-border rounded-xl px-4 py-3 outline-none focus:border-accent focus:shadow-glow-cyan transition-all", placeholder: "Ada Lovelace" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Email", error: errors.email?.message, children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "email", ...register("email"), className: "w-full bg-input/60 border border-border rounded-xl px-4 py-3 outline-none focus:border-accent focus:shadow-glow-cyan transition-all", placeholder: "you@domain.com" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Message", error: errors.message?.message, children: /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { rows: 5, ...register("message"), className: "w-full bg-input/60 border border-border rounded-xl px-4 py-3 outline-none focus:border-accent focus:shadow-glow-cyan transition-all resize-none", placeholder: "Tell me about your project…" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(GlowButton, { type: "submit", disabled: isSubmitting || sent, className: "w-full", children: sent ? /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.span, { initial: {
          scale: 0
        }, animate: {
          scale: 1
        }, className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 18 }),
          " Message sent!"
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { size: 18 }),
          " ",
          isSubmitting ? "Sending…" : "Send message"
        ] }) })
      ] })
    ] })
  ] });
}
function Field({
  label,
  error,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1.5", children }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx(motion.span, { initial: {
      opacity: 0,
      y: -4
    }, animate: {
      opacity: 1,
      y: 0
    }, className: "text-xs text-destructive mt-1 block", children: error })
  ] });
}
export {
  ContactPage as component
};
