import React, { useEffect, useRef, useState } from "react";
import { notifications } from "../../data/dashboardData.js";

export default function NotificationDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const unreadCount = notifications.filter((n) => n.unread).length;

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="relative flex h-10 w-10 items-center justify-center rounded-xl text-ink-900/60 transition-colors hover:bg-slate-25 hover:text-ink-900"
        aria-label="Notifications"
      >
        <i className="fa-regular fa-bell text-lg" />
        {unreadCount > 0 && (
          <span className="absolute right-2 top-2 flex h-2 w-2">
            <span className="pulse-dot absolute inline-flex h-2 w-2 rounded-full bg-rose-500" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-rose-500" />
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 w-80 origin-top-right rounded-2xl border border-ink-900/5 bg-white p-2 shadow-soft">
          <div className="flex items-center justify-between px-3 py-2">
            <p className="text-sm font-semibold text-ink-900">Notifications</p>
            <span className="rounded-full bg-brand-500/10 px-2 py-0.5 text-[11px] font-semibold text-brand-600">
              {unreadCount} new
            </span>
          </div>
          <div className="max-h-80 space-y-0.5 overflow-y-auto">
            {notifications.map((n) => (
              <div
                key={n.id}
                className="flex items-start gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-slate-25"
              >
                <span
                  className={`mt-1 h-2 w-2 flex-none rounded-full ${
                    n.unread ? "bg-brand-500" : "bg-ink-900/15"
                  }`}
                />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-ink-900">
                    {n.title}
                  </p>
                  <p className="truncate text-xs text-ink-900/50">
                    {n.body}
                  </p>
                  <p className="mt-0.5 text-[11px] text-ink-900/35">
                    {n.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-1 w-full rounded-xl py-2 text-center text-sm font-medium text-brand-600 hover:bg-brand-50">
            View all notifications
          </button>
        </div>
      )}
    </div>
  );
}
