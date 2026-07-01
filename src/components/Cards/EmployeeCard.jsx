import React from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "./Avatar.jsx";
import StatusBadge from "../Badges/StatusBadge.jsx";
import ProgressBar from "../Progress/ProgressBar.jsx";

export default function EmployeeCard({ employee }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/employees/${employee.id}`)}
      className="card group cursor-pointer p-5 transition-shadow hover:shadow-soft"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <Avatar initials={employee.initials} name={employee.name} size="md" />
          <div className="min-w-0">
            <p className="truncate font-display text-sm font-bold text-ink-900 group-hover:text-brand-600 transition-colors">
              {employee.name}
            </p>
            <p className="truncate text-xs text-ink-900/50">{employee.role}</p>
          </div>
        </div>
        <StatusBadge status={employee.status} />
      </div>

      {/* Dept + location */}
      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-ink-900/50">
        <span className="flex items-center gap-1.5">
          <i className="fa-solid fa-building-columns w-3 text-center text-ink-900/30" />
          {employee.department}
        </span>
        <span className="flex items-center gap-1.5">
          <i className="fa-solid fa-location-dot w-3 text-center text-ink-900/30" />
          {employee.location}
        </span>
      </div>

      {/* Stats row */}
      <div className="mt-4 grid grid-cols-2 gap-2">
        <div className="rounded-xl bg-slate-25 px-3 py-2.5">
          <p className="font-display text-base font-bold text-ink-900">
            {employee.tasksOpen}
          </p>
          <p className="text-[11px] text-ink-900/40">Open tasks</p>
        </div>
        <div className="rounded-xl bg-slate-25 px-3 py-2.5">
          <p className="font-display text-base font-bold text-ink-900">
            {employee.tasksCompleted}
          </p>
          <p className="text-[11px] text-ink-900/40">Completed</p>
        </div>
      </div>

      {/* Performance */}
      <div className="mt-4">
        <div className="mb-1.5 flex items-center justify-between text-[11px]">
          <span className="font-medium text-ink-900/45">Performance</span>
          <span className="font-semibold text-ink-900/70">{employee.performance}%</span>
        </div>
        <ProgressBar value={employee.performance} showLabel={false} size="md" />
      </div>

      {/* Footer */}
      <div className="mt-4 border-t border-ink-900/5 pt-3 text-[11px] text-ink-900/35">
        Joined {employee.joined} · Reports to{" "}
        <span className="font-medium text-ink-900/50">{employee.manager}</span>
      </div>
    </div>
  );
}
