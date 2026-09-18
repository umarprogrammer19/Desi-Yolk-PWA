"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ShoppingBag, Video, ClipboardList, UserRound } from "lucide-react";
import { useCart } from "@/lib/cart-context";

const TABS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/products", label: "Products", icon: ShoppingBag },
  { href: "/farm", label: "Farm", icon: Video },
  { href: "/orders", label: "Orders", icon: ClipboardList },
  { href: "/profile", label: "Profile", icon: UserRound },
];

export function BottomNav() {
  const pathname = usePathname();
  const { itemCount } = useCart();

  return (
    <nav className="safe-bottom fixed inset-x-0 bottom-0 z-40 border-t border-black/5 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/90 lg:hidden">
      <div className="mx-auto flex max-w-md items-stretch justify-between px-1.5">
        {TABS.map(({ href, label, icon: Icon }) => {
          const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className="relative flex flex-1 flex-col items-center gap-1 py-2.5 text-[11px] font-medium"
            >
              <span
                className={`flex h-8 w-9 items-center justify-center rounded-xl transition-colors ${
                  active ? "bg-forest text-cream shadow-sm" : "text-ink/55"
                }`}
              >
                <Icon size={19} strokeWidth={active ? 2.4 : 1.8} />
                {href === "/orders" && itemCount > 0 && (
                  <span className="absolute right-2.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[9px] font-bold text-forest-dark">
                    {itemCount}
                  </span>
                )}
              </span>
              <span className={active ? "font-semibold text-forest" : "text-ink/55"}>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
