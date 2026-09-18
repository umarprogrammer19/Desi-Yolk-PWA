"use client";

import { useState } from "react";
import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import { WhatsAppGlyph } from "@/components/WhatsAppButton";
import { WHATSAPP_PHONE } from "@/lib/site";

export default function ProfilePage() {
  const [notice, setNotice] = useState("");

  return (
    <div className="mx-auto px-4 py-8 sm:px-6 md:w-[95%] lg:px-8 2xl:max-w-360">
      <section className="grid items-center gap-8 lg:grid-cols-2">
        <div>
          <p className="font-hand text-xl text-leaf">Our Story</p>
          <h1 className="font-display text-3xl font-extrabold text-forest sm:text-4xl">About Desi Yolk</h1>
          <p className="mt-4 text-sm leading-relaxed text-ink-muted sm:text-base">
            Desi Yolk started with just 10 hens and one simple question: can we bring genuinely
            fresh, naturally produced desi eggs straight from a small farm to a family&apos;s table,
            without the guesswork of the open market?
          </p>
          <p className="mt-3 text-sm leading-relaxed text-ink-muted sm:text-base">
            Every carton is packed the same day, every coop is open to view on our live camera, and
            every order is a WhatsApp message away. No middlemen, no mystery. Just honest eggs.
          </p>
        </div>
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl shadow-sm">
          <Image
            src="/about.png"
            alt="Hens roaming the Desi Yolk farm at sunrise beside the coop"
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover"
          />
        </div>
      </section>

      <section className="mt-14 grid gap-6 sm:grid-cols-2">
        <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="font-display text-xl font-bold text-forest">Login</h2>
          <p className="mt-1 text-sm text-ink-muted">Coming soon. For now, ordering needs no account.</p>
          <form
            className="mt-5 space-y-3"
            onSubmit={(e) => {
              e.preventDefault();
              setNotice("Accounts are coming soon! Order instantly via WhatsApp instead.");
            }}
          >
            <input
              type="text"
              placeholder="Phone number"
              className="w-full rounded-xl border border-black/10 bg-cream-soft px-4 py-2.5 text-sm focus:border-forest focus:outline-none"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full rounded-xl border border-black/10 bg-cream-soft px-4 py-2.5 text-sm focus:border-forest focus:outline-none"
            />
            <button
              type="submit"
              className="w-full rounded-full bg-forest px-4 py-2.5 text-sm font-semibold text-cream hover:bg-forest-dark"
            >
              Continue
            </button>
            {notice && <p className="text-xs font-medium text-leaf">{notice}</p>}
          </form>
        </div>

        <div id="contact" className="scroll-mt-20 rounded-3xl bg-forest p-6 text-cream shadow-sm sm:p-8">
          <h2 className="font-display text-xl font-bold">Contact Us</h2>
          <div className="mt-5 space-y-4 text-sm">
            <a
              href={`https://wa.me/${WHATSAPP_PHONE}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 hover:text-accent"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-cream/10">
                <WhatsAppGlyph size={17} />
              </span>
              +92 341 2771381
            </a>
            <a href={`tel:+${WHATSAPP_PHONE}`} className="flex items-center gap-3 hover:text-accent">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-cream/10">
                <Phone size={16} />
              </span>
              +92 341 2771381
            </a>
            <a href="mailto:hello@desiyolk.com" className="flex items-center gap-3 hover:text-accent">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-cream/10">
                <Mail size={16} />
              </span>
              hello@desiyolk.com
            </a>
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-cream/10">
                <MapPin size={16} />
              </span>
              Desi Yolk Farm, Lahore, Pakistan
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
