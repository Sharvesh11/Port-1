import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  ArrowRight, Sparkles, Download, Award, Code2, Rocket, Coffee, GraduationCap, Layers, Briefcase,
  ExternalLink, Github,
  FileText, Eye, Send, Check, Mail, MapPin, Calendar, BadgeCheck, ListChecks,
} from "lucide-react";
import { ParticlesBackground } from "@/components/particles-bg";
import { GradientBlobs } from "@/components/gradient-blobs";
import { Hero3D } from "@/components/hero-3d";
import { GlowButton } from "@/components/glow-button";
import { SocialLinks } from "@/components/social-links";
import { ScrollSection, ScrollProgress } from "@/components/scroll-section";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sharvesh - Portfolio" },
      { name: "description", content: "Hi, I'm Nova — a creative developer building immersive 3D & motion experiences on the web." },
      { property: "og:title", content: "Nova — Creative Developer" },
      { property: "og:description", content: "Immersive 3D & motion-rich web experiences." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  // Honor #hash on initial load
  useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
      }, 250);
    }
  }, []);

  return (
    <>
      <ScrollProgress />
      <GradientBlobs />
      <ParticlesBackground />

      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <EducationSection />
      <ExperienceSection />
      <ResumeSection />
      <ContactSection />
    </>
  );
}

/* ─────────── HERO ─────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: 0.15 + i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  }),
} as never;

function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center pt-28 pb-16">
      <Hero3D />
      <div className="relative mx-auto max-w-6xl px-6 w-full">
        <motion.span variants={fadeUp} initial="hidden" animate="show" custom={0}
          className="inline-flex items-center gap-2 self-start rounded-full glass px-4 py-1.5 text-xs font-medium text-muted-foreground">
          <Sparkles size={14} className="text-accent" /> Available for new projects · 2026
        </motion.span>
        <motion.h1 variants={fadeUp} initial="hidden" animate="show" custom={1}
          className="mt-6 text-5xl sm:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight">
          Hi, I'm <span className="text-gradient-neon">Sharvesh</span><br />
          <span className="text-gradient">Computer Science Engineer</span>
        </motion.h1>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={2}
          className="mt-6 max-w-3xl"
        >
          <p className="text-xl sm:text-2xl font-semibold tracking-tight">
            <span className="text-gradient-neon">Aspiring Software Developer</span>{" "}
            <span className="text-muted-foreground">·</span>{" "}
            <span className="text-gradient">Computer Science Engineer</span>
          </p>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
            Driven to create{" "}
            <span className="text-foreground/90 font-medium">efficient</span> and{" "}
            <span className="text-foreground/90 font-medium">scalable</span> web applications using{" "}
            <span className="text-foreground/90 font-medium">HTML5</span>,{" "}
            <span className="text-foreground/90 font-medium">CSS3</span>,{" "}
            <span className="text-foreground/90 font-medium">JavaScript</span>,{" "}
            <span className="text-foreground/90 font-medium">Java</span>,{" "}
            <span className="text-foreground/90 font-medium">SQL</span>, and{" "}
            <span className="text-foreground/90 font-medium">Spring Boot</span>, with a strong focus on{" "}
            <span className="text-foreground/90 font-medium">clean architecture</span> and{" "}
            <span className="text-foreground/90 font-medium">performance</span>.
          </p>
        </motion.div>
        <motion.div variants={fadeUp} initial="hidden" animate="show" custom={3}
          className="mt-10 flex flex-wrap items-center gap-4">
          <a href="#contact" onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}>
            <GlowButton>Hire me <ArrowRight size={18} /></GlowButton>
          </a>
          <a href="#resume" onClick={(e) => { e.preventDefault(); document.getElementById("resume")?.scrollIntoView({ behavior: "smooth" }); }}>
            <GlowButton variant="ghost"><Download size={18} /> Resume</GlowButton>
          </a>
        </motion.div>
        <motion.div variants={fadeUp} initial="hidden" animate="show" custom={4} className="mt-12">
          <SocialLinks />
        </motion.div>
      </div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.3em] text-muted-foreground flex flex-col items-center gap-2">
        Scroll
        <span className="h-10 w-px bg-gradient-to-b from-accent to-transparent" />
      </motion.div>
    </section>
  );
}

/* ─────────── ABOUT ─────────── */
const stats = [
  { Icon: GraduationCap, value: "CS Engineering", label: "Education" },
  { Icon: Rocket, value: "2+ Built", label: "Projects" },
  { Icon: Layers, value: "Full Stack", label: "Focus" },
  { Icon: Briefcase, value: "Fresher", label: "Experience" },
];

