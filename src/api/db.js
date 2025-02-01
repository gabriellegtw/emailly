import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load env vars if not already loaded
dotenv.config();

// Add more detailed debug logging
console.log('Environment variables:');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('DATABASE_URL length:', process.env.DATABASE_URL ? process.env.DATABASE_URL.length : 0);
console.log('DATABASE_URL first 10 chars:', process.env.DATABASE_URL ? process.env.DATABASE_URL.substring(0, 10) : 'not set');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Use connection string
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false, // Required for Render
});

// Add an error listener to help debug
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

// Make the test query async
(async () => {
    try {
        const result = await pool.query('SELECT NOW()');
        console.log('Database connection successful:', result.rows[0]);
    } catch (err) {
        console.error('Database connection error:', err);
    }
})();

// const pool = new Pool({
//   user: process.env.DATABASE_USER,
//   host: process.env.DATABASE_HOST,
//   database: process.env.DATABASE_NAME,
//   password: process.env.DATABASE_PASSWORD,
//   port: process.env.DATABASE_PORT,
// });

export default pool;