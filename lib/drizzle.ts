'server only';

import * as schema from '@/schema';
import { sql } from '@vercel/postgres';
import { drizzle } from 'drizzle-orm/vercel-postgres';
// import pg from 'pg';

// const { Pool } = pg;

// const pool = new Pool({
//   connectionString: process.env.POSTGRES_URL,
// });

// const connection: any = !!process.env.VERCEL_ENV ? sql : pool;

export const db = drizzle(sql, {
  schema,
});
