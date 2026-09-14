import fs from "node:fs";
import path from "node:path";

/**
 * Build-time image resolution for server components.
 *
 * Hero photography is commissioned separately (docs/HERO-IMAGES.md). Until a
 * file is supplied, a page must render a designed ground rather than a broken
 * <img>. Resolving against /public at prerender time means dropping the file
 * into place is the whole integration: the next build picks it up.
 *
 * Every page that calls this is statically prerendered, so the filesystem read
 * happens once at build, never per request.
 */

const PUBLIC_DIR = path.join(process.cwd(), "public");

export type ResolvedImage = {
  src: string;
  width: number;
  height: number;
};

// Production builds resolve once. In development the cache is skipped, so a photograph
// dropped into /public appears on the next reload without restarting the dev server.
const cache = new Map<string, ResolvedImage | null>();
const useCache = process.env.NODE_ENV === "production";

/** Returns the first candidate that exists in /public, with its pixel size. */
export function resolveImage(...candidates: (string | undefined)[]): ResolvedImage | null {
  for (const src of candidates) {
    if (!src) continue;
    if (useCache && cache.has(src)) {
      const hit = cache.get(src);
      if (hit) return hit;
      continue;
    }

    const file = path.join(PUBLIC_DIR, src);
    let resolved: ResolvedImage | null = null;
    try {
      const size = readImageSize(fs.readFileSync(file));
      if (size) resolved = { src, ...size };
    } catch {
      resolved = null;
    }
    cache.set(src, resolved);
    if (resolved) return resolved;
  }
  return null;
}

/**
 * Minimal header parser for PNG, JPEG and WebP — enough to lock an SVG overlay
 * to the photograph's intrinsic aspect ratio without adding a dependency.
 */
function readImageSize(buf: Buffer): { width: number; height: number } | null {
  // PNG: fixed IHDR offset.
  if (buf.length > 24 && buf.readUInt32BE(0) === 0x89504e47) {
    return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  }

  // JPEG: walk markers to the first start-of-frame.
  if (buf.length > 4 && buf[0] === 0xff && buf[1] === 0xd8) {
    let offset = 2;
    while (offset + 9 < buf.length) {
      if (buf[offset] !== 0xff) {
        offset++;
        continue;
      }
      const marker = buf[offset + 1];
      const length = buf.readUInt16BE(offset + 2);
      const isSOF =
        marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc;
      if (isSOF) {
        return { height: buf.readUInt16BE(offset + 5), width: buf.readUInt16BE(offset + 7) };
      }
      offset += 2 + length;
    }
    return null;
  }

  // WebP: RIFF container, VP8 / VP8L / VP8X chunks.
  if (buf.length > 30 && buf.toString("ascii", 0, 4) === "RIFF" && buf.toString("ascii", 8, 12) === "WEBP") {
    const chunk = buf.toString("ascii", 12, 16);
    if (chunk === "VP8 ") {
      return { width: buf.readUInt16LE(26) & 0x3fff, height: buf.readUInt16LE(28) & 0x3fff };
    }
    if (chunk === "VP8L") {
      const bits = buf.readUInt32LE(21);
      return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 };
    }
    if (chunk === "VP8X") {
      return { width: buf.readUIntLE(24, 3) + 1, height: buf.readUIntLE(27, 3) + 1 };
    }
  }

  return null;
}
