import Link from "next/link";
import Image from "next/image";

function EggMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      <ellipse cx="60" cy="72" rx="42" ry="34" fill="#FBF3DE" />
      <circle cx="72" cy="68" r="19" fill="#F2A430" />
      <circle cx="65" cy="61" r="5.5" fill="#FBF3DE" opacity="0.55" />
      <path
        d="M28 58
           c-2.5 -18 8 -35 26 -40
           c-5.5 10 -3.5 20 6 27
           c-13 -1 -25 4 -32 13Z"
        fill="#2C5C46"
      />
      <path
        d="M36 52
           c1.5 -12 10.5 -20.5 22-22.5
           c-4 8 -3 15 5 21
           c-10.5 -1.5 -20 -0.5 -27 1.5Z"
        fill="#4A8F5B"
      />
    </svg>
  );
}

export function Logo({
  tagline = true,
  variant = "light",
  className = "",
}: {
  tagline?: boolean;
  variant?: "light" | "dark";
  className?: string;
}) {
  const taglineColor = variant === "dark" ? "text-leaf-light/80" : "text-ink-muted";

  if (variant === "dark") {
    return (
      <Link href="/" className={`inline-flex items-center gap-2.5 ${className}`}>
        <EggMark className="h-9 w-9 shrink-0 sm:h-10 sm:w-10" />
        <span className="flex flex-col leading-none">
          <span className="font-display text-xl font-extrabold tracking-tight text-cream sm:text-2xl">
            Desi Yolk
          </span>
          {tagline && (
            <span className={`font-hand text-[13px] leading-tight sm:text-sm ${taglineColor}`}>
              Pure Eggs. Healthier Tomorrow.
            </span>
          )}
        </span>
      </Link>
    );
  }

  return (
    <Link href="/" className={`inline-flex flex-col ${className}`}>
      <Image
        src="/dy-logo.png"
        alt="Desi Yolk"
        width={300}
        height={100}
        priority
        className="h-8 w-auto sm:h-9"
      />
      {tagline && (
        <span className={`font-hand -mt-0.5 text-[13px] leading-tight sm:text-sm ${taglineColor}`}>
          Pure Eggs. Healthier Tomorrow.
        </span>
      )}
    </Link>
  );
}

export { EggMark };
