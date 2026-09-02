import express from 'express';
import { Pool } from 'pg';

export function createApp(db: Pick<Pool, 'query'>) {
  const app = express();

  app.get('/api/artworks', async (req, res) => {
    try {
      const result = await db.query(
        'SELECT id, title, artist, price_cents FROM artworks'
      );
      res.json(result.rows);
    } catch (err) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.get('/api/artworks/:id', async (req, res) => {
    try {
      const result = await db.query(
        'SELECT id, title, artist, price_cents FROM artworks WHERE id = $1',
        [req.params.id]
      );
      if (result.rows.length === 0) {
        res.status(404).json({ error: 'Artwork not found' });
        return;
      }
      res.json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  return app;
}
