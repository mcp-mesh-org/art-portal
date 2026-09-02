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

  return app;
}
