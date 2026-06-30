import React from "react";

const PALETTE = [
  "bg-brand-500/10 text-brand-600",
  "bg-gold-400/15 text-gold-500",
  "bg-emerald-500/10 text-emerald-600",
  "bg-violet-500/10 text-violet-600",
  "bg-rose-500/10 text-rose-600",
];

function colorFor(seed) {
  const code = seed
    .split("")
    .reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return PALETTE[code % PALETTE.length];
}

export default function Avatar({ initials, name, size = "md" }) {
  const sizes = {
    sm: "h-8 w-8 text-[11px]",
    md: "h-10 w-10 text-xs",
    lg: "h-16 w-16 text-lg",
    xl: "h-20 w-20 text-xl",
  };

  return (
    <div
      className={`flex flex-none items-center justify-center rounded-full font-display font-bold ${
        sizes[size]
      } ${colorFor(name || initials)}`}
    >
      {initials}
    </div>
  );
}
