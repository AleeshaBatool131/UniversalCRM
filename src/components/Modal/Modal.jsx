import React, { useEffect } from "react";

export default function Modal({ open, onClose, title, subtitle, children, size = "md" }) {
  useEffect(() => {
    if (!open) return;
    const handleKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  const widths = {
    sm: "max-w-md",
    md: "max-w-xl",
    lg: "max-w-2xl",
    xl: "max-w-3xl",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-ink-950/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={`relative w-full ${widths[size]} animate-[modal-in_0.18s_ease-out] rounded-2xl bg-white shadow-[0_24px_64px_rgba(16,26,44,0.18)]`}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-ink-900/5 px-6 py-5">
          <div>
            <h2 className="font-display text-base font-bold text-ink-900">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-0.5 text-sm text-ink-900/45">{subtitle}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 flex-none items-center justify-center rounded-xl text-ink-900/40 transition-colors hover:bg-slate-25 hover:text-ink-900"
            aria-label="Close modal"
          >
            <i className="fa-solid fa-xmark text-sm" />
          </button>
        </div>

        {/* Body */}
        <div className="max-h-[calc(90vh-80px)] overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
