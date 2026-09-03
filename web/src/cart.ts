import type { Artwork } from './types';

const CART_KEY = 'art-portal-cart';

export function loadCart(): Artwork[] {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? (JSON.parse(raw) as Artwork[]) : [];
  } catch {
    return [];
  }
}

export function saveCart(items: Artwork[]): void {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
}

export function addToCart(items: Artwork[], artwork: Artwork): Artwork[] {
  if (items.some((item) => item.id === artwork.id)) return items;
  return [...items, artwork];
}

export function removeFromCart(items: Artwork[], id: number): Artwork[] {
  return items.filter((item) => item.id !== id);
}
