import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Triangle from "../components/Triangle";
import { type Point, centroid, rotatePoint } from "../utils/geometry";

export default function DisplayPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [rotation, setRotation] = useState(0);

  const state = location.state as { points: [Point, Point, Point] } | null;

  if (!state?.points) {
    navigate("/");
    return null;
  }

  const { points } = state;
  const center = centroid(...points);
  const rotated: [Point, Point, Point] = points.map((p) =>
    rotatePoint(p, center, rotation),
  ) as [Point, Point, Point];

  return (
    <div style={{ padding: "24px", fontFamily: "sans-serif" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 24,
          marginBottom: 20,
        }}
      >
        <button
          onClick={() => navigate("/")}
          style={{
            padding: "8px 18px",
            cursor: "pointer",
            border: "1px solid #999",
            borderRadius: 4,
            background: "#4f4e4eff",
          }}
        >
          ← Back
        </button>
        <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span>Rotation (°):</span>
          <input
            type="number"
            min={0}
            max={360}
            value={rotation}
            onChange={(e) => setRotation(Number(e.target.value))}
            style={{ width: 80, padding: "4px 6px" }}
          />
        </label>
      </div>
      <Triangle points={rotated} />
    </div>
  );
}
