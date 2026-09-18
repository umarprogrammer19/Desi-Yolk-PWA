import { WHATSAPP_PHONE } from "@/lib/site";

export function WhatsAppGlyph({ size = 22, className = "" }: { size?: number; className?: string }) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} className={className} fill="currentColor" aria-hidden="true">
      <path d="M16.02 3C9.4 3 4.02 8.38 4.02 15c0 2.22.6 4.3 1.65 6.09L4 29l8.11-1.63A11.9 11.9 0 0 0 16.02 27C22.64 27 28 21.62 28 15S22.64 3 16.02 3Zm0 21.7c-1.94 0-3.75-.55-5.28-1.5l-.38-.23-4.28.86.9-4.16-.25-.4a9.62 9.62 0 0 1-1.5-5.27c0-5.34 4.35-9.7 9.79-9.7 5.43 0 9.79 4.36 9.79 9.7 0 5.35-4.36 9.7-9.79 9.7Zm5.37-7.27c-.29-.15-1.74-.86-2.01-.96-.27-.1-.47-.15-.66.15-.2.29-.76.96-.93 1.16-.17.19-.34.22-.63.07-.29-.15-1.23-.45-2.34-1.44-.87-.77-1.45-1.72-1.62-2.01-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.5.15-.17.19-.29.29-.49.1-.19.05-.36-.02-.51-.07-.15-.66-1.59-.9-2.18-.24-.57-.48-.49-.66-.5h-.56c-.19 0-.51.07-.78.36-.27.29-1.02 1-1.02 2.44s1.05 2.83 1.19 3.03c.15.19 2.06 3.15 5 4.42.7.3 1.24.48 1.67.61.7.22 1.34.19 1.84.12.56-.08 1.74-.71 1.98-1.4.24-.68.24-1.27.17-1.4-.07-.13-.27-.2-.56-.35Z" />
    </svg>
  );
}

export function WhatsAppButton() {
  const message = encodeURIComponent(
    "Assalam-o-Alaikum! I'd like to order fresh Desi Eggs from Desi Yolk."
  );

  return (
    <a
      href={`https://wa.me/${WHATSAPP_PHONE}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Order via WhatsApp"
      className="fixed right-4 bottom-24 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 transition-transform hover:scale-105 lg:bottom-8 lg:right-8"
    >
      <WhatsAppGlyph size={28} />
      <span className="absolute -top-1 -right-1 flex h-4 w-4 animate-ping rounded-full bg-[#25D366] opacity-75" />
    </a>
  );
}
