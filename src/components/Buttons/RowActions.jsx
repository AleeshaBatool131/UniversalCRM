import React, { useEffect, useRef, useState } from "react";

export default function RowActions({ onView, onEdit, onDelete }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="relative flex items-center justify-end gap-1" ref={ref}>
      {onView && (
        <button
          onClick={onView}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-900/40 transition-colors hover:bg-brand-50 hover:text-brand-600"
          aria-label="View"
          title="View"
        >
          <i className="fa-regular fa-eye text-sm" />
        </button>
      )}

      <button
        onClick={() => setOpen((o) => !o)}
        className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-900/40 transition-colors hover:bg-slate-25 hover:text-ink-900"
        aria-label="More actions"
      >
        <i className="fa-solid fa-ellipsis-vertical text-sm" />
      </button>

      {open && (
        <div className="absolute right-0 top-9 z-50 w-40 origin-top-right rounded-xl border border-ink-900/5 bg-white p-1.5 shadow-soft">
          <button
            onClick={() => {
              setOpen(false);
              onEdit && onEdit();
            }}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium text-ink-900/70 transition-colors hover:bg-slate-25"
          >
            <i className="fa-solid fa-pen text-xs text-ink-900/40" />
            Edit
          </button>
          <button
            onClick={() => {
              setOpen(false);
              onDelete && onDelete();
            }}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium text-rose-600 transition-colors hover:bg-rose-50"
          >
            <i className="fa-solid fa-trash text-xs" />
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
