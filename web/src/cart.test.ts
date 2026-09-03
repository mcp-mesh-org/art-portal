import { beforeEach, describe, expect, it } from 'vitest';
import { addToCart, loadCart, removeFromCart, saveCart } from './cart';

const a1 = { id: 1, title: 'Starry Night', artist: 'Van Gogh', price_cents: 100000 };
const a2 = { id: 2, title: 'Sunflowers', artist: 'Van Gogh', price_cents: 80000 };

beforeEach(() => {
  localStorage.clear();
});

describe('addToCart', () => {
  it('adds an artwork to an empty cart', () => {
    const result = addToCart([], a1);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(1);
  });

  it('does not add a duplicate when the artwork is already in the cart', () => {
    const result = addToCart([a1], a1);
    expect(result).toHaveLength(1);
  });

  it('adds a second distinct artwork', () => {
    const result = addToCart([a1], a2);
    expect(result).toHaveLength(2);
  });
});

describe('removeFromCart', () => {
  it('removes an artwork by id', () => {
    const result = removeFromCart([a1, a2], 1);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(2);
  });

  it('is a no-op when the id is not present', () => {
    const result = removeFromCart([a1], 99);
    expect(result).toHaveLength(1);
  });
});

describe('reload (localStorage persistence)', () => {
  it('loadCart returns an empty array when nothing has been saved', () => {
    expect(loadCart()).toEqual([]);
  });

  it('loadCart returns the items saved by saveCart, simulating a page reload', () => {
    saveCart([a1, a2]);
    expect(loadCart()).toEqual([a1, a2]);
  });
});
