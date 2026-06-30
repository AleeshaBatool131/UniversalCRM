import React from "react";

export default function SearchBox({ className = "" }) {
  return (
    <div className={`relative ${className}`}>
      <i className="fa-solid fa-magnifying-glass pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-ink-900/35" />
      <input
        type="text"
        placeholder="Search customers, leads, tasks..."
        className="w-full rounded-xl border border-ink-900/10 bg-slate-25 py-2.5 pl-10 pr-4 text-sm text-ink-900 placeholder:text-ink-900/35 outline-none transition-all duration-150 focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-500/10"
      />
      <kbd className="absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-md border border-ink-900/10 bg-white px-1.5 py-0.5 text-[10px] font-semibold text-ink-900/40 sm:block">
        ⌘K
      </kbd>
    </div>
  );
}
