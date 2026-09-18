type IconProps = { size?: number; className?: string };

export function InstagramGlyph({ size = 20, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function FacebookGlyph({ size = 20, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true">
      <path d="M15 8.5h-2c-.8 0-1.5.7-1.5 1.5v2h3.3l-.5 3.2H11.5V21h-3.3v-5.8H6V12h2.2v-2.3C8.2 7 10 5.3 12.7 5.3h2.3v3.2Z" />
    </svg>
  );
}

export function YoutubeGlyph({ size = 20, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true">
      <rect x="2.5" y="6" width="19" height="12" rx="4" />
      <path d="M10.5 9.7 15 12l-4.5 2.3Z" fill="currentColor" stroke="none" />
    </svg>
  );
}
