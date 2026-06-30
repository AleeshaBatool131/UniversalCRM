import React from "react";
import Avatar from "./Avatar.jsx";
import StatusBadge from "../Badges/StatusBadge.jsx";

export default function ProfileCard({ person, subtitleIcon, subtitle, fields, status }) {
  return (
    <div className="card relative overflow-hidden p-6">
      <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brand-500/[0.04]" />

      <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
        <Avatar initials={person.initials} name={person.name} size="xl" />

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2.5">
            <h2 className="font-display text-xl font-bold text-ink-900">
              {person.name}
            </h2>
            <StatusBadge status={status} />
          </div>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-ink-900/50">
            <i className={`${subtitleIcon} text-xs text-ink-900/35`} />
            {subtitle}
          </p>

          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
            {fields.map((f) => (
              <div key={f.label} className="flex items-center gap-2 text-sm">
                <i className={`${f.icon} w-4 text-center text-ink-900/35`} />
                <span className="text-ink-900/70">{f.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-none gap-2 self-start sm:self-center">
          <button className="btn-ghost !px-4 !py-2.5 text-sm">
            <i className="fa-solid fa-pen text-xs" />
            Edit
          </button>
          <button className="btn-primary !px-4 !py-2.5 text-sm">
            <i className="fa-solid fa-paper-plane text-xs" />
            Contact
          </button>
        </div>
      </div>
    </div>
  );
}
