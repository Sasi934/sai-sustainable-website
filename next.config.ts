import type { NextConfig } from "next";

/*
 * NOTE: do not set `turbopack.root` here.
 *
 * Next infers the workspace root from a stray package-lock.json in the home
 * directory and warns about it. Setting `turbopack.root` silences the warning
 * but breaks static asset MIME resolution — CSS chunks get served as
 * `text/html`, the browser refuses them, and the site renders unstyled.
 * Verified in Next 16.2.10 with both `__dirname` and a resolved absolute path.
 * The warning is cosmetic; leave it.
 */
const nextConfig: NextConfig = {
  reactStrictMode: true,

  /*
   * Static export — the target is Hostinger Business Web Hosting, which runs
   * PHP/LiteSpeed rather than Node. Consequences, all handled deliberately:
   *
   *  - No route handlers. The contact form posts to `public/enquiry.php`
   *    instead; the Node version is kept at ../deploy-reference for the day
   *    this moves to a Node host.
   *  - No built-in image optimisation, so sources are served as-is. Enable
   *    LiteSpeed image optimisation in hPanel to recover most of that.
   *  - No `redirects()`. The alias 301s live in `public/.htaccess`, which also
   *    serves extensionless URLs so every existing path resolves unchanged.
   */
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
