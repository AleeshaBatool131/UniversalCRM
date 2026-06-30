import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    // UI only — Day 1 scope has no backend wiring.
    navigate("/dashboard");
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* left: brand panel */}
      <div className="network-grid relative hidden flex-col justify-between bg-ink-950 p-12 lg:flex">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-400 to-brand-700 font-display text-base font-bold text-white">
            U
          </div>
          <div>
            <p className="font-display text-base font-bold leading-tight text-white">
              Universal
            </p>
            <p className="text-[11px] font-medium uppercase tracking-wider text-white/40">
              CRM Dashboard
            </p>
          </div>
        </div>

        <div className="max-w-md">
          <p className="font-display text-3xl font-bold leading-tight text-white">
            Every customer, lead, and deal — in one connected view.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-white/45">
            Universal CRM brings sales, support, and operations onto a
            single, professional dashboard built for teams of any size.
          </p>

          <div className="mt-8 flex items-center gap-6">
            <div>
              <p className="font-display text-xl font-bold text-white">
                8,492
              </p>
              <p className="text-xs text-white/40">Customers managed</p>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div>
              <p className="font-display text-xl font-bold text-white">
                99.9%
              </p>
              <p className="text-xs text-white/40">Uptime</p>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div>
              <p className="font-display text-xl font-bold text-white">
                184
              </p>
              <p className="text-xs text-white/40">Teams onboard</p>
            </div>
          </div>
        </div>

        <p className="text-xs text-white/30">
          © {new Date().getFullYear()} Universal CRM. All rights reserved.
        </p>
      </div>

      {/* right: form */}
      <div className="flex items-center justify-center px-6 py-12 sm:px-10">
        <div className="w-full max-w-sm">
          <div className="mb-8 flex items-center gap-3 lg:hidden">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-400 to-brand-700 font-display text-base font-bold text-white">
              U
            </div>
            <p className="font-display text-base font-bold text-ink-900">
              Universal CRM
            </p>
          </div>

          <p className="font-display text-2xl font-bold text-ink-900">
            Welcome back
          </p>
          <p className="mt-1.5 text-sm text-ink-900/50">
            Sign in to access your dashboard.
          </p>

          <form onSubmit={handleSubmit} className="mt-7 space-y-4">
            <div>
              <label className="label-text" htmlFor="email">
                Work Email
              </label>
              <input
                id="email"
                type="email"
                required
                defaultValue="sarah.whitfield@universalcrm.com"
                className="input-field"
                placeholder="you@company.com"
              />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="label-text" htmlFor="password">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="mb-1.5 text-xs font-semibold text-brand-600 hover:text-brand-700"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  defaultValue="••••••••••"
                  className="input-field pr-11"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-900/35 hover:text-ink-900/60"
                  aria-label="Toggle password visibility"
                >
                  <i
                    className={`fa-solid ${
                      showPassword ? "fa-eye-slash" : "fa-eye"
                    }`}
                  />
                </button>
              </div>
            </div>

            <label className="flex items-center gap-2.5 text-sm text-ink-900/60">
              <input
                type="checkbox"
                defaultChecked
                className="h-4 w-4 rounded border-ink-900/20 text-brand-600 focus:ring-brand-500"
              />
              Keep me signed in
            </label>

            <button type="submit" className="btn-primary w-full">
              Sign In
              <i className="fa-solid fa-arrow-right text-xs" />
            </button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-ink-900/10" />
            <span className="text-xs text-ink-900/35">or continue with</span>
            <div className="h-px flex-1 bg-ink-900/10" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button className="btn-ghost">
              <i className="fa-brands fa-google" /> Google
            </button>
            <button className="btn-ghost">
              <i className="fa-brands fa-microsoft" /> Microsoft
            </button>
          </div>

          <p className="mt-8 text-center text-sm text-ink-900/45">
            Don't have an account?{" "}
            <span className="font-semibold text-brand-600">
              Contact your administrator
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
