import React from "react";

export default function StatsCard({ icon, label, value, delta, trend, accent }) {
  const trendUp = trend === "up";
  return (
    <div className="card group relative overflow-hidden p-5 transition-shadow hover:shadow-soft">
      <div className="flex items-start justify-between">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl text-lg ${accent}`}
        >
          <i className={icon} />
        </div>
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[11px] font-semibold ${
            trendUp
              ? "bg-emerald-50 text-emerald-600"
              : "bg-rose-50 text-rose-600"
          }`}
        >
          <i
            className={`fa-solid ${
              trendUp ? "fa-arrow-trend-up" : "fa-arrow-trend-down"
            } text-[10px]`}
          />
          {delta}
        </span>
      </div>

      <p className="mt-4 font-display text-2xl font-bold text-ink-900">
        {value}
      </p>
      <p className="mt-1 text-sm text-ink-900/45">{label}</p>

      <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-brand-500/[0.04] transition-transform duration-300 group-hover:scale-125" />
    </div>
  );
}
