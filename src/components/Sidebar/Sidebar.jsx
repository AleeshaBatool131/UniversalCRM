import React from "react";
import { NavLink } from "react-router-dom";
import { sidebarNav } from "../../data/dashboardData.js";

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {/* mobile scrim */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-ink-950/50 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`network-grid fixed z-40 flex h-screen w-72 flex-col bg-ink-950 transition-transform duration-200 lg:sticky lg:top-0 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* logo */}
        <div className="flex items-center gap-3 px-6 py-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-400 to-brand-700 font-display text-base font-bold text-white shadow-soft">
            U
          </div>
          <div>
            <p className="font-display text-base font-bold leading-tight text-white">
              Universal
            </p>
            <p className="text-[11px] font-medium uppercase tracking-wider text-white/40">
              CRM Dashboard
            </p>
          </div>
          <button
            onClick={onClose}
            className="ml-auto text-white/50 hover:text-white lg:hidden"
            aria-label="Close menu"
          >
            <i className="fa-solid fa-xmark text-lg" />
          </button>
        </div>

        {/* nav */}
        <nav className="flex-1 space-y-1 overflow-y-auto px-4 py-2">
          <p className="px-3.5 pb-2 pt-3 text-[11px] font-semibold uppercase tracking-wider text-white/30">
            Workspace
          </p>
          {sidebarNav.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              <i className={`${item.icon} w-4 text-center text-[15px]`} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* footer / upgrade card */}
        <div className="m-4 rounded-xl border border-white/10 bg-white/5 p-4">
          <p className="flex items-center gap-2 text-sm font-semibold text-white">
            <span className="relative flex h-2 w-2">
              <span className="pulse-dot absolute inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            All systems live
          </p>
          <p className="mt-1 text-xs leading-relaxed text-white/40">
            Synced 2 minutes ago across every workspace.
          </p>
        </div>
      </aside>
    </>
  );
}
