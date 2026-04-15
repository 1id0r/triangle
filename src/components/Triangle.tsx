import { type Point, angleBetween, arcPath, centroid } from "../utils/geometry";

interface TriangleProps {
  points: [Point, Point, Point];
}

export default function Triangle({ points }: TriangleProps) {
  const [a, b, c] = points;
  const center = centroid(a, b, c);

  const vertices: [Point, Point, Point][] = [
    [a, b, c],
    [b, a, c],
    [c, a, b],
  ];

  const polygonPoints = points.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <svg
      width={800}
      height={800}
      viewBox="0 0 800 800"
      style={{ border: "1px solid #ccc", background: "#fafafa" }}
    >
      <polygon
        points={polygonPoints}
        fill="rgba(100, 149, 237, 0.15)"
        stroke="#4169e1"
        strokeWidth={2}
      />

      {vertices.map(([at, p1, p2], i) => {
        const angle = angleBetween(at, p1, p2);
        const d = arcPath(at, p1, p2, 20);

        // Bisector direction: normalize(u1 + u2), nudge 40px toward centroid
        const v1 = { x: p1.x - at.x, y: p1.y - at.y };
        const v2 = { x: p2.x - at.x, y: p2.y - at.y };
        const mag1 = Math.sqrt(v1.x * v1.x + v1.y * v1.y);
        const mag2 = Math.sqrt(v2.x * v2.x + v2.y * v2.y);
        const u1 = mag1 > 0 ? { x: v1.x / mag1, y: v1.y / mag1 } : { x: 0, y: 0 };
        const u2 = mag2 > 0 ? { x: v2.x / mag2, y: v2.y / mag2 } : { x: 0, y: 0 };
        const bx = u1.x + u2.x;
        const by = u1.y + u2.y;
        const bMag = Math.sqrt(bx * bx + by * by);
        const nudge = 40;
        const labelPos =
          bMag > 0
            ? { x: at.x + (bx / bMag) * nudge, y: at.y + (by / bMag) * nudge }
            : { x: (at.x + center.x) / 2, y: (at.y + center.y) / 2 };

        return (
          <g key={i}>
            {d && (
              <path
                d={d}
                fill="none"
                stroke="#e05c00"
                strokeWidth={1.5}
              />
            )}
            <text
              x={labelPos.x}
              y={labelPos.y}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={12}
              fill="#333"
              fontFamily="monospace"
            >
              {angle.toFixed(1)}°
            </text>
          </g>
        );
      })}
    </svg>
  );
}
