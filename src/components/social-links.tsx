import { Github, Linkedin } from "lucide-react";
import { motion } from "framer-motion";

const socials = [
  { Icon: Github, href: "https://github.com/Sharvesh11", label: "GitHub", color: "#fff" },
  { Icon: Linkedin, href: "https://www.linkedin.com/in/sharvesh23/", label: "LinkedIn", color: "#0a66c2" },
];

export function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {socials.map(({ Icon, href, label, color }, i) => (
        <motion.a
          key={label}
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 * i, duration: 0.4 }}
          whileHover={{ y: -4, scale: 1.15 }}
          whileTap={{ scale: 0.95 }}
          className="relative size-11 rounded-xl glass flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors group"
          style={{ "--c": color } as React.CSSProperties}
        >
          <span
            className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ boxShadow: `0 0 20px ${color}80, 0 0 40px ${color}40` }}
          />
          <Icon size={18} className="relative" />
        </motion.a>
      ))}
    </div>
  );
}
