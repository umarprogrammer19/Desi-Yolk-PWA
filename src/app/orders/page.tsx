"use client";

import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, Trash2, PackageCheck, PackageOpen, Truck, Home, ShoppingBasket } from "lucide-react";
import { useCart, type CartLine } from "@/lib/cart-context";
import { DELIVERY_FEE, products, subscriptionPlan } from "@/lib/products";
import { WHATSAPP_PHONE } from "@/lib/site";

const allItems = [...products, subscriptionPlan];

function buildWhatsAppUrl(intro: string, orderLines: CartLine[], subtotalAmount: number, totalAmount: number) {
  const itemLines = orderLines
    .map((line) => {
      const product = allItems.find((p) => p.id === line.id);
      return product ? `- ${product.name} x${line.quantity} = Rs. ${product.price * line.quantity}` : null;
    })
    .filter(Boolean)
    .join("\n");

  const message = encodeURIComponent(
    `${intro}\n\n${itemLines}\n\nSubtotal: Rs. ${subtotalAmount}\nDelivery Fee: Rs. ${DELIVERY_FEE}\nTotal: Rs. ${totalAmount}\n\nPlease confirm my order. Thank you!`
  );

  return `https://wa.me/${WHATSAPP_PHONE}?text=${message}`;
}

const STEPS = [
  { key: "confirmed", label: "Confirmed", icon: PackageCheck },
  { key: "packed", label: "Packed", icon: PackageOpen },
  { key: "out-for-delivery", label: "Out for Delivery", icon: Truck },
  { key: "delivered", label: "Delivered", icon: Home },
] as const;

