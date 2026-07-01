import React from "react";
import StatusBadge from "../Badges/StatusBadge.jsx";
import PriorityLabel from "../Badges/PriorityLabel.jsx";
import ProgressBar from "../Progress/ProgressBar.jsx";
import Avatar from "./Avatar.jsx";

export default function TaskCard({ task, onClick }) {
  const isOverdue =
    task.status !== "Done" && new Date(task.dueDate) < new Date("2026-07-01");

  return (
    <div
      onClick={() => onClick && onClick(task)}
      className="card group cursor-pointer p-5 transition-shadow hover:shadow-soft"
    >
      {/* Priority + status row */}
      <div className="flex flex-wrap items-center gap-2">
        <PriorityLabel priority={task.priority} />
        <StatusBadge status={task.status} />
        {isOverdue && (
          <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2.5 py-1 text-[11px] font-semibold text-rose-600">
            <i className="fa-solid fa-clock text-[10px]" />
            Overdue
          </span>
        )}
      </div>

      {/* Title */}
      <p className="mt-3 text-sm font-semibold leading-snug text-ink-900 group-hover:text-brand-600 transition-colors">
        {task.title}
      </p>

      {/* Description */}
      <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-ink-900/45">
        {task.description}
      </p>

      {/* Progress */}
      {task.status !== "To Do" && (
        <div className="mt-4">
          <ProgressBar value={task.progress} size="sm" />
        </div>
      )}

      {/* Tags */}
      {task.tags?.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1">
          {task.tags.map((t) => (
            <span
              key={t}
              className="rounded-full bg-ink-900/[0.05] px-2 py-0.5 text-[10px] font-medium text-ink-900/50"
            >
              {t}
            </span>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between border-t border-ink-900/5 pt-3">
        <div className="flex items-center gap-2">
          <Avatar
            initials={task.assigneeInitials}
            name={task.assignee}
            size="sm"
          />
          <span className="text-xs text-ink-900/55">{task.assignee}</span>
        </div>
        <div
          className={`flex items-center gap-1.5 text-[11px] font-medium ${
            isOverdue ? "text-rose-500" : "text-ink-900/40"
          }`}
        >
          <i className="fa-regular fa-calendar text-[10px]" />
          {task.dueDate}
        </div>
      </div>
    </div>
  );
}
