import { drizzle } from 'drizzle-orm/postgres-js';
import { users } from './schema';
import postgres from 'postgres';
import * as dotenv from 'dotenv';

// Seeder Data
import userSeederData from './seeders/userSeederData';
import { exit } from 'process';

dotenv.config({ path: './.env' });
if (
  !(
    'DB_HOST' in process.env &&
    'DB_USER' in process.env &&
    'DB_NAME' in process.env &&
    'DB_PORT' in process.env &&
    'DB_PASSWORD' in process.env
  )
)
  throw new Error('DATABASE_URL not found on .env');

const main = async () => {
  const connection = {
    host: process.env.DB_HOST || '',
    user: process.env.DB_USER || '',
    database: process.env.DB_NAME || '',
    password: process.env.DB_PASSWORD || '',
    waitForConnection: true,
    connectionLimit: 10,
    maxIdle: 10, // max idle connections
  };
  const db = drizzle(postgres(connection));

  console.log('\x1b[34mSeeding\x1b[0m: users table');
  try {
    await db.insert(users).values(userSeederData).onConflictDoNothing();
    console.log("\x1b[32mDone Seeding:\x1b[0m 'users' table");
  } catch (err: Error | any) {
    console.error("\x1b[31mError Seeding:\x1b[0m 'users' table, ", err.message);
  }

  exit();
};

console.log(
  'The logs might appear weird if your system does not support ANSI colors\n',
);

main();
