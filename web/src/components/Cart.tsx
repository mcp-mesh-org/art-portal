import type { Artwork } from '../types';

interface Props {
  cart: Artwork[];
  onRemove: (id: number) => void;
}

export default function Cart({ cart, onRemove }: Props) {
  if (cart.length === 0) return <p>Your cart is empty.</p>;

  return (
    <section>
      <h2>Cart</h2>
      {cart.map((artwork) => (
        <article key={artwork.id}>
          <span>{artwork.title}</span>
          <span> — ${(artwork.price_cents / 100).toFixed(2)}</span>
          <button onClick={() => onRemove(artwork.id)}>Remove</button>
        </article>
      ))}
    </section>
  );
}
