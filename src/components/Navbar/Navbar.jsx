import React from "react";
import SearchBox from "../Search/SearchBox.jsx";
import NotificationDropdown from "./NotificationDropdown.jsx";
import UserDropdown from "../User/UserDropdown.jsx";

export default function Navbar({ onMenuClick }) {
  return (
    <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-ink-900/5 bg-white/80 px-4 py-3 backdrop-blur-md sm:px-6">
      <button
        onClick={onMenuClick}
        className="flex h-10 w-10 flex-none items-center justify-center rounded-xl text-ink-900/60 hover:bg-slate-25 lg:hidden"
        aria-label="Open menu"
      >
        <i className="fa-solid fa-bars text-lg" />
      </button>

      <div>
        <p className="font-display text-base font-bold leading-tight text-ink-900 sm:text-lg">
          Dashboard Overview
        </p>
        <p className="hidden text-xs text-ink-900/45 sm:block">
          Welcome back — here's what's happening today.
        </p>
      </div>

      <SearchBox className="ml-2 hidden max-w-md flex-1 md:block" />

      <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
        <button className="hidden h-10 items-center gap-2 rounded-xl bg-ink-900 px-4 text-sm font-semibold text-white transition-colors hover:bg-brand-600 sm:inline-flex">
          <i className="fa-solid fa-plus text-xs" />
          New
        </button>
        <NotificationDropdown />
        <div className="mx-1 hidden h-7 w-px bg-ink-900/10 sm:block" />
        <UserDropdown />
      </div>
    </header>
  );
}
