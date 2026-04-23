import { Suspense, lazy } from "react";

const Scene = lazy(() => import("./hero-3d-scene"));

export function Hero3D() {
  return (
    <div className="absolute inset-0 -z-10">
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </div>
  );
}
