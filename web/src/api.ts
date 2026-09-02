import type { Artwork } from './types';

export async function fetchArtworks(): Promise<Artwork[]> {
  const res = await fetch('/api/artworks');
  if (!res.ok) throw new Error('Failed to fetch artworks');
  return res.json() as Promise<Artwork[]>;
}
