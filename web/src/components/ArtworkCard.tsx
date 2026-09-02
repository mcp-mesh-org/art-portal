import type { Artwork } from '../types';

interface Props {
  artwork: Artwork;
}

export default function ArtworkCard({ artwork }: Props) {
  return (
    <article>
      <h2>{artwork.title}</h2>
      <p>{artwork.artist}</p>
      <p>${(artwork.price_cents / 100).toFixed(2)}</p>
    </article>
  );
}
