"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import type { Tier } from "@/hooks/useDeviceTier";

/** One palette across all three scenes. Sampled from the SAI logo. */
export const PALETTE = {
  forest: new THREE.Color("#0E6939"),
  moss: new THREE.Color("#2C8748"),
  ivory: new THREE.Color("#EFEDE5"),
  champagne: new THREE.Color("#C2AA7F"),
};

export const dprFor = (tier: Tier): [number, number] =>
  tier === "full" ? [1, 1.75] : [1, 1];

/**
 * Progress of the canvas through the viewport, 0 → 1, smoothed.
 * Scenes are scroll-driven rather than idling, which is what lets the render
 * loop stay on demand.
 */
export function useScrollProgress() {
  const { gl } = useThree();
  const raw = useRef(0);
  const smooth = useRef(0);

  useFrame((_, delta) => {
    const el = gl.domElement.parentElement;
    if (el) {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      raw.current = THREE.MathUtils.clamp((vh - r.top) / (vh + r.height), 0, 1);
    }
    // Critically damped follow — no spring overshoot, no jitter.
    smooth.current = THREE.MathUtils.damp(smooth.current, raw.current, 4, delta);
  });

  return smooth;
}

/**
 * The survey grid. Shared ground plane for all three scenes — the single element
 * that makes them read as one company rather than three unrelated demos.
 */
export function GridFloor({ size = 46, divisions = 26 }: { size?: number; divisions?: number }) {
  const geometry = useMemo(() => {
    const positions: number[] = [];
    const half = size / 2;
    const step = size / divisions;
    for (let i = 0; i <= divisions; i++) {
      const p = -half + i * step;
      positions.push(-half, 0, p, half, 0, p);
      positions.push(p, 0, -half, p, 0, half);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    return g;
  }, [size, divisions]);

  const material = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: PALETTE.forest,
        transparent: true,
        opacity: 0.18,
        depthWrite: false,
      }),
    [],
  );

  return <lineSegments geometry={geometry} material={material} position={[0, -3.2, 0]} />;
}

/**
 * Same camera language everywhere: slow, shallow, barely moving.
 *
 * The camera is read from the frame callback's state rather than captured from
 * useThree during render, so nothing obtained during render is mutated — the
 * renderer owns the object and we only touch it inside the render loop.
 */
export function DollyCamera({ amount = 0.55 }: { amount?: number }) {
  const t = useRef(0);

  useFrame((state, delta) => {
    t.current += delta * 0.12;
    const cam = state.camera;
    cam.position.x = Math.sin(t.current) * amount;
    cam.position.y = 1.1 + Math.cos(t.current * 0.7) * amount * 0.35;
    cam.lookAt(0, 0, 0);
  });

  return null;
}
