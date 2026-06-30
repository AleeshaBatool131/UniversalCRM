import React from "react";

export default function Pagination({
  page,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
}) {
  if (totalItems === 0) return null;

  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, totalItems);

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
    (p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1
  );

  return (
    <div className="flex flex-col items-center justify-between gap-3 border-t border-ink-900/5 px-5 py-4 sm:flex-row">
      <p className="text-xs text-ink-900/45">
        Showing <span className="font-semibold text-ink-900/70">{start}–{end}</span> of{" "}
        <span className="font-semibold text-ink-900/70">{totalItems}</span>
      </p>

      <div className="flex items-center gap-1.5">
        <button
          onClick={() => onPageChange(Math.max(1, page - 1))}
          disabled={page === 1}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-900/50 transition-colors hover:bg-slate-25 hover:text-ink-900 disabled:opacity-30 disabled:hover:bg-transparent"
          aria-label="Previous page"
        >
          <i className="fa-solid fa-chevron-left text-xs" />
        </button>

        {pages.map((p, idx) => (
          <React.Fragment key={p}>
            {idx > 0 && p - pages[idx - 1] > 1 && (
              <span className="px-1 text-xs text-ink-900/30">…</span>
            )}
            <button
              onClick={() => onPageChange(p)}
              className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-semibold transition-colors ${
                p === page
                  ? "bg-ink-900 text-white"
                  : "text-ink-900/55 hover:bg-slate-25 hover:text-ink-900"
              }`}
            >
              {p}
            </button>
          </React.Fragment>
        ))}

        <button
          onClick={() => onPageChange(Math.min(totalPages, page + 1))}
          disabled={page === totalPages}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-900/50 transition-colors hover:bg-slate-25 hover:text-ink-900 disabled:opacity-30 disabled:hover:bg-transparent"
          aria-label="Next page"
        >
          <i className="fa-solid fa-chevron-right text-xs" />
        </button>
      </div>
    </div>
  );
}
