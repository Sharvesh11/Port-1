import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { kind: "section", id: "home", label: "Home" },
  { kind: "section", id: "about", label: "About" },
  { kind: "section", id: "skills", label: "Skills" },
  { kind: "section", id: "projects", label: "Projects" },
  { kind: "section", id: "education", label: "Education" },
  { kind: "section", id: "experience", label: "Experience" },
  { kind: "section", id: "resume", label: "Resume" },
  { kind: "section", id: "contact", label: "Contact" },
] as const;

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("home");

  useEffect(() => {
    const ids = navItems.filter((l) => l.kind === "section").map((l) => l.id);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleNav = (id: string) => {
    setOpen(false);
    if (typeof window !== "undefined" && window.location.pathname !== "/") {
      // Navigate to home then scroll
      window.location.href = `/#${id}`;
      return;
    }
    scrollToId(id);
    history.replaceState(null, "", `#${id}`);
  };

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 inset-x-0 z-50"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-4">
        <div className="glass rounded-2xl px-4 sm:px-6 py-3 flex items-center justify-between">
          <Link to="/" onClick={() => handleNav("home")} className="flex items-center gap-2 group">
            <div className="size-8 rounded-lg bg-neon shadow-glow group-hover:scale-110 transition-transform" />
            <span className="font-bold text-lg tracking-tight text-gradient">Sharvesh.dev</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((l) => {
              const isActive = l.kind === "section" && active === l.id;

              if (l.kind === "route") {
                return (
                  <Link
                    key={l.to}
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className="relative px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <span className="relative">{l.label}</span>
                  </Link>
                );
              }

              return (
                <button
                  key={l.id}
                  onClick={() => handleNav(l.id)}
                  className="relative px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-primary/15 ring-1 ring-primary/40"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative">{l.label}</span>
                </button>
              );
            })}
          </nav>

          <button
            className="lg:hidden p-2 rounded-lg hover:bg-white/5"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.nav
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="lg:hidden mt-2 glass rounded-2xl p-3 grid grid-cols-2 gap-2"
            >
              {navItems.map((l) => {
                if (l.kind === "route") {
                  return (
                    <Link
                      key={l.to}
                      to={l.to}
                      onClick={() => setOpen(false)}
                      className="px-3 py-2 rounded-lg text-sm hover:bg-primary/10 hover:text-foreground text-muted-foreground text-left"
                    >
                      {l.label}
                    </Link>
                  );
                }

                return (
                  <button
                    key={l.id}
                    onClick={() => handleNav(l.id)}
                    className="px-3 py-2 rounded-lg text-sm hover:bg-primary/10 hover:text-foreground text-muted-foreground text-left"
                  >
                    {l.label}
                  </button>
                );
              })}
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
