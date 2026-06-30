import React from "react";

const STYLES = {
  Active: "bg-emerald-50 text-emerald-600",
  Inactive: "bg-ink-900/5 text-ink-900/45",
  Pending: "bg-gold-400/15 text-gold-500",
  New: "bg-brand-500/10 text-brand-600",
  Contacted: "bg-violet-50 text-violet-600",
  Qualified: "bg-gold-400/15 text-gold-500",
  Proposal: "bg-amber-50 text-amber-600",
  Won: "bg-emerald-50 text-emerald-600",
  Lost: "bg-rose-50 text-rose-600",
};

const DOT_STYLES = {
  Active: "bg-emerald-500",
  Inactive: "bg-ink-900/30",
  Pending: "bg-gold-500",
  New: "bg-brand-500",
  Contacted: "bg-violet-500",
  Qualified: "bg-gold-500",
  Proposal: "bg-amber-500",
  Won: "bg-emerald-500",
  Lost: "bg-rose-500",
};

export default function StatusBadge({ status }) {
  const style = STYLES[status] || "bg-ink-900/5 text-ink-900/45";
  const dot = DOT_STYLES[status] || "bg-ink-900/30";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${style}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      {status}
    </span>
  );
}
