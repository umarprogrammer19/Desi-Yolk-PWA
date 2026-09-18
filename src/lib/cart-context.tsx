"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { DELIVERY_FEE, products, subscriptionPlan, type ProductId } from "./products";

export type OrderStatus = "confirmed" | "packed" | "out-for-delivery" | "delivered";

export interface CartLine {
  id: ProductId;
  quantity: number;
}

export interface PlacedOrder {
  id: string;
  lines: CartLine[];
  total: number;
  placedAt: number;
  status: OrderStatus;
}

interface CartContextValue {
  lines: CartLine[];
  addItem: (id: ProductId) => void;
  removeItem: (id: ProductId) => void;
  setQuantity: (id: ProductId, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  total: number;
  order: PlacedOrder | null;
  placeOrder: () => void;
  resetOrder: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);
const CART_KEY = "desi-yolk-cart";
const ORDER_KEY = "desi-yolk-order";
const allItems = [...products, subscriptionPlan];

function readStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [order, setOrder] = useState<PlacedOrder | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // One-time read from localStorage on mount; must run after hydration to
    // avoid a server/client markup mismatch (localStorage is unavailable during SSR).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLines(readStorage(CART_KEY, []));
    setOrder(readStorage(ORDER_KEY, null));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(CART_KEY, JSON.stringify(lines));
  }, [lines, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    if (order) {
      window.localStorage.setItem(ORDER_KEY, JSON.stringify(order));
    } else {
      window.localStorage.removeItem(ORDER_KEY);
    }
  }, [order, hydrated]);

  // Simulate order progressing through fulfilment stages for the prototype demo.
  useEffect(() => {
    if (!order || order.status === "delivered") return;
    const sequence: OrderStatus[] = ["confirmed", "packed", "out-for-delivery", "delivered"];
    const currentIndex = sequence.indexOf(order.status);
    const next = sequence[currentIndex + 1];
    if (!next) return;
    const timer = setTimeout(() => {
      setOrder((prev) => (prev ? { ...prev, status: next } : prev));
    }, 12000);
    return () => clearTimeout(timer);
  }, [order]);

  const addItem = (id: ProductId) => {
    setLines((prev) => {
      const existing = prev.find((line) => line.id === id);
      if (existing) {
        return prev.map((line) =>
          line.id === id ? { ...line, quantity: line.quantity + 1 } : line
        );
      }
      return [...prev, { id, quantity: 1 }];
    });
  };

  const removeItem = (id: ProductId) => {
    setLines((prev) => prev.filter((line) => line.id !== id));
  };

  const setQuantity = (id: ProductId, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setLines((prev) => prev.map((line) => (line.id === id ? { ...line, quantity } : line)));
  };

  const clearCart = () => setLines([]);

  const resetOrder = () => setOrder(null);

  const subtotal = useMemo(
    () =>
      lines.reduce((sum, line) => {
        const product = allItems.find((item) => item.id === line.id);
        return product ? sum + product.price * line.quantity : sum;
      }, 0),
    [lines]
  );

  const total = lines.length > 0 ? subtotal + DELIVERY_FEE : 0;

  const placeOrder = () => {
    if (lines.length === 0) return;
    setOrder({
      id: `DY-${Math.floor(1000 + Math.random() * 9000)}`,
      lines,
      total,
      placedAt: Date.now(),
      status: "confirmed",
    });
    setLines([]);
  };

  const itemCount = lines.reduce((sum, line) => sum + line.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        lines,
        addItem,
        removeItem,
        setQuantity,
        clearCart,
        itemCount,
        subtotal,
        total,
        order,
        placeOrder,
        resetOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
