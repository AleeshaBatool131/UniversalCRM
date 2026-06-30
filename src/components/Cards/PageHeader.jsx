import React from "react";
import { Link } from "react-router-dom";

export default function PageHeader({ title, description, actionLabel, actionIcon, actionTo }) {
  return (
    <div className="mb-5 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
      <div>
        <h1 className="font-display text-xl font-bold text-ink-900 sm:text-2xl">
          {title}
        </h1>
        {description && (
          <p className="mt-1 text-sm text-ink-900/45">{description}</p>
        )}
      </div>

      {actionLabel && (
        <Link to={actionTo} className="btn-primary">
          <i className={`${actionIcon} text-xs`} />
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
