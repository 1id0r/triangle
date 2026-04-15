import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { type Point } from "../utils/geometry";

interface PointInput {
  x: string;
  y: string;
}

const DEFAULT_POINTS: [PointInput, PointInput, PointInput] = [
  { x: "200", y: "600" },
  { x: "600", y: "600" },
  { x: "400", y: "200" },
];

export default function InputPage() {
  const navigate = useNavigate();
  const [pts, setPts] = useState<[PointInput, PointInput, PointInput]>(DEFAULT_POINTS);

  function setCoord(index: number, axis: "x" | "y", value: string) {
    setPts((prev) => {
      const next = prev.map((p) => ({ ...p })) as [PointInput, PointInput, PointInput];
      next[index][axis] = value;
      return next;
    });
  }

  function handleShow() {
    const points: [Point, Point, Point] = pts.map((p) => ({
      x: parseFloat(p.x) || 0,
      y: parseFloat(p.y) || 0,
    })) as [Point, Point, Point];
    navigate("/display", { state: { points } });
  }

  const labels = ["A", "B", "C"];

  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif", maxWidth: 480 }}>
      <h1 style={{ marginBottom: 24 }}>Triangle Viewer</h1>
      {pts.map((p, i) => (
        <div key={i} style={{ marginBottom: 16, display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontWeight: "bold", width: 60 }}>Point {labels[i]}</span>
          <label>
            x:{" "}
            <input
              type="number"
              value={p.x}
              onChange={(e) => setCoord(i, "x", e.target.value)}
              style={{ width: 80, padding: "4px 6px" }}
            />
          </label>
          <label>
            y:{" "}
            <input
              type="number"
              value={p.y}
              onChange={(e) => setCoord(i, "y", e.target.value)}
              style={{ width: 80, padding: "4px 6px" }}
            />
          </label>
        </div>
      ))}
      <button
        onClick={handleShow}
        style={{
          marginTop: 16,
          padding: "10px 24px",
          fontSize: 15,
          cursor: "pointer",
          background: "#4169e1",
          color: "#fff",
          border: "none",
          borderRadius: 4,
        }}
      >
        Show Triangle
      </button>
    </div>
  );
}
