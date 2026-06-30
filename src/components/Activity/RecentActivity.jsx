import React from "react";
import { recentActivity } from "../../data/dashboardData.js";

export default function RecentActivity() {
  return (
    <div className="card p-5 sm:p-6">
      <div className="flex items-center justify-between">
        <p className="font-display text-base font-bold text-ink-900">
          Recent Activity
        </p>
        <button className="text-xs font-semibold text-brand-600 hover:text-brand-700">
          View all
        </button>
      </div>

      <ol className="mt-5 space-y-5">
        {recentActivity.map((item, idx) => (
          <li key={item.id} className="relative flex gap-3.5">
            {idx !== recentActivity.length - 1 && (
              <span className="absolute left-[15px] top-9 h-[calc(100%-4px)] w-px bg-ink-900/[0.06]" />
            )}
            <span
              className={`relative z-10 flex h-8 w-8 flex-none items-center justify-center rounded-full text-xs ${item.color}`}
            >
              <i className={item.icon} />
            </span>
            <div className="min-w-0 pb-0.5">
              <p className="text-sm leading-snug text-ink-900">
                <span className="font-semibold">{item.user}</span>{" "}
                <span className="text-ink-900/55">{item.action}</span>{" "}
                <span className="font-semibold">{item.target}</span>
              </p>
              <p className="mt-0.5 text-xs text-ink-900/40">{item.time}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
