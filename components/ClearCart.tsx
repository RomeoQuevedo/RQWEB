"use client";

import { useEffect } from "react";
import { useCart } from "./CartProvider";

/** Empties the cart once, after a successful checkout. */
export function ClearCart() {
  const { clear } = useCart();
  useEffect(() => {
    clear();
  }, [clear]);
  return null;
}
