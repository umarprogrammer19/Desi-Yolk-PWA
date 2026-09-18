import Image from "next/image";
import { LiveViewerBadge } from "@/components/LiveViewerBadge";
import { WhatsAppGlyph } from "@/components/WhatsAppButton";
import { WHATSAPP_PHONE } from "@/lib/site";
import { Feather, Leaf, ShieldCheck } from "lucide-react";

const TRUST_POINTS = [
  { icon: Feather, title: "Started Small", desc: "We began with just 10 hens to prove we could care for them properly before scaling up." },
  { icon: Leaf, title: "Natural Feed Only", desc: "No shortcuts: our hens are raised on natural feed in open, clean coops." },
  { icon: ShieldCheck, title: "Nothing to Hide", desc: "That's why the camera stays on. Watch the coop whenever you like." },
];

export default function FarmPage() {
  const message = encodeURIComponent("Assalam-o-Alaikum! I saw the live farm camera and want to order fresh eggs.");

  return (
    <div className="mx-auto px-4 py-8 sm:px-6 md:w-[95%] lg:px-8 2xl:max-w-360">
      <div className="mb-6">
        <p className="font-hand text-xl text-leaf">See it before you believe it.</p>
        <h1 className="font-display text-3xl font-extrabold text-forest sm:text-4xl">Our Farm, Live</h1>
        <p className="mt-2 max-w-xl text-sm text-ink-muted sm:text-base">
          A live look inside Coop #2, because trust is earned by showing up, not just saying it.
        </p>
      </div>

      <div className="relative aspect-video w-full overflow-hidden rounded-3xl shadow-lg">
        <Image
          src="/farm1.png"
          alt="Live view inside the coop with hens and a camera mounted on the wall"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute left-4 top-4 flex items-center gap-2">
          <LiveViewerBadge />
        </div>
        <span className="absolute right-4 top-4 rounded-md bg-black/50 px-2.5 py-1 text-xs font-semibold text-white">
          Coop #2
        </span>
      </div>

      <a
        href={`https://wa.me/${WHATSAPP_PHONE}?text=${message}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-bold text-white shadow-md transition-transform hover:scale-[1.01] sm:w-fit"
      >
        <WhatsAppGlyph size={20} />
        Order via WhatsApp
      </a>

      <div className="mt-14 grid items-center gap-10 lg:grid-cols-2">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl">
          <Image
            src="/farm2.png"
            alt="Hens feeding near the coop at sunrise"
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="grid gap-5">
          {TRUST_POINTS.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex gap-4 rounded-2xl bg-leaf-lighter p-5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-forest">
                <Icon size={20} />
              </span>
              <div>
                <h3 className="font-display text-base font-bold text-forest">{title}</h3>
                <p className="mt-0.5 text-sm text-ink-muted">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
