import React from "react";

export default function TableSearchBar({ value, onChange, placeholder = "Search..." }) {
  return (
    <div className="relative flex-1 sm:max-w-xs">
      <i className="fa-solid fa-magnifying-glass pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-ink-900/35" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-10 w-full rounded-xl border border-ink-900/10 bg-white pl-10 pr-4 text-sm text-ink-900 placeholder:text-ink-900/35 outline-none transition-all duration-150 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-900/30 hover:text-ink-900/60"
          aria-label="Clear search"
        >
          <i className="fa-solid fa-xmark text-xs" />
        </button>
      )}
    </div>
  );
}
