import dotenv from 'dotenv';
import { defineConfig } from 'drizzle-kit';

dotenv.config({
  path: './.env.local',
});

export default defineConfig({
  schema: './schema.ts',
  out: './drizzle',

  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.POSTGRES_URL!,
  },

  verbose: true,
  strict: true,
});