function AboutSection() {
  return (
    <ScrollSection id="about" variant="tilt">
      <div className="relative mx-auto max-w-6xl px-6">
        <p className="text-sm uppercase tracking-[0.3em] text-accent">About me</p>
        <h2 className="mt-3 text-4xl sm:text-6xl font-bold tracking-tight">
          Driven by <span className="text-gradient-neon">curiosity</span> and<br />
          powered by <span className="text-gradient">code</span>.
        </h2>
        <div className="mt-12 grid lg:grid-cols-[1.4fr_1fr] gap-10 items-start">
          <div className="space-y-5 text-lg text-muted-foreground leading-relaxed">
            <p>
              I’m a <span className="text-foreground font-semibold">Computer Science Engineering</span> student passionate about building real-world web applications using modern technologies. My journey started with curiosity about how systems work and has grown into a strong interest in full-stack development.
            </p>
            <p>
              Currently, I’m focused on developing projects using <span className="text-foreground">HTML5</span>, <span className="text-foreground">CSS3</span>, <span className="text-foreground">JavaScript</span>, <span className="text-foreground">Java</span>, <span className="text-foreground">SQL</span>, and <span className="text-foreground">Spring Boot</span>. I enjoy creating responsive user interfaces and scalable backend systems while continuously improving my skills and staying updated with industry trends.
            </p>
            <div className="pt-4">
              <a href="#contact" onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}>
                <GlowButton>Let's collaborate <ArrowRight size={18} /></GlowButton>
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {stats.map((s) => (
              <motion.div key={s.label} whileHover={{ y: -6, scale: 1.03 }} className="glass rounded-2xl p-5 shadow-card">
                <s.Icon className="text-accent mb-3" size={22} />
                <div className="text-3xl font-bold text-gradient">{s.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </ScrollSection>
  );
}

/* ─────────── SKILLS ─────────── */
const skillCategories = [
  {
    title: "Programming Languages",
    items: ["Java", "JavaScript"],
  },
  {
    title: "Web & Mobile Development",
    items: ["HTML5", "CSS3", "Spring Boot"],
  },
  {
    title: "Databases & Query Languages",
    items: ["MySQL", "SQL"],
  },
  {
    title: "Development Tools & Platforms",
    items: ["Git", "GitHub", "Visual Studio Code", "Jupyter Notebook"],
  },
  {
    title: "Concepts & Methodologies",
    items: ["Object-Oriented Programming (OOP)", "RESTful APIs", "Software Development Life Cycle (SDLC)"],
  },
  {
    title: "Microsoft Office Suite",
    items: ["MS Office", "Word", "Excel", "PowerPoint", "Outlook", "Teams"],
  },
] as const;

function SkillCategoryCard({
  title,
  items,
  i,
}: {
  title: string;
  items: readonly string[];
  i: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ amount: 0.25 }}
      transition={{ delay: i * 0.06, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="glass rounded-2xl p-6 shadow-card"
    >
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-base sm:text-lg font-semibold tracking-tight">{title}</h3>
        <span className="text-xs font-mono text-accent">{items.length} items</span>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className="text-xs sm:text-sm px-3 py-1 rounded-full bg-primary/10 text-foreground/90 border border-primary/20"
          >
            {item}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

function SkillsSection() {
  return (
    <ScrollSection id="skills" variant="zoom">
      <div className="relative mx-auto max-w-5xl px-6">
        <p className="text-sm uppercase tracking-[0.3em] text-accent">My toolkit</p>
        <h2 className="mt-3 text-4xl sm:text-6xl font-bold tracking-tight">
          Skills & <span className="text-gradient-neon">tools</span>
        </h2>
        <p className="mt-4 text-muted-foreground max-w-2xl">
          A structured overview of the technologies, tools, and concepts I use to build real-world applications.
        </p>
        <div className="mt-12 grid sm:grid-cols-2 gap-4">
          {skillCategories.map((c, i) => (
            <SkillCategoryCard key={c.title} title={c.title} items={c.items} i={i} />
          ))}
        </div>
      </div>
    </ScrollSection>
  );
}

/* ─────────── PROJECTS ─────────── */
const projects = [
  {
    title: "Web-Based Marketplace for Farmers to Connect with Consumers",
    bullets: [
      "Built a secure platform enabling farmers to sell products directly to consumers with Face ID authentication and AES encryption, eliminating middlemen and ensuring fair trade.",
      "Designed an intuitive user interface and streamlined ordering process to enhance usability for both farmers and consumers.",
    ],
    tags: ["HTML", "CSS", "JavaScript", "Spring Boot", "MySQL", "OpenCV (Haar Cascade)", "AES", "Face ID"],
    gradient: "linear-gradient(135deg, #c084fc, #67e8f9)",
    liveUrl: undefined as string | undefined,
    codeUrl: "https://github.com/Sharvesh11",
  },
  {
    title: "Secure Todos Application",
    bullets: [
      "Designed and deployed RESTful APIs with secure token-based authentication, enabling protected CRUD operations for todos.",
      "Integrated frontend (HTML, CSS, JavaScript) with backend services, ensuring seamless communication and secure data handling.",
    ],
    tags: ["Spring Boot", "MySQL", "JWT", "HTML", "CSS", "JavaScript", "REST APIs"],
    gradient: "linear-gradient(135deg, #34d399, #67e8f9)",
    liveUrl: undefined as string | undefined,
    codeUrl: "https://github.com/Sharvesh11",
  },
];

function ProjectCard({ project, i }: { project: (typeof projects)[number]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 20 });
  const sy = useSpring(y, { stiffness: 250, damping: 20 });
  const rx = useTransform(sy, [-50, 50], [10, -10]);
  const ry = useTransform(sx, [-50, 50], [-10, 10]);
  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set(e.clientX - r.left - r.width / 2);
    y.set(e.clientY - r.top - r.height / 2);
  };
  const onLeave = () => { x.set(0); y.set(0); };
  return (
    <motion.div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}
      style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
      initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }} transition={{ delay: i * 0.08, duration: 0.6 }}
      className="group relative glass rounded-3xl overflow-hidden shadow-card cursor-pointer">
      <div className="aspect-[4/3] w-full relative overflow-hidden" style={{ background: project.gradient }}>
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
        <motion.div className="absolute inset-0 flex items-center justify-center text-7xl font-bold text-white/10" style={{ translateZ: 30 }}>
          {project.title.charAt(0)}
        </motion.div>
      </div>
      <div className="p-6 relative" style={{ transform: "translateZ(30px)" }}>
        <h3 className="text-xl font-bold">{project.title}</h3>
        <ul className="mt-3 space-y-2 text-sm text-muted-foreground list-disc pl-5">
          {project.bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-primary/15 text-primary border border-primary/30">{t}</span>
          ))}
        </div>
        <div className="mt-5 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
          {project.liveUrl ? (
            <a
              className="text-accent flex items-center gap-1 text-sm"
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
            >
              <ExternalLink size={14} /> Live
            </a>
          ) : (
            <span className="text-muted-foreground flex items-center gap-1 text-sm cursor-not-allowed select-none">
              <ExternalLink size={14} /> Live (soon)
            </span>
          )}
          <a
            className="text-accent flex items-center gap-1 text-sm"
            href={project.codeUrl}
            target="_blank"
            rel="noreferrer"
          >
            <Github size={14} /> Code
          </a>
        </div>
      </div>
    </motion.div>
  );
}

