"use client";

import { Check, Plus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import type { Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [justAdded, setJustAdded] = useState(false);
  const isSubscription = product.id === "subscription-12";

  const handleAdd = () => {
    addItem(product.id);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1400);
  };

  return (
    <div className="group flex flex-col overflow-hidden rounded-3xl border border-black/5 bg-white shadow-sm ring-1 ring-black/[0.02] transition-shadow hover:shadow-lg">
      <div className="relative aspect-[4/3] overflow-hidden bg-cream-soft">
        {product.badge && (
          <span className="absolute left-4 top-4 z-10 rounded-full bg-accent px-2.5 py-1 text-[11px] font-bold text-forest-dark shadow-sm">
            {product.badge}
          </span>
        )}
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="font-display text-base font-bold text-forest">{product.name}</h3>
        <p className="text-sm text-ink-muted">{product.description}</p>
        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="font-display text-lg font-extrabold text-forest">
            Rs. {product.price}
            {isSubscription && <span className="text-xs font-medium text-ink-muted"> /week</span>}
          </span>
          <button
            type="button"
            onClick={handleAdd}
            className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold shadow-sm transition-colors ${
              justAdded
                ? "bg-leaf text-white"
                : "bg-forest text-cream hover:bg-forest-dark"
            }`}
          >
            {justAdded ? <Check size={16} /> : <Plus size={16} />}
            {justAdded ? "Added" : isSubscription ? "Subscribe" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}
