"use client";

import { useEffect, useState } from "react";

export type Tier = "full" | "reduced" | "static";

type NavigatorWithHints = Navigator & {
  deviceMemory?: number;
  connection?: { saveData?: boolean };
};

/**
 * Memoised at module scope, deliberately.
 *
 * An earlier version created a probe WebGL context on every call and then forced
 * WEBGL_lose_context. Under StrictMode's double-invoked effects that ran twice
 * per mount and took the real renderer's context down with it — the scene came
 * back as an opaque black canvas that never resized. Probe once, never force a
 * context loss, and let the single probe canvas fall out of scope.
 */
let cached: Tier | null = null;

function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

function detect(): Tier {
  if (cached) return cached;

  const resolve = (): Tier => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return "static";

    const nav = navigator as NavigatorWithHints;
    if (nav.connection?.saveData) return "static";
    if (!supportsWebGL()) return "static";

    const cores = navigator.hardwareConcurrency ?? 4;
    const memory = nav.deviceMemory ?? 4;
    if (cores <= 4 || memory < 4) return "static";

    const wide = window.matchMedia("(min-width: 1024px)").matches;
    if (!wide || cores < 8 || memory < 8) return "reduced";

    return "full";
  };

  cached = resolve();
  return cached;
}

/**
 * Resolved once and shared by every scene, so quality decisions live in one place
 * rather than scattered through scene code (survey §14).
 *
 * Starts at "static" so the server render and first paint never assume WebGL,
 * then upgrades once after mount.
 *
 * useSyncExternalStore was tried here and is the textbook fit, but with a
 * subscribe that never fires React did not re-render past the server snapshot,
 * so every scene stayed on the static tier and no canvas ever mounted. The
 * mount effect below is a one-shot capability probe, not a render loop: it runs
 * once, the module-level cache means the work happens a single time per page,
 * and the resulting state never changes again.
 */
export function useDeviceTier(): Tier {
  const [tier, setTier] = useState<Tier>("static");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- see note above
    setTier(detect());
  }, []);

  return tier;
}
