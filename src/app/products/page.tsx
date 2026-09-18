"use client";

import { useState } from "react";
import Image from "next/image";
import { Sparkles } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { products, subscriptionPlan } from "@/lib/products";
import { useCart } from "@/lib/cart-context";

const FILTERS = ["All", "Desi Eggs", "Family Pack"] as const;

export default function ProductsPage() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const { addItem } = useCart();

  const visible = products.filter((p) => {
    if (filter === "All") return true;
    if (filter === "Family Pack") return p.packSize === 18;
    return p.packSize !== 18;
  });

  return (
    <div className="mx-auto px-4 py-8 sm:px-6 md:w-[95%] lg:px-8 2xl:max-w-360">
      <div className="mb-6">
        <p className="font-hand text-xl text-leaf">Fresh Eggs. Closer to You.</p>
        <h1 className="font-display text-3xl font-extrabold text-forest sm:text-4xl">Our Products</h1>
        <p className="mt-2 max-w-xl text-sm text-ink-muted sm:text-base">
          Choose a one-time carton or subscribe weekly and never run out of fresh desi eggs.
        </p>
      </div>

      <div className="mb-8 flex flex-col gap-5 overflow-hidden rounded-3xl bg-forest px-6 py-6 text-cream sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div className="flex items-center gap-4">
          <Image
            src={subscriptionPlan.image}
            alt={subscriptionPlan.name}
            width={64}
            height={64}
            className="h-16 w-16 shrink-0 rounded-xl object-cover"
          />
          <div>
            <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-accent">
              <Sparkles size={14} /> {subscriptionPlan.badge}
            </span>
            <h2 className="font-display text-lg font-bold sm:text-xl">{subscriptionPlan.name}</h2>
            <p className="text-sm text-cream/70">{subscriptionPlan.description}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => addItem(subscriptionPlan.id)}
          className="shrink-0 rounded-full bg-accent px-5 py-2.5 text-sm font-bold text-forest-dark transition-transform hover:scale-105"
        >
          Subscribe for Rs. {subscriptionPlan.price}/wk
        </button>
      </div>

      <div className="mb-6 flex gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              filter === f ? "bg-forest text-cream" : "bg-black/5 text-ink/70 hover:bg-black/10"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
