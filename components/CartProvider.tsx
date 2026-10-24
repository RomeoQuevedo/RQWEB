"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, type ReactNode } from "react";
import { getProduct } from "@/lib/products";

const STORAGE_KEY = "rq-cart-v1";
const MAX_QTY = 10;

export type CartItem = {
  slug: string;
  size?: string;
  qty: number;
};

type State = { items: CartItem[]; hydrated: boolean };

type Action =
  | { type: "hydrate"; items: CartItem[] }
  | { type: "add"; item: CartItem }
  | { type: "setQty"; key: string; qty: number }
  | { type: "remove"; key: string }
  | { type: "clear" };

export function lineKey(item: Pick<CartItem, "slug" | "size">): string {
  return `${item.slug}::${item.size ?? ""}`;
}

function clampQty(qty: number): number {
  return Math.max(1, Math.min(MAX_QTY, Math.floor(qty)));
}

/** Drop anything that no longer matches the catalog (removed products, stale sizes, bad data). */
function sanitize(raw: unknown): CartItem[] {
  if (!Array.isArray(raw)) return [];
  const out: CartItem[] = [];
  for (const entry of raw) {
    if (!entry || typeof entry !== "object") continue;
    const { slug, size, qty } = entry as Record<string, unknown>;
    if (typeof slug !== "string" || typeof qty !== "number" || !Number.isFinite(qty)) continue;
    const product = getProduct(slug);
    if (!product) continue;
    if (product.sizes && (typeof size !== "string" || !product.sizes.includes(size))) continue;
    out.push({ slug, size: product.sizes ? (size as string) : undefined, qty: clampQty(qty) });
  }
  return out;
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "hydrate":
      return { items: action.items, hydrated: true };
    case "add": {
      const key = lineKey(action.item);
      const existing = state.items.find((i) => lineKey(i) === key);
      const items = existing
        ? state.items.map((i) => (lineKey(i) === key ? { ...i, qty: clampQty(i.qty + action.item.qty) } : i))
        : [...state.items, { ...action.item, qty: clampQty(action.item.qty) }];
      return { ...state, items };
    }
    case "setQty":
      return {
        ...state,
        items: state.items.map((i) => (lineKey(i) === action.key ? { ...i, qty: clampQty(action.qty) } : i)),
      };
    case "remove":
      return { ...state, items: state.items.filter((i) => lineKey(i) !== action.key) };
    case "clear":
      return { ...state, items: [] };
  }
}

function readStorage(): CartItem[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? sanitize(JSON.parse(raw)) : [];
  } catch {
    return [];
  }
}

function writeStorage(items: CartItem[]) {
  try {
    if (items.length) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    else window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Storage unavailable (private mode, blocked) — cart still works for this visit.
  }
}

type CartContextValue = {
  items: CartItem[];
  hydrated: boolean;
  count: number;
  subtotal: number;
  maxQty: number;
  add: (item: CartItem) => void;
  setQty: (key: string, qty: number) => void;
  remove: (key: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [], hydrated: false });

  useEffect(() => {
    dispatch({ type: "hydrate", items: readStorage() });

    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) dispatch({ type: "hydrate", items: readStorage() });
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  useEffect(() => {
    if (state.hydrated) writeStorage(state.items);
  }, [state.items, state.hydrated]);

  const add = useCallback((item: CartItem) => dispatch({ type: "add", item }), []);
  const setQty = useCallback((key: string, qty: number) => dispatch({ type: "setQty", key, qty }), []);
  const remove = useCallback((key: string) => dispatch({ type: "remove", key }), []);
  const clear = useCallback(() => {
    // Clear storage synchronously so a pending hydrate can't restore the old cart.
    writeStorage([]);
    dispatch({ type: "clear" });
  }, []);

  const value = useMemo<CartContextValue>(() => {
    let count = 0;
    let subtotal = 0;
    for (const item of state.items) {
      const product = getProduct(item.slug);
      if (!product) continue;
      count += item.qty;
      subtotal += product.price * item.qty;
    }
    return {
      items: state.items,
      hydrated: state.hydrated,
      count,
      subtotal,
      maxQty: MAX_QTY,
      add,
      setQty,
      remove,
      clear,
    };
  }, [state, add, setQty, remove, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
