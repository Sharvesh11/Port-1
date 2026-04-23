import { SocialLinks } from "./social-links";

export function Footer() {
  return (
    <footer className="relative border-t border-border/50 mt-24">
      <div className="mx-auto max-w-7xl px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} sharvesh.dev — Crafted with motion & light.
        </p>
        <SocialLinks />
      </div>
    </footer>
  );
}
