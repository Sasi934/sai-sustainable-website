"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { Tier } from "@/hooks/useDeviceTier";
import { GridFloor, DollyCamera, dprFor, useScrollProgress, PALETTE } from "./shared";

/**
 * CONSTRUCTION — structure, sequence, precision.
 *
 * Massing volumes rise from the shared grid in build order and resolve from
 * wireframe to shaded. Geometry is generated in code, so the scene adds no
 * network payload beyond the library itself.
 */
type Block = {
  position: [number, number, number];
  scale: [number, number, number];
  order: number;
};

function buildMassing(count: number): Block[] {
  const blocks: Block[] = [];
  const cols = 6;
  const rows = Math.ceil(count / cols);
  let i = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols && i < count; c++, i++) {
      // Deterministic pseudo-random so the massing is stable between renders.
      const n = Math.sin(i * 12.9898) * 43758.5453;
      const rand = n - Math.floor(n);
      const h = 0.9 + rand * 3.6;
      blocks.push({
        position: [(c - (cols - 1) / 2) * 2.05, -3.2 + h / 2, (r - (rows - 1) / 2) * 2.05],
        scale: [1.5, h, 1.5],
        // Build order: front-to-back, left-to-right — how a site actually proceeds.
        order: (r * cols + c) / count,
      });
    }
  }
  return blocks;
}

function Massing({ tier }: { tier: Tier }) {
  const count = tier === "full" ? 60 : 24;
  const blocks = useMemo(() => buildMassing(count), [count]);
  const solid = useRef<THREE.InstancedMesh>(null);
  const frame = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const progress = useScrollProgress();

  useFrame(() => {
    const p = progress.current;
    blocks.forEach((b, i) => {
      // Each block rises, then fills. Wireframe leads, solid follows.
      const local = THREE.MathUtils.clamp((p - b.order * 0.55) * 2.6, 0, 1);
      const rise = THREE.MathUtils.smoothstep(local, 0, 1);
      const fill = THREE.MathUtils.clamp((local - 0.45) / 0.55, 0, 1);

      dummy.position.set(b.position[0], -3.2 + (b.scale[1] * rise) / 2, b.position[2]);
      dummy.scale.set(b.scale[0], Math.max(b.scale[1] * rise, 0.0001), b.scale[2]);
      dummy.updateMatrix();
      frame.current?.setMatrixAt(i, dummy.matrix);

      dummy.scale.set(
        b.scale[0] * fill,
        Math.max(b.scale[1] * rise * fill, 0.0001),
        b.scale[2] * fill,
      );
      dummy.updateMatrix();
      solid.current?.setMatrixAt(i, dummy.matrix);
    });
    if (frame.current) frame.current.instanceMatrix.needsUpdate = true;
    if (solid.current) solid.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <group rotation={[0, -0.42, 0]}>
      <instancedMesh ref={frame} args={[undefined, undefined, count]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color={PALETTE.champagne} wireframe transparent opacity={0.28} />
      </instancedMesh>
      <instancedMesh ref={solid} args={[undefined, undefined, count]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshLambertMaterial color={PALETTE.forest} transparent opacity={0.92} />
      </instancedMesh>
    </group>
  );
}

export default function MassingScene({ tier }: { tier: Tier }) {
  return (
    <Canvas
      dpr={dprFor(tier)}
      camera={{ position: [0, 2.4, 16], fov: 38 }}
      gl={{ antialias: tier === "full", powerPreference: "high-performance", alpha: true }}
      /*
        debounce: 0 — these scenes mount lazily, by which point the container is
        already at its final size. With the default debounce, react-use-measure's
        first observation can be swallowed and the canvas stays at its 300x150
        default until some later resize nudges it.
      */
      resize={{ debounce: 0, scroll: false }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={1.5} />
      <directionalLight position={[6, 12, 8]} intensity={2.1} />
      <DollyCamera amount={0.45} />
      <GridFloor size={40} divisions={20} />
      <Massing tier={tier} />
    </Canvas>
  );
}
