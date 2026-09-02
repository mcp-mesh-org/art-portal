import { Pool } from 'pg';
import { createApp } from './app';

const pool = new Pool();
const app = createApp(pool);
const port = process.env.PORT ?? 3000;

app.listen(port, () => {
  console.log(`API listening on port ${port}`);
});
