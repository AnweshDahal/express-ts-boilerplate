import type { Config } from 'drizzle-kit';
import dotenv from 'dotenv';

dotenv.config();

export default {
  schema: './src/db/schema.ts',
  out: './src/db/migrations',
  dbCredentials: {
    // connectionString: process.env.DATABASE_URL || '',
    host: process.env.DB_HOST || '',
    port: Number(process.env.DB_PORT) || 5432,
    user: process.env.DB_USER || '',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || '',
  },
  driver: 'pg',
} satisfies Config;
