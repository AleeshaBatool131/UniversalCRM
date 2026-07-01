import React from "react";

const CONFIG = {
  Critical: {
    style: "bg-rose-50 text-rose-600 border border-rose-100",
    icon: "fa-solid fa-circle-exclamation",
  },
  High: {
    style: "bg-amber-50 text-amber-600 border border-amber-100",
    icon: "fa-solid fa-arrow-up",
  },
  Medium: {
    style: "bg-brand-50 text-brand-600 border border-brand-100",
    icon: "fa-solid fa-minus",
  },
  Low: {
    style: "bg-emerald-50 text-emerald-600 border border-emerald-100",
    icon: "fa-solid fa-arrow-down",
  },
};

export default function PriorityLabel({ priority }) {
  const { style, icon } = CONFIG[priority] || CONFIG.Medium;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${style}`}
    >
      <i className={`${icon} text-[10px]`} />
      {priority}
    </span>
  );
}
