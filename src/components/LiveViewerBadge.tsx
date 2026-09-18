"use client";

import { useEffect, useState } from "react";

export function useLiveViewers(base = 14) {
  const [count, setCount] = useState(base);

  useEffect(() => {
    const id = setInterval(() => {
      setCount((prev) => {
        const delta = Math.random() > 0.5 ? 1 : -1;
        const next = prev + delta;
        return Math.min(base + 6, Math.max(base - 5, next));
      });
    }, 3500);
    return () => clearInterval(id);
  }, [base]);

  return count;
}

export function LiveViewerBadge({ className = "" }: { className?: string }) {
  const count = useLiveViewers();
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full bg-black/55 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur ${className}`}
    >
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
      </span>
      LIVE · {count} viewers watching
    </span>
  );
}
