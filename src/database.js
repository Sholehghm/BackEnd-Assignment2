import pg from 'pg';
import { DB_URL } from './config.js';

const { Pool } = pg;

export const pool = new Pool({
  connectionString: DB_URL,
  ssl: { rejectUnauthorized: false },
});

export async function getRssFeeds() {
  const res = await pool.query('SELECT rss_url FROM rss_feeds');
  return res.rows.map(row => row.rss_url);
}

export async function getRecipients() {
  const res = await pool.query('SELECT email FROM recipients');
  return res.rows.map(row => row.email);
}
