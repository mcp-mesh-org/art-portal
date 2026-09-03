import type { Artwork } from '../types';

interface Props {
  artwork: Artwork;
  onAddToCart?: (artwork: Artwork) => void;
}

export default function ArtworkCard({ artwork, onAddToCart }: Props) {
  return (
    <article>
      <h2>{artwork.title}</h2>
      <p>{artwork.artist}</p>
      <p>${(artwork.price_cents / 100).toFixed(2)}</p>
      {onAddToCart && (
        <button onClick={() => onAddToCart(artwork)}>Add to cart</button>
      )}
    </article>
  );
}
