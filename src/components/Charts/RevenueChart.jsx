import React, { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { revenueData } from "../../data/dashboardData.js";

const ranges = ["6M", "1Y", "All"];

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="rounded-xl border border-ink-900/5 bg-ink-950 px-3.5 py-2.5 shadow-soft">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-white/40">
        {label}
      </p>
      <p className="mt-0.5 text-sm font-bold text-white">
        ${payload[0].value.toLocaleString()}
      </p>
    </div>
  );
}

export default function RevenueChart() {
  const [range, setRange] = useState("1Y");

  return (
    <div className="card p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="font-display text-base font-bold text-ink-900">
            Revenue Performance
          </p>
          <p className="text-sm text-ink-900/45">
            Monthly revenue against target, this fiscal year
          </p>
        </div>

        <div className="flex items-center rounded-xl bg-slate-25 p-1">
          {ranges.map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                range === r
                  ? "bg-white text-ink-900 shadow-sm"
                  : "text-ink-900/40 hover:text-ink-900/70"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-baseline gap-3">
        <p className="font-display text-3xl font-bold text-ink-900">
          $691,800
        </p>
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-600">
          <i className="fa-solid fa-arrow-trend-up text-[10px]" />
          18.2% vs last year
        </span>
      </div>

      <div className="mt-4 h-64 sm:h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={revenueData} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
            <defs>
              <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3A63E0" stopOpacity={0.28} />
                <stop offset="100%" stopColor="#3A63E0" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="#101A2C" strokeOpacity={0.06} />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#101A2C99" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#101A2C99" }}
              tickFormatter={(v) => `$${v / 1000}k`}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#101A2C", strokeOpacity: 0.08 }} />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#2C4ABF"
              strokeWidth={2.5}
              fill="url(#revenueFill)"
            />
            <Area
              type="monotone"
              dataKey="target"
              stroke="#D6A23F"
              strokeWidth={1.5}
              strokeDasharray="4 4"
              fill="transparent"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-2 flex items-center gap-5 text-xs text-ink-900/45">
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-brand-600" /> Revenue
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-gold-500" /> Target
        </span>
      </div>
    </div>
  );
}
