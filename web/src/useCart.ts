import { useState } from 'react';
import type { Artwork } from './types';
import { addToCart, loadCart, removeFromCart, saveCart } from './cart';

export function useCart() {
  const [cart, setCart] = useState<Artwork[]>(loadCart);

  function add(artwork: Artwork) {
    setCart((prev) => {
      const next = addToCart(prev, artwork);
      saveCart(next);
      return next;
    });
  }

  function remove(id: number) {
    setCart((prev) => {
      const next = removeFromCart(prev, id);
      saveCart(next);
      return next;
    });
  }

  return { cart, addToCart: add, removeFromCart: remove };
}
