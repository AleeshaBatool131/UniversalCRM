import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout.jsx";
import PriorityLabel from "../../components/Badges/PriorityLabel.jsx";
import StatusBadge from "../../components/Badges/StatusBadge.jsx";
import {
  taskPriorities,
  taskStatusOptions,
  employees,
} from "../../data/employeesData.js";
import { customers } from "../../data/customersData.js";

export default function CreateTask() {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "Medium",
    status: "To Do",
    assignee: "",
    customer: "",
    dueDate: "",
    tags: "",
  });

  function set(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => navigate("/tasks"), 900);
  }

  return (
    <DashboardLayout>
      {/* Back + title */}
      <div className="mb-5 flex items-center gap-3">
        <Link
          to="/tasks"
          className="flex h-9 w-9 items-center justify-center rounded-xl text-ink-900/50 transition-colors hover:bg-slate-25 hover:text-ink-900"
          aria-label="Back to tasks"
        >
          <i className="fa-solid fa-arrow-left text-sm" />
        </Link>
        <div>
          <h1 className="font-display text-xl font-bold text-ink-900 sm:text-2xl">
            Create Task
          </h1>
          <p className="mt-0.5 text-sm text-ink-900/45">
            Define and assign a new task to your team.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* ── Left / main column ─────────────────────────────────────── */}
        <div className="space-y-5 lg:col-span-2">

          {/* Core info */}
          <div className="card p-6">
            <h3 className="mb-4 font-display text-sm font-bold text-ink-900">
              Task Details
            </h3>
            <div className="space-y-4">
              <div>
                <label className="label-text">Task Title</label>
                <input
                  required
                  value={form.title}
                  onChange={(e) => set("title", e.target.value)}
                  className="input-field"
                  placeholder="e.g. Follow up with Northwind Traders on Q3 renewal"
                />
              </div>
              <div>
                <label className="label-text">Description</label>
                <textarea
                  rows={5}
                  value={form.description}
                  onChange={(e) => set("description", e.target.value)}
                  className="input-field resize-none"
                  placeholder="Add context, references, or step-by-step instructions..."
                />
              </div>
              <div>
                <label className="label-text">Tags</label>
                <input
                  value={form.tags}
                  onChange={(e) => set("tags", e.target.value)}
                  className="input-field"
                  placeholder="Renewal, Enterprise, Onboarding  (comma-separated)"
                />
              </div>
            </div>
          </div>

          {/* Priority selector */}
          <div className="card p-6">
            <h3 className="mb-4 font-display text-sm font-bold text-ink-900">
              Priority
            </h3>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {taskPriorities.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => set("priority", p)}
                  className={`flex flex-col items-center gap-2 rounded-xl border py-4 text-sm font-semibold transition-all ${
                    form.priority === p
                      ? "border-brand-500/30 bg-brand-50 text-brand-700 ring-2 ring-brand-500/20"
                      : "border-ink-900/8 text-ink-900/55 hover:border-ink-900/15 hover:bg-slate-25"
                  }`}
                >
                  <PriorityLabel priority={p} />
                </button>
              ))}
            </div>
          </div>

          {/* Status selector */}
          <div className="card p-6">
            <h3 className="mb-4 font-display text-sm font-bold text-ink-900">
              Status
            </h3>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {taskStatusOptions.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => set("status", s)}
                  className={`flex items-center justify-center rounded-xl border py-3 text-sm font-medium transition-all ${
                    form.status === s
                      ? "border-brand-500/30 bg-brand-50 ring-2 ring-brand-500/20"
                      : "border-ink-900/8 hover:border-ink-900/15 hover:bg-slate-25"
                  }`}
                >
                  <StatusBadge status={s} />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right sidebar ──────────────────────────────────────────── */}
        <div className="space-y-5">
          {/* Assignment */}
          <div className="card p-6">
            <h3 className="mb-4 font-display text-sm font-bold text-ink-900">
              Assignment
            </h3>
            <div className="space-y-4">
              <div>
                <label className="label-text">Assign To</label>
                <select
                  className="input-field"
                  value={form.assignee}
                  onChange={(e) => set("assignee", e.target.value)}
                >
                  <option value="">— Select employee —</option>
                  {employees.map((emp) => (
                    <option key={emp.id} value={emp.name}>
                      {emp.name} — {emp.role}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="label-text">Due Date</label>
                <input
                  type="date"
                  className="input-field"
                  value={form.dueDate}
                  onChange={(e) => set("dueDate", e.target.value)}
                />
              </div>
              <div>
                <label className="label-text">Linked Customer (optional)</label>
                <select
                  className="input-field"
                  value={form.customer}
                  onChange={(e) => set("customer", e.target.value)}
                >
                  <option value="">— None —</option>
                  {customers.map((c) => (
                    <option key={c.id} value={c.company}>
                      {c.company}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="card overflow-hidden">
            <div className="border-b border-ink-900/5 px-5 py-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-900/40">
                Preview
              </p>
            </div>
            <div className="p-5 space-y-3">
              <div className="flex flex-wrap gap-2">
                <PriorityLabel priority={form.priority} />
                <StatusBadge status={form.status} />
              </div>
              <p className="text-sm font-semibold leading-snug text-ink-900">
                {form.title || (
                  <span className="font-normal italic text-ink-900/30">
                    Task title will appear here…
                  </span>
                )}
              </p>
              {form.description && (
                <p className="line-clamp-2 text-xs text-ink-900/45">
                  {form.description}
                </p>
              )}
              {form.assignee && (
                <p className="flex items-center gap-2 text-xs text-ink-900/40">
                  <i className="fa-solid fa-user text-[10px]" />
                  {form.assignee}
                </p>
              )}
              {form.dueDate && (
                <p className="flex items-center gap-2 text-xs text-ink-900/40">
                  <i className="fa-regular fa-calendar text-[10px]" />
                  Due{" "}
                  {new Date(form.dueDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="card space-y-2.5 p-6">
            <button type="submit" className="btn-primary w-full" disabled={saving}>
              {saving ? (
                <>
                  <i className="fa-solid fa-circle-notch fa-spin text-xs" />
                  Saving…
                </>
              ) : (
                <>
                  <i className="fa-solid fa-plus text-xs" />
                  Create Task
                </>
              )}
            </button>
            <Link to="/tasks" className="btn-ghost w-full">
              Cancel
            </Link>
          </div>
        </div>
      </form>
    </DashboardLayout>
  );
}
