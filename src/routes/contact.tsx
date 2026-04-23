import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, Check, Mail, MapPin } from "lucide-react";
import { PageTransition } from "@/components/page-transition";
import { GradientBlobs } from "@/components/gradient-blobs";
import { GlowButton } from "@/components/glow-button";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Nova" },
      { name: "description", content: "Let's build something together. Get in touch via the contact form." },
      { property: "og:title", content: "Contact — Nova" },
      { property: "og:description", content: "Get in touch with Nova." },
    ],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(2, "Name is too short").max(80),
  email: z.string().trim().email("Invalid email").max(160),
  message: z.string().trim().min(10, "Tell me a bit more").max(1000),
});
type FormData = z.infer<typeof schema>;

function ContactPage() {
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
    <PageTransition variant="slide">
      <GradientBlobs />
      <section className="relative mx-auto max-w-5xl px-6 grid lg:grid-cols-[1fr_1.2fr] gap-10">
        <div>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm uppercase tracking-[0.3em] text-accent">
            Contact
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight"
          >
            Let's make something <span className="text-gradient-neon">stellar</span>.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-muted-foreground"
          >
            Drop a line — I usually reply within 24 hours.
          </motion.p>

          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-3 text-muted-foreground"><Mail size={18} className="text-accent" /> sharvesh4646@gmail.com</div>
            <div className="flex items-center gap-3 text-muted-foreground"><MapPin size={18} className="text-accent" /> Chennai</div>
          </div>
        </div>

        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass rounded-3xl p-6 sm:p-8 space-y-5 shadow-card"
        >
          <Field label="Your name" error={errors.name?.message}>
            <input
              {...register("name")}
              className="w-full bg-input/60 border border-border rounded-xl px-4 py-3 outline-none focus:border-accent focus:shadow-glow-cyan transition-all"
              placeholder="Ada Lovelace"
            />
          </Field>
          <Field label="Email" error={errors.email?.message}>
            <input
              type="email"
              {...register("email")}
              className="w-full bg-input/60 border border-border rounded-xl px-4 py-3 outline-none focus:border-accent focus:shadow-glow-cyan transition-all"
              placeholder="you@domain.com"
            />
          </Field>
          <Field label="Message" error={errors.message?.message}>
            <textarea
              rows={5}
              {...register("message")}
              className="w-full bg-input/60 border border-border rounded-xl px-4 py-3 outline-none focus:border-accent focus:shadow-glow-cyan transition-all resize-none"
              placeholder="Tell me about your project…"
            />
          </Field>

          <GlowButton type="submit" disabled={isSubmitting || sent} className="w-full">
            {sent ? (
              <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-2">
                <Check size={18} /> Message sent!
              </motion.span>
            ) : (
              <>
                <Send size={18} /> {isSubmitting ? "Sending…" : "Send message"}
              </>
            )}
          </GlowButton>
        </motion.form>
      </section>
    </PageTransition>
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
