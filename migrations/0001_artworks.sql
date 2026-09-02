CREATE TABLE IF NOT EXISTS artworks (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  artist TEXT NOT NULL,
  price_cents INTEGER NOT NULL,
  image_url TEXT NOT NULL
);
