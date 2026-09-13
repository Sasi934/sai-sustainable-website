"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { Tier } from "@/hooks/useDeviceTier";
import { GridFloor, DollyCamera, dprFor, useScrollProgress, PALETTE } from "./shared";
import { deliveryProcess } from "@/data/it";

/**
 * TECHNOLOGY — information architecture, not "network particles".
 *
 * Eight primary nodes sit on the shared grid, one per stage of the delivery
 * process named in the source document (Business Need → … → Improve). Edges draw
 * in that order as the section scrolls, so the scene renders an approved sentence
 * rather than generic connectivity.
 */
const STAGES = deliveryProcess.length;

function buildLayout() {
  const nodes: THREE.Vector3[] = [];
  // Primary spine: the eight process stages, along a shallow arc.
  for (let i = 0; i < STAGES; i++) {
    const t = i / (STAGES - 1);
    nodes.push(
      new THREE.Vector3(
        (t - 0.5) * 13,
        Math.sin(t * Math.PI) * 1.5 - 0.3,
        Math.cos(t * Math.PI * 1.1) * 1.7,
      ),
    );
  }
  // Secondary nodes: the supporting systems each stage touches.
  const support: THREE.Vector3[] = [];
  const edges: [number, number][] = [];
  // Deterministic hash rather than Math.random(): the lattice is identical on
  // every render, so the scene never reshuffles on a hot reload.
  const rand = (n: number) => {
    const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
    return x - Math.floor(x);
  };
  for (let i = 0; i < STAGES; i++) {
    for (let k = 0; k < 2; k++) {
      const base = nodes[i];
      const idx = nodes.length + support.length;
      const h = i * 2 + k;
      support.push(
        new THREE.Vector3(
          base.x + (rand(h) - 0.5) * 2.6,
          base.y + (rand(h + 0.41) - 0.5) * 2.4,
          base.z + (rand(h + 0.83) - 0.5) * 2.6,
        ),
      );
      edges.push([i, idx]);
    }
  }
  const all = [...nodes, ...support];
  // Spine edges come first so they draw in process order.
  const spine: [number, number][] = [];
  for (let i = 0; i < STAGES - 1; i++) spine.push([i, i + 1]);
  return { all, edges: [...spine, ...edges] };
}

function Lattice({ tier }: { tier: Tier }) {
  const progress = useScrollProgress();
  const lineRef = useRef<THREE.LineSegments>(null);
  const nodeRef = useRef<THREE.InstancedMesh>(null);
  const lineMaterial = useRef<THREE.ShaderMaterial>(null);

  const { all, edges } = useMemo(() => buildLayout(), []);

  const lineGeometry = useMemo(() => {
    const pos: number[] = [];
    const order: number[] = [];
    edges.forEach(([a, b], i) => {
      const t = i / edges.length;
      pos.push(all[a].x, all[a].y, all[a].z, all[b].x, all[b].y, all[b].z);
      order.push(t, t);
    });
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute("aOrder", new THREE.Float32BufferAttribute(order, 1));
    return g;
  }, [all, edges]);

  const lineMaterialArgs = useMemo(
    () =>
      ({
        transparent: true,
        depthWrite: false,
        uniforms: {
          uProgress: { value: 0 },
          uColor: { value: PALETTE.moss },
        },
        vertexShader: /* glsl */ `
          attribute float aOrder;
          varying float vOn;
          uniform float uProgress;
          void main() {
            vOn = smoothstep(uProgress - 0.12, uProgress, 1.0 - aOrder) * 0.0
                + smoothstep(aOrder - 0.06, aOrder + 0.02, uProgress);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: /* glsl */ `
          varying float vOn;
          uniform vec3 uColor;
          void main() {
            if (vOn < 0.02) discard;
            gl_FragColor = vec4(uColor, vOn * 0.55);
          }
        `,
      }) satisfies THREE.ShaderMaterialParameters,
    [],
  );

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    const p = progress.current;
    const lineMat = lineMaterial.current;
    if (lineMat) lineMat.uniforms.uProgress.value = p;

    if (nodeRef.current) {
      all.forEach((v, i) => {
        const isSpine = i < STAGES;
        const appear = isSpine ? i / STAGES : 0.25 + (i / all.length) * 0.75;
        const on = THREE.MathUtils.clamp((p - appear) * 6, 0, 1);
        const pulse = isSpine ? 1 + Math.sin(state.clock.elapsedTime * 1.1 + i) * 0.07 : 1;
        dummy.position.copy(v);
        dummy.scale.setScalar(on * pulse * (isSpine ? 1 : 0.45));
        dummy.updateMatrix();
        nodeRef.current!.setMatrixAt(i, dummy.matrix);
      });
      nodeRef.current.instanceMatrix.needsUpdate = true;
      nodeRef.current.rotation.y = p * 0.16;
    }
    if (lineRef.current) lineRef.current.rotation.y = p * 0.16;
  });

  return (
    <group>
      <lineSegments ref={lineRef} geometry={lineGeometry}>
        <shaderMaterial ref={lineMaterial} attach="material" args={[lineMaterialArgs]} />
      </lineSegments>
      <instancedMesh ref={nodeRef} args={[undefined, undefined, all.length]}>
        <icosahedronGeometry args={[0.13, tier === "full" ? 1 : 0]} />
        <meshBasicMaterial color={PALETTE.ivory} transparent opacity={0.85} />
      </instancedMesh>
    </group>
  );
}

export default function LatticeScene({ tier }: { tier: Tier }) {
  return (
    <Canvas
      dpr={dprFor(tier)}
      camera={{ position: [0, 1.1, 14], fov: 40 }}
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
      <DollyCamera amount={0.4} />
      <GridFloor size={38} divisions={22} />
      <Lattice tier={tier} />
    </Canvas>
  );
}
