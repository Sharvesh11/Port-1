import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Icosahedron, TorusKnot } from "@react-three/drei";
import { useRef } from "react";
import type { Mesh } from "three";

function Knot() {
  const ref = useRef<Mesh>(null);
  useFrame((_, dt) => {
    if (ref.current) {
      ref.current.rotation.x += dt * 0.2;
      ref.current.rotation.y += dt * 0.15;
    }
  });
  return (
    <Float speed={1.2} rotationIntensity={0.6} floatIntensity={1.4}>
      <TorusKnot ref={ref} args={[1, 0.32, 200, 32]} position={[2.2, 0.2, 0]}>
        <MeshDistortMaterial
          color="#67e8f9"
          emissive="#67e8f9"
          emissiveIntensity={0.4}
          roughness={0.2}
          metalness={0.6}
          distort={0.35}
          speed={2}
        />
      </TorusKnot>
    </Float>
  );
}

function Ico() {
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Icosahedron args={[1.2, 1]} position={[-2.3, 0.3, 0]}>
        <MeshDistortMaterial
          color="#c084fc"
          emissive="#a855f7"
          emissiveIntensity={0.5}
          roughness={0.15}
          metalness={0.8}
          distort={0.45}
          speed={1.5}
        />
      </Icosahedron>
    </Float>
  );
}

export default function Hero3DScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 50 }}
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={1.2} color="#c084fc" />
      <pointLight position={[-5, -3, 3]} intensity={1} color="#67e8f9" />
      <Knot />
      <Ico />
    </Canvas>
  );
}
