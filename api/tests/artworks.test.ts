import supertest from 'supertest';
import { createApp } from '../src/app';
import { Pool } from 'pg';

const mockRows = [
  { id: 1, title: 'Starry Night', artist: 'Van Gogh', price_cents: 100000 },
];

const mockDb = {
  query: jest.fn().mockResolvedValue({ rows: mockRows }),
} as unknown as Pick<Pool, 'query'>;

const app = createApp(mockDb);

beforeEach(() => {
  (mockDb.query as jest.Mock).mockResolvedValue({ rows: mockRows });
});

describe('GET /api/artworks', () => {
  it('responds 200 with a JSON array', async () => {
    const res = await supertest(app).get('/api/artworks');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('each element carries id, title, artist and price_cents', async () => {
    const res = await supertest(app).get('/api/artworks');
    const item = res.body[0];
    expect(item).toHaveProperty('id');
    expect(item).toHaveProperty('title');
    expect(item).toHaveProperty('artist');
    expect(item).toHaveProperty('price_cents');
  });
});

describe('GET /api/artworks/:id', () => {
  it('responds 200 with the artwork object when found', async () => {
    const res = await supertest(app).get('/api/artworks/1');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('title');
    expect(res.body).toHaveProperty('artist');
    expect(res.body).toHaveProperty('price_cents');
  });

  it('responds 404 with an error field when not found', async () => {
    (mockDb.query as jest.Mock).mockResolvedValueOnce({ rows: [] });
    const res = await supertest(app).get('/api/artworks/9999');
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('error');
  });
});
