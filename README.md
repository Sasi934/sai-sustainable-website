# SAI Sustainable Services Inc. — website

Next.js (App Router) · React 19 · TypeScript · Tailwind v4 · GSAP + ScrollTrigger · Lenis ·
Three.js + React Three Fiber.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
```

## Content is locked

Approved copy lives **only** in `src/data/*.ts`, copied from `../docs/CONTENT-LOCK.md`. It is never
retyped into JSX. A reviewer can diff `src/data/` against the lock file and prove no wording
drifted without reading a line of markup.

The only sanctioned deviations from source are the four D-04 spelling corrections, each marked
inline. See `../docs/DECISIONS.md`.

Two rules the code enforces structurally:

- `src/data/it-benchmarks.ts` is a **separate file** from `it-projects.ts` so City of Vaughan can
  never be rendered as SAI work by a careless map over one array.
- `src/data/it.ts` carries a header listing the technology terms that are *not* approved
  (D-01). Nothing outside the source document ships.

## URLs are preserved

All ten original paths resolve unchanged, plus the four blog slugs. These carry the local-search
rankings the business runs on — see `../docs/DECISIONS.md`, standing constraint 2. Prettier aliases
in `next.config.ts` 301 *into* the canonical paths, never the other way.

## Environment

Copy `.env.example` to `.env.local`. `RESEND_API_KEY` and `ENQUIRY_TO` are required in production:
without them `/api/enquiry` fails loudly rather than pretending an enquiry was delivered.

**Delivery-test the form from production on launch day.** The live site's forms are handled by
Hostinger and stop existing at cutover; the failure mode is silent.

## Motion

Four layers, one easing vocabulary (`--ease-luxe`, three durations):

| Layer | What | Built with |
|---|---|---|
| L0 | Smooth scroll, Lenis driven by `gsap.ticker` feeding `ScrollTrigger.update` | Lenis + GSAP |
| L1 | Hero entrance — eyebrow, masked headline, sub, CTAs in sequence | GSAP timeline |
| L2 | Word-mask headings, image parallax, pinned horizontal division sequence, scroll reveals | ScrollTrigger + IntersectionObserver |
| L3 | Magnetic buttons, cursor companion, underline wipes, page transition, scroll progress | GSAP `quickTo` + CSS |

There is **no full-screen preloader**, deliberately. Covering the hero delays Largest Contentful
Paint, which is the metric the performance target hinges on. `HeroEntrance` animates elements that
are already painted, so LCP is never gated on a timeline finishing.

Reduced motion is a real branch, not a disable. Every motion component early-returns, Lenis never
initialises, the pinned sequence never pins (`gsap.matchMedia` gates it on
`prefers-reduced-motion: no-preference`), and scenes render one static frame. `ScrollProgress` is
the single exception and says why in its own header.

`BeforeAfter` is built, keyboard-operable and **not yet wired to any page** — SAI has no genuine
before/after pair, and inventing one would be fabricating project evidence. Drop a real pair into
a service page when photography exists.

## 3D

Three scenes share one visual language — a common ground grid, camera, palette and material:

| Scene | Renders | Where |
|---|---|---|
| `ContainmentScene` | Particulate cleared from a containment volume — the abatement sequence | Homepage hero |
| `LatticeScene` | The approved delivery process, drawn edge by edge | IT division |
| `MassingScene` | Massing volumes rising in build order, wireframe → solid | Construction |

Every scene is a dynamic import behind `SceneFrame`, gated on `useDeviceTier` and an
IntersectionObserver. On the `static` tier the Three.js chunk is **never fetched**.

`useDeviceTier` probes WebGL once and caches at module scope. It must never force a context loss —
an earlier version did, and under StrictMode's doubled effects it took the real renderer's context
down with it.

## Gotchas worth knowing

- **Tailwind sources are declared explicitly** in `globals.css` via `@source`. Automatic detection
  resolves from a git root, which this project does not have, and the parent directory name
  contains a trailing space. Without the `@source` lines Tailwind emits zero utilities.
- **Base styles must stay inside `@layer base`.** Unlayered CSS outranks every `@layer`, so an
  unlayered `a { color: inherit }` silently defeats every text-colour utility on the site.
- **Prefer theme utilities over arbitrary values.** `text-[var(--ink)]` is ambiguous to Tailwind
  and falls back silently; `text-ink` resolves from `@theme inline`.
- **Do not set `turbopack.root` using `__dirname`** in `next.config.ts` — it is unreliable in the
  compiled ESM config and breaks static asset MIME resolution (CSS gets served as `text/html`).
- **`position: sticky` needs an unconstrained ancestor.** The header is a direct sibling of
  `TopBar`, not wrapped with it.
- **Avoid `-z-10` under `isolate`** — the child lands behind the element's own background.

## Accessibility

Semantic landmarks, skip link, visible focus, keyboard-operable navigation with Escape to close,
and `aria-current` on the active nav item. Reduced motion is a real branch, not a disable: Lenis
never initialises, reveals resolve immediately, and scenes render a single static frame. Reveals
are gated on a `.js` class so content is never hidden from a client that does not run JavaScript.
