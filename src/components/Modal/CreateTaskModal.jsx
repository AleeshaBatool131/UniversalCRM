import React, { useState } from "react";
import Modal from "./Modal.jsx";
import { taskPriorities, taskStatusOptions, employees } from "../../data/employeesData.js";
import { customers } from "../../data/customersData.js";

const emptyForm = {
  title: "",
  description: "",
  priority: "Medium",
  status: "To Do",
  assignee: "",
  customer: "",
  dueDate: "",
  tags: "",
};

export default function CreateTaskModal({ open, onClose, onSave }) {
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  function set(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      onSave && onSave(form);
      setForm(emptyForm);
      setSaving(false);
      onClose();
    }, 700);
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Create Task"
      subtitle="Add a new task and assign it to a team member."
      size="lg"
    >
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-2">
          {/* Title — full width */}
          <div className="sm:col-span-2">
            <label className="label-text">Task Title</label>
            <input
              required
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              className="input-field"
              placeholder="e.g. Follow up with Northwind Traders on Q3 renewal"
            />
          </div>

          {/* Description — full width */}
          <div className="sm:col-span-2">
            <label className="label-text">Description</label>
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              className="input-field resize-none"
              placeholder="Add context, links, or steps for this task..."
            />
          </div>

          {/* Priority */}
          <div>
            <label className="label-text">Priority</label>
            <select
              className="input-field"
              value={form.priority}
              onChange={(e) => set("priority", e.target.value)}
            >
              {taskPriorities.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="label-text">Status</label>
            <select
              className="input-field"
              value={form.status}
              onChange={(e) => set("status", e.target.value)}
            >
              {taskStatusOptions.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Assignee */}
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
                  {emp.name}
                </option>
              ))}
            </select>
          </div>

          {/* Due Date */}
          <div>
            <label className="label-text">Due Date</label>
            <input
              type="date"
              className="input-field"
              value={form.dueDate}
              onChange={(e) => set("dueDate", e.target.value)}
            />
          </div>

          {/* Customer */}
          <div className="sm:col-span-2">
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

          {/* Tags */}
          <div className="sm:col-span-2">
            <label className="label-text">Tags</label>
            <input
              className="input-field"
              value={form.tags}
              onChange={(e) => set("tags", e.target.value)}
              placeholder="Renewal, Enterprise, Onboarding..."
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2.5 border-t border-ink-900/5 px-6 py-4">
          <button type="button" onClick={onClose} className="btn-ghost">
            Cancel
          </button>
          <button type="submit" className="btn-primary" disabled={saving}>
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
        </div>
      </form>
    </Modal>
  );
}
