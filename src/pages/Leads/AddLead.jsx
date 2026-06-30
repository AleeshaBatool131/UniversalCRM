import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout.jsx";
import {
  leadStatusOptions,
  leadSources,
  teamMembers,
} from "../../data/customersData.js";

export default function AddLead() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => navigate("/leads"), 900);
  }

  return (
    <DashboardLayout>
      <div className="mb-5 flex items-center gap-3">
        <Link
          to="/leads"
          className="flex h-9 w-9 items-center justify-center rounded-xl text-ink-900/50 transition-colors hover:bg-slate-25 hover:text-ink-900"
          aria-label="Back to leads"
        >
          <i className="fa-solid fa-arrow-left text-sm" />
        </Link>
        <div>
          <h1 className="font-display text-xl font-bold text-ink-900 sm:text-2xl">
            Add Lead
          </h1>
          <p className="mt-0.5 text-sm text-ink-900/45">
            Capture a new lead and add it to your pipeline.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="space-y-5 lg:col-span-2">
          <div className="card p-6">
            <h3 className="mb-4 font-display text-sm font-bold text-ink-900">
              Lead Information
            </h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="label-text">Full Name</label>
                <input required className="input-field" placeholder="e.g. Nina Volkova" />
              </div>
              <div>
                <label className="label-text">Company</label>
                <input required className="input-field" placeholder="e.g. Arctic Freight" />
              </div>
              <div>
                <label className="label-text">Email Address</label>
                <input
                  required
                  type="email"
                  className="input-field"
                  placeholder="name@company.com"
                />
              </div>
              <div>
                <label className="label-text">Phone Number</label>
                <input className="input-field" placeholder="+1 (415) 555-0192" />
              </div>
            </div>
          </div>

          <div className="card p-6">
            <h3 className="mb-4 font-display text-sm font-bold text-ink-900">
              Notes
            </h3>
            <textarea
              rows={4}
              className="input-field resize-none"
              placeholder="Add context: how this lead came in, pain points, next steps..."
            />
          </div>
        </div>

        <div className="space-y-5">
          <div className="card p-6">
            <h3 className="mb-4 font-display text-sm font-bold text-ink-900">
              Pipeline Details
            </h3>
            <div className="space-y-4">
              <div>
                <label className="label-text">Status</label>
                <select className="input-field" defaultValue={leadStatusOptions[0]}>
                  {leadStatusOptions.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="label-text">Source</label>
                <select className="input-field" defaultValue={leadSources[0]}>
                  {leadSources.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="label-text">Assigned Owner</label>
                <select className="input-field" defaultValue={teamMembers[0]}>
                  {teamMembers.map((m) => (
                    <option key={m}>{m}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="label-text">Estimated Value</label>
                <input className="input-field" placeholder="$0.00" />
              </div>
            </div>
          </div>

          <div className="card space-y-2.5 p-6">
            <button type="submit" className="btn-primary w-full">
              {submitted ? (
                <>
                  <i className="fa-solid fa-check text-xs" />
                  Saved
                </>
              ) : (
                <>
                  <i className="fa-solid fa-floppy-disk text-xs" />
                  Save Lead
                </>
              )}
            </button>
            <Link to="/leads" className="btn-ghost w-full">
              Cancel
            </Link>
          </div>
        </div>
      </form>
    </DashboardLayout>
  );
}
