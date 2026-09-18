import Link from "next/link";
import { Logo } from "./Logo";
import { WhatsAppGlyph } from "./WhatsAppButton";
import { FacebookGlyph, InstagramGlyph, YoutubeGlyph } from "./SocialIcons";
import { NewsletterForm } from "./NewsletterForm";

export function Footer() {
  return (
    <footer className="mt-auto bg-forest-dark px-4 pb-28 pt-12 text-cream sm:px-6 lg:px-8 lg:pb-12">
      <div className="mx-auto grid gap-10 sm:grid-cols-2 lg:grid-cols-4 md:w-[95%] 2xl:max-w-360">
        <div>
          <Logo variant="dark" />
          <p className="mt-4 max-w-xs text-sm text-cream/60">
            Naturally produced, hygienically packed desi eggs. Delivered fresh from our farm to
            your family.
          </p>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-cream/70">
            Quick Links
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-cream/80">
            {[
              ["Home", "/"],
              ["About", "/profile"],
              ["Products", "/products"],
              ["Our Farm", "/farm"],
              ["Contact", "/profile#contact"],
            ].map(([label, href]) => (
              <li key={label}>
                <Link href={href} className="transition-colors hover:text-accent">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-cream/70">
            Follow Us
          </h3>
          <div className="mt-4 flex gap-3">
            {[InstagramGlyph, FacebookGlyph, YoutubeGlyph, WhatsAppGlyph].map((Icon, i) => (
              <span
                key={i}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-cream/10 text-cream transition-colors hover:bg-accent hover:text-forest-dark"
              >
                <Icon size={17} />
              </span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-cream/70">
            Newsletter
          </h3>
          <p className="mt-4 text-sm text-cream/70">Get updates on new products and offers.</p>
          <NewsletterForm />
        </div>
      </div>

      <div className="mx-auto mt-10 flex flex-col gap-2 border-t border-cream/10 pt-6 text-xs text-cream/50 sm:flex-row sm:items-center sm:justify-between md:w-[95%] 2xl:max-w-360">
        <p>© {new Date().getFullYear()} Desi Yolk. All rights reserved.</p>
        <div className="flex gap-4">
          <span>Privacy Policy</span>
          <span>Terms &amp; Conditions</span>
        </div>
      </div>
    </footer>
  );
}
