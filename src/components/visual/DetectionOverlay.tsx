import type { Detection } from "@/data/heroes";

/**
 * Computer-vision markers drawn over a photograph.
 *
 * The SVG uses the photograph's own pixel size as its viewBox and
 * `xMidYMid slice`, which crops exactly like `object-fit: cover` with a centred
 * position — so every box stays on the same patch of road at every viewport.
 *
 * Kept deliberately quiet: hairline strokes, small labels, no glow, no scanning
 * beams. The photograph carries the image; this only annotates it.
 */
export default function DetectionOverlay({
  detections,
  width,
  height,
  tone = "full",
}: {
  detections: Detection[];
  width: number;
  height: number;
  /** "subtle" drops boxes and labels to near-ambient levels (homepage). */
  tone?: "full" | "subtle";
}) {
  const sx = (v: number) => (v / 100) * width;
  const sy = (v: number) => (v / 100) * height;
  // Label and stroke sizes scale with the photo so they read the same on any file.
  const unit = width / 1600;
  const subtle = tone === "subtle";

  let order = 0;

  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMid slice"
    >
      {detections.map((d, idx) => {
        const i = order++;
        const style = { "--i": i } as React.CSSProperties;

        if (d.kind === "lane") {
          const pts: string[] = [];
          for (let p = 0; p < d.at.length; p += 2) pts.push(`${sx(d.at[p])},${sy(d.at[p + 1])}`);
          return (
            <polyline
              key={idx}
              points={pts.join(" ")}
              fill="none"
              stroke="var(--highlight)"
              strokeOpacity={subtle ? 0.35 : 0.55}
              strokeWidth={1.25 * unit}
              strokeDasharray={subtle ? `${2 * unit} ${10 * unit}` : `${14 * unit} ${10 * unit}`}
              vectorEffect="non-scaling-stroke"
              className="cv-fade"
              style={style}
            />
          );
        }

        if (d.kind === "point") {
          const [x, y] = d.at;
          return (
            <g key={idx} className="cv-fade" style={style}>
              <circle cx={sx(x)} cy={sy(y)} r={9 * unit} fill="var(--highlight)" fillOpacity={0.18} className="cv-pulse" style={style} />
              <circle cx={sx(x)} cy={sy(y)} r={3 * unit} fill="var(--highlight)" fillOpacity={subtle ? 0.7 : 0.95} />
              {d.label && !subtle && (
                <text
                  x={sx(x) + 12 * unit}
                  y={sy(y) + 4 * unit}
                  fill="var(--on-dark)"
                  fillOpacity={0.8}
                  fontSize={11 * unit}
                  fontWeight={600}
                  letterSpacing={1.6 * unit}
                >
                  {d.label.toUpperCase()}
                </text>
              )}
            </g>
          );
        }

        const [x, y, w, h] = d.at;
        const bx = sx(x), by = sy(y), bw = sx(w), bh = sy(h);
        const c = Math.min(bw, bh) * 0.22; // corner bracket length
        return (
          <g key={idx}>
            <rect
              x={bx}
              y={by}
              width={bw}
              height={bh}
              fill="var(--signal)"
              fillOpacity={0.05}
              stroke="var(--signal)"
              strokeOpacity={0.7}
              strokeWidth={1}
              vectorEffect="non-scaling-stroke"
              pathLength={400}
              className="cv-box"
              style={style}
            />
            <path
              d={`M${bx},${by + c}V${by}H${bx + c} M${bx + bw - c},${by}H${bx + bw}V${by + c} M${bx + bw},${by + bh - c}V${by + bh}H${bx + bw - c} M${bx + c},${by + bh}H${bx}V${by + bh - c}`}
              fill="none"
              stroke="var(--on-dark)"
              strokeWidth={1.5}
              vectorEffect="non-scaling-stroke"
              className="cv-fade"
              style={style}
            />
            {d.label && (
              <g className="cv-fade" style={style}>
                <rect
                  x={bx}
                  y={by - 20 * unit}
                  width={(d.label.length * 7.2 + 14) * unit}
                  height={17 * unit}
                  fill="var(--ink)"
                  fillOpacity={0.72}
                />
                <text
                  x={bx + 7 * unit}
                  y={by - 7.5 * unit}
                  fill="var(--on-dark)"
                  fontSize={10.5 * unit}
                  fontWeight={600}
                  letterSpacing={1.1 * unit}
                >
                  {d.label.toUpperCase()}
                </text>
              </g>
            )}
          </g>
        );
      })}
    </svg>
  );
}