function ProjectsSection() {
  return (
    <ScrollSection id="projects" variant="rise">
      <div className="relative mx-auto max-w-7xl px-6">
        <p className="text-sm uppercase tracking-[0.3em] text-accent">Selected work</p>
        <h2 className="mt-3 text-4xl sm:text-6xl font-bold tracking-tight">
          Projects in <span className="text-gradient-neon">motion</span>
        </h2>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6" style={{ perspective: 1200 }}>
          {projects.map((p, i) => <ProjectCard key={p.title} project={p} i={i} />)}
        </div>
      </div>
    </ScrollSection>
  );
}

/* ─────────── EDUCATION ─────────── */
function EducationSection() {
  return (
    <ScrollSection id="education" variant="slide">
      <div className="relative mx-auto max-w-5xl px-6">
        <p className="text-sm uppercase tracking-[0.3em] text-accent">Education</p>
        <h2 className="mt-3 text-4xl sm:text-6xl font-bold tracking-tight">
          Bachelor of Engineering (B.E.) - <span className="text-gradient-neon">Computer Science</span>
        </h2>

        <div className="mt-10 grid gap-4">
          <div className="glass rounded-3xl p-6 sm:p-8 shadow-card">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
              <div className="min-w-0">
                <div className="flex items-center gap-3">
                  <div className="size-11 rounded-2xl bg-primary/15 ring-1 ring-primary/25 flex items-center justify-center">
                    <GraduationCap className="text-accent" size={22} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-lg sm:text-xl font-semibold">Vel Tech MultiTech Engineering College</p>
                    <p className="text-sm text-muted-foreground">Chennai</p>
                  </div>
                </div>

                <div className="mt-5 grid sm:grid-cols-3 gap-3 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar size={16} className="text-accent" />
                    <span>Dec 2021 - May 2025</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin size={16} className="text-accent" />
                    <span>Chennai</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <BadgeCheck size={16} className="text-accent" />
                    <span>
                      CGPA: <span className="text-foreground/90 font-medium">7.87 / 10</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 text-muted-foreground leading-relaxed">
              Built a strong foundation in <span className="text-foreground/90 font-medium">Java</span>,{" "}
              <span className="text-foreground/90 font-medium">SQL</span>, and{" "}
              <span className="text-foreground/90 font-medium">Spring Boot</span> through academic coursework and
              self-learning.
            </div>
          </div>
        </div>
      </div>
    </ScrollSection>
  );
}

