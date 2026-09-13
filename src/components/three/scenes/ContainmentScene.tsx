"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { Tier } from "@/hooks/useDeviceTier";
import { GridFloor, DollyCamera, dprFor, useScrollProgress, PALETTE } from "./shared";

/**
 * ENVIRONMENTAL — containment and clearance.
 *
 * Particulate is suspended inside an invisible containment volume. As the section
 * scrolls, the field is drawn out from the top down and the volume clears. That is
 * literally the abatement sequence: contain, extract, verify clear. The 3D renders
 * the service rather than decorating it.
 *
 * One Points mesh, one draw call, no post-processing.
 */
function Particulate({ tier }: { tier: Tier }) {
  const count = tier === "full" ? 40000 : 8000;
  const points = useRef<THREE.Points>(null);
  const material = useRef<THREE.ShaderMaterial>(null);
  const progress = useScrollProgress();

  const geometry = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const seed = new Float32Array(count);
    // Deterministic hash rather than Math.random(): render stays pure, and the
    // field is identical across re-renders and hot reloads.
    const rand = (n: number) => {
      const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
      return x - Math.floor(x);
    };
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (rand(i) - 0.5) * 9;
      pos[i * 3 + 1] = (rand(i + 0.37) - 0.5) * 6.4;
      pos[i * 3 + 2] = (rand(i + 0.73) - 0.5) * 9;
      seed[i] = rand(i + 0.11);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("aSeed", new THREE.BufferAttribute(seed, 1));
    return g;
  }, [count]);

  const materialArgs = useMemo(
    () =>
      ({
        transparent: true,
        depthWrite: false,
        uniforms: {
          uTime: { value: 0 },
          uClear: { value: 0 },
          uColorA: { value: PALETTE.moss },
          uColorB: { value: PALETTE.ivory },
          uSize: { value: 1.7 },
        },
        vertexShader: /* glsl */ `
          attribute float aSeed;
          uniform float uTime;
          uniform float uClear;
          uniform float uSize;
          varying float vFade;

          void main() {
            vec3 p = position;

            // Slow convective drift — extraction airflow, not random noise.
            p.x += sin(uTime * 0.22 + aSeed * 6.2831) * 0.22;
            p.z += cos(uTime * 0.19 + aSeed * 6.2831) * 0.22;
            p.y += sin(uTime * 0.13 + aSeed * 3.14) * 0.14;

            // Clearance front sweeps top-down. Particles above it are extracted.
            float top = 3.2;
            float front = mix(top + 0.6, -3.4, uClear);
            float above = smoothstep(front - 0.9, front + 0.9, p.y);
            vFade = 1.0 - above;

            // Extracted particles accelerate upward as they leave.
            p.y += above * 3.2;

            vec4 mv = modelViewMatrix * vec4(p, 1.0);
            gl_Position = projectionMatrix * mv;
            gl_PointSize = uSize * (34.0 / -mv.z) * (0.55 + aSeed * 0.75);
          }
        `,
        fragmentShader: /* glsl */ `
          uniform vec3 uColorA;
          uniform vec3 uColorB;
          varying float vFade;

          void main() {
            vec2 c = gl_PointCoord - 0.5;
            float d = dot(c, c);
            if (d > 0.25) discard;
            float alpha = smoothstep(0.25, 0.0, d) * vFade * 0.30;
            if (alpha < 0.01) discard;
            gl_FragColor = vec4(mix(uColorA, uColorB, vFade * 0.5), alpha);
          }
        `,
      }) satisfies THREE.ShaderMaterialParameters,
    [],
  );

  useFrame((state) => {
    const mat = material.current;
    if (mat) {
      mat.uniforms.uTime.value = state.clock.elapsedTime;
      mat.uniforms.uClear.value = progress.current;
    }
    if (points.current) points.current.rotation.y = progress.current * 0.22;
  });

  return (
    <points ref={points} geometry={geometry}>
      <shaderMaterial ref={material} attach="material" args={[materialArgs]} />
    </points>
  );
}

/** The containment boundary itself — implied by edges only, never a solid box. */
function ContainmentEdges() {
  const geometry = useMemo(
    () => new THREE.EdgesGeometry(new THREE.BoxGeometry(9.4, 6.8, 9.4)),
    [],
  );
  const material = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: PALETTE.champagne,
        transparent: true,
        opacity: 0.14,
        depthWrite: false,
      }),
    [],
  );
  return <lineSegments geometry={geometry} material={material} />;
}

export default function ContainmentScene({ tier }: { tier: Tier }) {
  return (
    <Canvas
      dpr={dprFor(tier)}
      camera={{ position: [0, 1.1, 13], fov: 42 }}
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
      <DollyCamera />
      <GridFloor />
      <ContainmentEdges />
      <Particulate tier={tier} />
    </Canvas>
  );
}
