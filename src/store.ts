import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Color, Product, Size } from "./data";

export type CartLine = {
  id: string;
  product: Product;
  qty: number;
  color: Color;
  size: Size;
};

type User = { firstName: string; lastName: string; email: string } | null;

type ShopState = {
  cart: CartLine[];
  wishlist: string[];
  compare: string[];
  user: User;
  addToCart: (product: Product, qty: number, color: Color, size: Size) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  toggleWish: (id: string) => void;
  toggleCompare: (id: string) => void;
  setUser: (user: User) => void;
  clearCart: () => void;
};

const lineId = (p: Product, color: Color, size: Size) => `${p.id}-${color}-${size}`;

export const useShop = create<ShopState>()(
  persist(
    (set, get) => ({
      cart: [],
      wishlist: [],
      compare: [],
      user: null,
      addToCart: (product, qty, color, size) => {
        const id = lineId(product, color, size);
        const existing = get().cart.find((l) => l.id === id);
        if (existing) {
          set({ cart: get().cart.map((l) => (l.id === id ? { ...l, qty: l.qty + qty } : l)) });
        } else {
          set({ cart: [...get().cart, { id, product, qty, color, size }] });
        }
      },
      setQty: (id, qty) =>
        set({
          cart: qty < 1 ? get().cart.filter((l) => l.id !== id) : get().cart.map((l) => (l.id === id ? { ...l, qty } : l)),
        }),
      remove: (id) => set({ cart: get().cart.filter((l) => l.id !== id) }),
      toggleWish: (id) =>
        set({
          wishlist: get().wishlist.includes(id) ? get().wishlist.filter((x) => x !== id) : [...get().wishlist, id],
        }),
      toggleCompare: (id) =>
        set({
          compare: get().compare.includes(id) ? get().compare.filter((x) => x !== id) : [...get().compare, id],
        }),
      setUser: (user) => set({ user }),
      clearCart: () => set({ cart: [] }),
    }),
    { name: "fasco-shop-v1" }
  )
);

export function cartCount(cart: CartLine[]) {
  return cart.reduce((s, l) => s + l.qty, 0);
}

export function cartSubtotal(cart: CartLine[]) {
  return cart.reduce((s, l) => s + l.product.price * l.qty, 0);
}
