import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

// Lightweight tsparticles wrapper with mobile-aware density.
export function ParticlesBackground() {
  const isMobile = useIsMobile();
  const [Comp, setComp] = useState<React.ComponentType<any> | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const [{ default: Particles, initParticlesEngine }, { loadSlim }] = await Promise.all([
        import("@tsparticles/react"),
        import("@tsparticles/slim"),
      ]);
      await initParticlesEngine(async (engine) => {
        await loadSlim(engine);
      });
      if (cancelled) return;
      setComp(() => Particles);
      setReady(true);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (!ready || !Comp) return null;

  return (
    <Comp
      id="tsparticles"
      className="absolute inset-0 -z-10"
      options={{
        fullScreen: { enable: false },
        background: { color: { value: "transparent" } },
        fpsLimit: 60,
        interactivity: {
          events: {
            onHover: { enable: !isMobile, mode: "grab" },
            onClick: { enable: true, mode: "push" },
          },
          modes: {
            grab: { distance: 160, links: { opacity: 0.5 } },
            push: { quantity: 3 },
          },
        },
        particles: {
          color: { value: ["#c084fc", "#67e8f9", "#a78bfa"] },
          links: {
            color: "#a78bfa",
            distance: 140,
            enable: true,
            opacity: 0.25,
            width: 1,
          },
          move: {
            enable: true,
            speed: 1,
            outModes: { default: "out" },
          },
          number: {
            value: isMobile ? 35 : 80,
            density: { enable: true },
          },
          opacity: { value: 0.6 },
          shape: { type: "circle" },
          size: { value: { min: 1, max: 3 } },
        },
        detectRetina: true,
      }}
    />
  );
}
