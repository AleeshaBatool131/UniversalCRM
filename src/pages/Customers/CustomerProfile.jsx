import React from "react";
import { Link, useParams } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout.jsx";
import ProfileCard from "../../components/Cards/ProfileCard.jsx";
import { customers } from "../../data/customersData.js";
import { recentActivity } from "../../data/dashboardData.js";

export default function CustomerProfile() {
  const { id } = useParams();
  const customer = customers.find((c) => c.id === id) || customers[0];

  const stats = [
    { label: "Lifetime Value", value: customer.value, icon: "fa-solid fa-sack-dollar" },
    { label: "Open Deals", value: "3", icon: "fa-solid fa-handshake" },
    { label: "Tickets", value: "1", icon: "fa-solid fa-headset" },
    { label: "Member Since", value: "Mar 2024", icon: "fa-solid fa-calendar" },
  ];

  return (
    <DashboardLayout>
      <div className="mb-5 flex items-center gap-3">
        <Link
          to="/customers"
          className="flex h-9 w-9 items-center justify-center rounded-xl text-ink-900/50 transition-colors hover:bg-slate-25 hover:text-ink-900"
          aria-label="Back to customers"
        >
          <i className="fa-solid fa-arrow-left text-sm" />
        </Link>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-900/35">
            {customer.id}
          </p>
          <h1 className="font-display text-xl font-bold text-ink-900 sm:text-2xl">
            Customer Profile
          </h1>
        </div>
      </div>

      <ProfileCard
        person={customer}
        status={customer.status}
        subtitleIcon="fa-solid fa-building"
        subtitle={customer.company}
        fields={[
          { icon: "fa-solid fa-envelope", value: customer.email },
          { icon: "fa-solid fa-phone", value: customer.phone },
          { icon: "fa-solid fa-location-dot", value: customer.location },
        ]}
      />

      <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="card p-4">
            <i className={`${s.icon} text-base text-brand-600`} />
            <p className="mt-3 font-display text-lg font-bold text-ink-900">
              {s.value}
            </p>
            <p className="text-xs text-ink-900/45">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-3">
        <div className="card p-6 xl:col-span-2">
          <h3 className="mb-4 font-display text-sm font-bold text-ink-900">
            Activity Timeline
          </h3>
          <div className="space-y-1">
            {recentActivity.map((a) => (
              <div
                key={a.id}
                className="flex items-start gap-3 rounded-xl px-2 py-2.5 transition-colors hover:bg-slate-25"
              >
                <div
                  className={`flex h-9 w-9 flex-none items-center justify-center rounded-xl text-sm ${a.color}`}
                >
                  <i className={a.icon} />
                </div>
                <div className="min-w-0">
                  <p className="text-sm text-ink-900/80">
                    <span className="font-semibold text-ink-900">{a.user}</span>{" "}
                    {a.action}{" "}
                    <span className="font-medium text-ink-900">{a.target}</span>
                  </p>
                  <p className="mt-0.5 text-xs text-ink-900/40">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-5">
          <div className="card p-6">
            <h3 className="mb-4 font-display text-sm font-bold text-ink-900">
              Account Details
            </h3>
            <dl className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <dt className="text-ink-900/45">Account Owner</dt>
                <dd className="font-medium text-ink-900">{customer.owner}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-ink-900/45">Last Contact</dt>
                <dd className="font-medium text-ink-900">{customer.lastContact}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-ink-900/45">Customer ID</dt>
                <dd className="font-mono text-xs font-medium text-ink-900/70">
                  {customer.id}
                </dd>
              </div>
            </dl>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {customer.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-slate-25 px-2.5 py-1 text-[11px] font-medium text-ink-900/60"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="card p-6">
            <h3 className="mb-3 font-display text-sm font-bold text-ink-900">
              Quick Actions
            </h3>
            <div className="space-y-2">
              <button className="btn-ghost w-full !justify-start text-sm">
                <i className="fa-solid fa-calendar-plus text-xs text-ink-900/40" />
                Schedule Meeting
              </button>
              <button className="btn-ghost w-full !justify-start text-sm">
                <i className="fa-solid fa-list-check text-xs text-ink-900/40" />
                Create Task
              </button>
              <button className="btn-ghost w-full !justify-start text-sm">
                <i className="fa-solid fa-file-invoice text-xs text-ink-900/40" />
                New Invoice
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
