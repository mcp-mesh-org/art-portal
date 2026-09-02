import { useEffect, useState } from 'react';
import type { Artwork } from '../types';
import { fetchArtworks } from '../api';
import ArtworkCard from './ArtworkCard';

export default function ArtworkGrid() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchArtworks()
      .then(setArtworks)
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : 'Unknown error');
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading artworks…</p>;
  if (error) return <p>Error: {error}</p>;
  if (artworks.length === 0) return <p>No artworks available.</p>;

  return (
    <div>
      {artworks.map((artwork) => (
        <ArtworkCard key={artwork.id} artwork={artwork} />
      ))}
    </div>
  );
}
