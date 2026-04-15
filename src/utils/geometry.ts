export type Point = { x: number; y: number };

export function rotatePoint(p: Point, center: Point, angleDeg: number): Point {
  const rad = (angleDeg * Math.PI) / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);
  const dx = p.x - center.x;
  const dy = p.y - center.y;
  return {
    x: center.x + dx * cos - dy * sin,
    y: center.y + dx * sin + dy * cos,
  };
}

export function centroid(a: Point, b: Point, c: Point): Point {
  return {
    x: (a.x + b.x + c.x) / 3,
    y: (a.y + b.y + c.y) / 3,
  };
}

export function angleBetween(at: Point, p1: Point, p2: Point): number {
  const v1 = { x: p1.x - at.x, y: p1.y - at.y };
  const v2 = { x: p2.x - at.x, y: p2.y - at.y };
  const dot = v1.x * v2.x + v1.y * v2.y;
  const mag1 = Math.sqrt(v1.x * v1.x + v1.y * v1.y);
  const mag2 = Math.sqrt(v2.x * v2.x + v2.y * v2.y);
  if (mag1 === 0 || mag2 === 0) return 0;
  const cosTheta = Math.max(-1, Math.min(1, dot / (mag1 * mag2)));
  return (Math.acos(cosTheta) * 180) / Math.PI;
}

export function arcPath(at: Point, p1: Point, p2: Point, r = 20): string {
  const v1 = { x: p1.x - at.x, y: p1.y - at.y };
  const v2 = { x: p2.x - at.x, y: p2.y - at.y };
  const mag1 = Math.sqrt(v1.x * v1.x + v1.y * v1.y);
  const mag2 = Math.sqrt(v2.x * v2.x + v2.y * v2.y);
  if (mag1 === 0 || mag2 === 0) return "";
  const u1 = { x: v1.x / mag1, y: v1.y / mag1 };
  const u2 = { x: v2.x / mag2, y: v2.y / mag2 };
  const start = { x: at.x + u1.x * r, y: at.y + u1.y * r };
  const end = { x: at.x + u2.x * r, y: at.y + u2.y * r };
  const cross = v1.x * v2.y - v1.y * v2.x;
  const sweep = cross > 0 ? 1 : 0;
  return `M ${start.x} ${start.y} A ${r} ${r} 0 0 ${sweep} ${end.x} ${end.y}`;
}
