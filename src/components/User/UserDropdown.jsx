import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { currentUser } from "../../data/dashboardData.js";

export default function UserDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const menuItems = [
    { label: "My Profile", icon: "fa-solid fa-user" },
    { label: "Account Settings", icon: "fa-solid fa-gear" },
    { label: "Billing", icon: "fa-solid fa-credit-card" },
    { label: "Help & Support", icon: "fa-solid fa-circle-question" },
  ];

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2.5 rounded-xl py-1.5 pl-1.5 pr-2.5 transition-colors hover:bg-slate-25"
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-brand-400 to-brand-700 text-xs font-bold text-white">
          {currentUser.avatarInitials}
        </span>
        <span className="hidden text-left sm:block">
          <p className="text-sm font-semibold leading-tight text-ink-900">
            {currentUser.name}
          </p>
          <p className="text-xs leading-tight text-ink-900/45">
            {currentUser.role}
          </p>
        </span>
        <i
          className={`fa-solid fa-chevron-down hidden text-[10px] text-ink-900/35 transition-transform sm:block ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 w-64 origin-top-right rounded-2xl border border-ink-900/5 bg-white p-2 shadow-soft">
          <div className="flex items-center gap-3 px-3 py-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-brand-400 to-brand-700 text-sm font-bold text-white">
              {currentUser.avatarInitials}
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-ink-900">
                {currentUser.name}
              </p>
              <p className="truncate text-xs text-ink-900/45">
                {currentUser.email}
              </p>
            </div>
          </div>
          <div className="my-1 h-px bg-ink-900/5" />
          {menuItems.map((item) => (
            <button
              key={item.label}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-ink-900/70 transition-colors hover:bg-slate-25 hover:text-ink-900"
            >
              <i className={`${item.icon} w-4 text-center text-ink-900/40`} />
              {item.label}
            </button>
          ))}
          <div className="my-1 h-px bg-ink-900/5" />
          <button
            onClick={() => navigate("/login")}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-rose-600 transition-colors hover:bg-rose-50"
          >
            <i className="fa-solid fa-arrow-right-from-bracket w-4 text-center" />
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}
