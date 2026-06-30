import React, { useEffect, useRef, useState } from "react";

export default function FilterDropdown({ label, icon, options, value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const isActive = value !== "All";

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className={`inline-flex h-10 items-center gap-2 rounded-xl border px-3.5 text-sm font-medium transition-colors ${
          isActive
            ? "border-brand-500/30 bg-brand-50 text-brand-700"
            : "border-ink-900/10 bg-white text-ink-900/70 hover:border-ink-900/20"
        }`}
      >
        <i className={`${icon} text-xs ${isActive ? "text-brand-600" : "text-ink-900/40"}`} />
        {value === "All" ? label : value}
        <i className="fa-solid fa-chevron-down text-[10px] text-ink-900/35" />
      </button>

      {open && (
        <div className="absolute left-0 z-50 mt-2 w-48 origin-top-left rounded-2xl border border-ink-900/5 bg-white p-1.5 shadow-soft">
          <button
            onClick={() => {
              onChange("All");
              setOpen(false);
            }}
            className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-slate-25 ${
              value === "All" ? "font-semibold text-ink-900" : "text-ink-900/65"
            }`}
          >
            All {label}
            {value === "All" && <i className="fa-solid fa-check text-xs text-brand-600" />}
          </button>
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-slate-25 ${
                value === opt ? "font-semibold text-ink-900" : "text-ink-900/65"
              }`}
            >
              {opt}
              {value === opt && <i className="fa-solid fa-check text-xs text-brand-600" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
