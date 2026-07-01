import React from "react";
import { Link, useParams } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout.jsx";
import Avatar from "../../components/Cards/Avatar.jsx";
import StatusBadge from "../../components/Badges/StatusBadge.jsx";
import PriorityLabel from "../../components/Badges/PriorityLabel.jsx";
import ProgressBar from "../../components/Progress/ProgressBar.jsx";
import { employees, tasks } from "../../data/employeesData.js";

export default function EmployeeProfile() {
  const { id } = useParams();
  const emp = employees.find((e) => e.id === id) || employees[0];
  const empTasks = tasks.filter((t) => t.assignee === emp.name);

  const statCards = [
    {
      label: "Open Tasks",
      value: emp.tasksOpen,
      icon: "fa-solid fa-list-check",
      accent: "bg-brand-500/10 text-brand-600",
    },
    {
      label: "Completed",
      value: emp.tasksCompleted,
      icon: "fa-solid fa-circle-check",
      accent: "bg-emerald-500/10 text-emerald-600",
    },
    {
      label: "Performance",
      value: `${emp.performance}%`,
      icon: "fa-solid fa-chart-line",
      accent: "bg-gold-400/15 text-gold-500",
    },
    {
      label: "Dept.",
      value: emp.department,
      icon: "fa-solid fa-building-columns",
      accent: "bg-violet-500/10 text-violet-600",
    },
  ];

  return (
    <DashboardLayout>
      {/* Back nav */}
      <div className="mb-5 flex items-center gap-3">
        <Link
          to="/employees"
          className="flex h-9 w-9 items-center justify-center rounded-xl text-ink-900/50 transition-colors hover:bg-slate-25 hover:text-ink-900"
          aria-label="Back to employees"
        >
          <i className="fa-solid fa-arrow-left text-sm" />
        </Link>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-900/35">
            {emp.id}
          </p>
          <h1 className="font-display text-xl font-bold text-ink-900 sm:text-2xl">
            Employee Profile
          </h1>
        </div>
      </div>

      {/* Profile hero card */}
      <div className="card relative overflow-hidden p-6">
        <div className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full bg-brand-500/[0.04]" />
        <div className="pointer-events-none absolute -bottom-6 -left-6 h-28 w-28 rounded-full bg-gold-400/[0.07]" />

        <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
          <Avatar initials={emp.initials} name={emp.name} size="xl" />

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2.5">
              <h2 className="font-display text-2xl font-bold text-ink-900">
                {emp.name}
              </h2>
              <StatusBadge status={emp.status} />
            </div>
            <p className="mt-1 text-sm font-medium text-ink-900/50">{emp.role}</p>

            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-900/60">
              <span className="flex items-center gap-2">
                <i className="fa-solid fa-envelope text-xs text-ink-900/30" />
                {emp.email}
              </span>
              <span className="flex items-center gap-2">
                <i className="fa-solid fa-phone text-xs text-ink-900/30" />
                {emp.phone}
              </span>
              <span className="flex items-center gap-2">
                <i className="fa-solid fa-location-dot text-xs text-ink-900/30" />
                {emp.location}
              </span>
              <span className="flex items-center gap-2">
                <i className="fa-solid fa-user text-xs text-ink-900/30" />
                Reports to{" "}
                <span className="font-semibold text-ink-900">{emp.manager}</span>
              </span>
            </div>
          </div>

          <div className="flex flex-none gap-2 self-start sm:self-center">
            <button className="btn-ghost !px-4 !py-2.5 text-sm">
              <i className="fa-solid fa-pen text-xs" />
              Edit
            </button>
            <button className="btn-primary !px-4 !py-2.5 text-sm">
              <i className="fa-solid fa-paper-plane text-xs" />
              Message
            </button>
          </div>
        </div>
      </div>

      {/* Stat tiles */}
      <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {statCards.map((s) => (
          <div key={s.label} className="card p-4">
            <div
              className={`flex h-9 w-9 items-center justify-center rounded-xl text-sm ${s.accent}`}
            >
              <i className={s.icon} />
            </div>
            <p className="mt-3 font-display text-lg font-bold text-ink-900">
              {s.value}
            </p>
            <p className="text-xs text-ink-900/45">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-3">
        {/* Tasks */}
        <div className="card p-6 xl:col-span-2">
          <h3 className="mb-4 font-display text-sm font-bold text-ink-900">
            Assigned Tasks
          </h3>
          {empTasks.length === 0 ? (
            <p className="py-6 text-center text-sm text-ink-900/35">
              No tasks assigned yet.
            </p>
          ) : (
            <div className="space-y-2">
              {empTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex flex-col gap-2 rounded-xl border border-ink-900/5 p-4 transition-colors hover:bg-slate-25"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <PriorityLabel priority={task.priority} />
                    <StatusBadge status={task.status} />
                    <span className="ml-auto font-mono text-[11px] text-ink-900/30">
                      {task.id}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-ink-900">
                    {task.title}
                  </p>
                  {task.status !== "To Do" && (
                    <ProgressBar value={task.progress} size="sm" />
                  )}
                  <div className="flex items-center justify-between text-[11px] text-ink-900/35">
                    <span>
                      {task.customer ? (
                        <>
                          <i className="fa-solid fa-building mr-1" />
                          {task.customer}
                        </>
                      ) : (
                        "Internal task"
                      )}
                    </span>
                    <span className="flex items-center gap-1">
                      <i className="fa-regular fa-calendar" />
                      {task.dueDate}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar: skills + info */}
        <div className="space-y-5">
          {/* Performance */}
          <div className="card p-6">
            <h3 className="mb-4 font-display text-sm font-bold text-ink-900">
              Performance Score
            </h3>
            <div className="flex items-end gap-2">
              <p className="font-display text-4xl font-bold text-ink-900">
                {emp.performance}
              </p>
              <p className="mb-1 text-sm text-ink-900/40">/ 100</p>
            </div>
            <div className="mt-3">
              <ProgressBar value={emp.performance} size="lg" showLabel={false} />
            </div>
            <p className="mt-2 text-xs text-ink-900/35">
              Based on tasks completed and activity log.
            </p>
          </div>

          {/* Skills */}
          <div className="card p-6">
            <h3 className="mb-4 font-display text-sm font-bold text-ink-900">
              Skills & Expertise
            </h3>
            <div className="flex flex-wrap gap-2">
              {emp.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-ink-900/8 bg-slate-25 px-3 py-1.5 text-xs font-medium text-ink-900/65"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Account info */}
          <div className="card p-6">
            <h3 className="mb-4 font-display text-sm font-bold text-ink-900">
              Details
            </h3>
            <dl className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <dt className="text-ink-900/45">Employee ID</dt>
                <dd className="font-mono text-xs font-medium text-ink-900/70">
                  {emp.id}
                </dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-ink-900/45">Joined</dt>
                <dd className="font-medium text-ink-900">{emp.joined}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-ink-900/45">Department</dt>
                <dd className="font-medium text-ink-900">{emp.department}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-ink-900/45">Status</dt>
                <dd>
                  <StatusBadge status={emp.status} />
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