export default function OrdersPage() {
  const { lines, setQuantity, removeItem, subtotal, total, placeOrder, order, resetOrder } = useCart();

  const handleCheckout = () => {
    const url = buildWhatsAppUrl("Assalam-o-Alaikum! I'd like to place an order:", lines, subtotal, total);
    window.open(url, "_blank", "noopener,noreferrer");
    placeOrder();
  };

  const handleReorder = () => {
    if (!order) return;
    const orderSubtotal = order.total - DELIVERY_FEE;
    const url = buildWhatsAppUrl(
      "Assalam-o-Alaikum! I'd like to place a new order,",
      order.lines,
      orderSubtotal,
      order.total
    );
    window.open(url, "_blank", "noopener,noreferrer");
    resetOrder();
  };

  if (order) {
    const stepIndex = STEPS.findIndex((s) => s.key === order.status);
    return (
      <div className="mx-auto px-4 py-10 sm:px-6 md:w-[95%] 2xl:max-w-360">
        <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm sm:p-8">
          <p className="text-sm font-medium text-ink-muted">Order {order.id}</p>
          <h1 className="font-display text-2xl font-extrabold text-forest sm:text-3xl">
            {order.status === "delivered" ? "Delivered. Enjoy!" : "Your order is on its way"}
          </h1>

          <div className="mt-8 flex items-center justify-between">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              const reached = i <= stepIndex;
              return (
                <div key={step.key} className="flex flex-1 flex-col items-center text-center">
                  <div className="flex w-full items-center">
                    <div className={`h-0.5 flex-1 ${i === 0 ? "opacity-0" : reached ? "bg-forest" : "bg-black/10"}`} />
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                        reached ? "bg-forest text-cream" : "bg-black/5 text-ink-muted"
                      }`}
                    >
                      <Icon size={17} />
                    </span>
                    <div className={`h-0.5 flex-1 ${i === STEPS.length - 1 ? "opacity-0" : reached ? "bg-forest" : "bg-black/10"}`} />
                  </div>
                  <span className={`mt-2 text-[11px] font-semibold sm:text-xs ${reached ? "text-forest" : "text-ink-muted"}`}>
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="mt-8 space-y-3 border-t border-black/5 pt-5">
            {order.lines.map((line) => {
              const product = allItems.find((p) => p.id === line.id);
              if (!product) return null;
              return (
                <div key={line.id} className="flex items-center justify-between text-sm">
                  <span className="text-ink/80">
                    {product.name} × {line.quantity}
                  </span>
                  <span className="font-semibold text-forest">Rs. {product.price * line.quantity}</span>
                </div>
              );
            })}
            <div className="flex items-center justify-between border-t border-black/5 pt-3 font-display text-base font-bold text-forest">
              <span>Total</span>
              <span>Rs. {order.total}</span>
            </div>
          </div>

          {order.status === "delivered" && (
            <>
              <button
                type="button"
                onClick={handleReorder}
                className="mt-6 w-full rounded-full bg-forest px-6 py-3 text-sm font-semibold text-cream hover:bg-forest-dark"
              >
                Place a New Order
              </button>
              <p className="mt-2 text-center text-xs text-ink-muted">
                Drafts the same order on WhatsApp so you can confirm it again.
              </p>
            </>
          )}
        </div>
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="mx-auto flex flex-col items-center px-4 py-20 text-center md:w-[95%] 2xl:max-w-360">
        <span className="flex h-20 w-20 items-center justify-center rounded-full bg-leaf-light text-forest">
          <ShoppingBasket size={32} />
        </span>
        <h1 className="mt-5 font-display text-2xl font-extrabold text-forest">Your basket is empty</h1>
        <p className="mt-2 text-sm text-ink-muted">Add some fresh desi eggs to get started.</p>
        <Link
          href="/products"
          className="mt-6 rounded-full bg-forest px-6 py-3 text-sm font-semibold text-cream hover:bg-forest-dark"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto px-4 py-8 sm:px-6 md:w-[95%] 2xl:max-w-360">
      <h1 className="font-display text-2xl font-extrabold text-forest sm:text-3xl">Your Cart</h1>

      <div className="mt-6 space-y-3">
        {lines.map((line) => {
          const product = allItems.find((p) => p.id === line.id);
          if (!product) return null;
          return (
            <div key={line.id} className="flex items-center gap-4 rounded-2xl border border-black/5 bg-white p-4 shadow-sm">
              <Image
                src={product.image}
                alt={product.name}
                width={64}
                height={64}
                className="h-16 w-16 shrink-0 rounded-xl object-cover"
              />
              <div className="flex-1">
                <p className="font-display text-sm font-bold text-forest sm:text-base">{product.name}</p>
                <p className="text-sm text-ink-muted">Rs. {product.price}</p>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-black/5 px-2 py-1">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  onClick={() => setQuantity(line.id, line.quantity - 1)}
                  className="flex h-7 w-7 items-center justify-center rounded-full text-forest hover:bg-white"
                >
                  <Minus size={14} />
                </button>
                <span className="w-4 text-center text-sm font-semibold text-forest">{line.quantity}</span>
                <button
                  type="button"
                  aria-label="Increase quantity"
                  onClick={() => setQuantity(line.id, line.quantity + 1)}
                  className="flex h-7 w-7 items-center justify-center rounded-full text-forest hover:bg-white"
                >
                  <Plus size={14} />
                </button>
              </div>
              <button
                type="button"
                aria-label="Remove item"
                onClick={() => removeItem(line.id)}
                className="text-ink-muted hover:text-red-500"
              >
                <Trash2 size={17} />
              </button>
            </div>
          );
        })}
      </div>

      <div className="mt-6 space-y-2 rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
        <div className="flex justify-between text-sm text-ink-muted">
          <span>Subtotal</span>
          <span>Rs. {subtotal}</span>
        </div>
        <div className="flex justify-between text-sm text-ink-muted">
          <span>Delivery Fee</span>
          <span>Rs. {DELIVERY_FEE}</span>
        </div>
        <div className="flex justify-between border-t border-black/5 pt-3 font-display text-lg font-bold text-forest">
          <span>Total</span>
          <span>Rs. {total}</span>
        </div>
      </div>

      <button
        type="button"
        onClick={handleCheckout}
        className="mt-5 w-full rounded-full bg-forest px-6 py-3.5 text-sm font-bold text-cream shadow-md transition-transform hover:scale-[1.01] hover:bg-forest-dark"
      >
        Proceed to Checkout
      </button>
      <p className="mt-2 text-center text-xs text-ink-muted">
        Opens WhatsApp with your order summary, then tracks it here.
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {[
          ["Home Delivery", "Available in your area"],
          ["Secure Payment", "Cash on delivery"],
          ["Freshness Guaranteed", "Direct from our farm"],
        ].map(([title, desc]) => (
          <div key={title} className="rounded-xl bg-leaf-lighter p-3 text-center">
            <p className="text-xs font-bold text-forest">{title}</p>
            <p className="text-[11px] text-ink-muted">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
