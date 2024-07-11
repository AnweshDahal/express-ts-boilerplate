import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from './schema';
import postgres from 'postgres';

if (
  !(
    process.env.DB_NAME &&
    process.env.DB_HOST &&
    process.env.DB_USER &&
    process.env.DB_PASSWORD
  )
) {
  throw new Error('DB ERROR: Credentials Not Found');
}

let db = null;

const connection = {
  host: process.env.DB_HOST || '',
  user: process.env.DB_USER || '',
  database: process.env.DB_NAME || '',
  password: process.env.DB_PASSWORD || '',
  waitForConnection: true,
  connectionLimit: 10,
  maxIdle: 10, // max idle connections
};

export default db = drizzle(postgres(connection), { schema });
