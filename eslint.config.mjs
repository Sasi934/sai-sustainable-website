import coreWebVitals from "eslint-config-next/core-web-vitals";
import typescript from "eslint-config-next/typescript";

/**
 * Flat config directly from eslint-config-next. FlatCompat is avoided here — it
 * hits a circular-structure crash with this ESLint/plugin combination.
 */
export default [
  ...(Array.isArray(coreWebVitals) ? coreWebVitals : [coreWebVitals]),
  ...(Array.isArray(typescript) ? typescript : [typescript]),
  { ignores: [".next/**", "node_modules/**", "next-env.d.ts"] },
];