/* ─────────── EXPERIENCE ─────────── */
function ExperienceSection() {
  return (
    <ScrollSection id="experience" variant="rise">
      <div className="relative mx-auto max-w-5xl px-6">
        <p className="text-sm uppercase tracking-[0.3em] text-accent">Experience & Roles</p>
        <h2 className="mt-3 text-4xl sm:text-6xl font-bold tracking-tight">
          Full Stack Trainee - <span className="text-gradient-neon">Revature</span>
        </h2>

        <div className="mt-10 glass rounded-3xl p-6 sm:p-8 shadow-card">
          <div className="flex items-start gap-4">
            <div className="size-11 rounded-2xl bg-primary/15 ring-1 ring-primary/25 flex items-center justify-center shrink-0">
              <Briefcase className="text-accent" size={22} />
            </div>
            <div className="min-w-0">
              <p className="text-lg sm:text-xl font-semibold">Revature</p>
              <p className="text-sm text-muted-foreground mt-1">
                Completed an intensive training program focused on Java full-stack development.
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-3">
            <div className="flex items-start gap-3 text-muted-foreground">
              <Code2 size={18} className="text-accent mt-0.5" />
              <p>Solved coding labs to strengthen problem-solving skills</p>
            </div>
            <div className="flex items-start gap-3 text-muted-foreground">
              <ListChecks size={18} className="text-accent mt-0.5" />
              <p>Worked on Java, SQL, and backend concepts</p>
            </div>
            <div className="flex items-start gap-3 text-muted-foreground">
              <BadgeCheck size={18} className="text-accent mt-0.5" />
              <p>Cleared 4 internal technical evaluation rounds during the program</p>
            </div>
            <div className="flex items-start gap-3 text-muted-foreground">
              <BadgeCheck size={18} className="text-accent mt-0.5" />
              <p>Successfully completed the training and received certification</p>
            </div>
          </div>
        </div>
      </div>
    </ScrollSection>
  );
}

