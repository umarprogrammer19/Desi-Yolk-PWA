import Link from "next/link";
import Image from "next/image";
import { Leaf, ShieldCheck, Truck, Users, ArrowRight, QrCode, Video, Package } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { LiveViewerBadge } from "@/components/LiveViewerBadge";
import { products } from "@/lib/products";

const FEATURES = [
  { icon: Leaf, title: "Natural Feed", desc: "Healthy hens, better eggs" },
  { icon: ShieldCheck, title: "Hygienic Process", desc: "Clean and safe production" },
  { icon: Truck, title: "Home Delivery", desc: "Fresh eggs at your doorstep" },
  { icon: Users, title: "Trusted by Families", desc: "Quality you can rely on" },
];

const WHY_CARDS = [
  {
    icon: Video,
    title: "Live Farm Camera",
    desc: "Watch Coop #2 anytime. Nothing hidden: see exactly where your eggs come from.",
  },
  {
    icon: Package,
    title: "Eco Kraft Packaging",
    desc: "Biodegradable kraft boxes with a window, so you see real brown eggs before you open it.",
  },
  {
    icon: QrCode,
    title: "Scan & Trust",
    desc: "Every box has a QR code linking straight to the live farm camera. Farm to table in 2 hours.",
  },
];

export default function Home() {
  return (
    <div>
      <section className="mx-auto px-4 pt-8 sm:px-6 sm:pt-12 md:w-[95%] lg:px-8 2xl:max-w-360">
        <div className="grid items-center gap-10 rounded-[32px] bg-leaf-lighter px-6 py-10 sm:px-10 sm:py-14 lg:grid-cols-2 lg:gap-16 lg:px-16">
          <div>
            <p className="font-hand text-xl text-leaf sm:text-2xl">Farm Fresh. Naturally Better.</p>
            <h1 className="mt-2 font-display text-4xl font-extrabold leading-[1.08] text-forest sm:text-5xl lg:text-[3.4rem]">
              Desi Eggs For A Healthier You
            </h1>
            <p className="mt-4 max-w-md text-base text-ink-muted sm:text-lg">
              Naturally produced, hygienically packed and delivered to your home.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/products"
                className="rounded-full bg-forest px-6 py-3 text-sm font-semibold text-cream shadow-md transition-transform hover:scale-[1.03] hover:bg-forest-dark sm:text-base"
              >
                Order Now
              </Link>
              <Link
                href="/profile"
                className="rounded-full border-2 border-forest px-6 py-3 text-sm font-semibold text-forest transition-colors hover:bg-forest/5 sm:text-base"
              >
                Learn More
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-sm">
              <Image
                src="/hero.png"
                alt="Hens beside a basket of fresh desi eggs"
                fill
                priority
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
            <span className="font-hand absolute left-4 top-4 -rotate-2 text-lg text-forest sm:left-6 sm:top-6 sm:text-2xl">
              Good Eggs, Brighter Days
            </span>
          </div>
        </div>
      </section>

      <section className="mx-auto px-4 py-10 sm:px-6 md:w-[95%] lg:px-8 2xl:max-w-360">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
          {FEATURES.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex flex-col items-center gap-2 rounded-2xl border border-black/5 bg-cream-soft/60 px-3 py-5 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-black/5 text-forest">
                <Icon size={24} />
              </span>
              <p className="font-display text-sm font-bold text-forest">{title}</p>
              <p className="text-xs text-ink-muted">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto px-4 pb-12 sm:px-6 md:w-[95%] lg:px-8 2xl:max-w-360">
        <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
          <div>
            <div className="mb-5 flex items-end justify-between">
              <h2 className="font-display text-2xl font-extrabold text-forest sm:text-3xl">Our Products</h2>
              <Link href="/products" className="flex items-center gap-1 text-sm font-semibold text-leaf hover:text-forest">
                See All <ArrowRight size={15} />
              </Link>
            </div>
            <div className="grid gap-5 sm:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>

          <div className="relative min-h-[320px] overflow-hidden rounded-3xl">
            <Image
              src="/home-cards-right.png"
              alt="Hens grazing on the Desi Yolk farm"
              fill
              sizes="(min-width: 1024px) 30vw, 100vw"
              className="object-cover"
            />
            <div className="relative flex h-full flex-col justify-end bg-gradient-to-t from-forest-dark/90 via-forest-dark/40 to-transparent p-6 text-cream">
              <p className="font-hand text-lg text-accent">Healthy Hens, Happier Homes</p>
              <h3 className="mt-1 font-display text-xl font-bold sm:text-2xl">
                From Our Farm to Your Family
              </h3>
              <p className="mt-2 text-sm text-cream/80">
                We believe in providing fresh, healthy and natural eggs while supporting ethical
                and sustainable farming practices.
              </p>
              <Link
                href="/profile"
                className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-cream px-4 py-2 text-sm font-semibold text-forest hover:bg-white"
              >
                Our Story <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="why-desi-eggs" className="scroll-mt-20 bg-forest px-4 py-14 text-cream sm:px-6 lg:px-8">
        <div className="mx-auto md:w-[95%] 2xl:max-w-360">
          <div className="mb-10 max-w-xl">
            <p className="font-hand text-xl text-accent">Why Desi Eggs?</p>
            <h2 className="mt-1 font-display text-2xl font-extrabold sm:text-3xl">
              Built on trust, not just taglines
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
            <div className="grid gap-5 sm:grid-cols-2">
              {WHY_CARDS.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent/20 text-accent">
                    <Icon size={20} />
                  </span>
                  <h3 className="mt-3 font-display text-base font-bold">{title}</h3>
                  <p className="mt-1 text-sm text-cream/70">{desc}</p>
                </div>
              ))}
              <Link
                href="/farm"
                className="flex flex-col justify-center rounded-2xl bg-accent px-5 py-5 text-forest-dark transition-transform hover:scale-[1.02]"
              >
                <span className="font-display text-base font-bold">Watch the coop live</span>
                <span className="mt-1 flex items-center gap-1.5 text-sm font-semibold">
                  Go to Farm Cam <ArrowRight size={15} />
                </span>
              </Link>
            </div>

            <div className="relative min-h-[280px] overflow-hidden rounded-2xl">
              <Image
                src="/home-second-last-section.png"
                alt="Live view of the coop with a camera mounted on the wall"
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
              <div className="absolute left-3 top-3 flex items-center gap-2">
                <LiveViewerBadge />
              </div>
              <span className="absolute bottom-3 left-3 rounded-md bg-black/50 px-2 py-1 text-[11px] font-medium text-white">
                Coop #2
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
