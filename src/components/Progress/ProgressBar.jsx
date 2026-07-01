import React from "react";

function colorClass(value) {
  if (value === 100) return "bg-emerald-500";
  if (value >= 80) return "bg-brand-500";
  if (value >= 50) return "bg-gold-400";
  if (value >= 25) return "bg-amber-400";
  return "bg-rose-400";
}

export default function ProgressBar({ value = 0, showLabel = true, size = "md" }) {
  const clamped = Math.max(0, Math.min(100, value));
  const heights = { sm: "h-1", md: "h-1.5", lg: "h-2.5" };

  return (
    <div className="flex items-center gap-3">
      <div className={`flex-1 overflow-hidden rounded-full bg-ink-900/[0.06] ${heights[size]}`}>
        <div
          className={`${heights[size]} rounded-full transition-all duration-500 ${colorClass(clamped)}`}
          style={{ width: `${clamped}%` }}
        />
      </div>
      {showLabel && (
        <span className="w-9 shrink-0 text-right text-xs font-semibold text-ink-900/50">
          {clamped}%
        </span>
      )}
    </div>
  );
}
