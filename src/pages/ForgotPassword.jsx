import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
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
          <i className="fa-solid fa-shield-halved text-3xl text-brand-400" />
          <p className="mt-4 font-display text-3xl font-bold leading-tight text-white">
            Account recovery, handled securely.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-white/45">
            We'll send a verified reset link to your work email. Links
            expire after 15 minutes for your security.
          </p>
        </div>

        <p className="text-xs text-white/30">
          © {new Date().getFullYear()} Universal CRM. All rights reserved.
        </p>
      </div>

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

          {!sent ? (
            <>
              <Link
                to="/login"
                className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-ink-900/45 hover:text-ink-900"
              >
                <i className="fa-solid fa-arrow-left text-xs" /> Back to
                sign in
              </Link>

              <p className="font-display text-2xl font-bold text-ink-900">
                Forgot your password?
              </p>
              <p className="mt-1.5 text-sm text-ink-900/50">
                Enter your work email and we'll send you a link to reset
                it.
              </p>

              <form onSubmit={handleSubmit} className="mt-7 space-y-4">
                <div>
                  <label className="label-text" htmlFor="reset-email">
                    Work Email
                  </label>
                  <input
                    id="reset-email"
                    type="email"
                    required
                    className="input-field"
                    placeholder="you@company.com"
                  />
                </div>

                <button type="submit" className="btn-primary w-full">
                  Send Reset Link
                  <i className="fa-solid fa-paper-plane text-xs" />
                </button>
              </form>
            </>
          ) : (
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-2xl text-emerald-600">
                <i className="fa-solid fa-envelope-circle-check" />
              </div>
              <p className="mt-5 font-display text-2xl font-bold text-ink-900">
                Check your inbox
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-900/50">
                We've sent a password reset link to your email address. It
                will expire in 15 minutes.
              </p>
              <Link to="/login" className="btn-primary mt-7 inline-flex">
                Return to Sign In
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
