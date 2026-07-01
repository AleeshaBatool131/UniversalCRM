import React, { useMemo, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout.jsx";
import PageHeader from "../../components/Cards/PageHeader.jsx";
import TableSearchBar from "../../components/Search/TableSearchBar.jsx";
import FilterDropdown from "../../components/Filters/FilterDropdown.jsx";
import TaskCard from "../../components/Cards/TaskCard.jsx";
import StatusBadge from "../../components/Badges/StatusBadge.jsx";
import PriorityLabel from "../../components/Badges/PriorityLabel.jsx";
import ProgressBar from "../../components/Progress/ProgressBar.jsx";
import Avatar from "../../components/Cards/Avatar.jsx";
import Pagination from "../../components/Table/Pagination.jsx";
import RowActions from "../../components/Buttons/RowActions.jsx";
import CreateTaskModal from "../../components/Modal/CreateTaskModal.jsx";
import {
  tasks as initialTasks,
  taskPriorities,
  taskStatusOptions,
} from "../../data/employeesData.js";

const PAGE_SIZE = 5;
const VIEWS = ["Cards", "Table"];

/* column meta for the pipeline strip */
const COLUMNS = taskStatusOptions.map((s) => ({
  status: s,
  icon: {
    "To Do": "fa-solid fa-circle",
    "In Progress": "fa-solid fa-rotate fa-spin-pulse",
    Review: "fa-solid fa-magnifying-glass",
    Done: "fa-solid fa-circle-check",
  }[s],
}));

export default function TaskList() {
  const [tasks, setTasks] = useState(initialTasks);
  const [search, setSearch] = useState("");
  const [priority, setPriority] = useState("All");
  const [status, setStatus] = useState("All");
  const [view, setView] = useState("Cards");
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [detailTask, setDetailTask] = useState(null);

  const filtered = useMemo(
    () =>
      tasks.filter((t) => {
        const q = search.toLowerCase();
        const matchSearch =
          t.title.toLowerCase().includes(q) ||
          t.assignee.toLowerCase().includes(q) ||
          (t.customer || "").toLowerCase().includes(q);
        const matchPriority = priority === "All" || t.priority === priority;
        const matchStatus = status === "All" || t.status === status;
        return matchSearch && matchPriority && matchStatus;
      }),
    [tasks, search, priority, status]
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function resetPage(setter) {
    return (val) => {
      setter(val);
      setPage(1);
    };
  }

  function handleSaveTask(form) {
    const newTask = {
      id: `TSK-${5600 + tasks.length}`,
      title: form.title,
      description: form.description,
      priority: form.priority,
      status: form.status,
      assignee: form.assignee || "Unassigned",
      assigneeInitials: form.assignee ? form.assignee.split(" ").map((n) => n[0]).join("") : "?",
      customer: form.customer || null,
      dueDate: form.dueDate
        ? new Date(form.dueDate).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })
        : "—",
      createdDate: "Jul 1, 2026",
      progress: 0,
      tags: form.tags ? form.tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
    };
    setTasks((prev) => [newTask, ...prev]);
  }

  return (
    <DashboardLayout>
      <PageHeader
        title="Tasks"
        description={`${tasks.length} tasks across your workspace`}
      />

      {/* Add Task button + view toggle */}
      <div className="mb-5 flex items-center justify-between gap-3">
        <button
          onClick={() => setModalOpen(true)}
          className="btn-primary"
        >
          <i className="fa-solid fa-plus text-xs" />
          Create Task
        </button>

        <div className="flex items-center rounded-xl border border-ink-900/10 bg-white p-1">
          {VIEWS.map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition-colors ${
                view === v
                  ? "bg-ink-900 text-white"
                  : "text-ink-900/50 hover:text-ink-900"
              }`}
            >
              <i
                className={`text-[11px] ${
                  v === "Cards" ? "fa-solid fa-grip" : "fa-solid fa-table-list"
                }`}
              />
              {v}
            </button>
          ))}
        </div>
      </div>

      {/* Pipeline summary strip */}
      <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {COLUMNS.map((col) => {
          const count = tasks.filter((t) => t.status === col.status).length;
          const active = status === col.status;
          return (
            <button
              key={col.status}
              onClick={() =>
                resetPage(setStatus)(active ? "All" : col.status)
              }
              className={`card p-4 text-left transition-shadow hover:shadow-soft ${
                active ? "ring-2 ring-brand-500/30" : ""
              }`}
            >
              <div className="flex items-center justify-between">
                <StatusBadge status={col.status} />
                <span className="font-display text-lg font-bold text-ink-900">
                  {count}
                </span>
              </div>
              <div className="mt-2.5">
                <ProgressBar
                  value={count > 0 ? (count / tasks.length) * 100 : 0}
                  showLabel={false}
                  size="sm"
                />
              </div>
            </button>
          );
        })}
      </div>

      {/* Filter bar */}
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <TableSearchBar
          value={search}
          onChange={resetPage(setSearch)}
          placeholder="Search tasks, assignees, or customers..."
        />
        <div className="flex flex-wrap gap-2">
          <FilterDropdown
            label="Priority"
            icon="fa-solid fa-flag"
            options={taskPriorities}
            value={priority}
            onChange={resetPage(setPriority)}
          />
          <FilterDropdown
            label="Status"
            icon="fa-solid fa-circle-dot"
            options={taskStatusOptions}
            value={status}
            onChange={resetPage(setStatus)}
          />
        </div>
        <p className="ml-auto shrink-0 text-sm text-ink-900/40">
          {filtered.length} result{filtered.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* ── CARD VIEW ─────────────────────────────────────────────────── */}
      {view === "Cards" && (
        <>
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onClick={setDetailTask}
                />
              ))}
            </div>
          ) : (
            <div className="card flex flex-col items-center py-16 text-center">
              <i className="fa-solid fa-list-check mb-3 text-3xl text-ink-900/15" />
              <p className="font-medium text-ink-900/40">
                No tasks match your filters.
              </p>
            </div>
          )}
        </>
      )}

      {/* ── TABLE VIEW ────────────────────────────────────────────────── */}
      {view === "Table" && (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[820px] text-left text-sm">
              <thead>
                <tr className="border-b border-ink-900/5 text-[11px] font-semibold uppercase tracking-wide text-ink-900/40">
                  <th className="px-5 py-3">Task</th>
                  <th className="px-5 py-3">Priority</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3">Assignee</th>
                  <th className="px-5 py-3">Progress</th>
                  <th className="px-5 py-3">Due</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pageItems.map((task) => (
                  <tr
                    key={task.id}
                    onClick={() => setDetailTask(task)}
                    className="cursor-pointer border-b border-ink-900/5 transition-colors last:border-0 hover:bg-slate-25"
                  >
                    <td className="px-5 py-3.5">
                      <p className="max-w-xs truncate font-medium text-ink-900">
                        {task.title}
                      </p>
                      <p className="font-mono text-[11px] text-ink-900/30">
                        {task.id}
                      </p>
                    </td>
                    <td className="px-5 py-3.5">
                      <PriorityLabel priority={task.priority} />
                    </td>
                    <td className="px-5 py-3.5">
                      <StatusBadge status={task.status} />
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <Avatar
                          initials={task.assigneeInitials}
                          name={task.assignee}
                          size="sm"
                        />
                        <span className="text-ink-900/65">{task.assignee}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 w-32">
                      <ProgressBar value={task.progress} size="sm" />
                    </td>
                    <td className="px-5 py-3.5 text-ink-900/45">
                      {task.dueDate}
                    </td>
                    <td
                      className="px-5 py-3.5"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <RowActions
                        onView={() => setDetailTask(task)}
                        onEdit={() => {}}
                        onDelete={() => {}}
                      />
                    </td>
                  </tr>
                ))}
                {pageItems.length === 0 && (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-sm text-ink-900/40">
                      No tasks match your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <Pagination
            page={page}
            totalPages={totalPages}
            totalItems={filtered.length}
            pageSize={PAGE_SIZE}
            onPageChange={setPage}
          />
        </div>
      )}

      {/* ── CREATE TASK MODAL ─────────────────────────────────────────── */}
      <CreateTaskModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveTask}
      />

      {/* ── TASK DETAIL MODAL ─────────────────────────────────────────── */}
      {detailTask && (
        <div className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center">
          <div
            className="absolute inset-0 bg-ink-950/50 backdrop-blur-sm"
            onClick={() => setDetailTask(null)}
          />
          <div className="relative w-full max-w-lg animate-[modal-in_0.18s_ease-out] rounded-2xl bg-white shadow-[0_24px_64px_rgba(16,26,44,0.18)]">
            <div className="flex items-start justify-between gap-4 border-b border-ink-900/5 px-6 py-5">
              <div>
                <p className="font-mono text-[11px] text-ink-900/30">
                  {detailTask.id}
                </p>
                <h2 className="mt-1 font-display text-base font-bold text-ink-900 leading-snug">
                  {detailTask.title}
                </h2>
              </div>
              <button
                onClick={() => setDetailTask(null)}
                className="flex h-8 w-8 flex-none items-center justify-center rounded-xl text-ink-900/40 hover:bg-slate-25"
              >
                <i className="fa-solid fa-xmark text-sm" />
              </button>
            </div>
            <div className="p-6 space-y-5">
              <div className="flex flex-wrap gap-2">
                <PriorityLabel priority={detailTask.priority} />
                <StatusBadge status={detailTask.status} />
                {detailTask.tags?.map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-ink-900/[0.05] px-2.5 py-1 text-[11px] font-medium text-ink-900/50"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <p className="text-sm leading-relaxed text-ink-900/65">
                {detailTask.description}
              </p>
              {detailTask.status !== "To Do" && (
                <div>
                  <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-ink-900/40">
                    Progress
                  </p>
                  <ProgressBar value={detailTask.progress} size="lg" />
                </div>
              )}
              <dl className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <dt className="text-xs text-ink-900/40">Assignee</dt>
                  <dd className="mt-1 flex items-center gap-2 font-medium text-ink-900">
                    <Avatar
                      initials={detailTask.assigneeInitials}
                      name={detailTask.assignee}
                      size="sm"
                    />
                    {detailTask.assignee}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-ink-900/40">Due Date</dt>
                  <dd className="mt-1 font-medium text-ink-900">
                    {detailTask.dueDate}
                  </dd>
                </div>
                {detailTask.customer && (
                  <div className="col-span-2">
                    <dt className="text-xs text-ink-900/40">Linked Customer</dt>
                    <dd className="mt-1 font-medium text-ink-900">
                      {detailTask.customer}
                    </dd>
                  </div>
                )}
              </dl>
            </div>
            <div className="flex gap-2.5 border-t border-ink-900/5 px-6 py-4">
              <button className="btn-ghost flex-1">
                <i className="fa-solid fa-pen text-xs" />
                Edit Task
              </button>
              <button
                className="btn-primary flex-1"
                onClick={() => setDetailTask(null)}
              >
                <i className="fa-solid fa-check text-xs" />
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
