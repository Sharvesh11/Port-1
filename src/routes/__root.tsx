import { Outlet, createRootRoute, HeadContent, Scripts, useLocation } from "@tanstack/react-router";
import { AnimatePresence } from "framer-motion";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-cosmic px-4">
      <div className="max-w-md text-center glass rounded-2xl p-10">
        <h1 className="text-7xl font-bold text-gradient">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Lost in the void</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for drifted into another dimension.
        </p>
        <a
          href="/"
          className="mt-6 inline-block rounded-full bg-neon px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow"
        >
          Beam me home
        </a>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Sharvesh - Portfolio" },
      { name: "description", content: "An immersive portfolio of a creative developer crafting motion-rich digital experiences." },
      { name: "author", content: "Nova" },
      { property: "og:title", content: "Sharvesh - Portfolio" },
      { property: "og:description", content: "Motion-rich, 3D-driven portfolio." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#1a0b2e" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body className="bg-cosmic noise relative">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const location = useLocation();
  return (
    <>
      <Header />
      <AnimatePresence mode="wait" initial={false}>
        <div key={location.pathname}>
          <Outlet />
        </div>
      </AnimatePresence>
      <Footer />
    </>
  );
}