/* ─────────── RESUME ─────────── */
function ResumeSection() {
  return (
    <ScrollSection id="resume" variant="tilt">
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-accent">Curriculum</p>
        <h2 className="mt-3 text-4xl sm:text-6xl font-bold tracking-tight">
          Grab my <span className="text-gradient-neon">resume</span>
        </h2>
        <motion.div whileHover={{ rotateX: 6, rotateY: -6, scale: 1.02 }}
          style={{ transformStyle: "preserve-3d", perspective: 1000 }}
          className="mt-14 mx-auto max-w-md aspect-[3/4] glass rounded-3xl p-8 shadow-card relative overflow-hidden group">
          <div className="absolute inset-0 opacity-20 bg-neon" />
          <div className="absolute inset-0 animate-shimmer" />
          <div className="relative h-full flex flex-col items-center justify-center gap-6">
            <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity }}
              className="size-24 rounded-2xl bg-neon shadow-glow flex items-center justify-center">
              <FileText size={42} className="text-primary-foreground" />
            </motion.div>
            <div>
              <p className="font-bold text-xl">Sharvesh_Resume_jan_2026.pdf</p>
              <p className="text-sm text-muted-foreground mt-1">~ 507 KB · 1 page</p>
            </div>
          </div>
        </motion.div>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a href="/Sharvesh_Resume_jan_2026.pdf" download><GlowButton><Download size={18} /> Download PDF</GlowButton></a>
          <a href="/Sharvesh_Resume_jan_2026.pdf" target="_blank" rel="noreferrer"><GlowButton variant="ghost"><Eye size={18} /> Preview</GlowButton></a>
        </div>
      </div>
    </ScrollSection>
  );
}

/* ─────────── CONTACT ─────────── */
const schema = z.object({
  name: z.string().trim().min(2, "Name is too short").max(80),
  email: z.string().trim().email("Invalid email").max(160),
  message: z.string().trim().min(10, "Tell me a bit more").max(1000),
});
type FormData = z.infer<typeof schema>;

function ContactSection() {
  const [sent, setSent] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormData>({
    resolver: zodResolver(schema as never) as never,
  });
  const onSubmit = async (data: FormData) => {
    await new Promise((r) => setTimeout(r, 900));
    console.log("Contact submission:", data);
    setSent(true);
    reset();
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <ScrollSection id="contact" variant="blur">
      <div className="relative mx-auto max-w-5xl px-6 grid lg:grid-cols-[1fr_1.2fr] gap-10 w-full">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-accent">Contact</p>
          <h2 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight">
            Let's make something <span className="text-gradient-neon">stellar</span>.
          </h2>
          <p className="mt-4 text-muted-foreground">Drop a line — I usually reply within 24 hours.</p>
          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-3 text-muted-foreground"><Mail size={18} className="text-accent" /> sharvesh4646@gmail.com</div>
            <div className="flex items-center gap-3 text-muted-foreground"><MapPin size={18} className="text-accent" /> Chennai</div>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="glass rounded-3xl p-6 sm:p-8 space-y-5 shadow-card">
          <Field label="Your name" error={errors.name?.message}>
            <input {...register("name")} className="w-full bg-input/60 border border-border rounded-xl px-4 py-3 outline-none focus:border-accent focus:shadow-glow-cyan transition-all" placeholder="Ada Lovelace" />
          </Field>
          <Field label="Email" error={errors.email?.message}>
            <input type="email" {...register("email")} className="w-full bg-input/60 border border-border rounded-xl px-4 py-3 outline-none focus:border-accent focus:shadow-glow-cyan transition-all" placeholder="you@domain.com" />
          </Field>
          <Field label="Message" error={errors.message?.message}>
            <textarea rows={5} {...register("message")} className="w-full bg-input/60 border border-border rounded-xl px-4 py-3 outline-none focus:border-accent focus:shadow-glow-cyan transition-all resize-none" placeholder="Tell me about your project…" />
          </Field>
          <GlowButton type="submit" disabled={isSubmitting || sent} className="w-full">
            {sent ? (
              <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-2">
                <Check size={18} /> Message sent!
              </motion.span>
            ) : (
              <><Send size={18} /> {isSubmitting ? "Sending…" : "Send message"}</>
            )}
          </GlowButton>
        </form>
      </div>
    </ScrollSection>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-muted-foreground">{label}</span>
      <div className="mt-1.5">{children}</div>
      {error && (
        <motion.span initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="text-xs text-destructive mt-1 block">
          {error}
        </motion.span>
      )}
    </label>
  );
}

// Provide Link import a use to avoid TS unused warning if any future link is added
void Link;
