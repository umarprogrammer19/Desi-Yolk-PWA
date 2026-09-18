"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, Search, ShoppingBasket, User, X } from "lucide-react";
import { Logo } from "./Logo";
import { InstallPrompt } from "./InstallPrompt";
import { useCart } from "@/lib/cart-context";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/profile", label: "About" },
  { href: "/products", label: "Products" },
  { href: "/farm", label: "Our Farm" },
  { href: "/#why-desi-eggs", label: "Why Desi Eggs?" },
  { href: "/profile#contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const { itemCount } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85">
      <div className="mx-auto flex items-center justify-between gap-4 px-4 py-3 sm:px-6 md:w-[95%] lg:px-8 2xl:max-w-360">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "bg-leaf-light text-forest"
                    : "text-ink/80 hover:bg-leaf-light/60 hover:text-forest"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2.5">
          <button
            type="button"
            aria-label="Search"
            className="hidden h-10 w-10 items-center justify-center rounded-full text-forest hover:bg-leaf-light/60 sm:flex"
          >
            <Search size={19} />
          </button>
          <InstallPrompt />
          <Link
            href="/profile"
            className="hidden items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-forest hover:bg-leaf-light/60 sm:flex"
          >
            <User size={18} />
            Login
          </Link>
          <Link
            href="/orders"
            className="flex items-center gap-1.5 rounded-full bg-forest px-3.5 py-2 text-sm font-semibold text-cream shadow-sm transition-transform hover:scale-[1.03] hover:bg-forest-dark sm:px-4"
          >
            <ShoppingBasket size={18} />
            <span className="hidden sm:inline">Cart</span>
            <span>({itemCount})</span>
          </Link>
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-forest hover:bg-leaf-light/60 lg:hidden"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="border-t border-black/5 bg-white px-4 pb-4 pt-2 lg:hidden">
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-3 py-2.5 text-sm font-medium text-ink/85 hover:bg-leaf-light/60 hover:text-forest"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
