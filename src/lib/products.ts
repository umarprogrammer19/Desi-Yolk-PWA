export type ProductId = "pack-6" | "pack-12" | "pack-18" | "subscription-12";

export interface Product {
  id: ProductId;
  name: string;
  packSize: number;
  price: number;
  unit: string;
  description: string;
  image: string;
  badge?: string;
}

export const products: Product[] = [
  {
    id: "pack-6",
    name: "Desi Eggs (6 Pack)",
    packSize: 6,
    price: 300,
    unit: "carton",
    description: "Fresh, natural and healthy desi eggs.",
    image: "/p1.png",
  },
  {
    id: "pack-12",
    name: "Desi Eggs (12 Pack)",
    packSize: 12,
    price: 550,
    unit: "carton",
    description: "Ideal for families. Rich in nutrition.",
    image: "/p2.png",
    badge: "Best Seller",
  },
  {
    id: "pack-18",
    name: "Family Pack (18 Pack)",
    packSize: 18,
    price: 800,
    unit: "carton",
    description: "Best value for larger families.",
    image: "/p3.png",
  },
];

export const subscriptionPlan: Product = {
  id: "subscription-12",
  name: "Weekly Subscription",
  packSize: 12,
  price: 520,
  unit: "week",
  description: "12 fresh eggs delivered to your door, every week. Cancel anytime.",
  image: "/p2.png",
  badge: "Subscribe & Save",
};

export const DELIVERY_FEE = 50;
